import * as tslib_1 from "tslib";
import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
var AgmSnazzyInfoWindow = /** @class */ (function () {
    function AgmSnazzyInfoWindow(_marker, _wrapper, _manager, _loader) {
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
    AgmSnazzyInfoWindow.prototype.ngOnChanges = function (changes) {
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
    };
    /**
     * @internal
     */
    AgmSnazzyInfoWindow.prototype.ngAfterViewInit = function () {
        var _this = this;
        var m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(function () { return require('snazzy-info-window'); })
            .then(function (module) { return Promise.all([module, m, _this._wrapper.getNativeMap()]); })
            .then(function (elems) {
            var options = {
                map: elems[2],
                content: '',
                placement: _this.placement,
                maxWidth: _this.maxWidth,
                maxHeight: _this.maxHeight,
                backgroundColor: _this.backgroundColor,
                padding: _this.padding,
                border: _this.border,
                borderRadius: _this.borderRadius,
                fontColor: _this.fontColor,
                pointer: _this.pointer,
                shadow: _this.shadow,
                closeOnMapClick: _this.closeOnMapClick,
                openOnMarkerClick: _this.openOnMarkerClick,
                closeWhenOthersOpen: _this.closeWhenOthersOpen,
                showCloseButton: _this.showCloseButton,
                panOnOpen: _this.panOnOpen,
                wrapperClass: _this.wrapperClass,
                callbacks: {
                    beforeOpen: function () {
                        _this._createViewContent();
                        _this.beforeOpen.emit();
                    },
                    afterOpen: function () {
                        _this.isOpenChange.emit(_this.openStatus());
                    },
                    afterClose: function () {
                        _this.afterClose.emit();
                        _this.isOpenChange.emit(_this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: _this.latitude,
                    lng: _this.longitude,
                };
            }
            _this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(function () {
            if (_this.isOpen) {
                _this._openInfoWindow();
            }
        });
    };
    AgmSnazzyInfoWindow.prototype._openInfoWindow = function () {
        var _this = this;
        this._snazzyInfoWindowInitialized.then(function () {
            _this._createViewContent();
            _this._nativeSnazzyInfoWindow.open();
        });
    };
    AgmSnazzyInfoWindow.prototype._closeInfoWindow = function () {
        var _this = this;
        this._snazzyInfoWindowInitialized.then(function () {
            _this._nativeSnazzyInfoWindow.close();
        });
    };
    AgmSnazzyInfoWindow.prototype._createViewContent = function () {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        var evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(function () {
            evr.detectChanges();
        });
    };
    AgmSnazzyInfoWindow.prototype._updatePosition = function () {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    };
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    AgmSnazzyInfoWindow.prototype.openStatus = function () {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    };
    /**
     * @internal
     */
    AgmSnazzyInfoWindow.prototype.ngOnDestroy = function () {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    };
    AgmSnazzyInfoWindow.ctorParameters = function () { return [
        { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
        { type: GoogleMapsAPIWrapper },
        { type: MarkerManager },
        { type: MapsAPILoader }
    ]; };
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
    return AgmSnazzyInfoWindow;
}());
export { AgmSnazzyInfoWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25henp5LWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9zbmF6enktaW5mby13aW5kb3cvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NuYXp6eS1pbmZvLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFGLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQXdCLFFBQVEsRUFBRSxNQUFNLEVBQWlCLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU3pOO0lBK0lFLDZCQUMwQyxPQUFrQixFQUNsRCxRQUE4QixFQUM5QixRQUF1QixFQUN2QixPQUFzQjtRQUhVLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBdEloQzs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDTyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTVFOztXQUVHO1FBQ00sY0FBUyxHQUF3QyxLQUFLLENBQUM7UUFFaEU7O1dBRUc7UUFDTSxhQUFRLEdBQW9CLEdBQUcsQ0FBQztRQUV6Qzs7V0FFRztRQUNNLGNBQVMsR0FBb0IsR0FBRyxDQUFDO1FBOEMxQzs7O1dBR0c7UUFDTSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFbEM7OztXQUdHO1FBQ00sb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFRaEM7O1dBRUc7UUFDTSx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFckM7O1dBRUc7UUFDTSxvQkFBZSxHQUFH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QUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSw4RUFBOEU7U0FDekYsQ0FBQztRQWlKRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBLEVBQUUsbUJBQUEsUUFBUSxFQUFFLENBQUE7T0FoSnRCLG1CQUFtQixDQWlSL0I7SUFBRCwwQkFBQztDQUFBLEFBalJELElBaVJDO1NBalJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbU1hcmtlciwgR29vZ2xlTWFwc0FQSVdyYXBwZXIsIE1hcHNBUElMb2FkZXIsIE1hcmtlck1hbmFnZXIgfSBmcm9tICdAYWdtL2NvcmUnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFNraXBTZWxmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdhZ20tc25henp5LWluZm8td2luZG93JyxcclxuICB0ZW1wbGF0ZTogJzxkaXYgI291dGVyV3JhcHBlcj48ZGl2ICN2aWV3Q29udGFpbmVyPjwvZGl2PjwvZGl2PjxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtU25henp5SW5mb1dpbmRvdyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSB3aGVyZSB0aGUgaW5mbyB3aW5kb3cgaXMgYW5jaG9yZWQuXHJcbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF0aXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvbmdpdHVkZSB3aGVyZSB0aGUgaW5mbyB3aW5kb3cgaXMgYW5jaG9yZWQuXHJcbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgdGhlIG9wZW4gc3RhdHVzIG9mIHRoZSBzbmF6enkgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHdoZW4gdGhlIG9wZW4gc3RhdHVzIGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBDaG9vc2Ugd2hlcmUgeW91IHdhbnQgdGhlIGluZm8gd2luZG93IHRvIGJlIGRpc3BsYXllZCwgcmVsYXRpdmUgdG8gdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnID0gJ3RvcCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXggd2lkdGggaW4gcGl4ZWxzIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4IGhlaWdodCBpbiBwaXhlbHMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heEhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29sb3IgdG8gdXNlIGZvciB0aGUgYmFja2dyb3VuZCBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHBhZGRpbmcgc2l6ZSBhcm91bmQgdGhlIGNvbnRlbnQgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhZGRpbmc6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gYm9yZGVyIGFyb3VuZCB0aGUgaW5mbyB3aW5kb3cuIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgYm9yZGVyLlxyXG4gICAqIFRoZSB1bml0cyB1c2VkIGZvciBib3JkZXIgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIHBvaW50ZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYm9yZGVyOiB7d2lkdGg6IHN0cmluZzsgY29sb3I6IHN0cmluZ30gfCBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSBDU1MgYm9yZGVyIHJhZGl1cyBwcm9wZXJ0eSB0byBzcGVjaWZ5IHRoZSByb3VuZGVkIGNvcm5lcnMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZm9udCBjb2xvciB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9udENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmb250IHNpemUgdG8gdXNlIGZvciB0aGUgY29udGVudCBpbnNpZGUgdGhlIGJvZHkgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvbnRTaXplOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIHBvaW50ZXIgZnJvbSB0aGUgaW5mbyB3aW5kb3cgdG8gdGhlIG1hcmtlci5cclxuICAgKiBTZXQgdG8gZmFsc2UgdG8gY29tcGxldGVseSByZW1vdmUgdGhlIHBvaW50ZXIuXHJcbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIHBvaW50ZXIgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIGJvcmRlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBwb2ludGVyOiBzdHJpbmcgfCBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgQ1NTIHByb3BlcnRpZXMgZm9yIHRoZSBzaGFkb3cgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgc2hhZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNoYWRvdzogYm9vbGVhbiB8IHtoPzogc3RyaW5nLCB2Pzogc3RyaW5nLCBibHVyOiBzdHJpbmcsIHNwcmVhZDogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmd9O1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIG9wZW4gd2hlbiB0aGUgbWFya2VyIGlzIGNsaWNrZWQuXHJcbiAgICogQW4gaW50ZXJuYWwgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIEdvb2dsZSBNYXBzIGNsaWNrIGV2ZW50IHdoaWNoIGNhbGxzIHRoZSBvcGVuKCkgbWV0aG9kLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wZW5Pbk1hcmtlckNsaWNrID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBjbG9zZSB3aGVuIHRoZSBtYXAgaXMgY2xpY2tlZC4gQW4gaW50ZXJuYWwgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIEdvb2dsZSBNYXBzIGNsaWNrIGV2ZW50IHdoaWNoIGNhbGxzIHRoZSBjbG9zZSgpIG1ldGhvZC5cclxuICAgKiBUaGlzIHdpbGwgbm90IGFjdGl2YXRlIG9uIHRoZSBHb29nbGUgTWFwcyBkcmFnIGV2ZW50IHdoZW4gdGhlIHVzZXIgaXMgcGFubmluZyB0aGUgbWFwLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNsb3NlT25NYXBDbGljayA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9wdGlvbmFsIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIHdyYXBwZXIgY29udGFpbmVyIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKiBDYW4gYmUgdXNlZCBmb3IgYXBwbHlpbmcgY3VzdG9tIENTUyB0byB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgd3JhcHBlckNsYXNzOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgY2xvc2Ugd2hlbiBhbnkgb3RoZXIgU25henp5IEluZm8gV2luZG93IGlzIG9wZW5lZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbG9zZVdoZW5PdGhlcnNPcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgc2hvdyBhIGNsb3NlIGJ1dHRvbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93Q2xvc2VCdXR0b24gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGJlIHBhbm5lZCBpbnRvIHZpZXcgd2hlbiBvcGVuZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFuT25PcGVuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYmVmb3JlIHRoZSBpbmZvIHdpbmRvdyBvcGVucy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgYmVmb3JlT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBiZWZvcmUgdGhlIGluZm8gd2luZG93IGNsb3Nlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgYWZ0ZXJDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCdvdXRlcldyYXBwZXInLCB7cmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZX0pIF9vdXRlcldyYXBwZXI6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3ZpZXdDb250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZX0pIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIF90ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHJvdGVjdGVkIF9uYXRpdmVTbmF6enlJbmZvV2luZG93OiBhbnk7XHJcbiAgcHJvdGVjdGVkIF9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQ6IFByb21pc2U8YW55PiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfbWFya2VyOiBBZ21NYXJrZXIsXHJcbiAgICBwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlcixcclxuICAgIHByaXZhdGUgX21hbmFnZXI6IE1hcmtlck1hbmFnZXIsXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IE1hcHNBUElMb2FkZXIsXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAodGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdyA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICgnaXNPcGVuJyBpbiBjaGFuZ2VzICYmIHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuX29wZW5JbmZvV2luZG93KCk7XHJcbiAgICB9IGVsc2UgaWYgKCdpc09wZW4nIGluIGNoYW5nZXMgJiYgIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuX2Nsb3NlSW5mb1dpbmRvdygpO1xyXG4gICAgfVxyXG4gICAgaWYgKCgnbGF0aXR1ZGUnIGluIGNoYW5nZXMgfHwgJ2xvbmdpdHVkZScgaW4gY2hhbmdlcykgJiYgdGhpcy5fbWFya2VyID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGNvbnN0IG0gPSB0aGlzLl9tYW5hZ2VyICE9IG51bGwgPyB0aGlzLl9tYW5hZ2VyLmdldE5hdGl2ZU1hcmtlcih0aGlzLl9tYXJrZXIpIDogbnVsbDtcclxuICAgIHRoaXMuX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZCA9IHRoaXMuX2xvYWRlci5sb2FkKClcclxuICAgICAgLnRoZW4oKCkgPT4gcmVxdWlyZSgnc25henp5LWluZm8td2luZG93JykpXHJcbiAgICAgIC50aGVuKChtb2R1bGU6IGFueSkgPT4gUHJvbWlzZS5hbGwoW21vZHVsZSwgbSwgdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKV0pKVxyXG4gICAgICAudGhlbigoZWxlbXMpID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgICAgICBtYXA6IGVsZW1zWzJdLFxyXG4gICAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgsXHJcbiAgICAgICAgICBtYXhIZWlnaHQ6IHRoaXMubWF4SGVpZ2h0LFxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcclxuICAgICAgICAgIHBhZGRpbmc6IHRoaXMucGFkZGluZyxcclxuICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXIsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaXMuYm9yZGVyUmFkaXVzLFxyXG4gICAgICAgICAgZm9udENvbG9yOiB0aGlzLmZvbnRDb2xvcixcclxuICAgICAgICAgIHBvaW50ZXI6IHRoaXMucG9pbnRlcixcclxuICAgICAgICAgIHNoYWRvdzogdGhpcy5zaGFkb3csXHJcbiAgICAgICAgICBjbG9zZU9uTWFwQ2xpY2s6IHRoaXMuY2xvc2VPbk1hcENsaWNrLFxyXG4gICAgICAgICAgb3Blbk9uTWFya2VyQ2xpY2s6IHRoaXMub3Blbk9uTWFya2VyQ2xpY2ssXHJcbiAgICAgICAgICBjbG9zZVdoZW5PdGhlcnNPcGVuOiB0aGlzLmNsb3NlV2hlbk90aGVyc09wZW4sXHJcbiAgICAgICAgICBzaG93Q2xvc2VCdXR0b246IHRoaXMuc2hvd0Nsb3NlQnV0dG9uLFxyXG4gICAgICAgICAgcGFuT25PcGVuOiB0aGlzLnBhbk9uT3BlbixcclxuICAgICAgICAgIHdyYXBwZXJDbGFzczogdGhpcy53cmFwcGVyQ2xhc3MsXHJcbiAgICAgICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICAgICAgYmVmb3JlT3BlbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVZpZXdDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5iZWZvcmVPcGVuLmVtaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWZ0ZXJPcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLm9wZW5TdGF0dXMoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFmdGVyQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmFmdGVyQ2xvc2UuZW1pdCgpO1xyXG4gICAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5vcGVuU3RhdHVzKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChlbGVtc1sxXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICBvcHRpb25zLm1hcmtlciA9IGVsZW1zWzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvcHRpb25zLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93ID0gbmV3IGVsZW1zWzBdKG9wdGlvbnMpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9vcGVuSW5mb1dpbmRvdygpIHtcclxuICAgIHRoaXMuX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZC50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fY3JlYXRlVmlld0NvbnRlbnQoKTtcclxuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5vcGVuKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfY2xvc2VJbmZvV2luZG93KCkge1xyXG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfY3JlYXRlVmlld0NvbnRlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5fdmlld0NvbnRhaW5lclJlZi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZXZyID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGVSZWYpO1xyXG4gICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5zZXRDb250ZW50KHRoaXMuX291dGVyV3JhcHBlci5uYXRpdmVFbGVtZW50KTtcclxuICAgIC8vIHdlIGhhdmUgdG8gcnVuIHRoaXMgaW4gYSBzZXBhcmF0ZSBjeWNsZS5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBldnIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3VwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcclxuICAgICAgbG5nOiB0aGlzLmxvbmdpdHVkZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIFNuYXp6eSBJbmZvIFdpbmRvdyBpcyBpbml0aWFsaXplZCBhbmQgb3Blbi5cclxuICAgKi9cclxuICBvcGVuU3RhdHVzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgJiYgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5pc09wZW4oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cpIHtcclxuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==