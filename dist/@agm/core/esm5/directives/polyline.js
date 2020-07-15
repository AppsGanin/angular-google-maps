import * as tslib_1 from "tslib";
import { ContentChildren, Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolylineManager } from '../services/managers/polyline-manager';
import { AgmPolylineIcon } from './polyline-icon';
import { AgmPolylinePoint } from './polyline-point';
var polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmPolyline = /** @class */ (function () {
    function AgmPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new EventEmitter();
        /**
         * This event is fired after Polyline's path changes.
         */
        this.polyPathChange = new EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    AgmPolyline_1 = AgmPolyline;
    /** @internal */
    AgmPolyline.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        var pointSub = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(pointSub);
        this._polylineManager.updatePolylinePoints(this);
        var iconSub = this.iconSequences.changes.subscribe(function () { return _this._polylineManager.updateIconSequences(_this); });
        this._subscriptions.push(iconSub);
    };
    AgmPolyline.prototype.ngOnChanges = function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmPolyline_1._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    AgmPolyline.prototype.getPath = function () {
        return this._polylineManager.getPath(this);
    };
    AgmPolyline.prototype._init = function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolyline.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
        this._polylineManager.createPathEventObservable(this).then(function (ob$) {
            var os = ob$.subscribe(function (pathEvent) { return _this.polyPathChange.emit(pathEvent); });
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmPolyline.prototype._getPoints = function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    AgmPolyline.prototype._getIcons = function () {
        if (this.iconSequences) {
            return this.iconSequences.toArray();
        }
        return [];
    };
    /** @internal */
    AgmPolyline.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolyline.prototype.ngOnDestroy = function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmPolyline_1;
    AgmPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex',
    ];
    AgmPolyline.ctorParameters = function () { return [
        { type: PolylineManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('polylineDraggable')
    ], AgmPolyline.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "geodesic", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolyline.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineDblClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineDrag", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineDragEnd", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineDragStart", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineMouseDown", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineMouseMove", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineMouseOut", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineMouseOver", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineMouseUp", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "lineRightClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolyline.prototype, "polyPathChange", void 0);
    tslib_1.__decorate([
        ContentChildren(AgmPolylinePoint)
    ], AgmPolyline.prototype, "points", void 0);
    tslib_1.__decorate([
        ContentChildren(AgmPolylineIcon)
    ], AgmPolyline.prototype, "iconSequences", void 0);
    AgmPolyline = AgmPolyline_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-polyline',
        })
    ], AgmPolyline);
    return AgmPolyline;
}());
export { AgmPolyline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUkxSixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFJSDtJQWdJRSxxQkFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUEvSHJEOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7O1dBR0c7UUFDSCwyQ0FBMkM7UUFDZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTlDOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUI7Ozs7O1dBS0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBaUIxQjs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFPeEI7O1dBRUc7UUFDTyxjQUFTLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXZGOztXQUVHO1FBQ08saUJBQVksR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFMUY7O1dBRUc7UUFDTyxhQUFRLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFOUU7O1dBRUc7UUFDTyxnQkFBVyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRWpGOztXQUVHO1FBQ08sa0JBQWEsR0FBNkIsSUFBSSxZ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RCxrQkFBQztDQUFBLEFBOU5ELElBOE5DO1NBOU5ZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTGF0TG5nLCBQb2x5TW91c2VFdmVudCB9IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XHJcbmltcG9ydCB7IEFnbVBvbHlsaW5lSWNvbiB9IGZyb20gJy4vcG9seWxpbmUtaWNvbic7XHJcbmltcG9ydCB7IEFnbVBvbHlsaW5lUG9pbnQgfSBmcm9tICcuL3BvbHlsaW5lLXBvaW50JztcclxuXHJcbmxldCBwb2x5bGluZUlkID0gMDtcclxuLyoqXHJcbiAqIEFnbVBvbHlsaW5lIHJlbmRlcnMgYSBwb2x5bGluZSBvbiBhIHtAbGluayBBZ21NYXB9XHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcclxuICogICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgICB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDxhZ20tcG9seWxpbmU+XHJcbiAqICAgICAgICAgIDxhZ20tcG9seWxpbmUtcG9pbnQgW2xhdGl0dWRlXT1cImxhdEFcIiBbbG9uZ2l0dWRlXT1cImxuZ0FcIj5cclxuICogICAgICAgICAgPC9hZ20tcG9seWxpbmUtcG9pbnQ+XHJcbiAqICAgICAgICAgIDxhZ20tcG9seWxpbmUtcG9pbnQgW2xhdGl0dWRlXT1cImxhdEJcIiBbbG9uZ2l0dWRlXT1cImxuZ0JcIj5cclxuICogICAgICAgICAgPC9hZ20tcG9seWxpbmUtcG9pbnQ+XHJcbiAqICAgICAgPC9hZ20tcG9seWxpbmU+XHJcbiAqICAgIDwvYWdtLW1hcD5cclxuICogIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2FnbS1wb2x5bGluZScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21Qb2x5bGluZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFBvbHlsaW5lIGhhbmRsZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNsaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljIHByb3BlcnR5IGRlZmluZXMgdGhlXHJcbiAgICogbW9kZSBvZiBkcmFnZ2luZy4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgncG9seWxpbmVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0IHRoZVxyXG4gICAqIHZlcnRpY2VzIGFuZCBvbiBlYWNoIHNlZ21lbnQuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVkaXRhYmxlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mXHJcbiAgICogdGhlIEVhcnRoLiBXaGVuIGZhbHNlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmUgcmVuZGVyZWQgYXMgc3RyYWlnaHQgbGluZXMgaW4gc2NyZWVuIHNwYWNlLlxyXG4gICAqIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYSBnZW9kZXNpYyBwb2x5Z29uIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcclxuICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdlb2Rlc2ljID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2UgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWQgY29sb3JzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBwb2x5bGluZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGluZUNsaWNrOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lRHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lRHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5bGluZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGluZURyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VEb3duOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGluZU1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWxpbmUgbW91c2VvdXQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVNb3VzZU91dDogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWxpbmUgbW91c2VvdmVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VVcDogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgUG9seWxpbmUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGluZVJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIGFmdGVyIFBvbHlsaW5lJ3MgcGF0aCBjaGFuZ2VzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5UGF0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGF0aEV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKEFnbVBvbHlsaW5lUG9pbnQpIHBvaW50czogUXVlcnlMaXN0PEFnbVBvbHlsaW5lUG9pbnQ+O1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKEFnbVBvbHlsaW5lSWNvbikgaWNvblNlcXVlbmNlczogUXVlcnlMaXN0PEFnbVBvbHlsaW5lSWNvbj47XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW1xyXG4gICAgJ2RyYWdnYWJsZScsICdlZGl0YWJsZScsICd2aXNpYmxlJywgJ2dlb2Rlc2ljJywgJ3N0cm9rZUNvbG9yJywgJ3N0cm9rZU9wYWNpdHknLCAnc3Ryb2tlV2VpZ2h0JyxcclxuICAgICd6SW5kZXgnLFxyXG4gIF07XHJcblxyXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfcG9seWxpbmVBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvbHlsaW5lTWFuYWdlcjogUG9seWxpbmVNYW5hZ2VyKSB7IHRoaXMuX2lkID0gKHBvbHlsaW5lSWQrKykudG9TdHJpbmcoKTsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludDogQWdtUG9seWxpbmVQb2ludCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHMgPSBwb2ludC5wb3NpdGlvbkNoYW5nZWQuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoKSA9PiB7IHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyh0aGlzKTsgfSk7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwb2ludFN1YiA9IHRoaXMucG9pbnRzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyh0aGlzKSk7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gocG9pbnRTdWIpO1xyXG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKHRoaXMpO1xyXG5cclxuICAgIGNvbnN0IGljb25TdWIgPSB0aGlzLmljb25TZXF1ZW5jZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZUljb25TZXF1ZW5jZXModGhpcykpO1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKGljb25TdWIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcclxuICAgIGNvbnN0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXHJcbiAgICAgICAgayA9PiBBZ21Qb2x5bGluZS5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSk7XHJcbiAgICBvcHRpb25LZXlzLmZvckVhY2goayA9PiBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnNldFBvbHlsaW5lT3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldFBhdGgoKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmdldFBhdGgodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pbml0KCkge1xyXG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmFkZFBvbHlsaW5lKHRoaXMpO1xyXG4gICAgdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBoYW5kbGVycyA9IFtcclxuICAgICAge25hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZUNsaWNrLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZURibENsaWNrLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdkcmFnJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEcmFnLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEcmFnRW5kLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdkcmFnc3RhcnQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMubGluZURyYWdTdGFydC5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnbW91c2Vkb3duJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lTW91c2VEb3duLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVNb3VzZU1vdmUuZW1pdChldil9LFxyXG4gICAgICB7bmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lTW91c2VPdXQuZW1pdChldil9LFxyXG4gICAgICB7bmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlT3Zlci5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlVXAuZW1pdChldil9LFxyXG4gICAgICB7bmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVSaWdodENsaWNrLmVtaXQoZXYpfSxcclxuICAgIF07XHJcbiAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgY29uc3Qgb3MgPSB0aGlzLl9wb2x5bGluZU1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmNyZWF0ZVBhdGhFdmVudE9ic2VydmFibGUodGhpcykudGhlbigob2IkKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9zID0gb2IkLnN1YnNjcmliZShwYXRoRXZlbnQgPT4gdGhpcy5wb2x5UGF0aENoYW5nZS5lbWl0KHBhdGhFdmVudCkpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgX2dldFBvaW50cygpOiBBcnJheTxBZ21Qb2x5bGluZVBvaW50PiB7XHJcbiAgICBpZiAodGhpcy5wb2ludHMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLnRvQXJyYXkoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIF9nZXRJY29ucygpOiBBcnJheTxBZ21Qb2x5bGluZUljb24+IHtcclxuICAgIGlmICh0aGlzLmljb25TZXF1ZW5jZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaWNvblNlcXVlbmNlcy50b0FycmF5KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5kZWxldGVQb2x5bGluZSh0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXRoRXZlbnQge1xyXG4gIG5ld0FycjogTGF0TG5nW107XHJcbiAgZXZOYW1lOiAnaW5zZXJ0X2F0JyB8ICdyZW1vdmVfYXQnIHwgJ3NldF9hdCc7XHJcbiAgaW5kZXg6IG51bWJlcjtcclxuICBwcmV2aW91cz86IExhdExuZztcclxufVxyXG4iXX0=