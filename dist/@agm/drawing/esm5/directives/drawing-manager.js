import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, isDevMode, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { fromEventPattern } from 'rxjs';
var AgmDrawingManager = /** @class */ (function () {
    function AgmDrawingManager(_zone) {
        this._zone = _zone;
        /**
         * This event is fired when the user has finished drawing a circle.
         */
        this.circleComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a marker.
         */
        this.markerComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing an overlay of any
         * type.
         */
        this.overlayComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polygon.
         */
        this.polygonComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polyline.
         */
        this.polylineComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a rectangle.
         */
        this.rectangleComplete = new EventEmitter();
        this.eventSubscriptions = [];
    }
    AgmDrawingManager.prototype.setMap = function (map) {
        if (!google.maps.drawing && isDevMode()) {
            console.error('Cannot use drawing manager if drawing library is not ' +
                'loaded. To fix, add libraries: [\'drawing\'] to the ' +
                'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
            return;
        }
        if (map && !this.drawingManager) {
            this.drawingManager = new google.maps.drawing.DrawingManager({
                map: map,
                circleOptions: this.circleOptions,
                markerOptions: this.markerOptions,
                polygonOptions: this.polygonOptions,
                polylineOptions: this.polylineOptions,
                rectangeOptions: this.rectangeOptions,
                drawingControl: this.drawingControl,
                drawingControlOptions: this.drawingControlOptions,
                drawingMode: this.drawingMode,
            });
            this.initEvents(this.drawingManager);
        }
        else if (!map && this.drawingManager) {
            this.drawingManager.setMap(null);
        }
        // else do nothing
    };
    AgmDrawingManager.prototype.initEvents = function (drawingManager) {
        var _this = this;
        this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
            .subscribe(function (circle) { return _this._zone.run(function () { return _this.circleComplete.next(circle); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
            .subscribe(function (marker) { return _this._zone.run(function () { return _this.markerComplete.next(marker); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
            .subscribe(function (polygon) { return _this._zone.run(function () { return _this.polygonComplete.next(polygon); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
            .subscribe(function (polyline) { return _this._zone.run(function () { return _this.polylineComplete.next(polyline); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
            .subscribe(function (overlayevent) { return _this._zone.run(function () { return _this.overlayComplete.next(overlayevent); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
            .subscribe(function (rectangle) { return _this._zone.run(function () { return _this.rectangleComplete.next(rectangle); }); }));
    };
    AgmDrawingManager.prototype.createMvcObservable = function (eventName, mvcObject) {
        return fromEventPattern(function (handler) { return mvcObject.addListener(eventName, function (event) { return handler.apply(null, [event]); }); }, function (_handler, evListener) { return evListener.remove(); });
    };
    AgmDrawingManager.prototype.ngOnChanges = function (changes) {
        if (!this.drawingManager) {
            return;
        }
        var options = Object.entries(changes)
            .map(function (_a) {
            var _b = tslib_1.__read(_a, 2), prop = _b[0], change = _b[1];
            return [prop, change.currentValue];
        })
            .reduce(function (obj, _a) {
            var _b = tslib_1.__read(_a, 2), propName = _b[0], propValue = _b[1];
            obj[propName] = propValue;
            return obj;
        }, {});
        this.drawingManager.setOptions(options);
    };
    AgmDrawingManager.prototype.ngOnDestroy = function () {
        this.eventSubscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    AgmDrawingManager.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "drawingControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "drawingMode", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "drawingControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "circleOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "markerOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "polygonOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "polylineOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDrawingManager.prototype, "rectangeOptions", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmDrawingManager.prototype, "circleComplete", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmDrawingManager.prototype, "markerComplete", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmDrawingManager.prototype, "overlayComplete", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmDrawingManager.prototype, "polygonComplete", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmDrawingManager.prototype, "polylineComplete", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmDrawingManager.prototype, "rectangleComplete", void 0);
    AgmDrawingManager = tslib_1.__decorate([
        Directive({
            selector: 'agm-drawing-manager',
            exportAs: 'agmDrawingManager',
        })
    ], AgmDrawingManager);
    return AgmDrawingManager;
}());
export { AgmDrawingManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9kcmF3aW5nLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQTRCLE1BQU0sTUFBTSxDQUFDO0FBU2xFO0lBeUdFLDJCQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQW5DakM7O1dBRUc7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFdEQ7O1dBRUc7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFdEQ7OztXQUdHO1FBQ08sb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztRQUVyRTs7V0FFRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUV4RDs7V0FFRztRQUNPLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFFMUQ7O1dBRUc7UUFDTyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBRXBELHVCQUFrQixHQUFtQixFQUFFLENBQUM7SUFLaEQsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLHVEQUF1RDtnQkFDbkUsc0RBQXNEO2dCQUN0RCw2REFBNkQsQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDUjtRQUNELElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNB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LEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDMUIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQztJQUM5RSxDQUFDOztnQkFoRjBCLE1BQU07O0lBbEd4QjtRQUFSLEtBQUssRUFBRTs2REFBeUI7SUFPeEI7UUFBUixLQUFLLEVBQUU7MERBQWlDO0lBT2hDO1FBQVIsS0FBSyxFQUFFO29FQUE4QztJQVM3QztRQUFSLEtBQUssRUFBRTs0REFBOEI7SUFTN0I7UUFBUixLQUFLLEVBQUU7NERBQThCO0lBUzdCO1FBQVIsS0FBSyxFQUFFOzZEQUFnQztJQVUvQjtRQUFSLEtBQUssRUFBRTs4REFBa0M7SUFVakM7UUFBUixLQUFLLEVBQUU7OERBQW1DO0lBS2pDO1FBQVQsTUFBTSxFQUFFOzZEQUE2QztJQUs1QztRQUFULE1BQU0sRUFBRTs2REFBNkM7SUFNNUM7UUFBVCxNQUFNLEVBQUU7OERBQTREO0lBSzNEO1FBQVQsTUFBTSxFQUFFOzhEQUErQztJQUs5QztRQUFULE1BQU0sRUFBRTsrREFBaUQ7SUFLaEQ7UUFBVCxNQUFNLEVBQUU7Z0VBQW1EO0lBbkdqRCxpQkFBaUI7UUFKN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsbUJBQW1CO1NBQzlCLENBQUM7T0FDVyxpQkFBaUIsQ0EyTDdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNMRCxJQTJMQztTQTNMWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaXJjbGUsIENpcmNsZU9wdGlvbnMsIEdvb2dsZU1hcCwgTWFwc0V2ZW50TGlzdGVuZXIsIE1hcmtlciwgTWFya2VyT3B0aW9ucywgTVZDT2JqZWN0LCBQb2x5Z29uLCBQb2x5Z29uT3B0aW9ucywgUG9seWxpbmUsIFBvbHlsaW5lT3B0aW9ucywgUmVjdGFuZ2xlLCBSZWN0YW5nbGVPcHRpb25zIH0gZnJvbSAnQGFnbS9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBpc0Rldk1vZGUsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnRQYXR0ZXJuLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRHJhd2luZ0NvbnRyb2xPcHRpb25zLCBPdmVybGF5Q29tcGxldGVFdmVudCwgT3ZlcmxheVR5cGUgfSBmcm9tICcuLi9nb29nbGUtZHJhd2luZy10eXBlcyc7XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLWRyYXdpbmctbWFuYWdlcicsXHJcbiAgZXhwb3J0QXM6ICdhZ21EcmF3aW5nTWFuYWdlcicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21EcmF3aW5nTWFuYWdlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95e1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgZHJhd2luZyBjb250cm9sLiBEZWZhdWx0cyB0byBgdHJ1ZWAuXHJcbiAgICpcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3aW5nQ29udHJvbDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIERyYXdpbmdNYW5hZ2VyJ3MgZHJhd2luZyBtb2RlLCB3aGljaCBkZWZpbmVzIHRoZSB0eXBlIG9mIG92ZXJsYXkgdG8gYmVcclxuICAgKiBhZGRlZCBvbiB0aGUgbWFwLiBBIGRyYXdpbmcgbW9kZSBvZiBudWxsIG1lYW5zIHRoYXQgdGhlIHVzZXIgY2FuIGludGVyYWN0XHJcbiAgICogd2l0aCB0aGUgbWFwIGFzIG5vcm1hbCwgYW5kIGNsaWNrcyBkbyBub3QgZHJhdyBhbnl0aGluZy5cclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3aW5nTW9kZTogT3ZlcmxheVR5cGUgfCBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlzcGxheSBvcHRpb25zIGZvciB0aGUgZHJhd2luZyBjb250cm9sLlxyXG4gICAqXHJcbiAgICogQHR5cGUge0RyYXdpbmdDb250cm9sT3B0aW9uc31cclxuICAgKi9cclxuICBASW5wdXQoKSBkcmF3aW5nQ29udHJvbE9wdGlvbnM6IERyYXdpbmdDb250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IGNpcmNsZXMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXHJcbiAgICogVGhlIGBjZW50ZXJgIGFuZCBgcmFkaXVzYCBwcm9wZXJ0aWVzIGFyZSBpZ25vcmVkLCBhbmQgdGhlIGBtYXBgIHByb3BlcnR5IG9mIGFcclxuICAgKiBuZXcgY2lyY2xlIGlzIGFsd2F5cyBzZXQgdG8gdGhlIERyYXdpbmdNYW5hZ2VyJ3MgbWFwLlxyXG4gICAqXHJcbiAgICogQHR5cGUge0NpcmNsZU9wdGlvbnN9XHJcbiAgICovXHJcbiAgQElucHV0KCkgY2lyY2xlT3B0aW9uczogQ2lyY2xlT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IG1hcmtlcnMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXHJcbiAgICogVGhlIGBwb3NpdGlvbmAgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBgbWFwYCBwcm9wZXJ0eSBvZiBhIG5ldyBtYXJrZXJcclxuICAgKiBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtNYXJrZXJPcHRpb25zfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcmtlck9wdGlvbnM6IE1hcmtlck9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBwb2x5Z29ucyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cclxuICAgKiBUaGUgYHBhdGhzYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIG1hcCBwcm9wZXJ0eSBvZiBhIG5ldyBwb2x5Z29uIGlzXHJcbiAgICogYWx3YXlzIHNldCB0byB0aGUgRHJhd2luZ01hbmFnZXIncyBtYXAuXHJcbiAgICpcclxuICAgKiBAdHlwZSB7UG9seWdvbk9wdGlvbnN9XHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9seWdvbk9wdGlvbnM6IFBvbHlnb25PcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgcG9seWxpbmVzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxyXG4gICAqIFRoZSBgcGF0aGAgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBtYXAgcHJvcGVydHkgb2YgYSBuZXcgcG9seWxpbmUgaXNcclxuICAgKiBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtQb2x5bGluZU9wdGlvbnN9XHJcbiAgICogQG1lbWJlcm9mIEFnbURyYXdpbmdNYW5hZ2VyXHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9seWxpbmVPcHRpb25zOiBQb2x5bGluZU9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyByZWN0YW5nbGVzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxyXG4gICAqIFRoZSBgYm91bmRzYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIG1hcCBwcm9wZXJ0eSBvZiBhIG5ldyByZWN0YW5nbGVcclxuICAgKiBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtSZWN0YW5nbGVPcHRpb25zfVxyXG4gICAqIEBtZW1iZXJvZiBBZ21EcmF3aW5nTWFuYWdlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlY3RhbmdlT3B0aW9uczogUmVjdGFuZ2xlT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgY2lyY2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaXJjbGVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2lyY2xlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcmtlckNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhbiBvdmVybGF5IG9mIGFueVxyXG4gICAqIHR5cGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG92ZXJsYXlDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8T3ZlcmxheUNvbXBsZXRlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIHBvbHlnb24uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlnb25Db21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seWdvbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgcG9seWxpbmUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlsaW5lQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlsaW5lPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlY3RhbmdsZUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxSZWN0YW5nbGU+KCk7XHJcblxyXG4gIHByaXZhdGUgZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGRyYXdpbmdNYW5hZ2VyOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gIH1cclxuXHJcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKSB7XHJcbiAgICBpZiAoIWdvb2dsZS5tYXBzLmRyYXdpbmcgJiYgaXNEZXZNb2RlKCkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IHVzZSBkcmF3aW5nIG1hbmFnZXIgaWYgZHJhd2luZyBsaWJyYXJ5IGlzIG5vdCAnICtcclxuICAgICAgICAnbG9hZGVkLiBUbyBmaXgsIGFkZCBsaWJyYXJpZXM6IFtcXCdkcmF3aW5nXFwnXSB0byB0aGUgJyArXHJcbiAgICAgICAgJ2xhenlNYXBzQVBJTG9hZGVyQ29uZmlnIHlvdSBwYXNzZWQgdG8gQWdtQ29yZU1vZHVsZS5mb3JSb290Jyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChtYXAgJiYgIXRoaXMuZHJhd2luZ01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5kcmF3aW5nTWFuYWdlciA9IG5ldyBnb29nbGUubWFwcy5kcmF3aW5nLkRyYXdpbmdNYW5hZ2VyKHtcclxuICAgICAgICAgIG1hcCxcclxuICAgICAgICAgIGNpcmNsZU9wdGlvbnM6IHRoaXMuY2lyY2xlT3B0aW9ucyxcclxuICAgICAgICAgIG1hcmtlck9wdGlvbnM6IHRoaXMubWFya2VyT3B0aW9ucyxcclxuICAgICAgICAgIHBvbHlnb25PcHRpb25zOiB0aGlzLnBvbHlnb25PcHRpb25zLFxyXG4gICAgICAgICAgcG9seWxpbmVPcHRpb25zOiB0aGlzLnBvbHlsaW5lT3B0aW9ucyxcclxuICAgICAgICAgIHJlY3RhbmdlT3B0aW9uczogdGhpcy5yZWN0YW5nZU9wdGlvbnMsXHJcbiAgICAgICAgICBkcmF3aW5nQ29udHJvbDogdGhpcy5kcmF3aW5nQ29udHJvbCxcclxuICAgICAgICAgIGRyYXdpbmdDb250cm9sT3B0aW9uczogdGhpcy5kcmF3aW5nQ29udHJvbE9wdGlvbnMsXHJcbiAgICAgICAgICBkcmF3aW5nTW9kZTogdGhpcy5kcmF3aW5nTW9kZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaW5pdEV2ZW50cyh0aGlzLmRyYXdpbmdNYW5hZ2VyKTtcclxuICAgIH0gZWxzZSBpZiAoIW1hcCAmJiB0aGlzLmRyYXdpbmdNYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0TWFwKG51bGwpO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBkbyBub3RoaW5nXHJcbiAgfVxyXG5cclxuICBpbml0RXZlbnRzKGRyYXdpbmdNYW5hZ2VyOiBhbnkpIHtcclxuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxDaXJjbGU+KCdjaXJjbGVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxyXG4gICAgICAuc3Vic2NyaWJlKGNpcmNsZSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmNpcmNsZUNvbXBsZXRlLm5leHQoY2lyY2xlKSkpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPE1hcmtlcj4oJ21hcmtlcmNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXHJcbiAgICAgIC5zdWJzY3JpYmUobWFya2VyID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMubWFya2VyQ29tcGxldGUubmV4dChtYXJrZXIpKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8UG9seWdvbj4oJ3BvbHlnb25jb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxyXG4gICAgICAuc3Vic2NyaWJlKHBvbHlnb24gPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5wb2x5Z29uQ29tcGxldGUubmV4dChwb2x5Z29uKSkpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPFBvbHlsaW5lPigncG9seWxpbmVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxyXG4gICAgICAuc3Vic2NyaWJlKHBvbHlsaW5lID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucG9seWxpbmVDb21wbGV0ZS5uZXh0KHBvbHlsaW5lKSkpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPE92ZXJsYXlDb21wbGV0ZUV2ZW50Pignb3ZlcmxheWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXHJcbiAgICAgIC5zdWJzY3JpYmUob3ZlcmxheWV2ZW50ID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMub3ZlcmxheUNvbXBsZXRlLm5leHQob3ZlcmxheWV2ZW50KSkpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPFJlY3RhbmdsZT4oJ3JlY3RhbmdsZWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVjdGFuZ2xlID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjdGFuZ2xlQ29tcGxldGUubmV4dChyZWN0YW5nbGUpKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNdmNPYnNlcnZhYmxlPEU+KGV2ZW50TmFtZTogc3RyaW5nLCBtdmNPYmplY3Q6IE1WQ09iamVjdCk6IE9ic2VydmFibGU8RT4ge1xyXG4gICAgcmV0dXJuIGZyb21FdmVudFBhdHRlcm4oXHJcbiAgICAgIGhhbmRsZXIgPT4gbXZjT2JqZWN0LmFkZExpc3RlbmVyKGV2ZW50TmFtZSxcclxuICAgICAgICAoZXZlbnQ/OiBFKSA9PiBoYW5kbGVyLmFwcGx5KG51bGwsIFtldmVudF0pKSxcclxuICAgICAgKF9oYW5kbGVyOiBGdW5jdGlvbiwgZXZMaXN0ZW5lcjogTWFwc0V2ZW50TGlzdGVuZXIpID0+IGV2TGlzdGVuZXIucmVtb3ZlKClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZHJhd2luZ01hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuZW50cmllcyhjaGFuZ2VzKVxyXG4gICAgLm1hcCgoW3Byb3AsIGNoYW5nZV0pID0+IFtwcm9wLCBjaGFuZ2UuY3VycmVudFZhbHVlXSlcclxuICAgIC5yZWR1Y2UoKG9iajogYW55LCBbcHJvcE5hbWUsIHByb3BWYWx1ZV0pID0+IHtcclxuICAgICAgb2JqW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcclxuICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0sIHt9KTtcclxuICAgIHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19