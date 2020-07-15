import * as tslib_1 from "tslib";
import { Directive, Input, Self } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FitBoundsAccessor, FitBoundsDetails, FitBoundsService } from '../services/fit-bounds';
/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
var AgmFitBounds = /** @class */ (function () {
    function AgmFitBounds(_fitBoundsAccessor, _fitBoundsService) {
        this._fitBoundsAccessor = _fitBoundsAccessor;
        this._fitBoundsService = _fitBoundsService;
        /**
         * If the value is true, the element gets added to the bounds of the map.
         * Default: true.
         */
        this.agmFitBounds = true;
        this._destroyed$ = new Subject();
        this._latestFitBoundsDetails = null;
    }
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnChanges = function () {
        this._updateBounds();
    };
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnInit = function () {
        var _this = this;
        this._fitBoundsAccessor
            .getFitBoundsDetails$()
            .pipe(distinctUntilChanged(function (x, y) {
            return x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng;
        }), takeUntil(this._destroyed$))
            .subscribe(function (details) { return _this._updateBounds(details); });
    };
    /*
     Either the location changed, or visible status changed.
     Possible state changes are
     invisible -> visible
     visible -> invisible
     visible -> visible (new location)
    */
    AgmFitBounds.prototype._updateBounds = function (newFitBoundsDetails) {
        // either visibility will change, or location, so remove the old one anyway
        if (this._latestFitBoundsDetails) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
            // don't set latestFitBoundsDetails to null, because we can toggle visibility from
            // true -> false -> true, in which case we still need old value cached here
        }
        if (newFitBoundsDetails) {
            this._latestFitBoundsDetails = newFitBoundsDetails;
        }
        if (!this._latestFitBoundsDetails) {
            return;
        }
        if (this.agmFitBounds === true) {
            this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnDestroy = function () {
        this._destroyed$.next();
        this._destroyed$.complete();
        if (this._latestFitBoundsDetails !== null) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    AgmFitBounds.ctorParameters = function () { return [
        { type: FitBoundsAccessor, decorators: [{ type: Self }] },
        { type: FitBoundsService }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmFitBounds.prototype, "agmFitBounds", void 0);
    AgmFitBounds = tslib_1.__decorate([
        Directive({
            selector: '[agmFitBounds]',
        }),
        tslib_1.__param(0, Self())
    ], AgmFitBounds);
    return AgmFitBounds;
}());
export { AgmFitBounds };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZml0LWJvdW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdDLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRjs7Ozs7R0FLRztBQUlIO0lBVUUsc0JBQzJCLGtCQUFxQyxFQUM3QyxpQkFBbUM7UUFEM0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUM3QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBWHREOzs7V0FHRztRQUNNLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXJCLGdCQUFXLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDakQsNEJBQXVCLEdBQTRCLElBQUksQ0FBQztJQUs3RCxDQUFDO0lBRUo7O09BRUc7SUFDSCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsb0JBQW9CLEVBQUU7YUFDdEIsSUFBSSxDQUNILG9CQUFvQixDQUNsQixVQUFDLENBQW1CLEVBQUUsQ0FBbUI7WUFDdkMsT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUc7UUFBOUQsQ0FBOEQsQ0FDakUsRUFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM1QjthQUNBLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7OztNQU1FO0lBQ00sb0NBQWEsR0FBckIsVUFBc0IsbUJBQXNDO1FBQzFELDJFQUEyRTtRQUMzRSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdFLGtGQUFrRjtZQUNsRiwyRUFBMkU7U0FDNUU7UUFFRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxtQkFBbUIsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssSUFBSSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUU7SUFDSCxDQUFDOztnQkE5RDhDLGlCQUFpQix1QkFBN0QsSUFBSTtnQkFDK0IsZ0JBQWdCOztJQVA3QztRQUFSLEtBQUssRUFBRTtzREFBcUI7SUFMbEIsWUFBWTtRQUh4QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCLENBQUM7UUFZRyxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtPQVhFLFlBQVksQ0EwRXhCO0lBQUQsbUJBQUM7Q0FBQSxBQTFFRCxJQTBFQztTQTFFWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBGaXRCb3VuZHNBY2Nlc3NvciwgRml0Qm91bmRzRGV0YWlscywgRml0Qm91bmRzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgdGhlIGdpdmVuIGRpcmVjdGl2ZSB0byB0aGUgYXV0byBmaXQgYm91bmRzIGZlYXR1cmUgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS5cclxuICogVG8gbWFrZSBpdCB3b3JrIHdpdGggeW91IGN1c3RvbSBBR00gY29tcG9uZW50LCB5b3UgYWxzbyBoYXZlIHRvIGltcGxlbWVudCB0aGUge0BsaW5rIEZpdEJvdW5kc0FjY2Vzc29yfSBhYnN0cmFjdCBjbGFzcy5cclxuICogQGV4YW1wbGVcclxuICogPGFnbS1tYXJrZXIgW2FnbUZpdEJvdW5kc109XCJ0cnVlXCI+PC9hZ20tbWFya2VyPlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYWdtRml0Qm91bmRzXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21GaXRCb3VuZHMgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBJZiB0aGUgdmFsdWUgaXMgdHJ1ZSwgdGhlIGVsZW1lbnQgZ2V0cyBhZGRlZCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXAuXHJcbiAgICogRGVmYXVsdDogdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBhZ21GaXRCb3VuZHMgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIF9kZXN0cm95ZWQkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzOiBGaXRCb3VuZHNEZXRhaWxzIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIHJlYWRvbmx5IF9maXRCb3VuZHNBY2Nlc3NvcjogRml0Qm91bmRzQWNjZXNzb3IsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9maXRCb3VuZHNTZXJ2aWNlOiBGaXRCb3VuZHNTZXJ2aWNlLFxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fZml0Qm91bmRzQWNjZXNzb3JcclxuICAgICAgLmdldEZpdEJvdW5kc0RldGFpbHMkKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXHJcbiAgICAgICAgICAoeDogRml0Qm91bmRzRGV0YWlscywgeTogRml0Qm91bmRzRGV0YWlscykgPT5cclxuICAgICAgICAgICAgeC5sYXRMbmcubGF0ID09PSB5LmxhdExuZy5sYXQgJiYgeC5sYXRMbmcubG5nID09PSB5LmxhdExuZy5sbmcsXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCksXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZShkZXRhaWxzID0+IHRoaXMuX3VwZGF0ZUJvdW5kcyhkZXRhaWxzKSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICBFaXRoZXIgdGhlIGxvY2F0aW9uIGNoYW5nZWQsIG9yIHZpc2libGUgc3RhdHVzIGNoYW5nZWQuXHJcbiAgIFBvc3NpYmxlIHN0YXRlIGNoYW5nZXMgYXJlXHJcbiAgIGludmlzaWJsZSAtPiB2aXNpYmxlXHJcbiAgIHZpc2libGUgLT4gaW52aXNpYmxlXHJcbiAgIHZpc2libGUgLT4gdmlzaWJsZSAobmV3IGxvY2F0aW9uKVxyXG4gICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKG5ld0ZpdEJvdW5kc0RldGFpbHM/OiBGaXRCb3VuZHNEZXRhaWxzKSB7XHJcbiAgICAvLyBlaXRoZXIgdmlzaWJpbGl0eSB3aWxsIGNoYW5nZSwgb3IgbG9jYXRpb24sIHNvIHJlbW92ZSB0aGUgb2xkIG9uZSBhbnl3YXlcclxuICAgIGlmICh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzKSB7XHJcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UucmVtb3ZlRnJvbUJvdW5kcyh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzLmxhdExuZyk7XHJcbiAgICAgIC8vIGRvbid0IHNldCBsYXRlc3RGaXRCb3VuZHNEZXRhaWxzIHRvIG51bGwsIGJlY2F1c2Ugd2UgY2FuIHRvZ2dsZSB2aXNpYmlsaXR5IGZyb21cclxuICAgICAgLy8gdHJ1ZSAtPiBmYWxzZSAtPiB0cnVlLCBpbiB3aGljaCBjYXNlIHdlIHN0aWxsIG5lZWQgb2xkIHZhbHVlIGNhY2hlZCBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld0ZpdEJvdW5kc0RldGFpbHMpIHtcclxuICAgICAgdGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscyA9IG5ld0ZpdEJvdW5kc0RldGFpbHM7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYWdtRml0Qm91bmRzID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UuYWRkVG9Cb3VuZHModGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscy5sYXRMbmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9kZXN0cm95ZWQkLm5leHQoKTtcclxuICAgIHRoaXMuX2Rlc3Ryb3llZCQuY29tcGxldGUoKTtcclxuICAgIGlmICh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UucmVtb3ZlRnJvbUJvdW5kcyh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzLmxhdExuZyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==