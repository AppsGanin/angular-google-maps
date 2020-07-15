import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { bindCallback, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, switchMap } from 'rxjs/operators';
import { GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import * as i0 from "@angular/core";
import * as i1 from "./maps-api-loader/maps-api-loader";
var AgmGeocoder = /** @class */ (function () {
    function AgmGeocoder(loader) {
        var _this = this;
        var connectableGeocoder$ = new Observable(function (subscriber) {
            loader.load().then(function () { return subscriber.next(); });
        })
            .pipe(map(function () { return _this._createGeocoder(); }), multicast(new ReplaySubject(1)));
        connectableGeocoder$.connect(); // ignore the subscription
        // since we will remain subscribed till application exits
        this.geocoder$ = connectableGeocoder$;
    }
    AgmGeocoder.prototype.geocode = function (request) {
        var _this = this;
        return this.geocoder$.pipe(switchMap(function (geocoder) { return _this._getGoogleResults(geocoder, request); }));
    };
    AgmGeocoder.prototype._getGoogleResults = function (geocoder, request) {
        var geocodeObservable = bindCallback(geocoder.geocode);
        return geocodeObservable(request).pipe(switchMap(function (_a) {
            var _b = tslib_1.__read(_a, 2), results = _b[0], status = _b[1];
            if (status === GeocoderStatus.OK) {
                return of(results);
            }
            return throwError(status);
        }));
    };
    AgmGeocoder.prototype._createGeocoder = function () {
        return new google.maps.Geocoder();
    };
    AgmGeocoder.ctorParameters = function () { return [
        { type: MapsAPILoader }
    ]; };
    AgmGeocoder.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() { return new AgmGeocoder(i0.ɵɵinject(i1.MapsAPILoader)); }, token: AgmGeocoder, providedIn: "root" });
    AgmGeocoder = tslib_1.__decorate([
        Injectable({ providedIn: 'root' })
    ], AgmGeocoder);
    return AgmGeocoder;
}());
export { AgmGeocoder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dlb2NvZGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBeUIsVUFBVSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBNkMsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFLbEU7SUFHRSxxQkFBWSxNQUFxQjtRQUFqQyxpQkFhQztRQVpDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBQSxVQUFVO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQzthQUNDLElBQUksQ0FDSCxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxFQUNqQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDRyxDQUFDO1FBRXZDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsMEJBQTBCO1FBQzFELHlEQUF5RDtRQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQ3hDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsT0FBd0I7UUFBaEMsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUN4QixTQUFTLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDO0lBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLFFBQWtCLEVBQUUsT0FBd0I7UUFDcEUsSUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELE9BQU8saUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNwQyxTQUFTLENBQUMsVUFBQyxFQUFpQjtnQkFBakIsMEJBQWlCLEVBQWhCLGVBQU8sRUFBRSxjQUFNO1lBQ3pCLElBQUksTUFBTSxLQUFLLGNBQWMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxxQ0FBZSxHQUF2QjtRQUNFLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBYyxDQUFDO0lBQ2hELENBQUM7O2dCQXBDbUIsYUFBYTs7O0lBSHRCLFdBQVc7UUFEdkIsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLFdBQVcsQ0F3Q3ZCO3NCQWpERDtDQWlEQyxBQXhDRCxJQXdDQztTQXhDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBiaW5kQ2FsbGJhY2ssIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgb2YsIFJlcGxheVN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBtdWx0aWNhc3QsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgR2VvY29kZXIsIEdlb2NvZGVyUmVxdWVzdCwgR2VvY29kZXJSZXN1bHQsIEdlb2NvZGVyU3RhdHVzIH0gZnJvbSAnLi9nb29nbGUtbWFwcy10eXBlcyc7XHJcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQWdtR2VvY29kZXIge1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBnZW9jb2RlciQ6IE9ic2VydmFibGU8R2VvY29kZXI+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihsb2FkZXI6IE1hcHNBUElMb2FkZXIpIHtcclxuICAgIGNvbnN0IGNvbm5lY3RhYmxlR2VvY29kZXIkID0gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgIGxvYWRlci5sb2FkKCkudGhlbigoKSA9PiBzdWJzY3JpYmVyLm5leHQoKSk7XHJcbiAgICB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKCkgPT4gdGhpcy5fY3JlYXRlR2VvY29kZXIoKSksXHJcbiAgICAgICAgbXVsdGljYXN0KG5ldyBSZXBsYXlTdWJqZWN0KDEpKSxcclxuICAgICAgKSBhcyBDb25uZWN0YWJsZU9ic2VydmFibGU8R2VvY29kZXI+O1xyXG5cclxuICAgIGNvbm5lY3RhYmxlR2VvY29kZXIkLmNvbm5lY3QoKTsgLy8gaWdub3JlIHRoZSBzdWJzY3JpcHRpb25cclxuICAgIC8vIHNpbmNlIHdlIHdpbGwgcmVtYWluIHN1YnNjcmliZWQgdGlsbCBhcHBsaWNhdGlvbiBleGl0c1xyXG5cclxuICAgIHRoaXMuZ2VvY29kZXIkID0gY29ubmVjdGFibGVHZW9jb2RlciQ7XHJcbiAgfVxyXG5cclxuICBnZW9jb2RlKHJlcXVlc3Q6IEdlb2NvZGVyUmVxdWVzdCk6IE9ic2VydmFibGU8R2VvY29kZXJSZXN1bHRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2VvY29kZXIkLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoZ2VvY29kZXIpID0+IHRoaXMuX2dldEdvb2dsZVJlc3VsdHMoZ2VvY29kZXIsIHJlcXVlc3QpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEdvb2dsZVJlc3VsdHMoZ2VvY29kZXI6IEdlb2NvZGVyLCByZXF1ZXN0OiBHZW9jb2RlclJlcXVlc3QpOiBPYnNlcnZhYmxlPEdlb2NvZGVyUmVzdWx0W10+IHtcclxuICAgIGNvbnN0IGdlb2NvZGVPYnNlcnZhYmxlID0gYmluZENhbGxiYWNrKGdlb2NvZGVyLmdlb2NvZGUpO1xyXG4gICAgcmV0dXJuIGdlb2NvZGVPYnNlcnZhYmxlKHJlcXVlc3QpLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoW3Jlc3VsdHMsIHN0YXR1c10pID0+IHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBHZW9jb2RlclN0YXR1cy5PSykge1xyXG4gICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc3RhdHVzKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jcmVhdGVHZW9jb2RlcigpOiBHZW9jb2RlciB7XHJcbiAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCkgYXMgR2VvY29kZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ==