import * as tslib_1 from "tslib";
import { ContentChildren, Directive, EventEmitter, forwardRef, Input, Output, QueryList } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FitBoundsAccessor } from '../services/fit-bounds';
import { MarkerManager } from '../services/managers/marker-manager';
import { AgmInfoWindow } from './info-window';
var markerId = 0;
/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
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
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarker = /** @class */ (function () {
    function AgmMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * If true, the marker can be clicked. Default value is true.
         */
        // tslint:disable-next-line:no-input-rename
        this.clickable = true;
        /**
         * This event is fired when the marker's animation property changes.
         *
         * @memberof AgmMarker
         */
        this.animationChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks twice on the marker.
         */
        this.markerDblClick = new EventEmitter();
        /**
         * This event is fired when the user rightclicks on the marker.
         */
        this.markerRightClick = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the marker.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the marker.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new EventEmitter();
        /** @internal */
        this.infoWindow = new QueryList();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._fitBoundsDetails$ = new ReplaySubject(1);
        this._id = (markerId++).toString();
    }
    AgmMarker_1 = AgmMarker;
    /* @internal */
    AgmMarker.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
    };
    AgmMarker.prototype.handleInfoWindowUpdate = function () {
        var _this = this;
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(function (marker) {
            marker.hostMarker = _this;
        });
    };
    /** @internal */
    AgmMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude === 'string') {
            this.latitude = Number(this.latitude);
        }
        if (typeof this.longitude === 'string') {
            this.longitude = Number(this.longitude);
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._updateFitBoundsDetails();
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
            this._updateFitBoundsDetails();
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
        if (changes['clickable']) {
            this._markerManager.updateClickable(this);
        }
        if (changes['animation']) {
            this._markerManager.updateAnimation(this);
        }
    };
    /** @internal */
    AgmMarker.prototype.getFitBoundsDetails$ = function () {
        return this._fitBoundsDetails$.asObservable();
    };
    AgmMarker.prototype._updateFitBoundsDetails = function () {
        this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
    };
    AgmMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow) {
                _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
            }
            _this.markerClick.emit(_this);
        });
        this._observableSubscriptions.push(cs);
        var dcs = this._markerManager.createEventObservable('dblclick', this).subscribe(function () {
            _this.markerDblClick.emit(null);
        });
        this._observableSubscriptions.push(dcs);
        var rc = this._markerManager.createEventObservable('rightclick', this).subscribe(function () {
            _this.markerRightClick.emit(null);
        });
        this._observableSubscriptions.push(rc);
        var ds = this._markerManager.createEventObservable('dragstart', this)
            .subscribe(function (e) {
            _this.dragStart.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        var d = this._markerManager.createEventObservable('drag', this)
            .subscribe(function (e) {
            _this.drag.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(d);
        var de = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(de);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function (e) {
            _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function (e) {
            _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
        var anChng = this._markerManager.createEventObservable('animation_changed', this)
            .subscribe(function () {
            _this.animationChange.emit(_this.animation);
        });
        this._observableSubscriptions.push(anChng);
    };
    /** @internal */
    AgmMarker.prototype.id = function () { return this._id; };
    /** @internal */
    AgmMarker.prototype.toString = function () { return 'AgmMarker-' + this._id.toString(); };
    /** @internal */
    AgmMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmMarker_1;
    AgmMarker.ctorParameters = function () { return [
        { type: MarkerManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "title", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "label", void 0);
    tslib_1.__decorate([
        Input('markerDraggable')
    ], AgmMarker.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "iconUrl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "openInfoWindow", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "opacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Input('markerClickable')
    ], AgmMarker.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMarker.prototype, "animation", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "animationChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "markerClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "markerDblClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "markerRightClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "dragStart", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "drag", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "dragEnd", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMarker.prototype, "mouseOut", void 0);
    tslib_1.__decorate([
        ContentChildren(AgmInfoWindow)
    ], AgmMarker.prototype, "infoWindow", void 0);
    AgmMarker = AgmMarker_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-marker',
            providers: [
                { provide: FitBoundsAccessor, useExisting: forwardRef(function () { return AgmMarker_1; }) },
            ],
            inputs: [
                'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation',
            ],
            outputs: ['markerClick', 'dragStart', 'drag', 'dragEnd', 'mouseOver', 'mouseOut'],
        })
    ], AgmMarker);
    return AgmMarker;
}());
export { AgmMarker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDckssT0FBTyxFQUFjLGFBQWEsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQVlIO0lBMkhFLG1CQUFvQixjQUE2QjtRQUE3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQXRHakQ7O1dBRUc7UUFDSCwyQ0FBMkM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQU81Qzs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFeEI7O1dBRUc7UUFDTSxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUUvQjs7V0FFRztRQUNNLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFckI7Ozs7O1dBS0c7UUFDTSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRXBCOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFRM0M7Ozs7V0FJRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUUxRDs7V0FFRztRQUNPLGdCQUFXLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7UUFFL0U7O1dBRUc7UUFDTyxtQkFBYyxHQUE0QixJQUFJLFlB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RSxHQUNOLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLFdBQVcsRUFBRSxJQUFJLENBQUM7YUFDOUUsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7WUFDaEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFnQixDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZDLElBQU0sQ0FBQyxHQUNMLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDekUsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7WUFDaEMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFnQixDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRDLElBQU0sRUFBRSxHQUNOLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLFNBQVMsRUFBRSxJQUFJLENBQUM7YUFDNUUsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7WUFDaEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUs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RTtRQUFULE1BQU0sRUFBRTtxREFBeUU7SUFLeEU7UUFBVCxNQUFNLEVBQUU7dURBQWlFO0lBS2hFO1FBQVQsTUFBTSxFQUFFO2dEQUFzRTtJQUtyRTtRQUFULE1BQU0sRUFBRTsyQ0FBaUU7SUFLaEU7UUFBVCxNQUFNLEVBQUU7OENBQW9FO0lBS25FO1FBQVQsTUFBTSxFQUFFO2dEQUFzRTtJQUtyRTtRQUFULE1BQU0sRUFBRTsrQ0FBcUU7SUFHOUM7UUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQztpREFBdUU7SUFuSDNGLFNBQVM7UUFYckIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFdBQVMsRUFBVCxDQUFTLENBQUMsRUFBRTthQUN6RTtZQUNELE1BQU0sRUFBRTtnQkFDTixVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsU0FBUztnQkFDbEYsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVzthQUM5RDtZQUNELE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO1NBQ2xGLENBQUM7T0FDVyxTQUFTLENBa1JyQjtJQUFELGdCQUFDO0NBQUEsQUFsUkQsSUFrUkM7U0FsUlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL21hcC10eXBlcyc7XHJcbmltcG9ydCB7IEZpdEJvdW5kc0FjY2Vzc29yLCBGaXRCb3VuZHNEZXRhaWxzIH0gZnJvbSAnLi4vc2VydmljZXMvZml0LWJvdW5kcyc7XHJcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgTWFya2VyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyJztcclxuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4vaW5mby13aW5kb3cnO1xyXG5cclxubGV0IG1hcmtlcklkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBBZ21NYXJrZXIgcmVuZGVycyBhIG1hcCBtYXJrZXIgaW5zaWRlIGEge0BsaW5rIEFnbU1hcH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcclxuICogICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgICB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cclxuICogICAgICA8L2FnbS1tYXJrZXI+XHJcbiAqICAgIDwvYWdtLW1hcD5cclxuICogIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2FnbS1tYXJrZXInLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBGaXRCb3VuZHNBY2Nlc3NvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWdtTWFya2VyKSB9LFxyXG4gIF0sXHJcbiAgaW5wdXRzOiBbXHJcbiAgICAnbGF0aXR1ZGUnLCAnbG9uZ2l0dWRlJywgJ3RpdGxlJywgJ2xhYmVsJywgJ2RyYWdnYWJsZTogbWFya2VyRHJhZ2dhYmxlJywgJ2ljb25VcmwnLFxyXG4gICAgJ29wZW5JbmZvV2luZG93JywgJ29wYWNpdHknLCAndmlzaWJsZScsICd6SW5kZXgnLCAnYW5pbWF0aW9uJyxcclxuICBdLFxyXG4gIG91dHB1dHM6IFsnbWFya2VyQ2xpY2snLCAnZHJhZ1N0YXJ0JywgJ2RyYWcnLCAnZHJhZ0VuZCcsICdtb3VzZU92ZXInLCAnbW91c2VPdXQnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbU1hcmtlciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBGaXRCb3VuZHNBY2Nlc3NvciB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF0aXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGl0bGUgb2YgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbGFiZWwgKGEgc2luZ2xlIHVwcGVyY2FzZSBjaGFyYWN0ZXIpIGZvciB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBtYXBUeXBlcy5NYXJrZXJMYWJlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgZHJhZ2dlZC4gRGVmYXVsdCB2YWx1ZSBpcyBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdtYXJrZXJEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWNvbiAodGhlIFVSTCBvZiB0aGUgaW1hZ2UpIGZvciB0aGUgZm9yZWdyb3VuZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpY29uVXJsOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRydWUsIHRoZSBtYXJrZXIgaXMgdmlzaWJsZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgb3BlbiB0aGUgY2hpbGQgaW5mbyB3aW5kb3cgd2hlbiB0aGUgbWFya2VyIGlzIGNsaWNrZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3BlbkluZm9XaW5kb3cgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFya2VyJ3Mgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wYWNpdHkgPSAxO1xyXG5cclxuICAvKipcclxuICAgKiBBbGwgbWFya2VycyBhcmUgZGlzcGxheWVkIG9uIHRoZSBtYXAgaW4gb3JkZXIgb2YgdGhlaXIgekluZGV4LCB3aXRoIGhpZ2hlciB2YWx1ZXMgZGlzcGxheWluZyBpblxyXG4gICAqIGZyb250IG9mIG1hcmtlcnMgd2l0aCBsb3dlciB2YWx1ZXMuIEJ5IGRlZmF1bHQsIG1hcmtlcnMgYXJlIGRpc3BsYXllZCBhY2NvcmRpbmcgdG8gdGhlaXJcclxuICAgKiB2ZXJ0aWNhbCBwb3NpdGlvbiBvbiBzY3JlZW4sIHdpdGggbG93ZXIgbWFya2VycyBhcHBlYXJpbmcgaW4gZnJvbnQgb2YgbWFya2VycyBmdXJ0aGVyIHVwIHRoZVxyXG4gICAqIHNjcmVlbi5cclxuICAgKi9cclxuICBASW5wdXQoKSB6SW5kZXggPSAxO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGNhbiBiZSBjbGlja2VkLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgnbWFya2VyQ2xpY2thYmxlJykgY2xpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hpY2ggYW5pbWF0aW9uIHRvIHBsYXkgd2hlbiBtYXJrZXIgaXMgYWRkZWQgdG8gYSBtYXAuXHJcbiAgICogVGhpcyBjYW4gYmUgJ0JPVU5DRScgb3IgJ0RST1AnXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0aW9uOiBBbmltYXRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFya2VyJ3MgYW5pbWF0aW9uIHByb3BlcnR5IGNoYW5nZXMuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQWdtTWFya2VyXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGFuaW1hdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcmtlckNsaWNrOiBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHR3aWNlIG9uIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcmtlckRibENsaWNrOiBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgcmlnaHRjbGlja3Mgb24gdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFya2VyUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgbW91c2VzIG92ZXIgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb3VzZXMgb3V0c2lkZSB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgQENvbnRlbnRDaGlsZHJlbihBZ21JbmZvV2luZG93KSBpbmZvV2luZG93OiBRdWVyeUxpc3Q8QWdtSW5mb1dpbmRvdz4gPSBuZXcgUXVlcnlMaXN0PEFnbUluZm9XaW5kb3c+KCk7XHJcblxyXG4gIHByaXZhdGUgX21hcmtlckFkZGVkVG9NYW5nZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29ic2VydmFibGVTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpdEJvdW5kc0RldGFpbHMkOiBSZXBsYXlTdWJqZWN0PEZpdEJvdW5kc0RldGFpbHM+ID0gbmV3IFJlcGxheVN1YmplY3Q8Rml0Qm91bmRzRGV0YWlscz4oMSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcmtlck1hbmFnZXI6IE1hcmtlck1hbmFnZXIpIHsgdGhpcy5faWQgPSAobWFya2VySWQrKykudG9TdHJpbmcoKTsgfVxyXG5cclxuICAvKiBAaW50ZXJuYWwgKi9cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKTtcclxuICAgIHRoaXMuaW5mb1dpbmRvdy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pbmZvV2luZG93Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBubyBtb3JlIHRoYW4gb25lIGluZm8gd2luZG93LicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmZvV2luZG93LmZvckVhY2gobWFya2VyID0+IHtcclxuICAgICAgbWFya2VyLmhvc3RNYXJrZXIgPSB0aGlzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0aGlzLmxhdGl0dWRlID0gTnVtYmVyKHRoaXMubGF0aXR1ZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvbmdpdHVkZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhpcy5sb25naXR1ZGUgPSBOdW1iZXIodGhpcy5sb25naXR1ZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcikge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmFkZE1hcmtlcih0aGlzKTtcclxuICAgICAgdGhpcy5fdXBkYXRlRml0Qm91bmRzRGV0YWlscygpO1xyXG4gICAgICB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVNYXJrZXJQb3NpdGlvbih0aGlzKTtcclxuICAgICAgdGhpcy5fdXBkYXRlRml0Qm91bmRzRGV0YWlscygpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ3RpdGxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVUaXRsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydsYWJlbCddKSB7XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlTGFiZWwodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVEcmFnZ2FibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snaWNvblVybCddKSB7XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlSWNvbih0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydvcGFjaXR5J10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVPcGFjaXR5KHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVZpc2libGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVaSW5kZXgodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snY2xpY2thYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVDbGlja2FibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snYW5pbWF0aW9uJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVBbmltYXRpb24odGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgZ2V0Rml0Qm91bmRzRGV0YWlscyQoKTogT2JzZXJ2YWJsZTxGaXRCb3VuZHNEZXRhaWxzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZml0Qm91bmRzRGV0YWlscyQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3VwZGF0ZUZpdEJvdW5kc0RldGFpbHMoKSB7XHJcbiAgICB0aGlzLl9maXRCb3VuZHNEZXRhaWxzJC5uZXh0KHsgbGF0TG5nOiB7IGxhdDogdGhpcy5sYXRpdHVkZSwgbG5nOiB0aGlzLmxvbmdpdHVkZSB9IH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBjcyA9IHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm9wZW5JbmZvV2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5pbmZvV2luZG93LmZvckVhY2goaW5mb1dpbmRvdyA9PiBpbmZvV2luZG93Lm9wZW4oKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tYXJrZXJDbGljay5lbWl0KHRoaXMpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGNzKTtcclxuXHJcbiAgICBjb25zdCBkY3MgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnZGJsY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcmtlckRibENsaWNrLmVtaXQobnVsbCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goZGNzKTtcclxuXHJcbiAgICBjb25zdCByYyA9IHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdyaWdodGNsaWNrJywgdGhpcykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXJrZXJSaWdodENsaWNrLmVtaXQobnVsbCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocmMpO1xyXG5cclxuICAgIGNvbnN0IGRzID1cclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8bWFwVHlwZXMuTW91c2VFdmVudD4oJ2RyYWdzdGFydCcsIHRoaXMpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZTogbWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kcmFnU3RhcnQuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSBhcyBNb3VzZUV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goZHMpO1xyXG5cclxuICAgIGNvbnN0IGQgPVxyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxtYXBUeXBlcy5Nb3VzZUV2ZW50PignZHJhZycsIHRoaXMpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZTogbWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kcmFnLmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0gYXMgTW91c2VFdmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGQpO1xyXG5cclxuICAgIGNvbnN0IGRlID1cclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8bWFwVHlwZXMuTW91c2VFdmVudD4oJ2RyYWdlbmQnLCB0aGlzKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IG1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgIHRoaXMuZHJhZ0VuZC5lbWl0KHsgY29vcmRzOiB7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSB9IGFzIE1vdXNlRXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChkZSk7XHJcblxyXG4gICAgY29uc3QgbW92ZXIgPVxyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxtYXBUeXBlcy5Nb3VzZUV2ZW50PignbW91c2VvdmVyJywgdGhpcylcclxuICAgICAgICAuc3Vic2NyaWJlKChlOiBtYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm1vdXNlT3Zlci5lbWl0KHsgY29vcmRzOiB7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSB9IGFzIE1vdXNlRXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3Zlcik7XHJcblxyXG4gICAgY29uc3QgbW91dCA9XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPG1hcFR5cGVzLk1vdXNlRXZlbnQ+KCdtb3VzZW91dCcsIHRoaXMpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZTogbWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5tb3VzZU91dC5lbWl0KHsgY29vcmRzOiB7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSB9IGFzIE1vdXNlRXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3V0KTtcclxuXHJcbiAgICBjb25zdCBhbkNobmcgPVxyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTx2b2lkPignYW5pbWF0aW9uX2NoYW5nZWQnLCB0aGlzKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmFuaW1hdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGFuQ2huZyk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ0FnbU1hcmtlci0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmRlbGV0ZU1hcmtlcih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEFuaW1hdGlvbiA9ICdCT1VOQ0UnIHwgJ0RST1AnIHwgbnVsbDtcclxuIl19