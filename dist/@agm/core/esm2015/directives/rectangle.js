import * as tslib_1 from "tslib";
var AgmRectangle_1;
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { RectangleManager } from '../services/managers/rectangle-manager';
let AgmRectangle = AgmRectangle_1 = class AgmRectangle {
    constructor(_manager) {
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
    /** @internal */
    ngOnInit() {
        this._manager.addRectangle(this);
        this._rectangleAddedToManager = true;
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
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
    }
    _updateRectangleOptionsChanges(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => AgmRectangle_1._mapOptions.indexOf(k) !== -1);
        optionKeys.forEach(k => {
            options[k] = changes[k].currentValue;
        });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _registerEventListeners() {
        let events = new Map();
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
        events.forEach((eventEmitter, eventName) => {
            this._eventSubscriptions.push(this._manager
                .createEventObservable(eventName, this)
                .subscribe(value => {
                switch (eventName) {
                    case 'bounds_changed':
                        this._manager.getBounds(this).then(bounds => eventEmitter.emit({
                            north: bounds.getNorthEast().lat(),
                            east: bounds.getNorthEast().lng(),
                            south: bounds.getSouthWest().lat(),
                            west: bounds.getSouthWest().lng(),
                        }));
                        break;
                    default:
                        eventEmitter.emit({
                            coords: { lat: value.latLng.lat(), lng: value.latLng.lng() },
                        });
                }
            }));
        });
    }
    /** @internal */
    ngOnDestroy() {
        this._eventSubscriptions.forEach(function (s) {
            s.unsubscribe();
        });
        this._eventSubscriptions = null;
        this._manager.removeRectangle(this);
    }
    /**
     * Gets the LatLngBounds of this Rectangle.
     */
    getBounds() {
        return this._manager.getBounds(this);
    }
};
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
AgmRectangle.ctorParameters = () => [
    { type: RectangleManager }
];
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
export { AgmRectangle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZWN0YW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBUXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSzFFLElBQWEsWUFBWSxvQkFBekIsTUFBYSxZQUFZO0lBcUt2QixZQUFvQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQWhKOUM7O1dBRUc7UUFDTSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUvQzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBc0IxQjs7O1dBR0c7UUFDTSxtQkFBYyxHQUFvQyxRQUFRLENBQUM7UUFFcEU7O1dBRUc7UUFDTSxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUUxQjs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFPeEI7O1dBRUc7UUFFSCxpQkFBWSxHQUFzQyxJQUFJLFlBQVksRUFFL0QsQ0FBQztRQUVKOztXQUVHO1FBRUgsbUJBQWMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUxRTs7V0FFRztRQUVILHNCQUFpQixHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTdFOztXQUVHO1FBQ08sU0FBSSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTFFOztXQUVHO1FBQ08sWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTdFOztXQUVHO1FBRUgsY0FBUyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRXJFOztXQUVHO1FBRUgsY0FBUyxHQUE2QixJQUFJLFlBQVksRUFBYyxD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LEtBQUssRUFBRTsyQ0FBZTtBQUtkO0lBQVIsS0FBSyxFQUFFOzBDQUFjO0FBS2I7SUFBUixLQUFLLEVBQUU7K0NBQWtCO0FBTUc7SUFBNUIsS0FBSyxDQUFDLG9CQUFvQixDQUFDOytDQUFtQjtBQU10QztJQUFSLEtBQUssRUFBRTs4Q0FBa0I7QUFLakI7SUFBUixLQUFLLEVBQUU7K0NBQW1CO0FBS2xCO0lBQVIsS0FBSyxFQUFFO2lEQUFxQjtBQUtwQjtJQUFSLEtBQUssRUFBRTtpREFBcUI7QUFLcEI7SUFBUixLQUFLLEVBQUU7bURBQXVCO0FBTXRCO0lBQVIsS0FBSyxFQUFFO29EQUE0RDtBQUszRDtJQUFSLEtBQUssRUFBRTtrREFBa0I7QUFLakI7SUFBUixLQUFLLEVBQUU7NkNBQWdCO0FBS2Y7SUFBUixLQUFLLEVBQUU7NENBQWdCO0FBTXhCO0lBREMsTUFBTSxFQUFFO2tEQUdMO0FBTUo7SUFEQyxNQUFNLEVBQUU7b0RBQ2lFO0FBTTFFO0lBREMsTUFBTSxFQUFFO3VEQUNvRTtBQUtuRTtJQUFULE1BQU0sRUFBRTswQ0FBaUU7QUFLaEU7SUFBVCxNQUFNLEVBQUU7NkNBQW9FO0FBTTdFO0lBREMsTUFBTSxFQUFFOytDQUM0RDtBQU1yRTtJQURDLE1BQU0sRUFBRTsrQ0FDNEQ7QUFNckU7SUFEQyxNQUFNLEVBQUU7K0NBQzREO0FBSzNEO0lBQVQsTUFBTSxFQUFFOzhDQUFxRTtBQU05RTtJQURDLE1BQU0sRUFBRTsrQ0FDNEQ7QUFLM0Q7SUFBVCxNQUFNLEVBQUU7NkNBQW9FO0FBTTdFO0lBREMsTUFBTSxFQUFFO2dEQUM2RDtBQW5KM0QsWUFBWTtJQUh4QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtLQUMxQixDQUFDO0dBQ1csWUFBWSxDQWlSeEI7U0FqUlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL21hcC10eXBlcyc7XHJcbmltcG9ydCB7XHJcbiAgTGF0TG5nQm91bmRzLFxyXG4gIExhdExuZ0JvdW5kc0xpdGVyYWwsXHJcbiAgTW91c2VFdmVudCBhcyBNYXBNb3VzZUV2ZW50LFxyXG59IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgUmVjdGFuZ2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3JlY3RhbmdsZS1tYW5hZ2VyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLXJlY3RhbmdsZScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21SZWN0YW5nbGUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBUaGUgbm9ydGggcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5vcnRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBlYXN0IHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlYXN0OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzb3V0aCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlIChyZXF1aXJlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc291dGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdlc3QgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdlc3Q6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBSZWN0YW5nbGUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgcmVjdGFuZ2xlIG92ZXIgdGhlIG1hcC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgncmVjdGFuZ2xlRHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHJlY3RhbmdsZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbCBwb2ludHMgc2hvd24gYXRcclxuICAgKiB0aGUgY2VudGVyIGFuZCBhcm91bmQgdGhlIGNpcmN1bWZlcmVuY2Ugb2YgdGhlIHJlY3RhbmdsZS4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZWRpdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpbGwgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWQgY29sb3JzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZpbGxDb2xvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmlsbCBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbE9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VPcGFjaXR5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2UgcG9zaXRpb24uIERlZmF1bHRzIHRvIENFTlRFUi5cclxuICAgKiBUaGlzIHByb3BlcnR5IGlzIG5vdCBzdXBwb3J0ZWQgb24gSW50ZXJuZXQgRXhwbG9yZXIgOCBhbmQgZWFybGllci5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VQb3NpdGlvbjogJ0NFTlRFUicgfCAnSU5TSURFJyB8ICdPVVRTSURFJyA9ICdDRU5URVInO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VXZWlnaHQgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgcmVjdGFuZ2xlIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cclxuICAgKi9cclxuICBASW5wdXQoKSB6SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSByZWN0YW5nbGUncyBpcyBjaGFuZ2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGJvdW5kc0NoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0JvdW5kc0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIExhdExuZ0JvdW5kc0xpdGVyYWxcclxuICA+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICByZWN0YW5nbGVDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgcmVjdGFuZ2xlRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBtb3VzZURvd246IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gcmVjdGFuZ2xlIG1vdXNlb3V0LlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIHJlY3RhbmdsZSBtb3VzZW92ZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgbW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbW91c2VVcDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHJlY3RhbmdsZSBpcyByaWdodC1jbGlja2VkIG9uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfcmVjdGFuZ2xlQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX21hcE9wdGlvbnM6IHN0cmluZ1tdID0gW1xyXG4gICAgJ2ZpbGxDb2xvcicsXHJcbiAgICAnZmlsbE9wYWNpdHknLFxyXG4gICAgJ3N0cm9rZUNvbG9yJyxcclxuICAgICdzdHJva2VPcGFjaXR5JyxcclxuICAgICdzdHJva2VQb3NpdGlvbicsXHJcbiAgICAnc3Ryb2tlV2VpZ2h0JyxcclxuICAgICd2aXNpYmxlJyxcclxuICAgICd6SW5kZXgnLFxyXG4gICAgJ2NsaWNrYWJsZScsXHJcbiAgXTtcclxuXHJcbiAgcHJpdmF0ZSBfZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYW5hZ2VyOiBSZWN0YW5nbGVNYW5hZ2VyKSB7fVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9tYW5hZ2VyLmFkZFJlY3RhbmdsZSh0aGlzKTtcclxuICAgIHRoaXMuX3JlY3RhbmdsZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICBpZiAoIXRoaXMuX3JlY3RhbmdsZUFkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgY2hhbmdlc1snbm9ydGgnXSB8fFxyXG4gICAgICBjaGFuZ2VzWydlYXN0J10gfHxcclxuICAgICAgY2hhbmdlc1snc291dGgnXSB8fFxyXG4gICAgICBjaGFuZ2VzWyd3ZXN0J11cclxuICAgICkge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldEJvdW5kcyh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RWRpdGFibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0VmlzaWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZVJlY3RhbmdsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlUmVjdGFuZ2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlczoge1xyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2U7XHJcbiAgfSkge1xyXG4gICAgbGV0IG9wdGlvbnM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG4gICAgbGV0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXHJcbiAgICAgIGsgPT4gQWdtUmVjdGFuZ2xlLl9tYXBPcHRpb25zLmluZGV4T2YoaykgIT09IC0xLFxyXG4gICAgKTtcclxuICAgIG9wdGlvbktleXMuZm9yRWFjaChrID0+IHtcclxuICAgICAgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAob3B0aW9uS2V5cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBsZXQgZXZlbnRzOiBNYXA8c3RyaW5nLCBFdmVudEVtaXR0ZXI8YW55Pj4gPSBuZXcgTWFwPFxyXG4gICAgICBzdHJpbmcsXHJcbiAgICAgIEV2ZW50RW1pdHRlcjxhbnk+XHJcbiAgICA+KCk7XHJcbiAgICBldmVudHMuc2V0KCdib3VuZHNfY2hhbmdlZCcsIHRoaXMuYm91bmRzQ2hhbmdlKTtcclxuICAgIGV2ZW50cy5zZXQoJ2NsaWNrJywgdGhpcy5yZWN0YW5nbGVDbGljayk7XHJcbiAgICBldmVudHMuc2V0KCdkYmxjbGljaycsIHRoaXMucmVjdGFuZ2xlRGJsQ2xpY2spO1xyXG4gICAgZXZlbnRzLnNldCgnZHJhZycsIHRoaXMuZHJhZyk7XHJcbiAgICBldmVudHMuc2V0KCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcclxuICAgIGV2ZW50cy5zZXQoJ2RyYWdTdGFydCcsIHRoaXMuZHJhZ1N0YXJ0KTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCk7XHJcbiAgICBldmVudHMuc2V0KCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3Zlcik7XHJcbiAgICBldmVudHMuc2V0KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcclxuICAgIGV2ZW50cy5zZXQoJ3JpZ2h0Y2xpY2snLCB0aGlzLnJpZ2h0Q2xpY2spO1xyXG5cclxuICAgIGV2ZW50cy5mb3JFYWNoKChldmVudEVtaXR0ZXIsIGV2ZW50TmFtZSkgPT4ge1xyXG4gICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICB0aGlzLl9tYW5hZ2VyXHJcbiAgICAgICAgICAuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPE1hcE1vdXNlRXZlbnQ+KGV2ZW50TmFtZSwgdGhpcylcclxuICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2JvdW5kc19jaGFuZ2VkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpLnRoZW4oYm91bmRzID0+XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBub3J0aDogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc3Q6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICBzb3V0aDogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlc3Q6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSxcclxuICAgICAgICAgICAgICAgICAgfSBhcyBMYXRMbmdCb3VuZHNMaXRlcmFsKSxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICBjb29yZHM6IHsgbGF0OiB2YWx1ZS5sYXRMbmcubGF0KCksIGxuZzogdmFsdWUubGF0TG5nLmxuZygpIH0sXHJcbiAgICAgICAgICAgICAgICB9IGFzIE1vdXNlRXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24oczogU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHMudW5zdWJzY3JpYmUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zID0gbnVsbDtcclxuICAgIHRoaXMuX21hbmFnZXIucmVtb3ZlUmVjdGFuZ2xlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgTGF0TG5nQm91bmRzIG9mIHRoaXMgUmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIGdldEJvdW5kcygpOiBQcm9taXNlPExhdExuZ0JvdW5kcz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=