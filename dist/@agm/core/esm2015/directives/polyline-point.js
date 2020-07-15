import * as tslib_1 from "tslib";
var AgmPolylinePoint_1;
import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
let AgmPolylinePoint = AgmPolylinePoint_1 = class AgmPolylinePoint {
    constructor() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['latitude'] || changes['longitude']) {
            const position = {
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            };
            this.positionChanged.emit(position);
        }
    }
    /** @internal */
    getFitBoundsDetails$() {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(position => ({ latLng: position })));
    }
};
tslib_1.__decorate([
    Input()
], AgmPolylinePoint.prototype, "latitude", void 0);
tslib_1.__decorate([
    Input()
], AgmPolylinePoint.prototype, "longitude", void 0);
tslib_1.__decorate([
    Output()
], AgmPolylinePoint.prototype, "positionChanged", void 0);
AgmPolylinePoint = AgmPolylinePoint_1 = tslib_1.__decorate([
    Directive({
        selector: 'agm-polyline-point',
        providers: [
            { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmPolylinePoint_1) },
        ],
    })
], AgmPolylinePoint);
export { AgmPolylinePoint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBRTdFOzs7R0FHRztBQU9ILElBQWEsZ0JBQWdCLHdCQUE3QixNQUFhLGdCQUFnQjtJQWdCM0I7UUFMQTs7V0FFRztRQUNPLG9CQUFlLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRTVFLENBQUM7SUFFaEIsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQyxNQUFNLFFBQVEsR0FBa0I7Z0JBQzlCLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUMzRSxHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUzthQUM5RCxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDOUIsU0FBUyxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUNwRCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FDdEMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBL0JVO0lBQVIsS0FBSyxFQUFFO2tEQUF5QjtBQUt4QjtJQUFSLEtBQUssRUFBRTttREFBMEI7QUFLeEI7SUFBVCxNQUFNLEVBQUU7eURBQWtGO0FBZGhGLGdCQUFnQjtJQU41QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFNBQVMsRUFBRTtZQUNULEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWdCLENBQUMsRUFBQztTQUM5RTtLQUNGLENBQUM7R0FDVyxnQkFBZ0IsQ0FtQzVCO1NBbkNZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTGF0TG5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5pbXBvcnQgeyBGaXRCb3VuZHNBY2Nlc3NvciwgRml0Qm91bmRzRGV0YWlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xyXG5cclxuLyoqXHJcbiAqIEFnbVBvbHlsaW5lUG9pbnQgcmVwcmVzZW50cyBvbmUgZWxlbWVudCBvZiBhIHBvbHlsaW5lIHdpdGhpbiBhICB7QGxpbmtcclxuICogQWdtUG9seWxpbmV9XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2FnbS1wb2x5bGluZS1wb2ludCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7cHJvdmlkZTogRml0Qm91bmRzQWNjZXNzb3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFnbVBvbHlsaW5lUG9pbnQpfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtUG9seWxpbmVQb2ludCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRml0Qm91bmRzQWNjZXNzb3Ige1xyXG4gIC8qKlxyXG4gICAqIFRoZSBsYXRpdHVkZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGxhdGl0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsb25naXR1ZGUgcG9zaXRpb24gb2YgdGhlIHBvaW50O1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBsb25naXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgY2hhbmdlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9zaXRpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XHJcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xyXG4gICAgICBjb25zdCBwb3NpdGlvbjogTGF0TG5nTGl0ZXJhbCA9IHtcclxuICAgICAgICBsYXQ6IGNoYW5nZXNbJ2xhdGl0dWRlJ10gPyBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubGF0aXR1ZGUsXHJcbiAgICAgICAgbG5nOiBjaGFuZ2VzWydsb25naXR1ZGUnXSA/IGNoYW5nZXNbJ2xvbmdpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubG9uZ2l0dWRlLFxyXG4gICAgICB9IGFzIExhdExuZ0xpdGVyYWw7XHJcbiAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkLmVtaXQocG9zaXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIGdldEZpdEJvdW5kc0RldGFpbHMkKCk6IE9ic2VydmFibGU8Rml0Qm91bmRzRGV0YWlscz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25DaGFuZ2VkLnBpcGUoXHJcbiAgICAgIHN0YXJ0V2l0aCh7bGF0OiB0aGlzLmxhdGl0dWRlLCBsbmc6IHRoaXMubG9uZ2l0dWRlfSksXHJcbiAgICAgIG1hcChwb3NpdGlvbiA9PiAoe2xhdExuZzogcG9zaXRpb259KSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==