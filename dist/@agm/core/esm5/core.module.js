import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AgmBicyclingLayer } from './directives/bicycling-layer';
import { AgmCircle } from './directives/circle';
import { AgmDataLayer } from './directives/data-layer';
import { AgmFitBounds } from './directives/fit-bounds';
import { AgmInfoWindow } from './directives/info-window';
import { AgmKmlLayer } from './directives/kml-layer';
import { AgmMap } from './directives/map';
import { AgmMarker } from './directives/marker';
import { AgmPolygon } from './directives/polygon';
import { AgmPolyline } from './directives/polyline';
import { AgmPolylineIcon } from './directives/polyline-icon';
import { AgmPolylinePoint } from './directives/polyline-point';
import { AgmRectangle } from './directives/rectangle';
import { AgmTransitLayer } from './directives/transit-layer';
import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoader } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
/**
 * @internal
 */
export function coreDirectives() {
    return [
        AgmBicyclingLayer,
        AgmCircle,
        AgmDataLayer,
        AgmFitBounds,
        AgmInfoWindow,
        AgmKmlLayer,
        AgmMap,
        AgmMarker,
        AgmPolygon,
        AgmPolyline,
        AgmPolylineIcon,
        AgmPolylinePoint,
        AgmRectangle,
        AgmTransitLayer,
    ];
}
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = /** @class */ (function () {
    function AgmCoreModule() {
    }
    AgmCoreModule_1 = AgmCoreModule;
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule_1,
            providers: tslib_1.__spread(BROWSER_GLOBALS_PROVIDERS, [
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
            ]),
        };
    };
    var AgmCoreModule_1;
    AgmCoreModule = AgmCoreModule_1 = tslib_1.__decorate([
        NgModule({ declarations: coreDirectives(), exports: coreDirectives() })
    ], AgmCoreModule);
    return AgmCoreModule;
}());
export { AgmCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFrQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzFJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUUzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sVUFBVSxjQUFjO0lBQzVCLE9BQU87UUFDTCxpQkFBaUI7UUFDakIsU0FBUztRQUNULFlBQVk7UUFDWixZQUFZO1FBQ1osYUFBYTtRQUNiLFdBQVc7UUFDWCxNQUFNO1FBQ04sU0FBUztRQUNULFVBQVU7UUFDVixXQUFXO1FBQ1gsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osZUFBZTtLQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUVIO0lBQUE7SUFhQSxDQUFDO3NCQWJZLGFBQWE7SUFDeEI7O09BRUc7SUFDSSxxQkFBTyxHQUFkLFVBQWUsdUJBQXdEO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBYTtZQUN2QixTQUFTLG1CQUNKLHlCQUF5QjtnQkFBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2dCQUNuRixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7Y0FDbkU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFaVSxhQUFhO1FBRHpCLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUMsQ0FBQztPQUN6RCxhQUFhLENBYXpCO0lBQUQsb0JBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFnbUJpY3ljbGluZ0xheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JpY3ljbGluZy1sYXllcic7XHJcbmltcG9ydCB7IEFnbUNpcmNsZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9jaXJjbGUnO1xyXG5pbXBvcnQgeyBBZ21EYXRhTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGF0YS1sYXllcic7XHJcbmltcG9ydCB7IEFnbUZpdEJvdW5kcyB9IGZyb20gJy4vZGlyZWN0aXZlcy9maXQtYm91bmRzJztcclxuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4vZGlyZWN0aXZlcy9pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEFnbUttbExheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ttbC1sYXllcic7XHJcbmltcG9ydCB7IEFnbU1hcCB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXAnO1xyXG5pbXBvcnQgeyBBZ21NYXJrZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFya2VyJztcclxuaW1wb3J0IHsgQWdtUG9seWdvbiB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5Z29uJztcclxuaW1wb3J0IHsgQWdtUG9seWxpbmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBBZ21Qb2x5bGluZUljb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUtaWNvbic7XHJcbmltcG9ydCB7IEFnbVBvbHlsaW5lUG9pbnQgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQnO1xyXG5pbXBvcnQgeyBBZ21SZWN0YW5nbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVjdGFuZ2xlJztcclxuaW1wb3J0IHsgQWdtVHJhbnNpdExheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyYW5zaXQtbGF5ZXInO1xyXG5cclxuaW1wb3J0IHsgTEFaWV9NQVBTX0FQSV9DT05GSUcsIExhenlNYXBzQVBJTG9hZGVyLCBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWwgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlcic7XHJcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xyXG5cclxuaW1wb3J0IHsgQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUyB9IGZyb20gJy4vdXRpbHMvYnJvd3Nlci1nbG9iYWxzJztcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3JlRGlyZWN0aXZlcygpIHtcclxuICByZXR1cm4gW1xyXG4gICAgQWdtQmljeWNsaW5nTGF5ZXIsXHJcbiAgICBBZ21DaXJjbGUsXHJcbiAgICBBZ21EYXRhTGF5ZXIsXHJcbiAgICBBZ21GaXRCb3VuZHMsXHJcbiAgICBBZ21JbmZvV2luZG93LFxyXG4gICAgQWdtS21sTGF5ZXIsXHJcbiAgICBBZ21NYXAsXHJcbiAgICBBZ21NYXJrZXIsXHJcbiAgICBBZ21Qb2x5Z29uLFxyXG4gICAgQWdtUG9seWxpbmUsXHJcbiAgICBBZ21Qb2x5bGluZUljb24sXHJcbiAgICBBZ21Qb2x5bGluZVBvaW50LFxyXG4gICAgQWdtUmVjdGFuZ2xlLFxyXG4gICAgQWdtVHJhbnNpdExheWVyLFxyXG4gIF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgYW5ndWxhci1nb29nbGUtbWFwcyBjb3JlIG1vZHVsZS4gQ29udGFpbnMgYWxsIERpcmVjdGl2ZXMvU2VydmljZXMvUGlwZXNcclxuICogb2YgdGhlIGNvcmUgbW9kdWxlLiBQbGVhc2UgdXNlIGBBZ21Db3JlTW9kdWxlLmZvclJvb3QoKWAgaW4geW91ciBhcHAgbW9kdWxlLlxyXG4gKi9cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IGNvcmVEaXJlY3RpdmVzKCksIGV4cG9ydHM6IGNvcmVEaXJlY3RpdmVzKCl9KVxyXG5leHBvcnQgY2xhc3MgQWdtQ29yZU1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogUGxlYXNlIHVzZSB0aGlzIG1ldGhvZCB3aGVuIHlvdSByZWdpc3RlciB0aGUgbW9kdWxlIGF0IHRoZSByb290IGxldmVsLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KGxhenlNYXBzQVBJTG9hZGVyQ29uZmlnPzogTGF6eU1hcHNBUElMb2FkZXJDb25maWdMaXRlcmFsKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQWdtQ29yZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLi4uQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUywge3Byb3ZpZGU6IE1hcHNBUElMb2FkZXIsIHVzZUNsYXNzOiBMYXp5TWFwc0FQSUxvYWRlcn0sXHJcbiAgICAgICAge3Byb3ZpZGU6IExBWllfTUFQU19BUElfQ09ORklHLCB1c2VWYWx1ZTogbGF6eU1hcHNBUElMb2FkZXJDb25maWd9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19