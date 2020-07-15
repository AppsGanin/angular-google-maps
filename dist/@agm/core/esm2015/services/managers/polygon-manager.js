import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, skip, startWith, switchMap } from 'rxjs/operators';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
let PolygonManager = class PolygonManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    addPolygon(path) {
        const polygonPromise = this._mapsWrapper.createPolygon({
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
    }
    updatePolygon(polygon) {
        const m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => this._zone.run(() => { l.setPaths(polygon.paths); }));
    }
    setPolygonOptions(path, options) {
        return this._polygons.get(path).then((l) => { l.setOptions(options); });
    }
    deletePolygon(paths) {
        const m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.setMap(null);
                this._polygons.delete(paths);
            });
        });
    }
    getPath(polygon) {
        return this._polygons.get(polygon)
            .then((polygon) => polygon.getPath().getArray());
    }
    getPaths(polygon) {
        return this._polygons.get(polygon)
            .then((polygon) => polygon.getPaths().getArray().map((p) => p.getArray()));
    }
    createEventObservable(eventName, path) {
        return new Observable((observer) => {
            this._polygons.get(path).then((l) => {
                l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    createPathEventObservable(agmPolygon) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const polygon = yield this._polygons.get(agmPolygon);
            const paths = polygon.getPaths();
            const pathsChanges$ = createMVCEventObservable(paths);
            return pathsChanges$.pipe(startWith({ newArr: paths.getArray() }), // in order to subscribe to them all
            switchMap(parentMVEvent => merge(... // rest parameter
            parentMVEvent.newArr.map((chMVC, index) => createMVCEventObservable(chMVC)
                .pipe(map(chMVCEvent => ({ parentMVEvent, chMVCEvent, pathIndex: index })))))
                .pipe(startWith({ parentMVEvent, chMVCEvent: null, pathIndex: null }))), // start the merged ob with an event signinifing change to parent
            skip(1), // skip the manually added event
            map(({ parentMVEvent, chMVCEvent, pathIndex }) => {
                let retVal;
                if (!chMVCEvent) {
                    retVal = {
                        newArr: parentMVEvent.newArr.map(subArr => subArr.getArray().map(latLng => latLng.toJSON())),
                        eventName: parentMVEvent.evName,
                        index: parentMVEvent.index,
                    };
                    if (parentMVEvent.previous) {
                        retVal.previous = parentMVEvent.previous.getArray();
                    }
                }
                else {
                    retVal = {
                        newArr: parentMVEvent.newArr.map(subArr => subArr.getArray().map(latLng => latLng.toJSON())),
                        pathIndex,
                        eventName: chMVCEvent.evName,
                        index: chMVCEvent.index,
                    };
                    if (chMVCEvent.previous) {
                        retVal.previous = chMVCEvent.previous;
                    }
                }
                return retVal;
            }));
        });
    }
};
PolygonManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
PolygonManager = tslib_1.__decorate([
    Injectable()
], PolygonManager);
export { PolygonManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakUsT0FBTyxFQUFFLHdCQUF3QixFQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJbEUsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUl6QixZQUFvQixZQUFrQyxFQUFVLEtBQWE7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhyRSxjQUFTLEdBQ2YsSUFBSSxHQUFHLEVBQWdDLENBQUM7SUFFdUMsQ0FBQztJQUVsRixVQUFVLENBQUMsSUFBZ0I7UUFDekIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFDckQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBbUI7UUFDL0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2IsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBZ0IsRUFBRSxPQUFvQztRQUN0RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBaUI7UUFDN0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2IsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFVLEVBQUUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFtQjtRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzthQUMvQixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxRQUFRLENBQUMsT0FBbUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDL0IsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxxQkFBcUIsQ0FBSSxTQUFpQixFQUFFLElBQWdCO1FBQzFELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxRQUFxQixFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBVSxFQUFFLEVBQUU7Z0JBQzNDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLHlCQUF5QixDQUFDLFVBQXNCOztZQUNwRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxNQUFNLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBaUMsQ0FBQyxFQUFFLG9DQUFvQztZQUNySSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBRyxpQkFBaUI7WUFDbkQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDeEMsd0JBQXdCLENBQUMsS0FBSyxDQUFDO2lCQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUVBQWlFO1lBQzVJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxnQ0FBZ0M7WUFDekMsR0FBRyxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7Z0JBQy9DLElBQUksTUFBTSxDQUFDO2dCQUNYLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2YsTUFBTSxHQUFHO3dCQUNQLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzt3QkFDNUYsU0FBUyxFQUFFLGFBQWEsQ0FBQyxNQUFNO3dCQUMvQixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7cUJBQ2EsQ0FBQztvQkFDMUMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO3dCQUMxQixNQUFNLENBQUMsUUFBUSxHQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ3REO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sR0FBRzt3QkFDUCxNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7d0JBQzVGLFNBQVM7d0JBQ1QsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNO3dCQUM1QixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7cUJBQ00sQ0FBQztvQkFDaEMsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFO3dCQUN2QixNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7cUJBQ3ZDO2lCQUNGO2dCQUNELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO0tBQUE7Q0FDRixDQUFBOztZQW5HbUMsb0JBQW9CO1lBQWlCLE1BQU07O0FBSmxFLGNBQWM7SUFEMUIsVUFBVSxFQUFFO0dBQ0EsY0FBYyxDQXVHMUI7U0F2R1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBza2lwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEFnbVBvbHlnb24sIFBhdGhDaGFuZ2VQb2x5Z29uUGF0aEV2ZW50LCBQYXRoQ29sbGVjdGlvbkNoYW5nZVBvbHlnb25QYXRoRXZlbnQsIFBvbHlnb25QYXRoRXZlbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUsIE1WQ0V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvbXZjYXJyYXktdXRpbHMnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcclxuaW1wb3J0IHsgTGF0TG5nLCBNVkNBcnJheSwgUG9seWdvbiB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvbHlnb25NYW5hZ2VyIHtcclxuICBwcml2YXRlIF9wb2x5Z29uczogTWFwPEFnbVBvbHlnb24sIFByb21pc2U8UG9seWdvbj4+ID1cclxuICAgIG5ldyBNYXA8QWdtUG9seWdvbiwgUHJvbWlzZTxQb2x5Z29uPj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICBhZGRQb2x5Z29uKHBhdGg6IEFnbVBvbHlnb24pIHtcclxuICAgIGNvbnN0IHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWdvbih7XHJcbiAgICAgIGNsaWNrYWJsZTogcGF0aC5jbGlja2FibGUsXHJcbiAgICAgIGRyYWdnYWJsZTogcGF0aC5kcmFnZ2FibGUsXHJcbiAgICAgIGVkaXRhYmxlOiBwYXRoLmVkaXRhYmxlLFxyXG4gICAgICBmaWxsQ29sb3I6IHBhdGguZmlsbENvbG9yLFxyXG4gICAgICBmaWxsT3BhY2l0eTogcGF0aC5maWxsT3BhY2l0eSxcclxuICAgICAgZ2VvZGVzaWM6IHBhdGguZ2VvZGVzaWMsXHJcbiAgICAgIHBhdGhzOiBwYXRoLnBhdGhzLFxyXG4gICAgICBzdHJva2VDb2xvcjogcGF0aC5zdHJva2VDb2xvcixcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogcGF0aC5zdHJva2VPcGFjaXR5LFxyXG4gICAgICBzdHJva2VXZWlnaHQ6IHBhdGguc3Ryb2tlV2VpZ2h0LFxyXG4gICAgICB2aXNpYmxlOiBwYXRoLnZpc2libGUsXHJcbiAgICAgIHpJbmRleDogcGF0aC56SW5kZXgsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3BvbHlnb25zLnNldChwYXRoLCBwb2x5Z29uUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQb2x5Z29uKHBvbHlnb246IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbik7XHJcbiAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHsgbC5zZXRQYXRocyhwb2x5Z29uLnBhdGhzKTsgfSkpO1xyXG4gIH1cclxuXHJcbiAgc2V0UG9seWdvbk9wdGlvbnMocGF0aDogQWdtUG9seWdvbiwgb3B0aW9uczogeyBbcHJvcE5hbWU6IHN0cmluZ106IGFueSB9KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oKGw6IFBvbHlnb24pID0+IHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVBvbHlnb24ocGF0aHM6IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aHMpO1xyXG4gICAgaWYgKG0gPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgbC5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbnMuZGVsZXRlKHBhdGhzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBhdGgocG9seWdvbjogQWdtUG9seWdvbik6IFByb21pc2U8QXJyYXk8TGF0TG5nPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKVxyXG4gICAgICAudGhlbigocG9seWdvbikgPT4gcG9seWdvbi5nZXRQYXRoKCkuZ2V0QXJyYXkoKSk7XHJcbiAgfVxyXG5cclxuICBnZXRQYXRocyhwb2x5Z29uOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTxBcnJheTxBcnJheTxMYXRMbmc+Pj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKVxyXG4gICAgICAudGhlbigocG9seWdvbikgPT4gcG9seWdvbi5nZXRQYXRocygpLmdldEFycmF5KCkubWFwKChwKSA9PiBwLmdldEFycmF5KCkpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcGF0aDogQWdtUG9seWdvbik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oKGw6IFBvbHlnb24pID0+IHtcclxuICAgICAgICBsLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVBhdGhFdmVudE9ic2VydmFibGUoYWdtUG9seWdvbjogQWdtUG9seWdvbik6IFByb21pc2U8T2JzZXJ2YWJsZTxQb2x5Z29uUGF0aEV2ZW50PGFueT4+PiB7XHJcbiAgICBjb25zdCBwb2x5Z29uID0gYXdhaXQgdGhpcy5fcG9seWdvbnMuZ2V0KGFnbVBvbHlnb24pO1xyXG4gICAgY29uc3QgcGF0aHMgPSBwb2x5Z29uLmdldFBhdGhzKCk7XHJcbiAgICBjb25zdCBwYXRoc0NoYW5nZXMkID0gY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKHBhdGhzKTtcclxuICAgIHJldHVybiBwYXRoc0NoYW5nZXMkLnBpcGUoc3RhcnRXaXRoKCh7IG5ld0FycjogcGF0aHMuZ2V0QXJyYXkoKSB9IGFzIE1WQ0V2ZW50PE1WQ0FycmF5PExhdExuZz4+KSksIC8vIGluIG9yZGVyIHRvIHN1YnNjcmliZSB0byB0aGVtIGFsbFxyXG4gICAgICBzd2l0Y2hNYXAocGFyZW50TVZFdmVudCA9PiBtZXJnZSguLi4vLyByZXN0IHBhcmFtZXRlclxyXG4gICAgICAgIHBhcmVudE1WRXZlbnQubmV3QXJyLm1hcCgoY2hNVkMsIGluZGV4KSA9PlxyXG4gICAgICAgICAgY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKGNoTVZDKVxyXG4gICAgICAgICAgLnBpcGUobWFwKGNoTVZDRXZlbnQgPT4gKHsgcGFyZW50TVZFdmVudCwgY2hNVkNFdmVudCwgcGF0aEluZGV4OiBpbmRleCB9KSkpKSlcclxuICAgICAgICAucGlwZShzdGFydFdpdGgoeyBwYXJlbnRNVkV2ZW50LCBjaE1WQ0V2ZW50OiBudWxsLCBwYXRoSW5kZXg6IG51bGwgfSkpKSwgLy8gc3RhcnQgdGhlIG1lcmdlZCBvYiB3aXRoIGFuIGV2ZW50IHNpZ25pbmlmaW5nIGNoYW5nZSB0byBwYXJlbnRcclxuICAgICAgc2tpcCgxKSwgLy8gc2tpcCB0aGUgbWFudWFsbHkgYWRkZWQgZXZlbnRcclxuICAgICAgbWFwKCh7IHBhcmVudE1WRXZlbnQsIGNoTVZDRXZlbnQsIHBhdGhJbmRleCB9KSA9PiB7XHJcbiAgICAgICAgbGV0IHJldFZhbDtcclxuICAgICAgICBpZiAoIWNoTVZDRXZlbnQpIHtcclxuICAgICAgICAgIHJldFZhbCA9IHtcclxuICAgICAgICAgICAgbmV3QXJyOiBwYXJlbnRNVkV2ZW50Lm5ld0Fyci5tYXAoc3ViQXJyID0+IHN1YkFyci5nZXRBcnJheSgpLm1hcChsYXRMbmcgPT4gbGF0TG5nLnRvSlNPTigpKSksXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogcGFyZW50TVZFdmVudC5ldk5hbWUsXHJcbiAgICAgICAgICAgIGluZGV4OiBwYXJlbnRNVkV2ZW50LmluZGV4LFxyXG4gICAgICAgICAgfSBhcyBQYXRoQ29sbGVjdGlvbkNoYW5nZVBvbHlnb25QYXRoRXZlbnQ7XHJcbiAgICAgICAgICBpZiAocGFyZW50TVZFdmVudC5wcmV2aW91cykge1xyXG4gICAgICAgICAgICByZXRWYWwucHJldmlvdXMgPSAgcGFyZW50TVZFdmVudC5wcmV2aW91cy5nZXRBcnJheSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXRWYWwgPSB7XHJcbiAgICAgICAgICAgIG5ld0FycjogcGFyZW50TVZFdmVudC5uZXdBcnIubWFwKHN1YkFyciA9PiBzdWJBcnIuZ2V0QXJyYXkoKS5tYXAobGF0TG5nID0+IGxhdExuZy50b0pTT04oKSkpLFxyXG4gICAgICAgICAgICBwYXRoSW5kZXgsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY2hNVkNFdmVudC5ldk5hbWUsXHJcbiAgICAgICAgICAgIGluZGV4OiBjaE1WQ0V2ZW50LmluZGV4LFxyXG4gICAgICAgICAgfSBhcyBQYXRoQ2hhbmdlUG9seWdvblBhdGhFdmVudDtcclxuICAgICAgICAgIGlmIChjaE1WQ0V2ZW50LnByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIHJldFZhbC5wcmV2aW91cyA9IGNoTVZDRXZlbnQucHJldmlvdXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRWYWw7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcbn1cclxuIl19