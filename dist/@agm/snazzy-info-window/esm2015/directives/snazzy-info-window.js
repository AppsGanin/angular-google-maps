import * as tslib_1 from "tslib";
import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
let AgmSnazzyInfoWindow = class AgmSnazzyInfoWindow {
    constructor(_marker, _wrapper, _manager, _loader) {
        this._marker = _marker;
        this._wrapper = _wrapper;
        this._manager = _manager;
        this._loader = _loader;
        /**
         * Changes the open status of the snazzy info window.
         */
        this.isOpen = false;
        /**
         * Emits when the open status changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Choose where you want the info window to be displayed, relative to the marker.
         */
        this.placement = 'top';
        /**
         * The max width in pixels of the info window.
         */
        this.maxWidth = 200;
        /**
         * The max height in pixels of the info window.
         */
        this.maxHeight = 200;
        /**
         * Determines if the info window will open when the marker is clicked.
         * An internal listener is added to the Google Maps click event which calls the open() method.
         */
        this.openOnMarkerClick = true;
        /**
         * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
         * This will not activate on the Google Maps drag event when the user is panning the map.
         */
        this.closeOnMapClick = true;
        /**
         * Determines if the info window will close when any other Snazzy Info Window is opened.
         */
        this.closeWhenOthersOpen = false;
        /**
         * Determines if the info window will show a close button.
         */
        this.showCloseButton = true;
        /**
         * Determines if the info window will be panned into view when opened.
         */
        this.panOnOpen = true;
        /**
         * Emits before the info window opens.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits before the info window closes.
         */
        this.afterClose = new EventEmitter();
        this._snazzyInfoWindowInitialized = null;
    }
    /**
     * @internal
     */
    ngOnChanges(changes) {
        if (this._nativeSnazzyInfoWindow == null) {
            return;
        }
        if ('isOpen' in changes && this.isOpen) {
            this._openInfoWindow();
        }
        else if ('isOpen' in changes && !this.isOpen) {
            this._closeInfoWindow();
        }
        if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
            this._updatePosition();
        }
    }
    /**
     * @internal
     */
    ngAfterViewInit() {
        const m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(() => require('snazzy-info-window'))
            .then((module) => Promise.all([module, m, this._wrapper.getNativeMap()]))
            .then((elems) => {
            const options = {
                map: elems[2],
                content: '',
                placement: this.placement,
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
                backgroundColor: this.backgroundColor,
                padding: this.padding,
                border: this.border,
                borderRadius: this.borderRadius,
                fontColor: this.fontColor,
                pointer: this.pointer,
                shadow: this.shadow,
                closeOnMapClick: this.closeOnMapClick,
                openOnMarkerClick: this.openOnMarkerClick,
                closeWhenOthersOpen: this.closeWhenOthersOpen,
                showCloseButton: this.showCloseButton,
                panOnOpen: this.panOnOpen,
                wrapperClass: this.wrapperClass,
                callbacks: {
                    beforeOpen: () => {
                        this._createViewContent();
                        this.beforeOpen.emit();
                    },
                    afterOpen: () => {
                        this.isOpenChange.emit(this.openStatus());
                    },
                    afterClose: () => {
                        this.afterClose.emit();
                        this.isOpenChange.emit(this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: this.latitude,
                    lng: this.longitude,
                };
            }
            this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(() => {
            if (this.isOpen) {
                this._openInfoWindow();
            }
        });
    }
    _openInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._createViewContent();
            this._nativeSnazzyInfoWindow.open();
        });
    }
    _closeInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._nativeSnazzyInfoWindow.close();
        });
    }
    _createViewContent() {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        const evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(() => {
            evr.detectChanges();
        });
    }
    _updatePosition() {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    }
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    openStatus() {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    }
};
AgmSnazzyInfoWindow.ctorParameters = () => [
    { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: GoogleMapsAPIWrapper },
    { type: MarkerManager },
    { type: MapsAPILoader }
];
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "latitude", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "longitude", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "isOpen", void 0);
tslib_1.__decorate([
    Output()
], AgmSnazzyInfoWindow.prototype, "isOpenChange", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "placement", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "maxWidth", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "maxHeight", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "backgroundColor", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "padding", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "border", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "borderRadius", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "fontColor", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "fontSize", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "pointer", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "shadow", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "openOnMarkerClick", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "closeOnMapClick", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "wrapperClass", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "closeWhenOthersOpen", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "showCloseButton", void 0);
tslib_1.__decorate([
    Input()
], AgmSnazzyInfoWindow.prototype, "panOnOpen", void 0);
tslib_1.__decorate([
    Output()
], AgmSnazzyInfoWindow.prototype, "beforeOpen", void 0);
tslib_1.__decorate([
    Output()
], AgmSnazzyInfoWindow.prototype, "afterClose", void 0);
tslib_1.__decorate([
    ViewChild('outerWrapper', { read: ElementRef, static: false })
], AgmSnazzyInfoWindow.prototype, "_outerWrapper", void 0);
tslib_1.__decorate([
    ViewChild('viewContainer', { read: ViewContainerRef, static: false })
], AgmSnazzyInfoWindow.prototype, "_viewContainerRef", void 0);
tslib_1.__decorate([
    ContentChild(TemplateRef, { static: false })
], AgmSnazzyInfoWindow.prototype, "_templateRef", void 0);
AgmSnazzyInfoWindow = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'agm-snazzy-info-window',
        template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Host()), tslib_1.__param(0, SkipSelf())
], AgmSnazzyInfoWindow);
export { AgmSnazzyInfoWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25henp5LWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9zbmF6enktaW5mby13aW5kb3cvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NuYXp6eS1pbmZvLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFGLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQXdCLFFBQVEsRUFBRSxNQUFNLEVBQWlCLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU3pOLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBK0k5QixZQUMwQyxPQUFrQixFQUNsRCxRQUE4QixFQUM5QixRQUF1QixFQUN2QixPQUFzQjtRQUhVLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBdEloQzs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDTyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTVFOztXQUVHO1FBQ00sY0FBUyxHQUF3QyxLQUFLLENBQUM7UUFFaEU7O1dBRUc7UUFDTSxhQUFRLEdBQW9CLEdBQUcsQ0FBQztRQUV6Qzs7V0FFRztRQUNNLGNBQVMsR0FBb0IsR0FBRyxDQUFDO1FBOEMxQzs7O1dBR0c7UUFDTSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFbEM7OztXQUdHO1FBQ00sb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFRaEM7O1dBRUc7UUFDTSx3QkFBbUIsR0FBRyxLQUFLLENB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QztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFFBQVEsRUFBRSw4RUFBOEU7S0FDekYsQ0FBQztJQWlKRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBLEVBQUUsbUJBQUEsUUFBUSxFQUFFLENBQUE7R0FoSnRCLG1CQUFtQixDQWlSL0I7U0FqUlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdtTWFya2VyLCBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFwc0FQSUxvYWRlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgU2tpcFNlbGYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2FnbS1zbmF6enktaW5mby13aW5kb3cnLFxyXG4gIHRlbXBsYXRlOiAnPGRpdiAjb3V0ZXJXcmFwcGVyPjxkaXYgI3ZpZXdDb250YWluZXI+PC9kaXY+PC9kaXY+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21TbmF6enlJbmZvV2luZG93IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHdoZXJlIHRoZSBpbmZvIHdpbmRvdyBpcyBhbmNob3JlZC5cclxuICAgKiBUaGUgb2Zmc2V0IHdpbGwgZGVmYXVsdCB0byAwcHggd2hlbiB1c2luZyB0aGlzIG9wdGlvbi4gT25seSByZXF1aXJlZC91c2VkIGlmIHlvdSBhcmUgbm90IHVzaW5nIGEgYWdtLW1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9uZ2l0dWRlIHdoZXJlIHRoZSBpbmZvIHdpbmRvdyBpcyBhbmNob3JlZC5cclxuICAgKiBUaGUgb2Zmc2V0IHdpbGwgZGVmYXVsdCB0byAwcHggd2hlbiB1c2luZyB0aGlzIG9wdGlvbi4gT25seSByZXF1aXJlZC91c2VkIGlmIHlvdSBhcmUgbm90IHVzaW5nIGEgYWdtLW1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBsb25naXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyB0aGUgb3BlbiBzdGF0dXMgb2YgdGhlIHNuYXp6eSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbiB0aGUgb3BlbiBzdGF0dXMgY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENob29zZSB3aGVyZSB5b3Ugd2FudCB0aGUgaW5mbyB3aW5kb3cgdG8gYmUgZGlzcGxheWVkLCByZWxhdGl2ZSB0byB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgPSAndG9wJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heCB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heFdpZHRoOiBudW1iZXIgfCBzdHJpbmcgPSAyMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXggaGVpZ2h0IGluIHBpeGVscyBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSAyMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb2xvciB0byB1c2UgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gcGFkZGluZyBzaXplIGFyb3VuZCB0aGUgY29udGVudCBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFkZGluZzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSBib3JkZXIgYXJvdW5kIHRoZSBpbmZvIHdpbmRvdy4gU2V0IHRvIGZhbHNlIHRvIGNvbXBsZXRlbHkgcmVtb3ZlIHRoZSBib3JkZXIuXHJcbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIGJvcmRlciBzaG91bGQgYmUgdGhlIHNhbWUgYXMgcG9pbnRlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBib3JkZXI6IHt3aWR0aDogc3RyaW5nOyBjb2xvcjogc3RyaW5nfSB8IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIENTUyBib3JkZXIgcmFkaXVzIHByb3BlcnR5IHRvIHNwZWNpZnkgdGhlIHJvdW5kZWQgY29ybmVycyBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYm9yZGVyUmFkaXVzOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmb250IGNvbG9yIHRvIHVzZSBmb3IgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBib2R5IG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSBmb250Q29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZvbnQgc2l6ZSB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9udFNpemU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgcG9pbnRlciBmcm9tIHRoZSBpbmZvIHdpbmRvdyB0byB0aGUgbWFya2VyLlxyXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgcG9pbnRlci5cclxuICAgKiBUaGUgdW5pdHMgdXNlZCBmb3IgcG9pbnRlciBzaG91bGQgYmUgdGhlIHNhbWUgYXMgYm9yZGVyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBvaW50ZXI6IHN0cmluZyB8IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBDU1MgcHJvcGVydGllcyBmb3IgdGhlIHNoYWRvdyBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICogU2V0IHRvIGZhbHNlIHRvIGNvbXBsZXRlbHkgcmVtb3ZlIHRoZSBzaGFkb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hhZG93OiBib29sZWFuIHwge2g/OiBzdHJpbmcsIHY/OiBzdHJpbmcsIGJsdXI6IHN0cmluZywgc3ByZWFkOiBzdHJpbmcsIG9wYWNpdHk6IG51bWJlciwgY29sb3I6IHN0cmluZ307XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgb3BlbiB3aGVuIHRoZSBtYXJrZXIgaXMgY2xpY2tlZC5cclxuICAgKiBBbiBpbnRlcm5hbCBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgR29vZ2xlIE1hcHMgY2xpY2sgZXZlbnQgd2hpY2ggY2FsbHMgdGhlIG9wZW4oKSBtZXRob2QuXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3Blbk9uTWFya2VyQ2xpY2sgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGNsb3NlIHdoZW4gdGhlIG1hcCBpcyBjbGlja2VkLiBBbiBpbnRlcm5hbCBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgR29vZ2xlIE1hcHMgY2xpY2sgZXZlbnQgd2hpY2ggY2FsbHMgdGhlIGNsb3NlKCkgbWV0aG9kLlxyXG4gICAqIFRoaXMgd2lsbCBub3QgYWN0aXZhdGUgb24gdGhlIEdvb2dsZSBNYXBzIGRyYWcgZXZlbnQgd2hlbiB0aGUgdXNlciBpcyBwYW5uaW5nIHRoZSBtYXAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xvc2VPbk1hcENsaWNrID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgd3JhcHBlciBjb250YWluZXIgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqIENhbiBiZSB1c2VkIGZvciBhcHBseWluZyBjdXN0b20gQ1NTIHRvIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSB3cmFwcGVyQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBjbG9zZSB3aGVuIGFueSBvdGhlciBTbmF6enkgSW5mbyBXaW5kb3cgaXMgb3BlbmVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNsb3NlV2hlbk90aGVyc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBzaG93IGEgY2xvc2UgYnV0dG9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dDbG9zZUJ1dHRvbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgYmUgcGFubmVkIGludG8gdmlldyB3aGVuIG9wZW5lZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYW5Pbk9wZW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBiZWZvcmUgdGhlIGluZm8gd2luZG93IG9wZW5zLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVPcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGJlZm9yZSB0aGUgaW5mbyB3aW5kb3cgY2xvc2VzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhZnRlckNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ291dGVyV3JhcHBlcicsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSkgX291dGVyV3JhcHBlcjogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlfSkgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IGZhbHNlfSkgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwcm90ZWN0ZWQgX25hdGl2ZVNuYXp6eUluZm9XaW5kb3c6IGFueTtcclxuICBwcm90ZWN0ZWQgX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZDogUHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2tpcFNlbGYoKSBwcml2YXRlIF9tYXJrZXI6IEFnbU1hcmtlcixcclxuICAgIHByaXZhdGUgX3dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLFxyXG4gICAgcHJpdmF0ZSBfbWFuYWdlcjogTWFya2VyTWFuYWdlcixcclxuICAgIHByaXZhdGUgX2xvYWRlcjogTWFwc0FQSUxvYWRlcixcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICh0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCdpc09wZW4nIGluIGNoYW5nZXMgJiYgdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcclxuICAgIH0gZWxzZSBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiAhdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5fY2xvc2VJbmZvV2luZG93KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoKCdsYXRpdHVkZScgaW4gY2hhbmdlcyB8fCAnbG9uZ2l0dWRlJyBpbiBjaGFuZ2VzKSAmJiB0aGlzLl9tYXJrZXIgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgY29uc3QgbSA9IHRoaXMuX21hbmFnZXIgIT0gbnVsbCA/IHRoaXMuX21hbmFnZXIuZ2V0TmF0aXZlTWFya2VyKHRoaXMuX21hcmtlcikgOiBudWxsO1xyXG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkID0gdGhpcy5fbG9hZGVyLmxvYWQoKVxyXG4gICAgICAudGhlbigoKSA9PiByZXF1aXJlKCdzbmF6enktaW5mby13aW5kb3cnKSlcclxuICAgICAgLnRoZW4oKG1vZHVsZTogYW55KSA9PiBQcm9taXNlLmFsbChbbW9kdWxlLCBtLCB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpXSkpXHJcbiAgICAgIC50aGVuKChlbGVtcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcclxuICAgICAgICAgIG1hcDogZWxlbXNbMl0sXHJcbiAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICBtYXhXaWR0aDogdGhpcy5tYXhXaWR0aCxcclxuICAgICAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgICAgcGFkZGluZzogdGhpcy5wYWRkaW5nLFxyXG4gICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcixcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXMsXHJcbiAgICAgICAgICBmb250Q29sb3I6IHRoaXMuZm9udENvbG9yLFxyXG4gICAgICAgICAgcG9pbnRlcjogdGhpcy5wb2ludGVyLFxyXG4gICAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvdyxcclxuICAgICAgICAgIGNsb3NlT25NYXBDbGljazogdGhpcy5jbG9zZU9uTWFwQ2xpY2ssXHJcbiAgICAgICAgICBvcGVuT25NYXJrZXJDbGljazogdGhpcy5vcGVuT25NYXJrZXJDbGljayxcclxuICAgICAgICAgIGNsb3NlV2hlbk90aGVyc09wZW46IHRoaXMuY2xvc2VXaGVuT3RoZXJzT3BlbixcclxuICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdGhpcy5zaG93Q2xvc2VCdXR0b24sXHJcbiAgICAgICAgICBwYW5Pbk9wZW46IHRoaXMucGFuT25PcGVuLFxyXG4gICAgICAgICAgd3JhcHBlckNsYXNzOiB0aGlzLndyYXBwZXJDbGFzcyxcclxuICAgICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgICBiZWZvcmVPcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlVmlld0NvbnRlbnQoKTtcclxuICAgICAgICAgICAgICB0aGlzLmJlZm9yZU9wZW4uZW1pdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhZnRlck9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMub3BlblN0YXR1cygpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWZ0ZXJDbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWZ0ZXJDbG9zZS5lbWl0KCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLm9wZW5TdGF0dXMoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGVsZW1zWzFdICE9IG51bGwpIHtcclxuICAgICAgICAgIG9wdGlvbnMubWFya2VyID0gZWxlbXNbMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgbG5nOiB0aGlzLmxvbmdpdHVkZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgPSBuZXcgZWxlbXNbMF0ob3B0aW9ucyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICB0aGlzLl9vcGVuSW5mb1dpbmRvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX29wZW5JbmZvV2luZG93KCkge1xyXG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jcmVhdGVWaWV3Q29udGVudCgpO1xyXG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93Lm9wZW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9jbG9zZUluZm9XaW5kb3coKSB7XHJcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9jcmVhdGVWaWV3Q29udGVudCgpIHtcclxuICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBldnIgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ZW1wbGF0ZVJlZik7XHJcbiAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LnNldENvbnRlbnQodGhpcy5fb3V0ZXJXcmFwcGVyLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgLy8gd2UgaGF2ZSB0byBydW4gdGhpcyBpbiBhIHNlcGFyYXRlIGN5Y2xlLlxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGV2ci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LnNldFBvc2l0aW9uKHtcclxuICAgICAgbGF0OiB0aGlzLmxhdGl0dWRlLFxyXG4gICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgU25henp5IEluZm8gV2luZG93IGlzIGluaXRpYWxpemVkIGFuZCBvcGVuLlxyXG4gICAqL1xyXG4gIG9wZW5TdGF0dXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdyAmJiB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmlzT3BlbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdykge1xyXG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19