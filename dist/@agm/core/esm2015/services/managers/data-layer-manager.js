import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
/**
 * Manages all Data Layers for a Google Map instance.
 */
let DataLayerManager = class DataLayerManager {
    constructor(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new Data Layer to the map.
     */
    addDataLayer(layer) {
        const newLayer = this._wrapper.createDataLayer({
            style: layer.style,
        })
            .then(d => {
            if (layer.geoJson) {
                this.getDataFeatures(d, layer.geoJson).then(features => d.features = features);
            }
            return d;
        });
        this._layers.set(layer, newLayer);
    }
    deleteDataLayer(layer) {
        this._layers.get(layer).then(l => {
            l.setMap(null);
            this._layers.delete(layer);
        });
    }
    updateGeoJson(layer, geoJson) {
        this._layers.get(layer).then(l => {
            l.forEach(function (feature) {
                l.remove(feature);
                var index = l.features.indexOf(feature, 0);
                if (index > -1) {
                    l.features.splice(index, 1);
                }
            });
            this.getDataFeatures(l, geoJson).then(features => l.features = features);
        });
    }
    setDataOptions(layer, options) {
        this._layers.get(layer).then(l => {
            l.setControlPosition(options.controlPosition);
            l.setControls(options.controls);
            l.setDrawingMode(options.drawingMode);
            l.setStyle(options.style);
        });
    }
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    createEventObservable(eventName, layer) {
        return new Observable((observer) => {
            this._layers.get(layer).then((d) => {
                d.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Extract features from a geoJson using google.maps Data Class
     * @param d : google.maps.Data class instance
     * @param geoJson : url or geojson object
     */
    getDataFeatures(d, geoJson) {
        return new Promise((resolve, reject) => {
            if (typeof geoJson === 'object') {
                try {
                    const features = d.addGeoJson(geoJson);
                    resolve(features);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (typeof geoJson === 'string') {
                d.loadGeoJson(geoJson, null, resolve);
            }
            else {
                reject(`Impossible to extract features from geoJson: wrong argument type`);
            }
        });
    }
};
DataLayerManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
DataLayerManager = tslib_1.__decorate([
    Injectable()
], DataLayerManager);
export { DataLayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBR3BFOztHQUVHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFJM0IsWUFBb0IsUUFBOEIsRUFBVSxLQUFhO1FBQXJELGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhqRSxZQUFPLEdBQ2YsSUFBSSxHQUFHLEVBQStCLENBQUM7SUFFc0MsQ0FBQztJQUU5RTs7T0FFRztJQUNILFlBQVksQ0FBQyxLQUFtQjtRQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUM3QyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDSixDQUFDO2FBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNSLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7YUFDaEY7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxl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LFFBQVEsRUFBRTtnQkFDdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO2FBQzVFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQTs7WUFqRitCLG9CQUFvQjtZQUFpQixNQUFNOztBQUo5RCxnQkFBZ0I7SUFENUIsVUFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBcUY1QjtTQXJGWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFnbURhdGFMYXllciB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9kYXRhLWxheWVyJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcclxuaW1wb3J0IHsgRGF0YSwgRGF0YU9wdGlvbnMsIEZlYXR1cmUgfSBmcm9tICcuLy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2VzIGFsbCBEYXRhIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YUxheWVyTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBNYXA8QWdtRGF0YUxheWVyLCBQcm9taXNlPERhdGE+PiA9XHJcbiAgbmV3IE1hcDxBZ21EYXRhTGF5ZXIsIFByb21pc2U8RGF0YT4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgbmV3IERhdGEgTGF5ZXIgdG8gdGhlIG1hcC5cclxuICAgKi9cclxuICBhZGREYXRhTGF5ZXIobGF5ZXI6IEFnbURhdGFMYXllcikge1xyXG4gICAgY29uc3QgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZURhdGFMYXllcih7XHJcbiAgICAgIHN0eWxlOiBsYXllci5zdHlsZSxcclxuICAgIH0gYXMgRGF0YU9wdGlvbnMpXHJcbiAgICAudGhlbihkID0+IHtcclxuICAgICAgaWYgKGxheWVyLmdlb0pzb24pIHtcclxuICAgICAgICB0aGlzLmdldERhdGFGZWF0dXJlcyhkLCBsYXllci5nZW9Kc29uKS50aGVuKGZlYXR1cmVzID0+IGQuZmVhdHVyZXMgPSBmZWF0dXJlcyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZURhdGFMYXllcihsYXllcjogQWdtRGF0YUxheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGwgPT4ge1xyXG4gICAgICBsLnNldE1hcChudWxsKTtcclxuICAgICAgdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUdlb0pzb24obGF5ZXI6IEFnbURhdGFMYXllciwgZ2VvSnNvbjogT2JqZWN0IHwgc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGwgPT4ge1xyXG4gICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmU6IEZlYXR1cmUpIHtcclxuICAgICAgICBsLnJlbW92ZShmZWF0dXJlKTtcclxuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gbC5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUsIDApO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBsLmZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5nZXREYXRhRmVhdHVyZXMobCwgZ2VvSnNvbikudGhlbihmZWF0dXJlcyA9PiBsLmZlYXR1cmVzID0gZmVhdHVyZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXREYXRhT3B0aW9ucyhsYXllcjogQWdtRGF0YUxheWVyLCBvcHRpb25zOiBEYXRhT3B0aW9ucylcclxuICB7XHJcbiAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGwgPT4ge1xyXG4gICAgICBsLnNldENvbnRyb2xQb3NpdGlvbihvcHRpb25zLmNvbnRyb2xQb3NpdGlvbik7XHJcbiAgICAgIGwuc2V0Q29udHJvbHMob3B0aW9ucy5jb250cm9scyk7XHJcbiAgICAgIGwuc2V0RHJhd2luZ01vZGUob3B0aW9ucy5kcmF3aW5nTW9kZSk7XHJcbiAgICAgIGwuc2V0U3R5bGUob3B0aW9ucy5zdHlsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBHb29nbGUgTWFwcyBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIERhdGFMYXllciBhcyBhbiBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBsYXllcjogQWdtRGF0YUxheWVyKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKChkOiBEYXRhKSA9PiB7XHJcbiAgICAgICAgZC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRyYWN0IGZlYXR1cmVzIGZyb20gYSBnZW9Kc29uIHVzaW5nIGdvb2dsZS5tYXBzIERhdGEgQ2xhc3NcclxuICAgKiBAcGFyYW0gZCA6IGdvb2dsZS5tYXBzLkRhdGEgY2xhc3MgaW5zdGFuY2VcclxuICAgKiBAcGFyYW0gZ2VvSnNvbiA6IHVybCBvciBnZW9qc29uIG9iamVjdFxyXG4gICAqL1xyXG4gIGdldERhdGFGZWF0dXJlcyhkOiBEYXRhLCBnZW9Kc29uOiBPYmplY3QgfCBzdHJpbmcpOiBQcm9taXNlPEZlYXR1cmVbXT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEZlYXR1cmVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZ2VvSnNvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gZC5hZGRHZW9Kc29uKGdlb0pzb24pO1xyXG4gICAgICAgICAgICByZXNvbHZlKGZlYXR1cmVzKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGdlb0pzb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBkLmxvYWRHZW9Kc29uKGdlb0pzb24sIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoYEltcG9zc2libGUgdG8gZXh0cmFjdCBmZWF0dXJlcyBmcm9tIGdlb0pzb246IHdyb25nIGFyZ3VtZW50IHR5cGVgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=