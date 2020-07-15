import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolylineManager = /** @class */ (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager_1 = PolylineManager;
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager._convertPath = function (path) {
        var symbolPath = google.maps.SymbolPath[path];
        if (typeof symbolPath === 'number') {
            return symbolPath;
        }
        else {
            return path;
        }
    };
    PolylineManager._convertIcons = function (line) {
        var icons = line._getIcons().map(function (agmIcon) { return ({
            fixedRotation: agmIcon.fixedRotation,
            offset: agmIcon.offset,
            repeat: agmIcon.repeat,
            icon: {
                anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
                fillColor: agmIcon.fillColor,
                fillOpacity: agmIcon.fillOpacity,
                path: PolylineManager_1._convertPath(agmIcon.path),
                rotation: agmIcon.rotation,
                scale: agmIcon.scale,
                strokeColor: agmIcon.strokeColor,
                strokeOpacity: agmIcon.strokeOpacity,
                strokeWeight: agmIcon.strokeWeight,
            },
        }); });
        // prune undefineds;
        icons.forEach(function (icon) {
            Object.entries(icon).forEach(function (_a) {
                var _b = tslib_1.__read(_a, 2), key = _b[0], val = _b[1];
                if (typeof val === 'undefined') {
                    delete icon[key];
                }
            });
            if (typeof icon.icon.anchor.x === 'undefined' ||
                typeof icon.icon.anchor.y === 'undefined') {
                delete icon.icon.anchor;
            }
        });
        return icons;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var _this = this;
        var polylinePromise = this._mapsWrapper.getNativeMap()
            .then(function () { return [PolylineManager_1._convertPoints(line),
            PolylineManager_1._convertIcons(line)]; })
            .then(function (_a) {
            var _b = tslib_1.__read(_a, 2), path = _b[0], icons = _b[1];
            return _this._mapsWrapper.createPolyline({
                clickable: line.clickable,
                draggable: line.draggable,
                editable: line.editable,
                geodesic: line.geodesic,
                strokeColor: line.strokeColor,
                strokeOpacity: line.strokeOpacity,
                strokeWeight: line.strokeWeight,
                visible: line.visible,
                zIndex: line.zIndex,
                path: path,
                icons: icons,
            });
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager_1._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.updateIconSequences = function (line) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var icons, m;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mapsWrapper.getNativeMap()];
                    case 1:
                        _a.sent();
                        icons = PolylineManager_1._convertIcons(line);
                        m = this._polylines.get(line);
                        if (m == null) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, m.then(function (l) { return _this._zone.run(function () { return l.setOptions({ icons: icons }); }); })];
                }
            });
        });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.getMVCPath = function (agmPolyline) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var polyline;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._polylines.get(agmPolyline)];
                    case 1:
                        polyline = _a.sent();
                        return [2 /*return*/, polyline.getPath()];
                }
            });
        });
    };
    PolylineManager.prototype.getPath = function (agmPolyline) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMVCPath(agmPolyline)];
                    case 1: return [2 /*return*/, (_a.sent()).getArray()];
                }
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolylineManager.prototype.createPathEventObservable = function (line) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mvcPath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMVCPath(line)];
                    case 1:
                        mvcPath = _a.sent();
                        return [2 /*return*/, createMVCEventObservable(mvcPath)];
                }
            });
        });
    };
    var PolylineManager_1;
    PolylineManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    PolylineManager = PolylineManager_1 = tslib_1.__decorate([
        Injectable()
    ], PolylineManager);
    return PolylineManager;
}());
export { PolylineManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNbEU7SUFJRSx5QkFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsZUFBVSxHQUNkLElBQUksR0FBRyxFQUFrQyxDQUFDO0lBRWtDLENBQUM7d0JBSnRFLGVBQWU7SUFNWCw4QkFBYyxHQUE3QixVQUE4QixJQUFpQjtRQUM3QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBdUI7WUFDekQsT0FBTyxFQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFrQixDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRWMsNEJBQVksR0FBM0IsVUFBNEIsSUFDRztRQUM3QixJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNsQyxPQUFPLFVBQVUsQ0FBQztTQUNuQjthQUFLO1lBQ0osT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENB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Q0FBcUIsR0FBckIsVUFBeUIsU0FBaUIsRUFBRSxJQUFpQjtRQUE3RCxpQkFNQztRQUxDLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFxQjtZQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFXO2dCQUN6QyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLG1EQUF5QixHQUEvQixVQUFnQyxJQUFpQjs7Ozs7NEJBQy9CLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFyQyxPQUFPLEdBQUcsU0FBMkI7d0JBQzNDLHNCQUFPLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFDOzs7O0tBQzFDOzs7Z0JBaklpQyxvQkFBb0I7Z0JBQWlCLE1BQU07O0lBSmxFLGVBQWU7UUFEM0IsVUFBVSxFQUFFO09BQ0EsZUFBZSxDQXNJM0I7SUFBRCxzQkFBQztDQUFBLEFBdElELElBc0lDO1NBdElZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFnbVBvbHlsaW5lLCBQYXRoRXZlbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQnO1xyXG5pbXBvcnQgeyBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi91dGlscy9tdmNhcnJheS11dGlscyc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xyXG5pbXBvcnQgeyBJY29uU2VxdWVuY2UsIExhdExuZywgTGF0TG5nTGl0ZXJhbCwgTVZDQXJyYXksIFBvbHlsaW5lIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb2x5bGluZU1hbmFnZXIge1xyXG4gIHByaXZhdGUgX3BvbHlsaW5lczogTWFwPEFnbVBvbHlsaW5lLCBQcm9taXNlPFBvbHlsaW5lPj4gPVxyXG4gICAgICBuZXcgTWFwPEFnbVBvbHlsaW5lLCBQcm9taXNlPFBvbHlsaW5lPj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0UG9pbnRzKGxpbmU6IEFnbVBvbHlsaW5lKTogQXJyYXk8TGF0TG5nTGl0ZXJhbD4ge1xyXG4gICAgY29uc3QgcGF0aCA9IGxpbmUuX2dldFBvaW50cygpLm1hcCgocG9pbnQ6IEFnbVBvbHlsaW5lUG9pbnQpID0+IHtcclxuICAgICAgcmV0dXJuIHtsYXQ6IHBvaW50LmxhdGl0dWRlLCBsbmc6IHBvaW50LmxvbmdpdHVkZX0gYXMgTGF0TG5nTGl0ZXJhbDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBhdGg7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfY29udmVydFBhdGgocGF0aDogJ0NJUkNMRScgfCAnQkFDS1dBUkRfQ0xPU0VEX0FSUk9XJyB8ICdCQUNLV0FSRF9PUEVOX0FSUk9XJyB8ICdGT1JXQVJEX0NMT1NFRF9BUlJPVycgfFxyXG4gICdGT1JXQVJEX0NMT1NFRF9BUlJPVycgfCBzdHJpbmcpOiBudW1iZXIgfCBzdHJpbmd7XHJcbiAgICBjb25zdCBzeW1ib2xQYXRoID0gZ29vZ2xlLm1hcHMuU3ltYm9sUGF0aFtwYXRoXTtcclxuICAgIGlmICh0eXBlb2Ygc3ltYm9sUGF0aCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHN5bWJvbFBhdGg7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2NvbnZlcnRJY29ucyhsaW5lOiBBZ21Qb2x5bGluZSk6IEFycmF5PEljb25TZXF1ZW5jZT4ge1xyXG4gICAgY29uc3QgaWNvbnMgPSBsaW5lLl9nZXRJY29ucygpLm1hcChhZ21JY29uID0+ICh7XHJcbiAgICAgIGZpeGVkUm90YXRpb246IGFnbUljb24uZml4ZWRSb3RhdGlvbixcclxuICAgICAgb2Zmc2V0OiBhZ21JY29uLm9mZnNldCxcclxuICAgICAgcmVwZWF0OiBhZ21JY29uLnJlcGVhdCxcclxuICAgICAgaWNvbjoge1xyXG4gICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KGFnbUljb24uYW5jaG9yWCwgYWdtSWNvbi5hbmNob3JZKSxcclxuICAgICAgICBmaWxsQ29sb3I6IGFnbUljb24uZmlsbENvbG9yLFxyXG4gICAgICAgIGZpbGxPcGFjaXR5OiBhZ21JY29uLmZpbGxPcGFjaXR5LFxyXG4gICAgICAgIHBhdGg6IFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBhdGgoYWdtSWNvbi5wYXRoKSxcclxuICAgICAgICByb3RhdGlvbjogYWdtSWNvbi5yb3RhdGlvbixcclxuICAgICAgICBzY2FsZTogYWdtSWNvbi5zY2FsZSxcclxuICAgICAgICBzdHJva2VDb2xvcjogYWdtSWNvbi5zdHJva2VDb2xvcixcclxuICAgICAgICBzdHJva2VPcGFjaXR5OiBhZ21JY29uLnN0cm9rZU9wYWNpdHksXHJcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiBhZ21JY29uLnN0cm9rZVdlaWdodCxcclxuICAgICAgfSxcclxuICAgIH0gYXMgSWNvblNlcXVlbmNlKSk7XHJcbiAgICAvLyBwcnVuZSB1bmRlZmluZWRzO1xyXG4gICAgaWNvbnMuZm9yRWFjaChpY29uID0+IHtcclxuICAgICAgT2JqZWN0LmVudHJpZXMoaWNvbikuZm9yRWFjaCgoW2tleSwgdmFsXSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZGVsZXRlIChpY29uIGFzIGFueSlba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodHlwZW9mIGljb24uaWNvbi5hbmNob3IueCA9PT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICB0eXBlb2YgaWNvbi5pY29uLmFuY2hvci55ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZGVsZXRlIGljb24uaWNvbi5hbmNob3I7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaWNvbnM7XHJcbiAgfVxyXG5cclxuICBhZGRQb2x5bGluZShsaW5lOiBBZ21Qb2x5bGluZSkge1xyXG4gICAgY29uc3QgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKClcclxuICAgIC50aGVuKCgpID0+IFsgUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0UG9pbnRzKGxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRJY29ucyhsaW5lKV0pXHJcbiAgICAudGhlbigoW3BhdGgsIGljb25zXTogW0xhdExuZ0xpdGVyYWxbXSwgSWNvblNlcXVlbmNlW11dKSA9PlxyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVQb2x5bGluZSh7XHJcbiAgICAgICAgY2xpY2thYmxlOiBsaW5lLmNsaWNrYWJsZSxcclxuICAgICAgICBkcmFnZ2FibGU6IGxpbmUuZHJhZ2dhYmxlLFxyXG4gICAgICAgIGVkaXRhYmxlOiBsaW5lLmVkaXRhYmxlLFxyXG4gICAgICAgIGdlb2Rlc2ljOiBsaW5lLmdlb2Rlc2ljLFxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiBsaW5lLnN0cm9rZUNvbG9yLFxyXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IGxpbmUuc3Ryb2tlT3BhY2l0eSxcclxuICAgICAgICBzdHJva2VXZWlnaHQ6IGxpbmUuc3Ryb2tlV2VpZ2h0LFxyXG4gICAgICAgIHZpc2libGU6IGxpbmUudmlzaWJsZSxcclxuICAgICAgICB6SW5kZXg6IGxpbmUuekluZGV4LFxyXG4gICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgaWNvbnM6IGljb25zLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5fcG9seWxpbmVzLnNldChsaW5lLCBwb2x5bGluZVByb21pc2UpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUG9seWxpbmVQb2ludHMobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHBhdGggPSBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMobGluZSk7XHJcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKTtcclxuICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG0udGhlbigobDogUG9seWxpbmUpID0+IHsgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHsgbC5zZXRQYXRoKHBhdGgpOyB9KTsgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGVJY29uU2VxdWVuY2VzKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKTtcclxuICAgIGNvbnN0IGljb25zID0gUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0SWNvbnMobGluZSk7XHJcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKTtcclxuICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG0udGhlbihsID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IGwuc2V0T3B0aW9ucyh7aWNvbnM6IGljb25zfSkgKSApO1xyXG4gIH1cclxuXHJcbiAgc2V0UG9seWxpbmVPcHRpb25zKGxpbmU6IEFnbVBvbHlsaW5lLCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9KTpcclxuICAgICAgUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKS50aGVuKChsOiBQb2x5bGluZSkgPT4geyBsLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlUG9seWxpbmUobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xyXG4gICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5bGluZSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIGwuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5kZWxldGUobGluZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGdldE1WQ1BhdGgoYWdtUG9seWxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTxNVkNBcnJheTxMYXRMbmc+PiB7XHJcbiAgICBjb25zdCBwb2x5bGluZSA9IGF3YWl0IHRoaXMuX3BvbHlsaW5lcy5nZXQoYWdtUG9seWxpbmUpO1xyXG4gICAgcmV0dXJuIHBvbHlsaW5lLmdldFBhdGgoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFBhdGgoYWdtUG9seWxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XHJcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0TVZDUGF0aChhZ21Qb2x5bGluZSkpLmdldEFycmF5KCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGxpbmU6IEFnbVBvbHlsaW5lKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpLnRoZW4oKGw6IFBvbHlsaW5lKSA9PiB7XHJcbiAgICAgICAgbC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTxPYnNlcnZhYmxlPFBhdGhFdmVudD4+IHtcclxuICAgIGNvbnN0IG12Y1BhdGggPSBhd2FpdCB0aGlzLmdldE1WQ1BhdGgobGluZSk7XHJcbiAgICByZXR1cm4gY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKG12Y1BhdGgpO1xyXG4gIH1cclxufVxyXG4iXX0=