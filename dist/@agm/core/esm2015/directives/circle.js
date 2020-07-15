import * as tslib_1 from "tslib";
var AgmCircle_1;
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { CircleManager } from '../services/managers/circle-manager';
let AgmCircle = AgmCircle_1 = class AgmCircle {
    constructor(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
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
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    ngOnInit() {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
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
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    }
    _updateCircleOptionsChanges(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => AgmCircle_1._mapOptions.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _registerEventListeners() {
        let events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragstart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach((eventEmitter, eventName) => {
            this._eventSubscriptions.push(this._manager.createEventObservable(eventName, this).subscribe((value) => {
                switch (eventName) {
                    case 'radius_changed':
                        this._manager.getRadius(this).then((radius) => eventEmitter.emit(radius));
                        break;
                    case 'center_changed':
                        this._manager.getCenter(this).then((center) => eventEmitter.emit({ lat: center.lat(), lng: center.lng() }));
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    }
    /** @internal */
    ngOnDestroy() {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    }
    /**
     * Gets the LatLngBounds of this Circle.
     */
    getBounds() { return this._manager.getBounds(this); }
    getCenter() { return this._manager.getCenter(this); }
};
AgmCircle._mapOptions = [
    'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
    'visible', 'zIndex', 'clickable',
];
AgmCircle.ctorParameters = () => [
    { type: CircleManager }
];
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "latitude", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "longitude", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "clickable", void 0);
tslib_1.__decorate([
    Input('circleDraggable')
], AgmCircle.prototype, "draggable", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "editable", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "fillColor", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "fillOpacity", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "radius", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "strokeColor", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "strokeOpacity", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "strokePosition", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "strokeWeight", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], AgmCircle.prototype, "zIndex", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "centerChange", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "circleClick", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "circleDblClick", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "drag", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "dragEnd", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "dragStart", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "mouseDown", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "mouseMove", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "mouseOut", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "mouseOver", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "mouseUp", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "radiusChange", void 0);
tslib_1.__decorate([
    Output()
], AgmCircle.prototype, "rightClick", void 0);
AgmCircle = AgmCircle_1 = tslib_1.__decorate([
    Directive({
        selector: 'agm-circle',
    })
], AgmCircle);
export { AgmCircle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFLbkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBS3BFLElBQWEsU0FBUyxpQkFBdEIsTUFBYSxTQUFTO0lBb0pwQixZQUFvQixRQUF1QjtRQUF2QixhQUFRLEdBQVIsUUFBUSxDQUFlO1FBekkzQzs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7O1dBRUc7UUFDSCwyQ0FBMkM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUU1Qzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBWTFCOztXQUVHO1FBQ00sV0FBTSxHQUFHLENBQUMsQ0FBQztRQVlwQjs7O1dBR0c7UUFDTSxtQkFBYyxHQUFvQyxRQUFRLENBQUM7UUFFcEU7O1dBRUc7UUFDTSxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUUxQjs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFPeEI7O1dBRUc7UUFDTyxpQkFBWSxHQUFnQyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUV4Rjs7V0FFRztRQUNPLGdCQUFXLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFakY7O1dBRUc7UUFDTyxtQkFBYyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRXBGOztXQUVHO1FBQ08sU0FBSSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTFFOztXQUVHO1FBQ08sWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTdFOztXQUVHO1FBQ08sY0FBUyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRS9FOztXQUVHO1FB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RTtBQUtyRTtJQUFULE1BQU0sRUFBRTswQ0FBb0U7QUFLbkU7SUFBVCxNQUFNLEVBQUU7K0NBQWlFO0FBS2hFO0lBQVQsTUFBTSxFQUFFOzZDQUF1RTtBQXpJckUsU0FBUztJQUhyQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtLQUN2QixDQUFDO0dBQ1csU0FBUyxDQStPckI7U0EvT1ksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgTGF0TG5nLCBMYXRMbmdCb3VuZHMsIExhdExuZ0xpdGVyYWwsIE1vdXNlRXZlbnQgYXMgTWFwTW91c2VFdmVudCB9IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgQ2lyY2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLWNpcmNsZScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21DaXJjbGUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSAocmVxdWlyZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxhdGl0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjbGlja2FibGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSAocmVxdWlyZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIENpcmNsZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBjaXJjbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdjaXJjbGVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgY2lyY2xlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdFxyXG4gICAqIHRoZSBjZW50ZXIgYW5kIGFyb3VuZCB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgY2lyY2xlLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmlsbCBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWxsT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmFkaXVzIGluIG1ldGVycyBvbiB0aGUgRWFydGgncyBzdXJmYWNlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJhZGl1cyA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2UgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWQgY29sb3JzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIHBvc2l0aW9uLiBEZWZhdWx0cyB0byBDRU5URVIuXHJcbiAgICogVGhpcyBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0IEV4cGxvcmVyIDggYW5kIGVhcmxpZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlUG9zaXRpb246ICdDRU5URVInIHwgJ0lOU0lERScgfCAnT1VUU0lERScgPSAnQ0VOVEVSJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0ID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIGNpcmNsZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgY2VudGVyIGlzIGNoYW5nZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNlbnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBjaXJjbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNpcmNsZUNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGNpcmNsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2lyY2xlRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBjaXJjbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBjaXJjbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgY2lyY2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vdXNlRG93bjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gY2lyY2xlIG1vdXNlb3V0LlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW92ZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vdXNlVXA6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBjaXJjbGUncyByYWRpdXMgaXMgY2hhbmdlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmFkaXVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSBpcyByaWdodC1jbGlja2VkIG9uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIHByaXZhdGUgX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zOiBzdHJpbmdbXSA9IFtcclxuICAgICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VQb3NpdGlvbicsICdzdHJva2VXZWlnaHQnLFxyXG4gICAgJ3Zpc2libGUnLCAnekluZGV4JywgJ2NsaWNrYWJsZScsXHJcbiAgXTtcclxuXHJcbiAgcHJpdmF0ZSBfZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYW5hZ2VyOiBDaXJjbGVNYW5hZ2VyKSB7fVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9tYW5hZ2VyLmFkZENpcmNsZSh0aGlzKTtcclxuICAgIHRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xyXG4gICAgaWYgKCF0aGlzLl9jaXJjbGVBZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldENlbnRlcih0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RWRpdGFibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0VmlzaWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydyYWRpdXMnXSkge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldFJhZGl1cyh0aGlzKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZUNpcmNsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlQ2lyY2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlczoge1twcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xyXG4gICAgbGV0IG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcclxuICAgIGxldCBvcHRpb25LZXlzID1cclxuICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoayA9PiBBZ21DaXJjbGUuX21hcE9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTEpO1xyXG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChrKSA9PiB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XHJcbiAgICBpZiAob3B0aW9uS2V5cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBsZXQgZXZlbnRzOiBNYXA8c3RyaW5nLCBFdmVudEVtaXR0ZXI8YW55Pj4gPSBuZXcgTWFwPHN0cmluZywgRXZlbnRFbWl0dGVyPGFueT4+KCk7XHJcbiAgICBldmVudHMuc2V0KCdjZW50ZXJfY2hhbmdlZCcsIHRoaXMuY2VudGVyQ2hhbmdlKTtcclxuICAgIGV2ZW50cy5zZXQoJ2NsaWNrJywgdGhpcy5jaXJjbGVDbGljayk7XHJcbiAgICBldmVudHMuc2V0KCdkYmxjbGljaycsIHRoaXMuY2lyY2xlRGJsQ2xpY2spO1xyXG4gICAgZXZlbnRzLnNldCgnZHJhZycsIHRoaXMuZHJhZyk7XHJcbiAgICBldmVudHMuc2V0KCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcclxuICAgIGV2ZW50cy5zZXQoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0KTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCk7XHJcbiAgICBldmVudHMuc2V0KCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3Zlcik7XHJcbiAgICBldmVudHMuc2V0KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcclxuICAgIGV2ZW50cy5zZXQoJ3JhZGl1c19jaGFuZ2VkJywgdGhpcy5yYWRpdXNDaGFuZ2UpO1xyXG4gICAgZXZlbnRzLnNldCgncmlnaHRjbGljaycsIHRoaXMucmlnaHRDbGljayk7XHJcblxyXG4gICAgZXZlbnRzLmZvckVhY2goKGV2ZW50RW1pdHRlciwgZXZlbnROYW1lKSA9PiB7XHJcbiAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8TWFwTW91c2VFdmVudD4oZXZlbnROYW1lLCB0aGlzKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAncmFkaXVzX2NoYW5nZWQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5nZXRSYWRpdXModGhpcykudGhlbigocmFkaXVzKSA9PiBldmVudEVtaXR0ZXIuZW1pdChyYWRpdXMpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl9jaGFuZ2VkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZ2V0Q2VudGVyKHRoaXMpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKGNlbnRlcikgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoe2xhdDogY2VudGVyLmxhdCgpLCBsbmc6IGNlbnRlci5sbmcoKX0gYXMgTGF0TG5nTGl0ZXJhbCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb29yZHM6IHtsYXQ6IHZhbHVlLmxhdExuZy5sYXQoKSwgbG5nOiB2YWx1ZS5sYXRMbmcubG5nKCl9fSBhcyBNb3VzZUV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzOiBTdWJzY3JpcHRpb24pIHsgcy51bnN1YnNjcmliZSgpOyB9KTtcclxuICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucyA9IG51bGw7XHJcbiAgICB0aGlzLl9tYW5hZ2VyLnJlbW92ZUNpcmNsZSh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIExhdExuZ0JvdW5kcyBvZiB0aGlzIENpcmNsZS5cclxuICAgKi9cclxuICBnZXRCb3VuZHMoKTogUHJvbWlzZTxMYXRMbmdCb3VuZHM+IHsgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpOyB9XHJcblxyXG4gIGdldENlbnRlcigpOiBQcm9taXNlPExhdExuZz4geyByZXR1cm4gdGhpcy5fbWFuYWdlci5nZXRDZW50ZXIodGhpcyk7IH1cclxufVxyXG4iXX0=