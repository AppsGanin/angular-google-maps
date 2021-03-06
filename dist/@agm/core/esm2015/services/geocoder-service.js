import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { bindCallback, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, switchMap } from 'rxjs/operators';
import { GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import * as i0 from "@angular/core";
import * as i1 from "./maps-api-loader/maps-api-loader";
let AgmGeocoder = class AgmGeocoder {
    constructor(loader) {
        const connectableGeocoder$ = new Observable(subscriber => {
            loader.load().then(() => subscriber.next());
        })
            .pipe(map(() => this._createGeocoder()), multicast(new ReplaySubject(1)));
        connectableGeocoder$.connect(); // ignore the subscription
        // since we will remain subscribed till application exits
        this.geocoder$ = connectableGeocoder$;
    }
    geocode(request) {
        return this.geocoder$.pipe(switchMap((geocoder) => this._getGoogleResults(geocoder, request)));
    }
    _getGoogleResults(geocoder, request) {
        const geocodeObservable = bindCallback(geocoder.geocode);
        return geocodeObservable(request).pipe(switchMap(([results, status]) => {
            if (status === GeocoderStatus.OK) {
                return of(results);
            }
            return throwError(status);
        }));
    }
    _createGeocoder() {
        return new google.maps.Geocoder();
    }
};
AgmGeocoder.ctorParameters = () => [
    { type: MapsAPILoader }
];
AgmGeocoder.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() { return new AgmGeocoder(i0.ɵɵinject(i1.MapsAPILoader)); }, token: AgmGeocoder, providedIn: "root" });
AgmGeocoder = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], AgmGeocoder);
export { AgmGeocoder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dlb2NvZGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBeUIsVUFBVSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBNkMsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFLbEUsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUd0QixZQUFZLE1BQXFCO1FBQy9CLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUM7YUFDQyxJQUFJLENBQ0gsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUNqQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDRyxDQUFDO1FBRXZDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsMEJBQTBCO1FBQzFELHlEQUF5RDtRQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBd0I7UUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDeEIsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBa0IsRUFBRSxPQUF3QjtRQUNwRSxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3BDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxNQUFNLEtBQUssY0FBYyxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEI7WUFFRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLGVBQWU7UUFDckIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFjLENBQUM7SUFDaEQsQ0FBQztDQUNGLENBQUE7O1lBckNxQixhQUFhOzs7QUFIdEIsV0FBVztJQUR2QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDdEIsV0FBVyxDQXdDdkI7U0F4Q1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYmluZENhbGxiYWNrLCBDb25uZWN0YWJsZU9ic2VydmFibGUsIE9ic2VydmFibGUsIG9mLCBSZXBsYXlTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgbXVsdGljYXN0LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEdlb2NvZGVyLCBHZW9jb2RlclJlcXVlc3QsIEdlb2NvZGVyUmVzdWx0LCBHZW9jb2RlclN0YXR1cyB9IGZyb20gJy4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEFnbUdlb2NvZGVyIHtcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZ2VvY29kZXIkOiBPYnNlcnZhYmxlPEdlb2NvZGVyPjtcclxuXHJcbiAgY29uc3RydWN0b3IobG9hZGVyOiBNYXBzQVBJTG9hZGVyKSB7XHJcbiAgICBjb25zdCBjb25uZWN0YWJsZUdlb2NvZGVyJCA9IG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgICBsb2FkZXIubG9hZCgpLnRoZW4oKCkgPT4gc3Vic2NyaWJlci5uZXh0KCkpO1xyXG4gICAgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCgpID0+IHRoaXMuX2NyZWF0ZUdlb2NvZGVyKCkpLFxyXG4gICAgICAgIG11bHRpY2FzdChuZXcgUmVwbGF5U3ViamVjdCgxKSksXHJcbiAgICAgICkgYXMgQ29ubmVjdGFibGVPYnNlcnZhYmxlPEdlb2NvZGVyPjtcclxuXHJcbiAgICBjb25uZWN0YWJsZUdlb2NvZGVyJC5jb25uZWN0KCk7IC8vIGlnbm9yZSB0aGUgc3Vic2NyaXB0aW9uXHJcbiAgICAvLyBzaW5jZSB3ZSB3aWxsIHJlbWFpbiBzdWJzY3JpYmVkIHRpbGwgYXBwbGljYXRpb24gZXhpdHNcclxuXHJcbiAgICB0aGlzLmdlb2NvZGVyJCA9IGNvbm5lY3RhYmxlR2VvY29kZXIkO1xyXG4gIH1cclxuXHJcbiAgZ2VvY29kZShyZXF1ZXN0OiBHZW9jb2RlclJlcXVlc3QpOiBPYnNlcnZhYmxlPEdlb2NvZGVyUmVzdWx0W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdlb2NvZGVyJC5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKGdlb2NvZGVyKSA9PiB0aGlzLl9nZXRHb29nbGVSZXN1bHRzKGdlb2NvZGVyLCByZXF1ZXN0KSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRHb29nbGVSZXN1bHRzKGdlb2NvZGVyOiBHZW9jb2RlciwgcmVxdWVzdDogR2VvY29kZXJSZXF1ZXN0KTogT2JzZXJ2YWJsZTxHZW9jb2RlclJlc3VsdFtdPiB7XHJcbiAgICBjb25zdCBnZW9jb2RlT2JzZXJ2YWJsZSA9IGJpbmRDYWxsYmFjayhnZW9jb2Rlci5nZW9jb2RlKTtcclxuICAgIHJldHVybiBnZW9jb2RlT2JzZXJ2YWJsZShyZXF1ZXN0KS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKFtyZXN1bHRzLCBzdGF0dXNdKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gR2VvY29kZXJTdGF0dXMuT0spIHtcclxuICAgICAgICAgIHJldHVybiBvZihyZXN1bHRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHN0YXR1cyk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlR2VvY29kZXIoKTogR2VvY29kZXIge1xyXG4gICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpIGFzIEdlb2NvZGVyO1xyXG4gIH1cclxufVxyXG4iXX0=