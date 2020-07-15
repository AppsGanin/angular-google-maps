import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
let layerId = 0;
/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
let AgmTransitLayer = class AgmTransitLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show transit layer
         */
        this.visible = true;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTransitLayer(this, { visible: this.visible });
        this._addedToManager = true;
    }
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, { visible: changes['visible'].currentValue });
        }
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmTransitLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }
};
AgmTransitLayer.ctorParameters = () => [
    { type: LayerManager }
];
tslib_1.__decorate([
    Input()
], AgmTransitLayer.prototype, "visible", void 0);
AgmTransitLayer = tslib_1.__decorate([
    Directive({
        selector: 'agm-transit-layer',
    })
], AgmTransitLayer);
export { AgmTransitLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdHJhbnNpdC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEI7OztLQUdLO0FBS0wsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQVN4QixZQUFxQixRQUFzQjtRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBUm5DLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFFBQUcsR0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0M7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRXVCLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7U0FDekY7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLEVBQUUsS0FBYSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixRQUFRLEtBQWEsT0FBTyxtQkFBbUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV2RSxnQkFBZ0I7SUFDaEIsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFSixDQUFBOztZQTlCa0MsWUFBWTs7QUFGbEM7SUFBUixLQUFLLEVBQUU7Z0RBQWdCO0FBUGYsZUFBZTtJQUozQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO0tBQ2hDLENBQUM7R0FFVyxlQUFlLENBdUMzQjtTQXZDWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMYXllck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9sYXllci1tYW5hZ2VyJztcclxuXHJcbmxldCBsYXllcklkID0gMDtcclxuXHJcbi8qXHJcbiAqIFRoaXMgZGlyZWN0aXZlIGFkZHMgYSB0cmFuc2l0IGxheWVyIHRvIGEgZ29vZ2xlIG1hcCBpbnN0YW5jZVxyXG4gKiA8YWdtLXRyYW5zaXQtbGF5ZXIgW3Zpc2libGVdPVwidHJ1ZXxmYWxzZVwiPiA8YWdtLXRyYW5zaXQtbGF5ZXI+XHJcbiAqICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdhZ20tdHJhbnNpdC1sYXllcicsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQWdtVHJhbnNpdExheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveXtcclxuICAgIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nID0gKGxheWVySWQrKykudG9TdHJpbmcoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGUvc2hvdyB0cmFuc2l0IGxheWVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9tYW5hZ2VyOiBMYXllck1hbmFnZXIgKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hbmFnZXIuYWRkVHJhbnNpdExheWVyKHRoaXMsIHt2aXNpYmxlOiB0aGlzLnZpc2libGV9KTtcclxuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci50b2dnbGVMYXllclZpc2liaWxpdHkodGhpcywge3Zpc2libGU6IGNoYW5nZXNbJ3Zpc2libGUnXS5jdXJyZW50VmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBBZ21UcmFuc2l0TGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZUxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=