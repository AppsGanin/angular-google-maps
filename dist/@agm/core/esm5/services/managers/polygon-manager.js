import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, skip, startWith, switchMap } from 'rxjs/operators';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolygonManager = /** @class */ (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.getPath = function (polygon) {
        return this._polygons.get(polygon)
            .then(function (polygon) { return polygon.getPath().getArray(); });
    };
    PolygonManager.prototype.getPaths = function (polygon) {
        return this._polygons.get(polygon)
            .then(function (polygon) { return polygon.getPaths().getArray().map(function (p) { return p.getArray(); }); });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolygonManager.prototype.createPathEventObservable = function (agmPolygon) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var polygon, paths, pathsChanges$;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._polygons.get(agmPolygon)];
                    case 1:
                        polygon = _a.sent();
                        paths = polygon.getPaths();
                        pathsChanges$ = createMVCEventObservable(paths);
                        return [2 /*return*/, pathsChanges$.pipe(startWith({ newArr: paths.getArray() }), // in order to subscribe to them all
                            switchMap(function (parentMVEvent) { return merge.apply(void 0, tslib_1.__spread(// rest parameter
                            parentMVEvent.newArr.map(function (chMVC, index) {
                                return createMVCEventObservable(chMVC)
                                    .pipe(map(function (chMVCEvent) { return ({ parentMVEvent: parentMVEvent, chMVCEvent: chMVCEvent, pathIndex: index }); }));
                            }))).pipe(startWith({ parentMVEvent: parentMVEvent, chMVCEvent: null, pathIndex: null })); }), // start the merged ob with an event signinifing change to parent
                            skip(1), // skip the manually added event
                            map(function (_a) {
                                var parentMVEvent = _a.parentMVEvent, chMVCEvent = _a.chMVCEvent, pathIndex = _a.pathIndex;
                                var retVal;
                                if (!chMVCEvent) {
                                    retVal = {
                                        newArr: parentMVEvent.newArr.map(function (subArr) { return subArr.getArray().map(function (latLng) { return latLng.toJSON(); }); }),
                                        eventName: parentMVEvent.evName,
                                        index: parentMVEvent.index,
                                    };
                                    if (parentMVEvent.previous) {
                                        retVal.previous = parentMVEvent.previous.getArray();
                                    }
                                }
                                else {
                                    retVal = {
                                        newArr: parentMVEvent.newArr.map(function (subArr) { return subArr.getArray().map(function (latLng) { return latLng.toJSON(); }); }),
                                        pathIndex: pathIndex,
                                        eventName: chMVCEvent.evName,
                                        index: chMVCEvent.index,
                                    };
                                    if (chMVCEvent.previous) {
                                        retVal.previous = chMVCEvent.previous;
                                    }
                                }
                                return retVal;
                            }))];
                }
            });
        });
    };
    PolygonManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    PolygonManager = tslib_1.__decorate([
        Injectable()
    ], PolygonManager);
    return PolygonManager;
}());
export { PolygonManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakUsT0FBTyxFQUFFLHdCQUF3QixFQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJbEU7SUFJRSx3QkFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsY0FBUyxHQUNmLElBQUksR0FBRyxFQUFnQyxDQUFDO0lBRXVDLENBQUM7SUFFbEYsbUNBQVUsR0FBVixVQUFXLElBQWdCO1FBQ3pCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBQ3JELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxh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LENBQUMsRUFBQzs7OztLQUNQOztnQkFsR2lDLG9CQUFvQjtnQkFBaUIsTUFBTTs7SUFKbEUsY0FBYztRQUQxQixVQUFVLEVBQUU7T0FDQSxjQUFjLENBdUcxQjtJQUFELHFCQUFDO0NBQUEsQUF2R0QsSUF1R0M7U0F2R1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBza2lwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEFnbVBvbHlnb24sIFBhdGhDaGFuZ2VQb2x5Z29uUGF0aEV2ZW50LCBQYXRoQ29sbGVjdGlvbkNoYW5nZVBvbHlnb25QYXRoRXZlbnQsIFBvbHlnb25QYXRoRXZlbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUsIE1WQ0V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvbXZjYXJyYXktdXRpbHMnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcclxuaW1wb3J0IHsgTGF0TG5nLCBNVkNBcnJheSwgUG9seWdvbiB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvbHlnb25NYW5hZ2VyIHtcclxuICBwcml2YXRlIF9wb2x5Z29uczogTWFwPEFnbVBvbHlnb24sIFByb21pc2U8UG9seWdvbj4+ID1cclxuICAgIG5ldyBNYXA8QWdtUG9seWdvbiwgUHJvbWlzZTxQb2x5Z29uPj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICBhZGRQb2x5Z29uKHBhdGg6IEFnbVBvbHlnb24pIHtcclxuICAgIGNvbnN0IHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWdvbih7XHJcbiAgICAgIGNsaWNrYWJsZTogcGF0aC5jbGlja2FibGUsXHJcbiAgICAgIGRyYWdnYWJsZTogcGF0aC5kcmFnZ2FibGUsXHJcbiAgICAgIGVkaXRhYmxlOiBwYXRoLmVkaXRhYmxlLFxyXG4gICAgICBmaWxsQ29sb3I6IHBhdGguZmlsbENvbG9yLFxyXG4gICAgICBmaWxsT3BhY2l0eTogcGF0aC5maWxsT3BhY2l0eSxcclxuICAgICAgZ2VvZGVzaWM6IHBhdGguZ2VvZGVzaWMsXHJcbiAgICAgIHBhdGhzOiBwYXRoLnBhdGhzLFxyXG4gICAgICBzdHJva2VDb2xvcjogcGF0aC5zdHJva2VDb2xvcixcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogcGF0aC5zdHJva2VPcGFjaXR5LFxyXG4gICAgICBzdHJva2VXZWlnaHQ6IHBhdGguc3Ryb2tlV2VpZ2h0LFxyXG4gICAgICB2aXNpYmxlOiBwYXRoLnZpc2libGUsXHJcbiAgICAgIHpJbmRleDogcGF0aC56SW5kZXgsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3BvbHlnb25zLnNldChwYXRoLCBwb2x5Z29uUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQb2x5Z29uKHBvbHlnb246IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbik7XHJcbiAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHsgbC5zZXRQYXRocyhwb2x5Z29uLnBhdGhzKTsgfSkpO1xyXG4gIH1cclxuXHJcbiAgc2V0UG9seWdvbk9wdGlvbnMocGF0aDogQWdtUG9seWdvbiwgb3B0aW9uczogeyBbcHJvcE5hbWU6IHN0cmluZ106IGFueSB9KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oKGw6IFBvbHlnb24pID0+IHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVBvbHlnb24ocGF0aHM6IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aHMpO1xyXG4gICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgbC5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbnMuZGVsZXRlKHBhdGhzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBhdGgocG9seWdvbjogQWdtUG9seWdvbik6IFByb21pc2U8QXJyYXk8TGF0TG5nPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKVxyXG4gICAgICAudGhlbigocG9seWdvbikgPT4gcG9seWdvbi5nZXRQYXRoKCkuZ2V0QXJyYXkoKSk7XHJcbiAgfVxyXG5cclxuICBnZXRQYXRocyhwb2x5Z29uOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTxBcnJheTxBcnJheTxMYXRMbmc+Pj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKVxyXG4gICAgICAudGhlbigocG9seWdvbikgPT4gcG9seWdvbi5nZXRQYXRocygpLmdldEFycmF5KCkubWFwKChwKSA9PiBwLmdldEFycmF5KCkpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcGF0aDogQWdtUG9seWdvbik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oKGw6IFBvbHlnb24pID0+IHtcclxuICAgICAgICBsLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVBhdGhFdmVudE9ic2VydmFibGUoYWdtUG9seWdvbjogQWdtUG9seWdvbik6IFByb21pc2U8T2JzZXJ2YWJsZTxQb2x5Z29uUGF0aEV2ZW50PGFueT4+PiB7XHJcbiAgICBjb25zdCBwb2x5Z29uID0gYXdhaXQgdGhpcy5fcG9seWdvbnMuZ2V0KGFnbVBvbHlnb24pO1xyXG4gICAgY29uc3QgcGF0aHMgPSBwb2x5Z29uLmdldFBhdGhzKCk7XHJcbiAgICBjb25zdCBwYXRoc0NoYW5nZXMkID0gY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKHBhdGhzKTtcclxuICAgIHJldHVybiBwYXRoc0NoYW5nZXMkLnBpcGUoc3RhcnRXaXRoKCh7IG5ld0FycjogcGF0aHMuZ2V0QXJyYXkoKSB9IGFzIE1WQ0V2ZW50PE1WQ0FycmF5PExhdExuZz4+KSksIC8vIGluIG9yZGVyIHRvIHN1YnNjcmliZSB0byB0aGVtIGFsbFxyXG4gICAgICBzd2l0Y2hNYXAocGFyZW50TVZFdmVudCA9PiBtZXJnZSguLi4vLyByZXN0IHBhcmFtZXRlclxyXG4gICAgICAgIHBhcmVudE1WRXZlbnQubmV3QXJyLm1hcCgoY2hNVkMsIGluZGV4KSA9PlxyXG4gICAgICAgICAgY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKGNoTVZDKVxyXG4gICAgICAgICAgLnBpcGUobWFwKGNoTVZDRXZlbnQgPT4gKHsgcGFyZW50TVZFdmVudCwgY2hNVkNFdmVudCwgcGF0aEluZGV4OiBpbmRleCB9KSkpKSlcclxuICAgICAgICAucGlwZShzdGFydFdpdGgoeyBwYXJlbnRNVkV2ZW50LCBjaE1WQ0V2ZW50OiBudWxsLCBwYXRoSW5kZXg6IG51bGwgfSkpKSwgLy8gc3RhcnQgdGhlIG1lcmdlZCBvYiB3aXRoIGFuIGV2ZW50IHNpZ25pbmlmaW5nIGNoYW5nZSB0byBwYXJlbnRcclxuICAgICAgc2tpcCgxKSwgLy8gc2tpcCB0aGUgbWFudWFsbHkgYWRkZWQgZXZlbnRcclxuICAgICAgbWFwKCh7IHBhcmVudE1WRXZlbnQsIGNoTVZDRXZlbnQsIHBhdGhJbmRleCB9KSA9PiB7XHJcbiAgICAgICAgbGV0IHJldFZhbDtcclxuICAgICAgICBpZiAoIWNoTVZDRXZlbnQpIHtcclxuICAgICAgICAgIHJldFZhbCA9IHtcclxuICAgICAgICAgICAgbmV3QXJyOiBwYXJlbnRNVkV2ZW50Lm5ld0Fyci5tYXAoc3ViQXJyID0+IHN1YkFyci5nZXRBcnJheSgpLm1hcChsYXRMbmcgPT4gbGF0TG5nLnRvSlNPTigpKSksXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogcGFyZW50TVZFdmVudC5ldk5hbWUsXHJcbiAgICAgICAgICAgIGluZGV4OiBwYXJlbnRNVkV2ZW50LmluZGV4LFxyXG4gICAgICAgICAgfSBhcyBQYXRoQ29sbGVjdGlvbkNoYW5nZVBvbHlnb25QYXRoRXZlbnQ7XHJcbiAgICAgICAgICBpZiAocGFyZW50TVZFdmVudC5wcmV2aW91cykge1xyXG4gICAgICAgICAgICByZXRWYWwucHJldmlvdXMgPSAgcGFyZW50TVZFdmVudC5wcmV2aW91cy5nZXRBcnJheSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXRWYWwgPSB7XHJcbiAgICAgICAgICAgIG5ld0FycjogcGFyZW50TVZFdmVudC5uZXdBcnIubWFwKHN1YkFyciA9PiBzdWJBcnIuZ2V0QXJyYXkoKS5tYXAobGF0TG5nID0+IGxhdExuZy50b0pTT04oKSkpLFxyXG4gICAgICAgICAgICBwYXRoSW5kZXgsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY2hNVkNFdmVudC5ldk5hbWUsXHJcbiAgICAgICAgICAgIGluZGV4OiBjaE1WQ0V2ZW50LmluZGV4LFxyXG4gICAgICAgICAgfSBhcyBQYXRoQ2hhbmdlUG9seWdvblBhdGhFdmVudDtcclxuICAgICAgICAgIGlmIChjaE1WQ0V2ZW50LnByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIHJldFZhbC5wcmV2aW91cyA9IGNoTVZDRXZlbnQucHJldmlvdXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRWYWw7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcbn1cclxuIl19