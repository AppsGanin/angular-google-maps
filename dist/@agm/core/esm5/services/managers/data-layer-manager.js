import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
/**
 * Manages all Data Layers for a Google Map instance.
 */
var DataLayerManager = /** @class */ (function () {
    function DataLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new Data Layer to the map.
     */
    DataLayerManager.prototype.addDataLayer = function (layer) {
        var _this = this;
        var newLayer = this._wrapper.createDataLayer({
            style: layer.style,
        })
            .then(function (d) {
            if (layer.geoJson) {
                _this.getDataFeatures(d, layer.geoJson).then(function (features) { return d.features = features; });
            }
            return d;
        });
        this._layers.set(layer, newLayer);
    };
    DataLayerManager.prototype.deleteDataLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    DataLayerManager.prototype.updateGeoJson = function (layer, geoJson) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.forEach(function (feature) {
                l.remove(feature);
                var index = l.features.indexOf(feature, 0);
                if (index > -1) {
                    l.features.splice(index, 1);
                }
            });
            _this.getDataFeatures(l, geoJson).then(function (features) { return l.features = features; });
        });
    };
    DataLayerManager.prototype.setDataOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) {
            l.setControlPosition(options.controlPosition);
            l.setControls(options.controls);
            l.setDrawingMode(options.drawingMode);
            l.setStyle(options.style);
        });
    };
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    DataLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return new Observable(function (observer) {
            _this._layers.get(layer).then(function (d) {
                d.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Extract features from a geoJson using google.maps Data Class
     * @param d : google.maps.Data class instance
     * @param geoJson : url or geojson object
     */
    DataLayerManager.prototype.getDataFeatures = function (d, geoJson) {
        return new Promise(function (resolve, reject) {
            if (typeof geoJson === 'object') {
                try {
                    var features = d.addGeoJson(geoJson);
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
                reject("Impossible to extract features from geoJson: wrong argument type");
            }
        });
    };
    DataLayerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    DataLayerManager = tslib_1.__decorate([
        Injectable()
    ], DataLayerManager);
    return DataLayerManager;
}());
export { DataLayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBR3BFOztHQUVHO0FBRUg7SUFJRSwwQkFBb0IsUUFBOEIsRUFBVSxLQUFhO1FBQXJELGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhqRSxZQUFPLEdBQ2YsSUFBSSxHQUFHLEVBQStCLENBQUM7SUFFc0MsQ0FBQztJQUU5RTs7T0FFRztJQUNILHVDQUFZLEdBQVosVUFBYSxLQUFtQjtRQUFoQyxpQkFXQztRQVZDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO1lBQzdDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztTQUNKLENBQUM7YUFDaEIsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNMLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFyQixDQUFxQixDQUFDLENBQUM7YUFDaEY7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwwQ0FBZSxH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Q0FBQztpQkFDWDthQUNGO2lCQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUN0QyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGtFQUFrRSxDQUFDLENBQUM7YUFDNUU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWhGNkIsb0JBQW9CO2dCQUFpQixNQUFNOztJQUo5RCxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBcUY1QjtJQUFELHVCQUFDO0NBQUEsQUFyRkQsSUFxRkM7U0FyRlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBZ21EYXRhTGF5ZXIgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvZGF0YS1sYXllcic7XHJcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcbmltcG9ydCB7IERhdGEsIERhdGFPcHRpb25zLCBGZWF0dXJlIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy10eXBlcyc7XHJcblxyXG4vKipcclxuICogTWFuYWdlcyBhbGwgRGF0YSBMYXllcnMgZm9yIGEgR29vZ2xlIE1hcCBpbnN0YW5jZS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFMYXllck1hbmFnZXIge1xyXG4gIHByaXZhdGUgX2xheWVyczogTWFwPEFnbURhdGFMYXllciwgUHJvbWlzZTxEYXRhPj4gPVxyXG4gIG5ldyBNYXA8QWdtRGF0YUxheWVyLCBQcm9taXNlPERhdGE+PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIG5ldyBEYXRhIExheWVyIHRvIHRoZSBtYXAuXHJcbiAgICovXHJcbiAgYWRkRGF0YUxheWVyKGxheWVyOiBBZ21EYXRhTGF5ZXIpIHtcclxuICAgIGNvbnN0IG5ld0xheWVyID0gdGhpcy5fd3JhcHBlci5jcmVhdGVEYXRhTGF5ZXIoe1xyXG4gICAgICBzdHlsZTogbGF5ZXIuc3R5bGUsXHJcbiAgICB9IGFzIERhdGFPcHRpb25zKVxyXG4gICAgLnRoZW4oZCA9PiB7XHJcbiAgICAgIGlmIChsYXllci5nZW9Kc29uKSB7XHJcbiAgICAgICAgdGhpcy5nZXREYXRhRmVhdHVyZXMoZCwgbGF5ZXIuZ2VvSnNvbikudGhlbihmZWF0dXJlcyA9PiBkLmZlYXR1cmVzID0gZmVhdHVyZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEYXRhTGF5ZXIobGF5ZXI6IEFnbURhdGFMYXllcikge1xyXG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcclxuICAgICAgbC5zZXRNYXAobnVsbCk7XHJcbiAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW9Kc29uKGxheWVyOiBBZ21EYXRhTGF5ZXIsIGdlb0pzb246IE9iamVjdCB8IHN0cmluZykge1xyXG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcclxuICAgICAgbC5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlOiBGZWF0dXJlKSB7XHJcbiAgICAgICAgbC5yZW1vdmUoZmVhdHVyZSk7XHJcblxyXG4gICAgICAgIHZhciBpbmRleCA9IGwuZmVhdHVyZXMuaW5kZXhPZihmZWF0dXJlLCAwKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgbC5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZ2V0RGF0YUZlYXR1cmVzKGwsIGdlb0pzb24pLnRoZW4oZmVhdHVyZXMgPT4gbC5mZWF0dXJlcyA9IGZlYXR1cmVzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0RGF0YU9wdGlvbnMobGF5ZXI6IEFnbURhdGFMYXllciwgb3B0aW9uczogRGF0YU9wdGlvbnMpXHJcbiAge1xyXG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcclxuICAgICAgbC5zZXRDb250cm9sUG9zaXRpb24ob3B0aW9ucy5jb250cm9sUG9zaXRpb24pO1xyXG4gICAgICBsLnNldENvbnRyb2xzKG9wdGlvbnMuY29udHJvbHMpO1xyXG4gICAgICBsLnNldERyYXdpbmdNb2RlKG9wdGlvbnMuZHJhd2luZ01vZGUpO1xyXG4gICAgICBsLnNldFN0eWxlKG9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBEYXRhTGF5ZXIgYXMgYW4gT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgbGF5ZXI6IEFnbURhdGFMYXllcik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbigoZDogRGF0YSkgPT4ge1xyXG4gICAgICAgIGQuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0cmFjdCBmZWF0dXJlcyBmcm9tIGEgZ2VvSnNvbiB1c2luZyBnb29nbGUubWFwcyBEYXRhIENsYXNzXHJcbiAgICogQHBhcmFtIGQgOiBnb29nbGUubWFwcy5EYXRhIGNsYXNzIGluc3RhbmNlXHJcbiAgICogQHBhcmFtIGdlb0pzb24gOiB1cmwgb3IgZ2VvanNvbiBvYmplY3RcclxuICAgKi9cclxuICBnZXREYXRhRmVhdHVyZXMoZDogRGF0YSwgZ2VvSnNvbjogT2JqZWN0IHwgc3RyaW5nKTogUHJvbWlzZTxGZWF0dXJlW10+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxGZWF0dXJlW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGdlb0pzb24gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IGQuYWRkR2VvSnNvbihnZW9Kc29uKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBnZW9Kc29uID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgZC5sb2FkR2VvSnNvbihnZW9Kc29uLCBudWxsLCByZXNvbHZlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KGBJbXBvc3NpYmxlIHRvIGV4dHJhY3QgZmVhdHVyZXMgZnJvbSBnZW9Kc29uOiB3cm9uZyBhcmd1bWVudCB0eXBlYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19