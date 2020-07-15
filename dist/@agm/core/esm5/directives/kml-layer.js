import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
var layerId = 0;
var AgmKmlLayer = /** @class */ (function () {
    function AgmKmlLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new EventEmitter();
    }
    AgmKmlLayer_1 = AgmKmlLayer;
    AgmKmlLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmKmlLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    };
    AgmKmlLayer.prototype._updatePolygonOptions = function (changes) {
        var options = Object.keys(changes)
            .filter(function (k) { return AgmKmlLayer_1._kmlLayerOptions.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmKmlLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
            { name: 'defaultviewport_changed', handler: function () { return _this.defaultViewportChange.emit(); } },
            { name: 'status_changed', handler: function () { return _this.statusChange.emit(); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmKmlLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmKmlLayer.prototype.toString = function () { return "AgmKmlLayer-" + this._id.toString(); };
    /** @internal */
    AgmKmlLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmKmlLayer_1;
    AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
    AgmKmlLayer.ctorParameters = function () { return [
        { type: KmlLayerManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmKmlLayer.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmKmlLayer.prototype, "preserveViewport", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmKmlLayer.prototype, "screenOverlays", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmKmlLayer.prototype, "suppressInfoWindows", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmKmlLayer.prototype, "url", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmKmlLayer.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmKmlLayer.prototype, "layerClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmKmlLayer.prototype, "defaultViewportChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmKmlLayer.prototype, "statusChange", void 0);
    AgmKmlLayer = AgmKmlLayer_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-kml-layer',
        })
    ], AgmKmlLayer);
    return AgmKmlLayer;
}());
export { AgmKmlLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21sLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9rbWwtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUlwSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFM0UsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBS2hCO0lBeURFLHFCQUFvQixRQUF5QjtRQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQXhEckMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFJNUM7O1dBRUc7UUFDTSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCOzs7OztXQUtHO1FBQ00scUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWxDOztXQUVHO1FBQ00sbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFL0I7O1dBRUc7UUFDTSx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFckM7O1dBRUc7UUFDTSxRQUFHLEdBQVcsSUFBSSxDQUFDO1FBRTVCOztXQUVHO1FBQ00sV0FBTSxHQUFrQixJQUFJLENBQUM7UUFFdEM7O1dBRUc7UUFDTyxlQUFVLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBRXRGOztXQUVHO1FBQ08sMEJBQXFCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFL0U7Ozs7V0FJRztRQUNPLGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7SUFFdEIsQ0FBQztvQkF6RHRDLFdBQVc7SUEyRHRCLDhCQUFRLEdBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FB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cUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O2dCQW9EbEUsZUFBZTs7SUEvQ3BDO1FBQVIsS0FBSyxFQUFFO2tEQUFrQjtJQVFqQjtRQUFSLEtBQUssRUFBRTt5REFBMEI7SUFLekI7UUFBUixLQUFLLEVBQUU7dURBQXVCO0lBS3RCO1FBQVIsS0FBSyxFQUFFOzREQUE2QjtJQUs1QjtRQUFSLEtBQUssRUFBRTs0Q0FBb0I7SUFLbkI7UUFBUixLQUFLLEVBQUU7K0NBQThCO0lBSzVCO1FBQVQsTUFBTSxFQUFFO21EQUE2RTtJQUs1RTtRQUFULE1BQU0sRUFBRTs4REFBc0U7SUFPckU7UUFBVCxNQUFNLEVBQUU7cURBQTZEO0lBdkQzRCxXQUFXO1FBSHZCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1NBQzFCLENBQUM7T0FDVyxXQUFXLENBK0d2QjtJQUFELGtCQUFDO0NBQUEsQUEvR0QsSUErR0M7U0EvR1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgS21sTW91c2VFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5pbXBvcnQgeyBLbWxMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyJztcclxuXHJcbmxldCBsYXllcklkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLWttbC1sYXllcicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21LbWxMYXllciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIHN0YXRpYyBfa21sTGF5ZXJPcHRpb25zOiBzdHJpbmdbXSA9XHJcbiAgICAgIFsnY2xpY2thYmxlJywgJ3ByZXNlcnZlVmlld3BvcnQnLCAnc2NyZWVuT3ZlcmxheXMnLCAnc3VwcHJlc3NJbmZvV2luZG93cycsICd1cmwnLCAnekluZGV4J107XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRydWUsIHRoZSBsYXllciByZWNlaXZlcyBtb3VzZSBldmVudHMuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBCeSBkZWZhdWx0LCB0aGUgaW5wdXQgbWFwIGlzIGNlbnRlcmVkIGFuZCB6b29tZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY29udGVudHMgb2YgdGhlXHJcbiAgICogbGF5ZXIuXHJcbiAgICogSWYgdGhpcyBvcHRpb24gaXMgc2V0IHRvIHRydWUsIHRoZSB2aWV3cG9ydCBpcyBsZWZ0IHVuY2hhbmdlZCwgdW5sZXNzIHRoZSBtYXAncyBjZW50ZXIgYW5kIHpvb21cclxuICAgKiB3ZXJlIG5ldmVyIHNldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwcmVzZXJ2ZVZpZXdwb3J0ID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gcmVuZGVyIHRoZSBzY3JlZW4gb3ZlcmxheXMuIERlZmF1bHQgdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JlZW5PdmVybGF5cyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1cHByZXNzIHRoZSByZW5kZXJpbmcgb2YgaW5mbyB3aW5kb3dzIHdoZW4gbGF5ZXIgZmVhdHVyZXMgYXJlIGNsaWNrZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3VwcHJlc3NJbmZvV2luZG93cyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgVVJMIG9mIHRoZSBLTUwgZG9jdW1lbnQgdG8gZGlzcGxheS5cclxuICAgKi9cclxuICBASW5wdXQoKSB1cmw6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6LWluZGV4IG9mIHRoZSBsYXllci5cclxuICAgKi9cclxuICBASW5wdXQoKSB6SW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBmZWF0dXJlIGluIHRoZSBsYXllciBpcyBjbGlja2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsYXllckNsaWNrOiBFdmVudEVtaXR0ZXI8S21sTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEttbE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgS01MIGxheWVycyBkZWZhdWx0IHZpZXdwb3J0IGhhcyBjaGFuZ2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkZWZhdWx0Vmlld3BvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBLTUwgbGF5ZXIgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXHJcbiAgICogQXQgdGhpcyBwb2ludCBpdCBpcyBzYWZlIHRvIHJlYWQgdGhlIHN0YXR1cyBwcm9wZXJ0eSB0byBkZXRlcm1pbmUgaWYgdGhlIGxheWVyIGxvYWRlZFxyXG4gICAqIHN1Y2Nlc3NmdWxseS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc3RhdHVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IEttbExheWVyTWFuYWdlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbWFuYWdlci5hZGRLbWxMYXllcih0aGlzKTtcclxuICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlUG9seWdvbk9wdGlvbnMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoayA9PiBBZ21LbWxMYXllci5fa21sTGF5ZXJPcHRpb25zLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChvYmo6IGFueSwgazogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXHJcbiAgICAgIHtuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IEttbE1vdXNlRXZlbnQpID0+IHRoaXMubGF5ZXJDbGljay5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnZGVmYXVsdHZpZXdwb3J0X2NoYW5nZWQnLCBoYW5kbGVyOiAoKSA9PiB0aGlzLmRlZmF1bHRWaWV3cG9ydENoYW5nZS5lbWl0KCl9LFxyXG4gICAgICB7bmFtZTogJ3N0YXR1c19jaGFuZ2VkJywgaGFuZGxlcjogKCkgPT4gdGhpcy5zdGF0dXNDaGFuZ2UuZW1pdCgpfSxcclxuICAgIF07XHJcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtS21sTGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fbWFuYWdlci5kZWxldGVLbWxMYXllcih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcbn1cclxuIl19