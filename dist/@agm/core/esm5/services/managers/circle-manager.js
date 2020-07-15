import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var CircleManager = /** @class */ (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex,
        }));
    };
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) {
            if (typeof options.strokePosition === 'string') {
                options.strokePosition = google.maps.StrokePosition[options.strokePosition];
            }
            c.setOptions(options);
        });
    };
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    CircleManager.prototype.getNativeCircle = function (circle) {
        return this._circles.get(circle);
    };
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return new Observable(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    CircleManager = tslib_1.__decorate([
        Injectable()
    ], CircleManager);
    return CircleManager;
}());
export { CircleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU1sRTtJQUlFLHVCQUFvQixXQUFpQyxFQUFVLEtBQWE7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhwRSxhQUFRLEdBQ1osSUFBSSxHQUFHLEVBQXVDLENBQUM7SUFFNEIsQ0FBQztJQUVoRixpQ0FBUyxHQUFULFVBQVUsTUFBaUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3RELE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFDO1lBQ3JELFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztZQUMvQixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDbkMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1lBQ3JDLFlBQVksRUFBRSxNQUFN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TUFBTSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF6RmdDLG9CQUFvQjtnQkFBaUIsTUFBTTs7SUFKakUsYUFBYTtRQUR6QixVQUFVLEVBQUU7T0FDQSxhQUFhLENBOEZ6QjtJQUFELG9CQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0E5RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFnbUNpcmNsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY2lyY2xlJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2lyY2xlTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBfY2lyY2xlczogTWFwPEFnbUNpcmNsZSwgUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+PiA9XHJcbiAgICAgIG5ldyBNYXA8QWdtQ2lyY2xlLCBQcm9taXNlPG1hcFR5cGVzLkNpcmNsZT4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwaVdyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIGFkZENpcmNsZShjaXJjbGU6IEFnbUNpcmNsZSkge1xyXG4gICAgdGhpcy5fY2lyY2xlcy5zZXQoY2lyY2xlLCB0aGlzLl9hcGlXcmFwcGVyLmNyZWF0ZUNpcmNsZSh7XHJcbiAgICAgIGNlbnRlcjoge2xhdDogY2lyY2xlLmxhdGl0dWRlLCBsbmc6IGNpcmNsZS5sb25naXR1ZGV9LFxyXG4gICAgICBjbGlja2FibGU6IGNpcmNsZS5jbGlja2FibGUsXHJcbiAgICAgIGRyYWdnYWJsZTogY2lyY2xlLmRyYWdnYWJsZSxcclxuICAgICAgZWRpdGFibGU6IGNpcmNsZS5lZGl0YWJsZSxcclxuICAgICAgZmlsbENvbG9yOiBjaXJjbGUuZmlsbENvbG9yLFxyXG4gICAgICBmaWxsT3BhY2l0eTogY2lyY2xlLmZpbGxPcGFjaXR5LFxyXG4gICAgICByYWRpdXM6IGNpcmNsZS5yYWRpdXMsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBjaXJjbGUuc3Ryb2tlQ29sb3IsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IGNpcmNsZS5zdHJva2VPcGFjaXR5LFxyXG4gICAgICBzdHJva2VQb3NpdGlvbjogY2lyY2xlLnN0cm9rZVBvc2l0aW9uLFxyXG4gICAgICBzdHJva2VXZWlnaHQ6IGNpcmNsZS5zdHJva2VXZWlnaHQsXHJcbiAgICAgIHZpc2libGU6IGNpcmNsZS52aXNpYmxlLFxyXG4gICAgICB6SW5kZXg6IGNpcmNsZS56SW5kZXgsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBjaXJjbGUgZnJvbSB0aGUgbWFwLlxyXG4gICAqL1xyXG4gIHJlbW92ZUNpcmNsZShjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xyXG4gICAgICBjLnNldE1hcChudWxsKTtcclxuICAgICAgdGhpcy5fY2lyY2xlcy5kZWxldGUoY2lyY2xlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0T3B0aW9ucyhjaXJjbGU6IEFnbUNpcmNsZSwgb3B0aW9uczogbWFwVHlwZXMuQ2lyY2xlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc3Ryb2tlUG9zaXRpb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgb3B0aW9ucy5zdHJva2VQb3NpdGlvbiA9IGdvb2dsZS5tYXBzLlN0cm9rZVBvc2l0aW9uW29wdGlvbnMuc3Ryb2tlUG9zaXRpb25dO1xyXG4gICAgICB9XHJcbiAgICAgIGMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Qm91bmRzKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmdCb3VuZHM+IHtcclxuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IGMuZ2V0Qm91bmRzKCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2VudGVyKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmc+IHtcclxuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IGMuZ2V0Q2VudGVyKCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFkaXVzKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IGMuZ2V0UmFkaXVzKCkpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q2VudGVyKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKFxyXG4gICAgICAgIChjKSA9PiB7IHJldHVybiBjLnNldENlbnRlcih7bGF0OiBjaXJjbGUubGF0aXR1ZGUsIGxuZzogY2lyY2xlLmxvbmdpdHVkZX0pOyB9KTtcclxuICB9XHJcblxyXG4gIHNldEVkaXRhYmxlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldEVkaXRhYmxlKGNpcmNsZS5lZGl0YWJsZSk7IH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0RHJhZ2dhYmxlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldERyYWdnYWJsZShjaXJjbGUuZHJhZ2dhYmxlKTsgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRWaXNpYmxlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldFZpc2libGUoY2lyY2xlLnZpc2libGUpOyB9KTtcclxuICB9XHJcblxyXG4gIHNldFJhZGl1cyhjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4geyByZXR1cm4gYy5zZXRSYWRpdXMoY2lyY2xlLnJhZGl1cyk7IH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmF0aXZlQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+IHtcclxuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBjaXJjbGU6IEFnbUNpcmNsZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgbGV0IGxpc3RlbmVyOiBtYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xyXG4gICAgICAgIGxpc3RlbmVyID0gYy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIGxpc3RlbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=