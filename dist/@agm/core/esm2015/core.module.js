import * as tslib_1 from "tslib";
var AgmCoreModule_1;
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
let AgmCoreModule = AgmCoreModule_1 = class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule_1,
            providers: [
                ...BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
            ],
        };
    }
};
AgmCoreModule = AgmCoreModule_1 = tslib_1.__decorate([
    NgModule({ declarations: coreDirectives(), exports: coreDirectives() })
], AgmCoreModule);
export { AgmCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBa0MsTUFBTSxpREFBaUQsQ0FBQztBQUMxSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYztJQUM1QixPQUFPO1FBQ0wsaUJBQWlCO1FBQ2pCLFNBQVM7UUFDVCxZQUFZO1FBQ1osWUFBWTtRQUNaLGFBQWE7UUFDYixXQUFXO1FBQ1gsTUFBTTtRQUNOLFNBQVM7UUFDVCxVQUFVO1FBQ1YsV0FBVztRQUNYLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGVBQWU7S0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFFSCxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYTtJQUN4Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXdEO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyx5QkFBeUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2dCQUNuRixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7YUFDbkU7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFiWSxhQUFhO0lBRHpCLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUMsQ0FBQztHQUN6RCxhQUFhLENBYXpCO1NBYlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBZ21CaWN5Y2xpbmdMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2lyY2xlJztcclxuaW1wb3J0IHsgQWdtRGF0YUxheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RhdGEtbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21GaXRCb3VuZHMgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZml0LWJvdW5kcyc7XHJcbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBBZ21LbWxMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9rbWwtbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21NYXAgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFwJztcclxuaW1wb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcmtlcic7XHJcbmltcG9ydCB7IEFnbVBvbHlnb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWdvbic7XHJcbmltcG9ydCB7IEFnbVBvbHlsaW5lIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgQWdtUG9seWxpbmVJY29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLWljb24nO1xyXG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50JztcclxuaW1wb3J0IHsgQWdtUmVjdGFuZ2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlY3RhbmdsZSc7XHJcbmltcG9ydCB7IEFnbVRyYW5zaXRMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmFuc2l0LWxheWVyJztcclxuXHJcbmltcG9ydCB7IExBWllfTUFQU19BUElfQ09ORklHLCBMYXp5TWFwc0FQSUxvYWRlciwgTGF6eU1hcHNBUElMb2FkZXJDb25maWdMaXRlcmFsIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXInO1xyXG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcclxuXHJcbmltcG9ydCB7IEJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMgfSBmcm9tICcuL3V0aWxzL2Jyb3dzZXItZ2xvYmFscyc7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29yZURpcmVjdGl2ZXMoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIEFnbUJpY3ljbGluZ0xheWVyLFxyXG4gICAgQWdtQ2lyY2xlLFxyXG4gICAgQWdtRGF0YUxheWVyLFxyXG4gICAgQWdtRml0Qm91bmRzLFxyXG4gICAgQWdtSW5mb1dpbmRvdyxcclxuICAgIEFnbUttbExheWVyLFxyXG4gICAgQWdtTWFwLFxyXG4gICAgQWdtTWFya2VyLFxyXG4gICAgQWdtUG9seWdvbixcclxuICAgIEFnbVBvbHlsaW5lLFxyXG4gICAgQWdtUG9seWxpbmVJY29uLFxyXG4gICAgQWdtUG9seWxpbmVQb2ludCxcclxuICAgIEFnbVJlY3RhbmdsZSxcclxuICAgIEFnbVRyYW5zaXRMYXllcixcclxuICBdO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGFuZ3VsYXItZ29vZ2xlLW1hcHMgY29yZSBtb2R1bGUuIENvbnRhaW5zIGFsbCBEaXJlY3RpdmVzL1NlcnZpY2VzL1BpcGVzXHJcbiAqIG9mIHRoZSBjb3JlIG1vZHVsZS4gUGxlYXNlIHVzZSBgQWdtQ29yZU1vZHVsZS5mb3JSb290KClgIGluIHlvdXIgYXBwIG1vZHVsZS5cclxuICovXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBjb3JlRGlyZWN0aXZlcygpLCBleHBvcnRzOiBjb3JlRGlyZWN0aXZlcygpfSlcclxuZXhwb3J0IGNsYXNzIEFnbUNvcmVNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIFBsZWFzZSB1c2UgdGhpcyBtZXRob2Qgd2hlbiB5b3UgcmVnaXN0ZXIgdGhlIG1vZHVsZSBhdCB0aGUgcm9vdCBsZXZlbC5cclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdChsYXp5TWFwc0FQSUxvYWRlckNvbmZpZz86IExhenlNYXBzQVBJTG9hZGVyQ29uZmlnTGl0ZXJhbCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEFnbUNvcmVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIC4uLkJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMsIHtwcm92aWRlOiBNYXBzQVBJTG9hZGVyLCB1c2VDbGFzczogTGF6eU1hcHNBUElMb2FkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiBMQVpZX01BUFNfQVBJX0NPTkZJRywgdXNlVmFsdWU6IGxhenlNYXBzQVBJTG9hZGVyQ29uZmlnfSxcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==