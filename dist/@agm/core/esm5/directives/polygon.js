import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolygonManager } from '../services/managers/polygon-manager';
/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var AgmPolygon = /** @class */ (function () {
    function AgmPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new EventEmitter();
        /**
         * This event is fired after Polygon first path changes.
         */
        this.polyPathsChange = new EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    AgmPolygon_1 = AgmPolygon;
    /** @internal */
    AgmPolygon.prototype.ngAfterContentInit = function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    AgmPolygon.prototype.ngOnChanges = function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    };
    AgmPolygon.prototype._init = function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolygon.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.polyClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.polyDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.polyDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.polyDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.polyDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.polyMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.polyMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.polyMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.polyMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.polyMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.polyRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
        this._polygonManager.createPathEventObservable(this)
            .then(function (paths$) {
            var os = paths$.subscribe(function (pathEvent) { return _this.polyPathsChange.emit(pathEvent); });
            _this._subscriptions.push(os);
        });
    };
    AgmPolygon.prototype._updatePolygonOptions = function (changes) {
        return Object.keys(changes)
            .filter(function (k) { return AgmPolygon_1._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    AgmPolygon.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolygon.prototype.ngOnDestroy = function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AgmPolygon.prototype.getPath = function () {
        return this._polygonManager.getPath(this);
    };
    AgmPolygon.prototype.getPaths = function () {
        return this._polygonManager.getPaths(this);
    };
    var AgmPolygon_1;
    AgmPolygon._polygonOptionsAttributes = [
        'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
        'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
        'editable', 'visible',
    ];
    AgmPolygon.ctorParameters = function () { return [
        { type: PolygonManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('polyDraggable')
    ], AgmPolygon.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "fillColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "fillOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "geodesic", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "paths", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolygon.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyDblClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyDrag", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyDragEnd", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyDragStart", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyMouseDown", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyMouseMove", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyMouseOut", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyMouseOver", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyMouseUp", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyRightClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmPolygon.prototype, "polyPathsChange", void 0);
    AgmPolygon = AgmPolygon_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-polygon',
        })
    ], AgmPolygon);
    return AgmPolygon;
}());
export { AgmPolygon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFvQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUk5SCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFHdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUlIO0lBb0pFLG9CQUFvQixlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFuSm5EOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7O1dBR0c7UUFDSCwyQ0FBMkM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUxQzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBYTFCOzs7Ozs7V0FNRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUI7Ozs7Ozs7Ozs7V0FVRztRQUNNLFVBQUssR0FBeUUsRUFBRSxDQUFDO1FBNEIxRjs7V0FFRztRQUNPLGNBQVMsR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFdkY7O1dBRUc7UUFDTyxpQkFBWSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUUxRjs7V0FFRztRQUNPLGFBQVEsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUU5RTs7V0FFRztRQUNPLGdCQUFXLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFakY7O1dBRUc7UUFDTyxrQkFBYSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRW5GOztXQUVHO1FBQ08sa0JBQWEsR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFM0Y7O1dBRUc7UUFDTyxrQkFBYSxHQUFpQyxJQUFJLFlBQVks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aW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTGF0TG5nLCBMYXRMbmdMaXRlcmFsLCBQb2x5Z29uT3B0aW9ucywgUG9seU1vdXNlRXZlbnQgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XHJcbmltcG9ydCB7IFBvbHlnb25NYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyJztcclxuaW1wb3J0IHsgTXZjRXZlbnRUeXBlIH0gZnJvbSAnLi4vdXRpbHMvbXZjYXJyYXktdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIEFnbVBvbHlnb24gcmVuZGVycyBhIHBvbHlnb24gb24gYSB7QGxpbmsgQWdtTWFwfVxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgIGFnbS1tYXAge1xyXG4gKiAgICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgIH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPGFnbS1wb2x5Z29uIFtwYXRoc109XCJwYXRoc1wiPlxyXG4gKiAgICAgIDwvYWdtLXBvbHlnb24+XHJcbiAqICAgIDwvYWdtLW1hcD5cclxuICogIGBcclxuICogfSlcclxuICogZXhwb3J0IGNsYXNzIE15TWFwQ21wIHtcclxuICogICBsYXQ6IG51bWJlciA9IDA7XHJcbiAqICAgbG5nOiBudW1iZXIgPSAwO1xyXG4gKiAgIHpvb206IG51bWJlciA9IDEwO1xyXG4gKiAgIHBhdGhzOiBBcnJheTxMYXRMbmdMaXRlcmFsPiA9IFtcclxuICogICAgIHsgbGF0OiAwLCAgbG5nOiAxMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDIwIH0sXHJcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMjAgfSxcclxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAxMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH1cclxuICogICBdXHJcbiAqICAgLy8gTmVzdGluZyBwYXRocyB3aWxsIGNyZWF0ZSBhIGhvbGUgd2hlcmUgdGhleSBvdmVybGFwO1xyXG4gKiAgIG5lc3RlZFBhdGhzOiBBcnJheTxBcnJheTxMYXRMbmdMaXRlcmFsPj4gPSBbW1xyXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH0sXHJcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMjAgfSxcclxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAyMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDEwIH0sXHJcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfVxyXG4gKiAgIF0sIFtcclxuICogICAgIHsgbGF0OiAwLCBsbmc6IDE1IH0sXHJcbiAqICAgICB7IGxhdDogMCwgbG5nOiAyMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDUsIGxuZzogMjAgfSxcclxuICogICAgIHsgbGF0OiA1LCBsbmc6IDE1IH0sXHJcbiAqICAgICB7IGxhdDogMCwgbG5nOiAxNSB9XHJcbiAqICAgXV1cclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLXBvbHlnb24nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtUG9seWdvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFBvbHlnb24gaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgc2hhcGUgb3ZlciB0aGUgbWFwLiBUaGUgZ2VvZGVzaWNcclxuICAgKiBwcm9wZXJ0eSBkZWZpbmVzIHRoZSBtb2RlIG9mIGRyYWdnaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdwb2x5RHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHNoYXBlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sXHJcbiAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmlsbCBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZFxyXG4gICAqIG5hbWVkIGNvbG9ycy5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWxsQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpbGwgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbE9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cnVlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmUgaW50ZXJwcmV0ZWQgYXMgZ2VvZGVzaWMgYW5kIHdpbGxcclxuICAgKiBmb2xsb3cgdGhlIGN1cnZhdHVyZSBvZiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZVxyXG4gICAqIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS4gTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhXHJcbiAgICogZ2VvZGVzaWMgcG9seWdvbiBtYXkgYXBwZWFyIHRvIGNoYW5nZSB3aGVuIGRyYWdnZWQsIGFzIHRoZSBkaW1lbnNpb25zXHJcbiAgICogYXJlIG1haW50YWluZWQgcmVsYXRpdmUgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVhcnRoLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBnZW9kZXNpYyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb3JkZXJlZCBzZXF1ZW5jZSBvZiBjb29yZGluYXRlcyB0aGF0IGRlc2lnbmF0ZXMgYSBjbG9zZWQgbG9vcC5cclxuICAgKiBVbmxpa2UgcG9seWxpbmVzLCBhIHBvbHlnb24gbWF5IGNvbnNpc3Qgb2Ygb25lIG9yIG1vcmUgcGF0aHMuXHJcbiAgICogIEFzIGEgcmVzdWx0LCB0aGUgcGF0aHMgcHJvcGVydHkgbWF5IHNwZWNpZnkgb25lIG9yIG1vcmUgYXJyYXlzIG9mXHJcbiAgICogTGF0TG5nIGNvb3JkaW5hdGVzLiBQYXRocyBhcmUgY2xvc2VkIGF1dG9tYXRpY2FsbHk7IGRvIG5vdCByZXBlYXQgdGhlXHJcbiAgICogZmlyc3QgdmVydGV4IG9mIHRoZSBwYXRoIGFzIHRoZSBsYXN0IHZlcnRleC4gU2ltcGxlIHBvbHlnb25zIG1heSBiZVxyXG4gICAqIGRlZmluZWQgdXNpbmcgYSBzaW5nbGUgYXJyYXkgb2YgTGF0TG5ncy4gTW9yZSBjb21wbGV4IHBvbHlnb25zIG1heVxyXG4gICAqIHNwZWNpZnkgYW4gYXJyYXkgb2YgYXJyYXlzLiBBbnkgc2ltcGxlIGFycmF5cyBhcmUgY29udmVydGVkIGludG8gQXJyYXlzLlxyXG4gICAqIEluc2VydGluZyBvciByZW1vdmluZyBMYXRMbmdzIGZyb20gdGhlIEFycmF5IHdpbGwgYXV0b21hdGljYWxseSB1cGRhdGVcclxuICAgKiB0aGUgcG9seWdvbiBvbiB0aGUgbWFwLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhdGhzOiBBcnJheTxMYXRMbmcgfCBMYXRMbmdMaXRlcmFsPiB8IEFycmF5PEFycmF5PExhdExuZyB8IExhdExuZ0xpdGVyYWw+PiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkXHJcbiAgICogbmFtZWQgY29sb3JzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VXZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHBvbHlnb24gaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5Q2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seURibENsaWNrOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5Z29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5RHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlEcmFnRW5kOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VEb3duOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3V0LlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdmVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlNb3VzZVVwOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBQb2x5Z29uIGlzIHJpZ2h0LWNsaWNrZWQgb24uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBhZnRlciBQb2x5Z29uIGZpcnN0IHBhdGggY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seVBhdGhzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5Z29uUGF0aEV2ZW50PGFueT4+KCk7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXM6IEFycmF5PHN0cmluZz4gPSBbXHJcbiAgICAnY2xpY2thYmxlJywgJ2RyYWdnYWJsZScsICdlZGl0YWJsZScsICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnZ2VvZGVzaWMnLCAnaWNvbicsICdtYXAnLFxyXG4gICAgJ3BhdGhzJywgJ3N0cm9rZUNvbG9yJywgJ3N0cm9rZU9wYWNpdHknLCAnc3Ryb2tlV2VpZ2h0JywgJ3Zpc2libGUnLCAnekluZGV4JywgJ2RyYWdnYWJsZScsXHJcbiAgICAnZWRpdGFibGUnLCAndmlzaWJsZScsXHJcbiAgXTtcclxuXHJcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcclxuICBwcml2YXRlIF9wb2x5Z29uQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5Z29uTWFuYWdlcjogUG9seWdvbk1hbmFnZXIpIHsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5zZXRQb2x5Z29uT3B0aW9ucyh0aGlzLCB0aGlzLl91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pbml0KCkge1xyXG4gICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuYWRkUG9seWdvbih0aGlzKTtcclxuICAgIHRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBoYW5kbGVycyA9IFtcclxuICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlDbGljay5lbWl0KGV2KSB9LFxyXG4gICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seURibENsaWNrLmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMucG9seURyYWcuZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5wb2x5RHJhZ0VuZC5lbWl0KGV2KSB9LFxyXG4gICAgICB7IG5hbWU6ICdkcmFnc3RhcnQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMucG9seURyYWdTdGFydC5lbWl0KGV2KSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZURvd24uZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5TW91c2VNb3ZlLmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5TW91c2VPdXQuZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5TW91c2VPdmVyLmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZVVwLmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlSaWdodENsaWNrLmVtaXQoZXYpIH0sXHJcbiAgICBdO1xyXG4gICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fcG9seWdvbk1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuY3JlYXRlUGF0aEV2ZW50T2JzZXJ2YWJsZSh0aGlzKVxyXG4gICAgLnRoZW4ocGF0aHMkID0+IHtcclxuICAgICAgY29uc3Qgb3MgPSBwYXRocyQuc3Vic2NyaWJlKHBhdGhFdmVudCA9PiB0aGlzLnBvbHlQYXRoc0NoYW5nZS5lbWl0KHBhdGhFdmVudCkpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUG9seWdvbk9wdGlvbnMge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNoYW5nZXMpXHJcbiAgICAgIC5maWx0ZXIoayA9PiBBZ21Qb2x5Z29uLl9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgIC5yZWR1Y2UoKG9iajogYW55LCBrOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBvYmpba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmRlbGV0ZVBvbHlnb24odGhpcyk7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIGdldFBhdGgoKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbk1hbmFnZXIuZ2V0UGF0aCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldFBhdGhzKCk6IFByb21pc2U8QXJyYXk8QXJyYXk8TGF0TG5nPj4+IHtcclxuICAgIHJldHVybiB0aGlzLl9wb2x5Z29uTWFuYWdlci5nZXRQYXRocyh0aGlzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9seWdvblBhdGhFdmVudDxUIGV4dGVuZHMgKExhdExuZyB8IEFycmF5PExhdExuZz4pPiB7XHJcbiAgbmV3QXJyOiBMYXRMbmdbXVtdO1xyXG4gIGV2ZW50TmFtZTogTXZjRXZlbnRUeXBlO1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbiAgcHJldmlvdXM/OiBUO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhdGhDb2xsZWN0aW9uQ2hhbmdlUG9seWdvblBhdGhFdmVudCBleHRlbmRzIFBvbHlnb25QYXRoRXZlbnQgPEFycmF5PExhdExuZz4+e1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhdGhDaGFuZ2VQb2x5Z29uUGF0aEV2ZW50IGV4dGVuZHMgUG9seWdvblBhdGhFdmVudDxMYXRMbmc+IHtcclxuICBwYXRoSW5kZXg6IG51bWJlcjtcclxufVxyXG4iXX0=