import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
let LayerManager = class LayerManager {
    constructor(_wrapper) {
        this._wrapper = _wrapper;
        this._layers = new Map();
    }
    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer, options) {
        const newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    }
    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    addBicyclingLayer(layer, options) {
        const newLayer = this._wrapper.createBicyclingLayer(options);
        this._layers.set(layer, newLayer);
    }
    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    deleteLayer(layer) {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }
    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    toggleLayerVisibility(layer, options) {
        return this._layers.get(layer).then(currentLayer => {
            if (!options.visible) {
                currentLayer.setMap(null);
                return;
            }
            else {
                return this._wrapper.getNativeMap().then((map) => {
                    currentLayer.setMap(map);
                });
            }
        });
    }
};
LayerManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper }
];
LayerManager = tslib_1.__decorate([
    Injectable()
], LayerManager);
export { LayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbEU7O0dBRUc7QUFHSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBSXJCLFlBQW9CLFFBQThCO1FBQTlCLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBSDFDLFlBQU8sR0FDWCxJQUFJLEdBQUcsRUFBK0UsQ0FBQztJQUV0QyxDQUFDO0lBRXREOzs7OztPQUtHO0lBQ0gsZUFBZSxDQUFDLEtBQXNCLEVBQUUsT0FBNEI7UUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsaUJBQWlCLENBQUMsS0FBd0IsRUFBRSxPQUE4QjtRQUN0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxLQUEwQztRQUNsRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUJBQXFCLENBQUMsS0FBMEMsRUFBRSxPQUFvRDtRQUNsSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsT0FBTzthQUNWO2lCQUFNO2dCQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxHQUFjLEVBQUUsRUFBRTtvQkFDekQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7O1lBdERpQyxvQkFBb0I7O0FBSnpDLFlBQVk7SUFEeEIsVUFBVSxFQUFFO0dBQ0EsWUFBWSxDQTBEeEI7U0ExRFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWdtQmljeWNsaW5nTGF5ZXIgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2JpY3ljbGluZy1sYXllcic7XHJcbmltcG9ydCB7IEFnbVRyYW5zaXRMYXllciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdHJhbnNpdC1sYXllcic7XHJcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xyXG5pbXBvcnQgeyBCaWN5Y2xpbmdMYXllciwgQmljeWNsaW5nTGF5ZXJPcHRpb25zLCBHb29nbGVNYXAsIFRyYW5zaXRMYXllciwgVHJhbnNpdExheWVyT3B0aW9ucyB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIG1hbmFnZXMgVHJhbnNpdCBhbmQgQmljeWNsaW5nIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExheWVyTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9sYXllcnM6IE1hcDxBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgUHJvbWlzZTxUcmFuc2l0TGF5ZXIgfCBCaWN5Y2xpbmdMYXllcj4+ID1cclxuICAgICAgICBuZXcgTWFwPEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyLCBQcm9taXNlPFRyYW5zaXRMYXllciB8IEJpY3ljbGluZ0xheWVyPj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlcikge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB0cmFuc2l0IGxheWVyIHRvIGEgbWFwIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIHtBZ21UcmFuc2l0TGF5ZXJ9IGxheWVyIC0gYSBUcmFuc2l0TGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRMYXllck9wdGlvbnN9IG9wdGlvbnMgLSBUcmFuc2l0TGF5ZXJPcHRpb25zIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHZvaWRcclxuICAgICAqL1xyXG4gICAgYWRkVHJhbnNpdExheWVyKGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIsIG9wdGlvbnM6IFRyYW5zaXRMYXllck9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlVHJhbnNpdExheWVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBiaWN5Y2xpbmcgbGF5ZXIgdG8gYSBtYXAgaW5zdGFuY2UuXHJcbiAgICAgKiBAcGFyYW0ge0FnbUJpY3ljbGluZ0xheWVyfSBsYXllciAtIGEgYmljeWNsaW5nIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtCaWN5Y2xpbmdMYXllck9wdGlvbnN9IG9wdGlvbnMgLSBCaWN5Y2xpbmdMYXllciBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyB2b2lkXHJcbiAgICAgKi9cclxuICAgIGFkZEJpY3ljbGluZ0xheWVyKGxheWVyOiBBZ21CaWN5Y2xpbmdMYXllciwgb3B0aW9uczogQmljeWNsaW5nTGF5ZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZUJpY3ljbGluZ0xheWVyKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBtYXAgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7QWdtVHJhbnNpdExheWVyfEFnbUJpY3ljbGluZ0xheWVyfSBsYXllciAtIHRoZSBsYXllciB0byBkZWxldGVcclxuICAgICAqIEByZXR1cm5zICBQcm9taXNlPHZvaWQ+XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUxheWVyKGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGN1cnJlbnRMYXllciA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZS9TaG93IGEgZ29vZ2xlIG1hcCBsYXllclxyXG4gICAgICogQHBhcmFtIHsgQWdtVHJhbnNpdExheWVyfEFnbUJpY3ljbGluZ0xheWVyfSBsYXllciAtIHRoZSBsYXllciB0byBoaWRlL3Nob3dcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdExheWVyT3B0aW9uc3xCaWN5Y2xpbmdMYXllck9wdGlvbnN9IG9wdGlvbnMgLSB1c2VkIHRvIHNldCB2aXNpYmlsaXR5IG9mIHRoZSBsYXllclxyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTx2b2lkPlxyXG4gICAgICovXHJcbiAgICB0b2dnbGVMYXllclZpc2liaWxpdHkobGF5ZXI6IEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyLCBvcHRpb25zOiBUcmFuc2l0TGF5ZXJPcHRpb25zIHwgQmljeWNsaW5nTGF5ZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oY3VycmVudExheWVyID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oIChtYXA6IEdvb2dsZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgY3VycmVudExheWVyLnNldE1hcChtYXApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=