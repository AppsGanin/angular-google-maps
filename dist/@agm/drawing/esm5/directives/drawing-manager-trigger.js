import * as tslib_1 from "tslib";
import { AgmMap } from '@agm/core';
import { Directive, Host, Input } from '@angular/core';
import { first } from 'rxjs/operators';
var AgmDrawingManagerTrigger = /** @class */ (function () {
    function AgmDrawingManagerTrigger(_agmMap) {
        this._agmMap = _agmMap;
    }
    AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
    };
    AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function () { return _this.drawingManager.setMap(null); });
    };
    AgmDrawingManagerTrigger.ctorParameters = function () { return [
        { type: AgmMap, decorators: [{ type: Host }] }
    ]; };
    tslib_1.__decorate([
        Input('agmDrawingManager')
    ], AgmDrawingManagerTrigger.prototype, "drawingManager", void 0);
    AgmDrawingManagerTrigger = tslib_1.__decorate([
        Directive({
            selector: 'agm-map[agmDrawingManager]',
            exportAs: 'matDrawingManagerTrigger',
        }),
        tslib_1.__param(0, Host())
    ], AgmDrawingManagerTrigger);
    return AgmDrawingManagerTrigger;
}());
export { AgmDrawingManagerTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2RyYXdpbmcvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2RyYXdpbmctbWFuYWdlci10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBaUIsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3ZDO0lBTUUsa0NBQTRCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQzNDLENBQUM7SUFFRCxrREFBZSxHQUFmO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDeEYsQ0FBQzs7Z0JBVG9DLE1BQU0sdUJBQTlCLElBQUk7O0lBRlc7UUFBM0IsS0FBSyxDQUFDLG1CQUFtQixDQUFDO29FQUFtQztJQUpuRCx3QkFBd0I7UUFKcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsMEJBQTBCO1NBQ3JDLENBQUM7UUFPYSxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtPQU5SLHdCQUF3QixDQWdCcEM7SUFBRCwrQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbU1hcCB9IGZyb20gJ0BhZ20vY29yZSc7XHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQWdtRHJhd2luZ01hbmFnZXIgfSBmcm9tICcuL2RyYXdpbmctbWFuYWdlcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2FnbS1tYXBbYWdtRHJhd2luZ01hbmFnZXJdJyxcclxuICBleHBvcnRBczogJ21hdERyYXdpbmdNYW5hZ2VyVHJpZ2dlcicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21EcmF3aW5nTWFuYWdlclRyaWdnZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3l7XHJcblxyXG4gIC8qKiBUaGUgZHJhd2luZyBtYW5hZ2VyIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgnYWdtRHJhd2luZ01hbmFnZXInKSBkcmF3aW5nTWFuYWdlcjogQWdtRHJhd2luZ01hbmFnZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJpdmF0ZSBfYWdtTWFwOiBBZ21NYXApIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2FnbU1hcC5tYXBSZWFkeS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZShtYXAgPT4gdGhpcy5kcmF3aW5nTWFuYWdlci5zZXRNYXAobWFwKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2FnbU1hcC5tYXBSZWFkeS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChudWxsKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==