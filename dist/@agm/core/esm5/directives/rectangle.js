import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { RectangleManager } from '../services/managers/rectangle-manager';
var AgmRectangle = /** @class */ (function () {
    function AgmRectangle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Rectangle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this rectangle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this rectangle by dragging the control points shown at
         * the center and around the circumference of the rectangle. Defaults to false.
         */
        this.editable = false;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this rectangle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the rectangle's is changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the rectangle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the rectangle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the rectangle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the rectangle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the rectangle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on rectangle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on rectangle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the rectangle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the rectangle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._rectangleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    AgmRectangle_1 = AgmRectangle;
    /** @internal */
    AgmRectangle.prototype.ngOnInit = function () {
        this._manager.addRectangle(this);
        this._rectangleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmRectangle.prototype.ngOnChanges = function (changes) {
        if (!this._rectangleAddedToManager) {
            return;
        }
        if (changes['north'] ||
            changes['east'] ||
            changes['south'] ||
            changes['west']) {
            this._manager.setBounds(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        this._updateRectangleOptionsChanges(changes);
    };
    AgmRectangle.prototype._updateRectangleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmRectangle_1._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) {
            options[k] = changes[k].currentValue;
        });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmRectangle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('bounds_changed', this.boundsChange);
        events.set('click', this.rectangleClick);
        events.set('dblclick', this.rectangleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager
                .createEventObservable(eventName, _this)
                .subscribe(function (value) {
                switch (eventName) {
                    case 'bounds_changed':
                        _this._manager.getBounds(_this).then(function (bounds) {
                            return eventEmitter.emit({
                                north: bounds.getNorthEast().lat(),
                                east: bounds.getNorthEast().lng(),
                                south: bounds.getSouthWest().lat(),
                                west: bounds.getSouthWest().lng(),
                            });
                        });
                        break;
                    default:
                        eventEmitter.emit({
                            coords: { lat: value.latLng.lat(), lng: value.latLng.lng() },
                        });
                }
            }));
        });
    };
    /** @internal */
    AgmRectangle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) {
            s.unsubscribe();
        });
        this._eventSubscriptions = null;
        this._manager.removeRectangle(this);
    };
    /**
     * Gets the LatLngBounds of this Rectangle.
     */
    AgmRectangle.prototype.getBounds = function () {
        return this._manager.getBounds(this);
    };
    var AgmRectangle_1;
    AgmRectangle._mapOptions = [
        'fillColor',
        'fillOpacity',
        'strokeColor',
        'strokeOpacity',
        'strokePosition',
        'strokeWeight',
        'visible',
        'zIndex',
        'clickable',
    ];
    AgmRectangle.ctorParameters = function () { return [
        { type: RectangleManager }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "north", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "east", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "south", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "west", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('rectangleDraggable')
    ], AgmRectangle.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "fillColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "fillOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "strokePosition", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmRectangle.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "boundsChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "rectangleClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "rectangleDblClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "drag", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "dragEnd", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "dragStart", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "mouseDown", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "mouseMove", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "mouseOut", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "mouseUp", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmRectangle.prototype, "rightClick", void 0);
    AgmRectangle = AgmRectangle_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-rectangle',
        })
    ], AgmRectangle);
    return AgmRectangle;
}());
export { AgmRectangle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZWN0YW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFLMUU7SUFxS0Usc0JBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBaEo5Qzs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7O1dBRUc7UUFDSCwyQ0FBMkM7UUFDZCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRS9DOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFzQjFCOzs7V0FHRztRQUNNLG1CQUFjLEdBQW9DLFFBQVEsQ0FBQztRQUVwRTs7V0FFRztRQUNNLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRTFCOztXQUVHO1FBQ00sWUFBTyxHQUFHLElBQUksQ0FBQztRQU94Qjs7V0FFRztRQUVILGlCQUFZLEdBQXNDLElBQUksWUFBWSxFQUUvRCxDQUFDO1FBRUo7O1dBRUc7UUFFSCxtQkFBYyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTFFOztXQUVHO1FBRUgsc0JBQWlCLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFN0U7O1dBRUc7UUFDTyxTQUFJLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFMUU7O1dBRUc7UUFDTyxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFN0U7O1dBRUc7UUFFSCxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFckU7O1dBRUc7UUFFSCxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFckU7O1dBRUc7UUFFSCxjQUFTLEdB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dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2UsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vbWFwLXR5cGVzJztcclxuaW1wb3J0IHtcclxuICBMYXRMbmdCb3VuZHMsXHJcbiAgTGF0TG5nQm91bmRzTGl0ZXJhbCxcclxuICBNb3VzZUV2ZW50IGFzIE1hcE1vdXNlRXZlbnQsXHJcbn0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcmVjdGFuZ2xlLW1hbmFnZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdhZ20tcmVjdGFuZ2xlJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbVJlY3RhbmdsZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBub3J0aCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlIChyZXF1aXJlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbm9ydGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGVhc3QgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVhc3Q6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNvdXRoIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzb3V0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgd2VzdCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlIChyZXF1aXJlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2VzdDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFJlY3RhbmdsZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyByZWN0YW5nbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdyZWN0YW5nbGVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgcmVjdGFuZ2xlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdFxyXG4gICAqIHRoZSBjZW50ZXIgYW5kIGFyb3VuZCB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgcmVjdGFuZ2xlLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmlsbCBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWxsT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkIGNvbG9ycy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBwb3NpdGlvbi4gRGVmYXVsdHMgdG8gQ0VOVEVSLlxyXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBvbiBJbnRlcm5ldCBFeHBsb3JlciA4IGFuZCBlYXJsaWVyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZVBvc2l0aW9uOiAnQ0VOVEVSJyB8ICdJTlNJREUnIHwgJ09VVFNJREUnID0gJ0NFTlRFUic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2Ugd2lkdGggaW4gcGl4ZWxzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZVdlaWdodCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyByZWN0YW5nbGUgaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHpJbmRleDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHJlY3RhbmdsZSdzIGlzIGNoYW5nZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgYm91bmRzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGF0TG5nQm91bmRzTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgTGF0TG5nQm91bmRzTGl0ZXJhbFxyXG4gID4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHJlY3RhbmdsZUNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICByZWN0YW5nbGVEYmxDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIG1vdXNlRG93bjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBtb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiByZWN0YW5nbGUgbW91c2VvdXQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gcmVjdGFuZ2xlIG1vdXNlb3Zlci5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBtb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3VzZVVwOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgcmVjdGFuZ2xlIGlzIHJpZ2h0LWNsaWNrZWQgb24uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgcmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICBwcml2YXRlIF9yZWN0YW5nbGVBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uczogc3RyaW5nW10gPSBbXHJcbiAgICAnZmlsbENvbG9yJyxcclxuICAgICdmaWxsT3BhY2l0eScsXHJcbiAgICAnc3Ryb2tlQ29sb3InLFxyXG4gICAgJ3N0cm9rZU9wYWNpdHknLFxyXG4gICAgJ3N0cm9rZVBvc2l0aW9uJyxcclxuICAgICdzdHJva2VXZWlnaHQnLFxyXG4gICAgJ3Zpc2libGUnLFxyXG4gICAgJ3pJbmRleCcsXHJcbiAgICAnY2xpY2thYmxlJyxcclxuICBdO1xyXG5cclxuICBwcml2YXRlIF9ldmVudFN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IFJlY3RhbmdsZU1hbmFnZXIpIHt9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX21hbmFnZXIuYWRkUmVjdGFuZ2xlKHRoaXMpO1xyXG4gICAgdGhpcy5fcmVjdGFuZ2xlQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcclxuICAgIGlmICghdGhpcy5fcmVjdGFuZ2xlQWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICBjaGFuZ2VzWydub3J0aCddIHx8XHJcbiAgICAgIGNoYW5nZXNbJ2Vhc3QnXSB8fFxyXG4gICAgICBjaGFuZ2VzWydzb3V0aCddIHx8XHJcbiAgICAgIGNoYW5nZXNbJ3dlc3QnXVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0Qm91bmRzKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2VkaXRhYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXRFZGl0YWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldERyYWdnYWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXRWaXNpYmxlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdXBkYXRlUmVjdGFuZ2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVSZWN0YW5nbGVPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzOiB7XHJcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZTtcclxuICB9KSB7XHJcbiAgICBsZXQgb3B0aW9uczogeyBbcHJvcE5hbWU6IHN0cmluZ106IGFueSB9ID0ge307XHJcbiAgICBsZXQgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihcclxuICAgICAgayA9PiBBZ21SZWN0YW5nbGUuX21hcE9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTEsXHJcbiAgICApO1xyXG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKGsgPT4ge1xyXG4gICAgICBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XHJcbiAgICB9KTtcclxuICAgIGlmIChvcHRpb25LZXlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVnaXN0ZXJFdmVudExpc3RlbmVycygpIHtcclxuICAgIGxldCBldmVudHM6IE1hcDxzdHJpbmcsIEV2ZW50RW1pdHRlcjxhbnk+PiA9IG5ldyBNYXA8XHJcbiAgICAgIHN0cmluZyxcclxuICAgICAgRXZlbnRFbWl0dGVyPGFueT5cclxuICAgID4oKTtcclxuICAgIGV2ZW50cy5zZXQoJ2JvdW5kc19jaGFuZ2VkJywgdGhpcy5ib3VuZHNDaGFuZ2UpO1xyXG4gICAgZXZlbnRzLnNldCgnY2xpY2snLCB0aGlzLnJlY3RhbmdsZUNsaWNrKTtcclxuICAgIGV2ZW50cy5zZXQoJ2RibGNsaWNrJywgdGhpcy5yZWN0YW5nbGVEYmxDbGljayk7XHJcbiAgICBldmVudHMuc2V0KCdkcmFnJywgdGhpcy5kcmFnKTtcclxuICAgIGV2ZW50cy5zZXQoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmQpO1xyXG4gICAgZXZlbnRzLnNldCgnZHJhZ1N0YXJ0JywgdGhpcy5kcmFnU3RhcnQpO1xyXG4gICAgZXZlbnRzLnNldCgnbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgZXZlbnRzLnNldCgnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xyXG4gICAgZXZlbnRzLnNldCgnbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0KTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3ZlcicsIHRoaXMubW91c2VPdmVyKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xyXG4gICAgZXZlbnRzLnNldCgncmlnaHRjbGljaycsIHRoaXMucmlnaHRDbGljayk7XHJcblxyXG4gICAgZXZlbnRzLmZvckVhY2goKGV2ZW50RW1pdHRlciwgZXZlbnROYW1lKSA9PiB7XHJcbiAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIHRoaXMuX21hbmFnZXJcclxuICAgICAgICAgIC5jcmVhdGVFdmVudE9ic2VydmFibGU8TWFwTW91c2VFdmVudD4oZXZlbnROYW1lLCB0aGlzKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAnYm91bmRzX2NoYW5nZWQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5nZXRCb3VuZHModGhpcykudGhlbihib3VuZHMgPT5cclxuICAgICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5vcnRoOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzdDogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXRoOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgd2VzdDogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpLFxyXG4gICAgICAgICAgICAgICAgICB9IGFzIExhdExuZ0JvdW5kc0xpdGVyYWwpLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgIGNvb3JkczogeyBsYXQ6IHZhbHVlLmxhdExuZy5sYXQoKSwgbG5nOiB2YWx1ZS5sYXRMbmcubG5nKCkgfSxcclxuICAgICAgICAgICAgICAgIH0gYXMgTW91c2VFdmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzOiBTdWJzY3JpcHRpb24pIHtcclxuICAgICAgcy51bnN1YnNjcmliZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFuYWdlci5yZW1vdmVSZWN0YW5nbGUodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBMYXRMbmdCb3VuZHMgb2YgdGhpcyBSZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgZ2V0Qm91bmRzKCk6IFByb21pc2U8TGF0TG5nQm91bmRzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFuYWdlci5nZXRCb3VuZHModGhpcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==