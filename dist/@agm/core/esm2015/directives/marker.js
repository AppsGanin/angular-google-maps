import * as tslib_1 from "tslib";
var AgmMarker_1;
import { ContentChildren, Directive, EventEmitter, forwardRef, Input, Output, QueryList } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FitBoundsAccessor } from '../services/fit-bounds';
import { MarkerManager } from '../services/managers/marker-manager';
import { AgmInfoWindow } from './info-window';
let markerId = 0;
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
let AgmMarker = AgmMarker_1 = class AgmMarker {
    constructor(_markerManager) {
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
    /* @internal */
    ngAfterContentInit() {
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(() => this.handleInfoWindowUpdate());
    }
    handleInfoWindowUpdate() {
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(marker => {
            marker.hostMarker = this;
        });
    }
    /** @internal */
    ngOnChanges(changes) {
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
    }
    /** @internal */
    getFitBoundsDetails$() {
        return this._fitBoundsDetails$.asObservable();
    }
    _updateFitBoundsDetails() {
        this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
    }
    _addEventListeners() {
        const cs = this._markerManager.createEventObservable('click', this).subscribe(() => {
            if (this.openInfoWindow) {
                this.infoWindow.forEach(infoWindow => infoWindow.open());
            }
            this.markerClick.emit(this);
        });
        this._observableSubscriptions.push(cs);
        const dcs = this._markerManager.createEventObservable('dblclick', this).subscribe(() => {
            this.markerDblClick.emit(null);
        });
        this._observableSubscriptions.push(dcs);
        const rc = this._markerManager.createEventObservable('rightclick', this).subscribe(() => {
            this.markerRightClick.emit(null);
        });
        this._observableSubscriptions.push(rc);
        const ds = this._markerManager.createEventObservable('dragstart', this)
            .subscribe((e) => {
            this.dragStart.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        const d = this._markerManager.createEventObservable('drag', this)
            .subscribe((e) => {
            this.drag.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(d);
        const de = this._markerManager.createEventObservable('dragend', this)
            .subscribe((e) => {
            this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(de);
        const mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe((e) => {
            this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        const mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe((e) => {
            this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
        const anChng = this._markerManager.createEventObservable('animation_changed', this)
            .subscribe(() => {
            this.animationChange.emit(this.animation);
        });
        this._observableSubscriptions.push(anChng);
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return 'AgmMarker-' + this._id.toString(); }
    /** @internal */
    ngOnDestroy() {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
};
AgmMarker.ctorParameters = () => [
    { type: MarkerManager }
];
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
            { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmMarker_1) },
        ],
        inputs: [
            'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
            'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation',
        ],
        outputs: ['markerClick', 'dragStart', 'drag', 'dragEnd', 'mouseOver', 'mouseOut'],
    })
], AgmMarker);
export { AgmMarker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3JLLE9BQU8sRUFBYyxhQUFhLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRS9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFZSCxJQUFhLFNBQVMsaUJBQXRCLE1BQWEsU0FBUztJQTJIcEIsWUFBb0IsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUF0R2pEOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFPNUM7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXhCOztXQUVHO1FBQ00sbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFL0I7O1dBRUc7UUFDTSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXJCOzs7OztXQUtHO1FBQ00sV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVwQjs7V0FFRztRQUNILDJDQUEyQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBUTNDOzs7O1dBSUc7UUFDTyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFFMUQ7O1dBRUc7UUFDTyxnQkFBVyxHQUE0QixJQUFJLFlBQVksRUFBYSxDQUFDO1FBRS9FOztX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QXNFO0FBS3JFO0lBQVQsTUFBTSxFQUFFO2lEQUF5RTtBQUt4RTtJQUFULE1BQU0sRUFBRTttREFBaUU7QUFLaEU7SUFBVCxNQUFNLEVBQUU7NENBQXNFO0FBS3JFO0lBQVQsTUFBTSxFQUFFO3VDQUFpRTtBQUtoRTtJQUFULE1BQU0sRUFBRTswQ0FBb0U7QUFLbkU7SUFBVCxNQUFNLEVBQUU7NENBQXNFO0FBS3JFO0lBQVQsTUFBTSxFQUFFOzJDQUFxRTtBQUc5QztJQUEvQixlQUFlLENBQUMsYUFBYSxDQUFDOzZDQUF1RTtBQW5IM0YsU0FBUztJQVhyQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtRQUN0QixTQUFTLEVBQUU7WUFDVCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVMsQ0FBQyxFQUFFO1NBQ3pFO1FBQ0QsTUFBTSxFQUFFO1lBQ04sVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFNBQVM7WUFDbEYsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVztTQUM5RDtRQUNELE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0tBQ2xGLENBQUM7R0FDVyxTQUFTLENBa1JyQjtTQWxSWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgRml0Qm91bmRzQWNjZXNzb3IsIEZpdEJvdW5kc0RldGFpbHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcclxuaW1wb3J0ICogYXMgbWFwVHlwZXMgZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9pbmZvLXdpbmRvdyc7XHJcblxyXG5sZXQgbWFya2VySWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEFnbU1hcmtlciByZW5kZXJzIGEgbWFwIG1hcmtlciBpbnNpZGUgYSB7QGxpbmsgQWdtTWFwfS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICAuYWdtLW1hcC1jb250YWluZXIge1xyXG4gKiAgICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgIH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPGFnbS1tYXJrZXIgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW2xhYmVsXT1cIidNJ1wiPlxyXG4gKiAgICAgIDwvYWdtLW1hcmtlcj5cclxuICogICAgPC9hZ20tbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLW1hcmtlcicsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IEZpdEJvdW5kc0FjY2Vzc29yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZ21NYXJrZXIpIH0sXHJcbiAgXSxcclxuICBpbnB1dHM6IFtcclxuICAgICdsYXRpdHVkZScsICdsb25naXR1ZGUnLCAndGl0bGUnLCAnbGFiZWwnLCAnZHJhZ2dhYmxlOiBtYXJrZXJEcmFnZ2FibGUnLCAnaWNvblVybCcsXHJcbiAgICAnb3BlbkluZm9XaW5kb3cnLCAnb3BhY2l0eScsICd2aXNpYmxlJywgJ3pJbmRleCcsICdhbmltYXRpb24nLFxyXG4gIF0sXHJcbiAgb3V0cHV0czogWydtYXJrZXJDbGljaycsICdkcmFnU3RhcnQnLCAnZHJhZycsICdkcmFnRW5kJywgJ21vdXNlT3ZlcicsICdtb3VzZU91dCddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtTWFya2VyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIEZpdEJvdW5kc0FjY2Vzc29yIHtcclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0aXRsZSBvZiB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsYWJlbCAoYSBzaW5nbGUgdXBwZXJjYXNlIGNoYXJhY3RlcikgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG1hcFR5cGVzLk1hcmtlckxhYmVsO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGNhbiBiZSBkcmFnZ2VkLiBEZWZhdWx0IHZhbHVlIGlzIGZhbHNlLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ21hcmtlckRyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJY29uICh0aGUgVVJMIG9mIHRoZSBpbWFnZSkgZm9yIHRoZSBmb3JlZ3JvdW5kLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGljb25Vcmw6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBpcyB2aXNpYmxlXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBvcGVuIHRoZSBjaGlsZCBpbmZvIHdpbmRvdyB3aGVuIHRoZSBtYXJrZXIgaXMgY2xpY2tlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBvcGVuSW5mb1dpbmRvdyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXJrZXIncyBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3BhY2l0eSA9IDE7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsbCBtYXJrZXJzIGFyZSBkaXNwbGF5ZWQgb24gdGhlIG1hcCBpbiBvcmRlciBvZiB0aGVpciB6SW5kZXgsIHdpdGggaGlnaGVyIHZhbHVlcyBkaXNwbGF5aW5nIGluXHJcbiAgICogZnJvbnQgb2YgbWFya2VycyB3aXRoIGxvd2VyIHZhbHVlcy4gQnkgZGVmYXVsdCwgbWFya2VycyBhcmUgZGlzcGxheWVkIGFjY29yZGluZyB0byB0aGVpclxyXG4gICAqIHZlcnRpY2FsIHBvc2l0aW9uIG9uIHNjcmVlbiwgd2l0aCBsb3dlciBtYXJrZXJzIGFwcGVhcmluZyBpbiBmcm9udCBvZiBtYXJrZXJzIGZ1cnRoZXIgdXAgdGhlXHJcbiAgICogc2NyZWVuLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHpJbmRleCA9IDE7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRydWUsIHRoZSBtYXJrZXIgY2FuIGJlIGNsaWNrZWQuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdtYXJrZXJDbGlja2FibGUnKSBjbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGljaCBhbmltYXRpb24gdG8gcGxheSB3aGVuIG1hcmtlciBpcyBhZGRlZCB0byBhIG1hcC5cclxuICAgKiBUaGlzIGNhbiBiZSAnQk9VTkNFJyBvciAnRFJPUCdcclxuICAgKi9cclxuICBASW5wdXQoKSBhbmltYXRpb246IEFuaW1hdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtYXJrZXIncyBhbmltYXRpb24gcHJvcGVydHkgY2hhbmdlcy5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBBZ21NYXJrZXJcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYW5pbWF0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb24+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFya2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxBZ21NYXJrZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxBZ21NYXJrZXI+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3MgdHdpY2Ugb24gdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFya2VyRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxBZ21NYXJrZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxBZ21NYXJrZXI+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciByaWdodGNsaWNrcyBvbiB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtYXJrZXJSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb3VzZXMgb3ZlciB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIG1vdXNlcyBvdXRzaWRlIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBAQ29udGVudENoaWxkcmVuKEFnbUluZm9XaW5kb3cpIGluZm9XaW5kb3c6IFF1ZXJ5TGlzdDxBZ21JbmZvV2luZG93PiA9IG5ldyBRdWVyeUxpc3Q8QWdtSW5mb1dpbmRvdz4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfbWFya2VyQWRkZWRUb01hbmdlciA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIHByb3RlY3RlZCByZWFkb25seSBfZml0Qm91bmRzRGV0YWlscyQ6IFJlcGxheVN1YmplY3Q8Rml0Qm91bmRzRGV0YWlscz4gPSBuZXcgUmVwbGF5U3ViamVjdDxGaXRCb3VuZHNEZXRhaWxzPigxKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFya2VyTWFuYWdlcjogTWFya2VyTWFuYWdlcikgeyB0aGlzLl9pZCA9IChtYXJrZXJJZCsrKS50b1N0cmluZygpOyB9XHJcblxyXG4gIC8qIEBpbnRlcm5hbCAqL1xyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIHRoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpO1xyXG4gICAgdGhpcy5pbmZvV2luZG93LmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmluZm9XaW5kb3cubGVuZ3RoID4gMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG5vIG1vcmUgdGhhbiBvbmUgaW5mbyB3aW5kb3cuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluZm9XaW5kb3cuZm9yRWFjaChtYXJrZXIgPT4ge1xyXG4gICAgICBtYXJrZXIuaG9zdE1hcmtlciA9IHRoaXM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMubGF0aXR1ZGUgPSBOdW1iZXIodGhpcy5sYXRpdHVkZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubG9uZ2l0dWRlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0aGlzLmxvbmdpdHVkZSA9IE51bWJlcih0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLmxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyKSB7XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuYWRkTWFya2VyKHRoaXMpO1xyXG4gICAgICB0aGlzLl91cGRhdGVGaXRCb3VuZHNEZXRhaWxzKCk7XHJcbiAgICAgIHRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZU1hcmtlclBvc2l0aW9uKHRoaXMpO1xyXG4gICAgICB0aGlzLl91cGRhdGVGaXRCb3VuZHNEZXRhaWxzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndGl0bGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVRpdGxlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2xhYmVsJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVMYWJlbCh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZURyYWdnYWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydpY29uVXJsJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVJY29uKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ29wYWNpdHknXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZU9wYWNpdHkodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVmlzaWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWyd6SW5kZXgnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVpJbmRleCh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydjbGlja2FibGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUNsaWNrYWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydhbmltYXRpb24nXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUFuaW1hdGlvbih0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBnZXRGaXRCb3VuZHNEZXRhaWxzJCgpOiBPYnNlcnZhYmxlPEZpdEJvdW5kc0RldGFpbHM+IHtcclxuICAgIHJldHVybiB0aGlzLl9maXRCb3VuZHNEZXRhaWxzJC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdXBkYXRlRml0Qm91bmRzRGV0YWlscygpIHtcclxuICAgIHRoaXMuX2ZpdEJvdW5kc0RldGFpbHMkLm5leHQoeyBsYXRMbmc6IHsgbGF0OiB0aGlzLmxhdGl0dWRlLCBsbmc6IHRoaXMubG9uZ2l0dWRlIH0gfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGNzID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ2NsaWNrJywgdGhpcykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMub3BlbkluZm9XaW5kb3cpIHtcclxuICAgICAgICB0aGlzLmluZm9XaW5kb3cuZm9yRWFjaChpbmZvV2luZG93ID0+IGluZm9XaW5kb3cub3BlbigpKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1hcmtlckNsaWNrLmVtaXQodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goY3MpO1xyXG5cclxuICAgIGNvbnN0IGRjcyA9IHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdkYmxjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMubWFya2VyRGJsQ2xpY2suZW1pdChudWxsKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChkY3MpO1xyXG5cclxuICAgIGNvbnN0IHJjID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ3JpZ2h0Y2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcmtlclJpZ2h0Q2xpY2suZW1pdChudWxsKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChyYyk7XHJcblxyXG4gICAgY29uc3QgZHMgPVxyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxtYXBUeXBlcy5Nb3VzZUV2ZW50PignZHJhZ3N0YXJ0JywgdGhpcylcclxuICAgICAgICAuc3Vic2NyaWJlKChlOiBtYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRyYWdTdGFydC5lbWl0KHsgY29vcmRzOiB7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSB9IGFzIE1vdXNlRXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChkcyk7XHJcblxyXG4gICAgY29uc3QgZCA9XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPG1hcFR5cGVzLk1vdXNlRXZlbnQ+KCdkcmFnJywgdGhpcylcclxuICAgICAgICAuc3Vic2NyaWJlKChlOiBtYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRyYWcuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSBhcyBNb3VzZUV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goZCk7XHJcblxyXG4gICAgY29uc3QgZGUgPVxyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxtYXBUeXBlcy5Nb3VzZUV2ZW50PignZHJhZ2VuZCcsIHRoaXMpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZTogbWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0gYXMgTW91c2VFdmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGRlKTtcclxuXHJcbiAgICBjb25zdCBtb3ZlciA9XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPG1hcFR5cGVzLk1vdXNlRXZlbnQ+KCdtb3VzZW92ZXInLCB0aGlzKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IG1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgIHRoaXMubW91c2VPdmVyLmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0gYXMgTW91c2VFdmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdmVyKTtcclxuXHJcbiAgICBjb25zdCBtb3V0ID1cclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8bWFwVHlwZXMuTW91c2VFdmVudD4oJ21vdXNlb3V0JywgdGhpcylcclxuICAgICAgICAuc3Vic2NyaWJlKChlOiBtYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm1vdXNlT3V0LmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0gYXMgTW91c2VFdmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdXQpO1xyXG5cclxuICAgIGNvbnN0IGFuQ2huZyA9XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPHZvaWQ+KCdhbmltYXRpb25fY2hhbmdlZCcsIHRoaXMpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbkNoYW5nZS5lbWl0KHRoaXMuYW5pbWF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goYW5DaG5nKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnQWdtTWFya2VyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX21hcmtlck1hbmFnZXIuZGVsZXRlTWFya2VyKHRoaXMpO1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uID0gJ0JPVU5DRScgfCAnRFJPUCcgfCBudWxsO1xyXG4iXX0=