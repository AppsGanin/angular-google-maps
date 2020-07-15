import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import 'js-marker-clusterer';
import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
var ClusterManager = /** @class */ (function (_super) {
    tslib_1.__extends(ClusterManager, _super);
    function ClusterManager(_mapsWrapper, _zone) {
        var _this = _super.call(this, _mapsWrapper, _zone) || this;
        _this._mapsWrapper = _mapsWrapper;
        _this._zone = _zone;
        _this._clustererInstance = new Promise(function (resolver) {
            _this._resolver = resolver;
        });
        return _this;
    }
    ClusterManager.prototype.init = function (options) {
        var _this = this;
        this._mapsWrapper.getNativeMap().then(function (map) {
            var clusterer = new MarkerClusterer(map, [], options);
            _this._resolver(clusterer);
        });
    };
    ClusterManager.prototype.getClustererInstance = function () {
        return this._clustererInstance;
    };
    ClusterManager.prototype.addMarker = function (marker) {
        var clusterPromise = this.getClustererInstance();
        var markerPromise = this._mapsWrapper
            .createMarker({
            position: {
                lat: marker.latitude,
                lng: marker.longitude,
            },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title,
            clickable: marker.clickable,
        }, false);
        Promise
            .all([clusterPromise, markerPromise])
            .then(function (_a) {
            var _b = tslib_1.__read(_a, 2), cluster = _b[0], marker = _b[1];
            return cluster.addMarker(marker);
        });
        this._markers.set(marker, markerPromise);
    };
    ClusterManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            _this._zone.run(function () {
                m.setMap(null);
                _this.getClustererInstance().then(function (cluster) {
                    cluster.removeMarker(m);
                    _this._markers.delete(marker);
                });
            });
        });
    };
    ClusterManager.prototype.clearMarkers = function () {
        return this.getClustererInstance().then(function (cluster) {
            cluster.clearMarkers();
        });
    };
    ClusterManager.prototype.setGridSize = function (c) {
        this.getClustererInstance().then(function (cluster) {
            cluster.setGridSize(c.gridSize);
        });
    };
    ClusterManager.prototype.setMaxZoom = function (c) {
        this.getClustererInstance().then(function (cluster) {
            cluster.setMaxZoom(c.maxZoom);
        });
    };
    ClusterManager.prototype.setStyles = function (c) {
        this.getClustererInstance().then(function (cluster) {
            cluster.setStyles(c.styles);
        });
    };
    ClusterManager.prototype.setZoomOnClick = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.zoomOnClick !== undefined) {
                cluster.zoomOnClick_ = c.zoomOnClick;
            }
        });
    };
    ClusterManager.prototype.setAverageCenter = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.averageCenter !== undefined) {
                cluster.averageCenter_ = c.averageCenter;
            }
        });
    };
    ClusterManager.prototype.setImagePath = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.imagePath !== undefined) {
                cluster.imagePath_ = c.imagePath;
            }
        });
    };
    ClusterManager.prototype.setMinimumClusterSize = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.minimumClusterSize !== undefined) {
                cluster.minimumClusterSize_ = c.minimumClusterSize;
            }
        });
    };
    ClusterManager.prototype.setImageExtension = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (c.imageExtension !== undefined) {
                cluster.imageExtension_ = c.imageExtension;
            }
        });
    };
    ClusterManager.prototype.createClusterEventObservable = function (eventName) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._zone.runOutsideAngular(function () {
                _this._clustererInstance.then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        });
    };
    ClusterManager.prototype.setCalculator = function (c) {
        this.getClustererInstance().then(function (cluster) {
            if (typeof c.calculator === 'function') {
                cluster.setCalculator(c.calculator);
            }
        });
    };
    ClusterManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    ClusterManager = tslib_1.__decorate([
        Injectable()
    ], ClusterManager);
    return ClusterManager;
}(MarkerManager));
export { ClusterManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9qcy1tYXJrZXItY2x1c3RlcmVyLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvY2x1c3Rlci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFRM0U7SUFBb0MsMENBQWE7SUFJL0Msd0JBQXNCLFlBQWtDLEVBQVksS0FBYTtRQUFqRixZQUNFLGtCQUFNLFlBQVksRUFBRSxLQUFLLENBQUMsU0FJM0I7UUFMcUIsa0JBQVksR0FBWixZQUFZLENBQXNCO1FBQVksV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUUvRSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQTBCLFVBQUMsUUFBUTtZQUN0RSxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQzs7SUFDTCxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE9BQXVCO1FBQTVCLGlCQUtDO1FBSkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ3ZDLElBQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNq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VSxFQUFFO09BQ0EsY0FBYyxDQWtKMUI7SUFBRCxxQkFBQztDQUFBLEFBbEpELENBQW9DLGFBQWEsR0FrSmhEO1NBbEpZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAnanMtbWFya2VyLWNsdXN0ZXJlcic7XHJcblxyXG5pbXBvcnQgeyBBZ21NYXJrZXIsIEdvb2dsZU1hcHNBUElXcmFwcGVyLCBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnQGFnbS9jb3JlJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnQGFnbS9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgQWdtTWFya2VyQ2x1c3RlciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbWFya2VyLWNsdXN0ZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyT3B0aW9ucywgTWFya2VyQ2x1c3RlcmVySW5zdGFuY2UgfSBmcm9tICcuLi9nb29nbGUtY2x1c3RlcmVyLXR5cGVzJztcclxuXHJcbmRlY2xhcmUgdmFyIE1hcmtlckNsdXN0ZXJlcjogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2x1c3Rlck1hbmFnZXIgZXh0ZW5kcyBNYXJrZXJNYW5hZ2VyIHtcclxuICBwcml2YXRlIF9jbHVzdGVyZXJJbnN0YW5jZTogUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT47XHJcbiAgcHJpdmF0ZSBfcmVzb2x2ZXI6IEZ1bmN0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJvdGVjdGVkIF96b25lOiBOZ1pvbmUpIHtcclxuICAgIHN1cGVyKF9tYXBzV3JhcHBlciwgX3pvbmUpO1xyXG4gICAgdGhpcy5fY2x1c3RlcmVySW5zdGFuY2UgPSBuZXcgUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT4oKHJlc29sdmVyKSA9PiB7XHJcbiAgICAgIHRoaXMuX3Jlc29sdmVyID0gcmVzb2x2ZXI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXQob3B0aW9uczogQ2x1c3Rlck9wdGlvbnMpOiB2b2lkIHtcclxuICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4obWFwID0+IHtcclxuICAgICAgY29uc3QgY2x1c3RlcmVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIFtdLCBvcHRpb25zKTtcclxuICAgICAgdGhpcy5fcmVzb2x2ZXIoY2x1c3RlcmVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKTogUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NsdXN0ZXJlckluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgYWRkTWFya2VyKG1hcmtlcjogQWdtTWFya2VyKTogdm9pZCB7XHJcbiAgICBjb25zdCBjbHVzdGVyUHJvbWlzZTogUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT4gPSB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCk7XHJcbiAgICBjb25zdCBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXJcclxuICAgICAgLmNyZWF0ZU1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgIGxhdDogbWFya2VyLmxhdGl0dWRlLFxyXG4gICAgICAgICAgbG5nOiBtYXJrZXIubG9uZ2l0dWRlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWw6IG1hcmtlci5sYWJlbCxcclxuICAgICAgICBkcmFnZ2FibGU6IG1hcmtlci5kcmFnZ2FibGUsXHJcbiAgICAgICAgaWNvbjogbWFya2VyLmljb25VcmwsXHJcbiAgICAgICAgb3BhY2l0eTogbWFya2VyLm9wYWNpdHksXHJcbiAgICAgICAgdmlzaWJsZTogbWFya2VyLnZpc2libGUsXHJcbiAgICAgICAgekluZGV4OiBtYXJrZXIuekluZGV4LFxyXG4gICAgICAgIHRpdGxlOiBtYXJrZXIudGl0bGUsXHJcbiAgICAgICAgY2xpY2thYmxlOiBtYXJrZXIuY2xpY2thYmxlLFxyXG4gICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgUHJvbWlzZVxyXG4gICAgICAuYWxsKFtjbHVzdGVyUHJvbWlzZSwgbWFya2VyUHJvbWlzZV0pXHJcbiAgICAgIC50aGVuKChbY2x1c3RlciwgbWFya2VyXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuX21hcmtlcnMuc2V0KG1hcmtlciwgbWFya2VyUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVNYXJrZXIobWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xyXG4gICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICAvLyBtYXJrZXIgYWxyZWFkeSBkZWxldGVkXHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtLnRoZW4oKG06IE1hcmtlcikgPT4ge1xyXG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgbS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XHJcbiAgICAgICAgICBjbHVzdGVyLnJlbW92ZU1hcmtlcihtKTtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcnMuZGVsZXRlKG1hcmtlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhck1hcmtlcnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XHJcbiAgICAgIGNsdXN0ZXIuY2xlYXJNYXJrZXJzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEdyaWRTaXplKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBjbHVzdGVyLnNldEdyaWRTaXplKGMuZ3JpZFNpemUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRNYXhab29tKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBjbHVzdGVyLnNldE1heFpvb20oYy5tYXhab29tKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0U3R5bGVzKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBjbHVzdGVyLnNldFN0eWxlcyhjLnN0eWxlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFpvb21PbkNsaWNrKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBpZiAoYy56b29tT25DbGljayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2x1c3Rlci56b29tT25DbGlja18gPSBjLnpvb21PbkNsaWNrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEF2ZXJhZ2VDZW50ZXIoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xyXG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XHJcbiAgICAgIGlmIChjLmF2ZXJhZ2VDZW50ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNsdXN0ZXIuYXZlcmFnZUNlbnRlcl8gPSBjLmF2ZXJhZ2VDZW50ZXI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW1hZ2VQYXRoKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBpZiAoYy5pbWFnZVBhdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNsdXN0ZXIuaW1hZ2VQYXRoXyA9IGMuaW1hZ2VQYXRoO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldE1pbmltdW1DbHVzdGVyU2l6ZShjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgaWYgKGMubWluaW11bUNsdXN0ZXJTaXplICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjbHVzdGVyLm1pbmltdW1DbHVzdGVyU2l6ZV8gPSBjLm1pbmltdW1DbHVzdGVyU2l6ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRJbWFnZUV4dGVuc2lvbihjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgaWYgKGMuaW1hZ2VFeHRlbnNpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNsdXN0ZXIuaW1hZ2VFeHRlbnNpb25fID0gYy5pbWFnZUV4dGVuc2lvbjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDbHVzdGVyRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9jbHVzdGVyZXJJbnN0YW5jZS50aGVuKChtOiBNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgICAgbS5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRDYWxjdWxhdG9yIChjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBjLmNhbGN1bGF0b3IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjbHVzdGVyLnNldENhbGN1bGF0b3IoYy5jYWxjdWxhdG9yKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==