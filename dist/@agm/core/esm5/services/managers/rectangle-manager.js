import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var RectangleManager = /** @class */ (function () {
    function RectangleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._rectangles = new Map();
    }
    RectangleManager.prototype.addRectangle = function (rectangle) {
        this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
            bounds: {
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            },
            clickable: rectangle.clickable,
            draggable: rectangle.draggable,
            editable: rectangle.editable,
            fillColor: rectangle.fillColor,
            fillOpacity: rectangle.fillOpacity,
            strokeColor: rectangle.strokeColor,
            strokeOpacity: rectangle.strokeOpacity,
            strokePosition: rectangle.strokePosition,
            strokeWeight: rectangle.strokeWeight,
            visible: rectangle.visible,
            zIndex: rectangle.zIndex,
        }));
    };
    /**
     * Removes the given rectangle from the map.
     */
    RectangleManager.prototype.removeRectangle = function (rectangle) {
        var _this = this;
        return this._rectangles.get(rectangle).then(function (r) {
            r.setMap(null);
            _this._rectangles.delete(rectangle);
        });
    };
    RectangleManager.prototype.setOptions = function (rectangle, options) {
        return this._rectangles.get(rectangle).then(function (r) { return r.setOptions(options); });
    };
    RectangleManager.prototype.getBounds = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) { return r.getBounds(); });
    };
    RectangleManager.prototype.setBounds = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setBounds({
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            });
        });
    };
    RectangleManager.prototype.setEditable = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setEditable(rectangle.editable);
        });
    };
    RectangleManager.prototype.setDraggable = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setDraggable(rectangle.draggable);
        });
    };
    RectangleManager.prototype.setVisible = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setVisible(rectangle.visible);
        });
    };
    RectangleManager.prototype.createEventObservable = function (eventName, rectangle) {
        var _this = this;
        return Observable.create(function (observer) {
            var listener = null;
            _this._rectangles.get(rectangle).then(function (r) {
                listener = r.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    RectangleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    RectangleManager = tslib_1.__decorate([
        Injectable()
    ], RectangleManager);
    return RectangleManager;
}());
export { RectangleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9yZWN0YW5nbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUlsRTtJQUlFLDBCQUFvQixXQUFpQyxFQUFVLEtBQWE7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhwRSxnQkFBVyxHQUNmLElBQUksR0FBRyxFQUE2QyxDQUFDO0lBRXNCLENBQUM7SUFFaEYsdUNBQVksR0FBWixVQUFhLFNBQXVCO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztZQUMvRCxNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO2dCQUN0QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO1lBQzlCLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztZQUM5QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7WUFDNUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO1lBQzlCLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVztZQUNsQyxXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVc7WUFDbEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxhQUFhO1lBQ3RDLGNB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LElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ3JDLFFBQVEsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU87Z0JBQ0wsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNyQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFwRmdDLG9CQUFvQjtnQkFBaUIsTUFBTTs7SUFKakUsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtPQUNBLGdCQUFnQixDQXlGNUI7SUFBRCx1QkFBQztDQUFBLEFBekZELElBeUZDO1NBekZZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFnbVJlY3RhbmdsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVjdGFuZ2xlJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZU1hbmFnZXIge1xyXG4gIHByaXZhdGUgX3JlY3RhbmdsZXM6IE1hcDxBZ21SZWN0YW5nbGUsIFByb21pc2U8bWFwVHlwZXMuUmVjdGFuZ2xlPj4gPVxyXG4gICAgICBuZXcgTWFwPEFnbVJlY3RhbmdsZSwgUHJvbWlzZTxtYXBUeXBlcy5SZWN0YW5nbGU+PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcGlXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxyXG5cclxuICBhZGRSZWN0YW5nbGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpIHtcclxuICAgIHRoaXMuX3JlY3RhbmdsZXMuc2V0KHJlY3RhbmdsZSwgdGhpcy5fYXBpV3JhcHBlci5jcmVhdGVSZWN0YW5nbGUoe1xyXG4gICAgICBib3VuZHM6IHtcclxuICAgICAgICBub3J0aDogcmVjdGFuZ2xlLm5vcnRoLFxyXG4gICAgICAgIGVhc3Q6IHJlY3RhbmdsZS5lYXN0LFxyXG4gICAgICAgIHNvdXRoOiByZWN0YW5nbGUuc291dGgsXHJcbiAgICAgICAgd2VzdDogcmVjdGFuZ2xlLndlc3QsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsaWNrYWJsZTogcmVjdGFuZ2xlLmNsaWNrYWJsZSxcclxuICAgICAgZHJhZ2dhYmxlOiByZWN0YW5nbGUuZHJhZ2dhYmxlLFxyXG4gICAgICBlZGl0YWJsZTogcmVjdGFuZ2xlLmVkaXRhYmxlLFxyXG4gICAgICBmaWxsQ29sb3I6IHJlY3RhbmdsZS5maWxsQ29sb3IsXHJcbiAgICAgIGZpbGxPcGFjaXR5OiByZWN0YW5nbGUuZmlsbE9wYWNpdHksXHJcbiAgICAgIHN0cm9rZUNvbG9yOiByZWN0YW5nbGUuc3Ryb2tlQ29sb3IsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IHJlY3RhbmdsZS5zdHJva2VPcGFjaXR5LFxyXG4gICAgICBzdHJva2VQb3NpdGlvbjogcmVjdGFuZ2xlLnN0cm9rZVBvc2l0aW9uLFxyXG4gICAgICBzdHJva2VXZWlnaHQ6IHJlY3RhbmdsZS5zdHJva2VXZWlnaHQsXHJcbiAgICAgIHZpc2libGU6IHJlY3RhbmdsZS52aXNpYmxlLFxyXG4gICAgICB6SW5kZXg6IHJlY3RhbmdsZS56SW5kZXgsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiByZWN0YW5nbGUgZnJvbSB0aGUgbWFwLlxyXG4gICAqL1xyXG4gIHJlbW92ZVJlY3RhbmdsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xyXG4gICAgICByLnNldE1hcChudWxsKTtcclxuICAgICAgdGhpcy5fcmVjdGFuZ2xlcy5kZWxldGUocmVjdGFuZ2xlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0T3B0aW9ucyhyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSwgb3B0aW9uczogbWFwVHlwZXMuUmVjdGFuZ2xlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4gci5zZXRPcHRpb25zKG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIGdldEJvdW5kcyhyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8bWFwVHlwZXMuTGF0TG5nQm91bmRzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiByLmdldEJvdW5kcygpKTtcclxuICB9XHJcblxyXG4gIHNldEJvdW5kcyhyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xyXG4gICAgICByZXR1cm4gci5zZXRCb3VuZHMoe1xyXG4gICAgICAgIG5vcnRoOiByZWN0YW5nbGUubm9ydGgsXHJcbiAgICAgICAgZWFzdDogcmVjdGFuZ2xlLmVhc3QsXHJcbiAgICAgICAgc291dGg6IHJlY3RhbmdsZS5zb3V0aCxcclxuICAgICAgICB3ZXN0OiByZWN0YW5nbGUud2VzdCxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEVkaXRhYmxlKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XHJcbiAgICAgIHJldHVybiByLnNldEVkaXRhYmxlKHJlY3RhbmdsZS5lZGl0YWJsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldERyYWdnYWJsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xyXG4gICAgICByZXR1cm4gci5zZXREcmFnZ2FibGUocmVjdGFuZ2xlLmRyYWdnYWJsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFZpc2libGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcclxuICAgICAgcmV0dXJuIHIuc2V0VmlzaWJsZShyZWN0YW5nbGUudmlzaWJsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgIGxldCBsaXN0ZW5lcjogbWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcclxuICAgICAgICBsaXN0ZW5lciA9IHIuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBsaXN0ZW5lci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19