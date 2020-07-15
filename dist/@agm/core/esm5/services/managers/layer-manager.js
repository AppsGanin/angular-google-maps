import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
var LayerManager = /** @class */ (function () {
    function LayerManager(_wrapper) {
        this._wrapper = _wrapper;
        this._layers = new Map();
    }
    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    LayerManager.prototype.addTransitLayer = function (layer, options) {
        var newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    };
    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    LayerManager.prototype.addBicyclingLayer = function (layer, options) {
        var newLayer = this._wrapper.createBicyclingLayer(options);
        this._layers.set(layer, newLayer);
    };
    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    LayerManager.prototype.deleteLayer = function (layer) {
        var _this = this;
        return this._layers.get(layer).then(function (currentLayer) {
            currentLayer.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    LayerManager.prototype.toggleLayerVisibility = function (layer, options) {
        var _this = this;
        return this._layers.get(layer).then(function (currentLayer) {
            if (!options.visible) {
                currentLayer.setMap(null);
                return;
            }
            else {
                return _this._wrapper.getNativeMap().then(function (map) {
                    currentLayer.setMap(map);
                });
            }
        });
    };
    LayerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper }
    ]; };
    LayerManager = tslib_1.__decorate([
        Injectable()
    ], LayerManager);
    return LayerManager;
}());
export { LayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbEU7O0dBRUc7QUFHSDtJQUlJLHNCQUFvQixRQUE4QjtRQUE5QixhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUgxQyxZQUFPLEdBQ1gsSUFBSSxHQUFHLEVBQStFLENBQUM7SUFFdEMsQ0FBQztJQUV0RDs7Ozs7T0FLRztJQUNILHNDQUFlLEdBQWYsVUFBZ0IsS0FBc0IsRUFBRSxPQUE0QjtRQUNoRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx3Q0FBaUIsR0FBakIsVUFBa0IsS0FBd0IsRUFBRSxPQUE4QjtRQUN0RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtDQUFXLEdBQVgsVUFBWSxLQUEwQztRQUF0RCxpQkFLQztRQUpHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsWUFBWTtZQUM1QyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNENBQXFCLEdBQXJCLFVBQXNCLEtBQTBDLEVBQUUsT0FBb0Q7UUFBdEgsaUJBV0M7UUFWRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFlBQVk7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU87YUFDVjtpQkFBTTtnQkFDSixPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFFLFVBQUMsR0FBYztvQkFDckQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBckQ2QixvQkFBb0I7O0lBSnpDLFlBQVk7UUFEeEIsVUFBVSxFQUFFO09BQ0EsWUFBWSxDQTBEeEI7SUFBRCxtQkFBQztDQUFBLEFBMURELElBMERDO1NBMURZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFnbUJpY3ljbGluZ0xheWVyIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21UcmFuc2l0TGF5ZXIgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RyYW5zaXQtbGF5ZXInO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcclxuaW1wb3J0IHsgQmljeWNsaW5nTGF5ZXIsIEJpY3ljbGluZ0xheWVyT3B0aW9ucywgR29vZ2xlTWFwLCBUcmFuc2l0TGF5ZXIsIFRyYW5zaXRMYXllck9wdGlvbnMgfSBmcm9tICcuLi9nb29nbGUtbWFwcy10eXBlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBtYW5hZ2VzIFRyYW5zaXQgYW5kIEJpY3ljbGluZyBMYXllcnMgZm9yIGEgR29vZ2xlIE1hcCBpbnN0YW5jZS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMYXllck1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJzOiBNYXA8QWdtVHJhbnNpdExheWVyIHwgQWdtQmljeWNsaW5nTGF5ZXIsIFByb21pc2U8VHJhbnNpdExheWVyIHwgQmljeWNsaW5nTGF5ZXI+PiA9XHJcbiAgICAgICAgbmV3IE1hcDxBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgUHJvbWlzZTxUcmFuc2l0TGF5ZXIgfCBCaWN5Y2xpbmdMYXllcj4+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfd3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgdHJhbnNpdCBsYXllciB0byBhIG1hcCBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSB7QWdtVHJhbnNpdExheWVyfSBsYXllciAtIGEgVHJhbnNpdExheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtUcmFuc2l0TGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gVHJhbnNpdExheWVyT3B0aW9ucyBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyB2b2lkXHJcbiAgICAgKi9cclxuICAgIGFkZFRyYW5zaXRMYXllcihsYXllcjogQWdtVHJhbnNpdExheWVyLCBvcHRpb25zOiBUcmFuc2l0TGF5ZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZVRyYW5zaXRMYXllcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgYmljeWNsaW5nIGxheWVyIHRvIGEgbWFwIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIHtBZ21CaWN5Y2xpbmdMYXllcn0gbGF5ZXIgLSBhIGJpY3ljbGluZyBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7QmljeWNsaW5nTGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gQmljeWNsaW5nTGF5ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgdm9pZFxyXG4gICAgICovXHJcbiAgICBhZGRCaWN5Y2xpbmdMYXllcihsYXllcjogQWdtQmljeWNsaW5nTGF5ZXIsIG9wdGlvbnM6IEJpY3ljbGluZ0xheWVyT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5ld0xheWVyID0gdGhpcy5fd3JhcHBlci5jcmVhdGVCaWN5Y2xpbmdMYXllcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgbWFwIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge0FnbVRyYW5zaXRMYXllcnxBZ21CaWN5Y2xpbmdMYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgdG8gZGVsZXRlXHJcbiAgICAgKiBAcmV0dXJucyAgUHJvbWlzZTx2b2lkPlxyXG4gICAgICovXHJcbiAgICBkZWxldGVMYXllcihsYXllcjogQWdtVHJhbnNpdExheWVyIHwgQWdtQmljeWNsaW5nTGF5ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihjdXJyZW50TGF5ZXIgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50TGF5ZXIuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllcnMuZGVsZXRlKGxheWVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGUvU2hvdyBhIGdvb2dsZSBtYXAgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7IEFnbVRyYW5zaXRMYXllcnxBZ21CaWN5Y2xpbmdMYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgdG8gaGlkZS9zaG93XHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRMYXllck9wdGlvbnN8QmljeWNsaW5nTGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gdXNlZCB0byBzZXQgdmlzaWJpbGl0eSBvZiB0aGUgbGF5ZXJcclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8dm9pZD5cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlTGF5ZXJWaXNpYmlsaXR5KGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgb3B0aW9uczogVHJhbnNpdExheWVyT3B0aW9ucyB8IEJpY3ljbGluZ0xheWVyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGN1cnJlbnRMYXllciA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGF5ZXIuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKCAobWFwOiBHb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19