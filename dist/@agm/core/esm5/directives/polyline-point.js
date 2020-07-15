import * as tslib_1 from "tslib";
import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
var AgmPolylinePoint = /** @class */ (function () {
    function AgmPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    AgmPolylinePoint_1 = AgmPolylinePoint;
    AgmPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            };
            this.positionChanged.emit(position);
        }
    };
    /** @internal */
    AgmPolylinePoint.prototype.getFitBoundsDetails$ = function () {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(function (position) { return ({ latLng: position }); }));
    };
    var AgmPolylinePoint_1;
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
                { provide: FitBoundsAccessor, useExisting: forwardRef(function () { return AgmPolylinePoint_1; }) },
            ],
        })
    ], AgmPolylinePoint);
    return AgmPolylinePoint;
}());
export { AgmPolylinePoint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFN0csT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW9CLE1BQU0sd0JBQXdCLENBQUM7QUFFN0U7OztHQUdHO0FBT0g7SUFnQkU7UUFMQTs7V0FFRztRQUNPLG9CQUFlLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRTVFLENBQUM7eUJBaEJMLGdCQUFnQjtJQWtCM0Isc0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQyxJQUFNLFFBQVEsR0FBa0I7Z0JBQzlCLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUMzRSxHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUzthQUM5RCxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNoQiwrQ0FBb0IsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUM5QixTQUFTLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLEVBQ3BELEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLENBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUN0QyxDQUFDO0lBQ0osQ0FBQzs7SUE5QlE7UUFBUixLQUFLLEVBQUU7c0RBQXlCO0lBS3hCO1FBQVIsS0FBSyxFQUFFO3VEQUEwQjtJQUt4QjtRQUFULE1BQU0sRUFBRTs2REFBa0Y7SUFkaEYsZ0JBQWdCO1FBTjVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFnQixFQUFoQixDQUFnQixDQUFDLEVBQUM7YUFDOUU7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBbUM1QjtJQUFELHVCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBMYXRMbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XHJcbmltcG9ydCB7IEZpdEJvdW5kc0FjY2Vzc29yLCBGaXRCb3VuZHNEZXRhaWxzIH0gZnJvbSAnLi4vc2VydmljZXMvZml0LWJvdW5kcyc7XHJcblxyXG4vKipcclxuICogQWdtUG9seWxpbmVQb2ludCByZXByZXNlbnRzIG9uZSBlbGVtZW50IG9mIGEgcG9seWxpbmUgd2l0aGluIGEgIHtAbGlua1xyXG4gKiBBZ21Qb2x5bGluZX1cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lLXBvaW50JyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtwcm92aWRlOiBGaXRCb3VuZHNBY2Nlc3NvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWdtUG9seWxpbmVQb2ludCl9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21Qb2x5bGluZVBvaW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBGaXRCb3VuZHNBY2Nlc3NvciB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBwb2ludC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbGF0aXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQ7XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGxvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludCBjaGFuZ2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb3NpdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcclxuICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBMYXRMbmdMaXRlcmFsID0ge1xyXG4gICAgICAgIGxhdDogY2hhbmdlc1snbGF0aXR1ZGUnXSA/IGNoYW5nZXNbJ2xhdGl0dWRlJ10uY3VycmVudFZhbHVlIDogdGhpcy5sYXRpdHVkZSxcclxuICAgICAgICBsbmc6IGNoYW5nZXNbJ2xvbmdpdHVkZSddID8gY2hhbmdlc1snbG9uZ2l0dWRlJ10uY3VycmVudFZhbHVlIDogdGhpcy5sb25naXR1ZGUsXHJcbiAgICAgIH0gYXMgTGF0TG5nTGl0ZXJhbDtcclxuICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQuZW1pdChwb3NpdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgZ2V0Rml0Qm91bmRzRGV0YWlscyQoKTogT2JzZXJ2YWJsZTxGaXRCb3VuZHNEZXRhaWxzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbkNoYW5nZWQucGlwZShcclxuICAgICAgc3RhcnRXaXRoKHtsYXQ6IHRoaXMubGF0aXR1ZGUsIGxuZzogdGhpcy5sb25naXR1ZGV9KSxcclxuICAgICAgbWFwKHBvc2l0aW9uID0+ICh7bGF0TG5nOiBwb3NpdGlvbn0pKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19