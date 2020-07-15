import * as tslib_1 from "tslib";
import { isPlatformServer } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { FitBoundsService } from '../services/fit-bounds';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { LayerManager } from '../services/managers/layer-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolygonManager } from '../services/managers/polygon-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
import { RectangleManager } from '../services/managers/rectangle-manager';
import { DataLayerManager } from './../services/managers/data-layer-manager';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMap = /** @class */ (function () {
    function AgmMap(_elem, _mapsWrapper, _platformId, _fitBoundsService, _zone) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        this._platformId = _platformId;
        this._fitBoundsService = _fitBoundsService;
        this._zone = _zone;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * Sets the viewport to contain the given bounds.
         * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
         */
        this.fitBounds = false;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        /**
         * The initial enabled/disabled state of the Pan control.
         */
        this.panControl = false;
        /**
         * The initial enabled/disabled state of the Rotate control.
         */
        this.rotateControl = false;
        /**
         * The initial enabled/disabled state of the Fullscreen control.
         */
        this.fullscreenControl = false;
        /**
         * The map mapTypeId. Defaults to 'roadmap'.
         */
        this.mapTypeId = 'roadmap';
        /**
         * When false, map icons are not clickable. A map icon represents a point of interest,
         * also known as a POI. By default map icons are clickable.
         */
        this.clickableIcons = true;
        /**
         * A map icon represents a point of interest, also known as a POI.
         * When map icons are clickable by default, an info window is displayed.
         * When this property is set to false, the info window will not be shown but the click event
         * will still fire
         */
        this.showDefaultInfoWindow = true;
        /**
         * This setting controls how gestures on the map are handled.
         * Allowed values:
         * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
         * - 'greedy'      (All touch gestures pan or zoom the map.)
         * - 'none'        (The map cannot be panned or zoomed by user gestures.)
         * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
         */
        this.gestureHandling = 'auto';
        /**
         * Controls the automatic switching behavior for the angle of incidence of
         * the map. The only allowed values are 0 and 45. The value 0 causes the map
         * to always use a 0° overhead view regardless of the zoom level and
         * viewport. The value 45 causes the tilt angle to automatically switch to
         * 45 whenever 45° imagery is available for the current zoom level and
         * viewport, and switch back to 0 whenever 45° imagery is not available
         * (this is the default behavior). 45° imagery is only available for
         * satellite and hybrid map types, within some locations, and at some zoom
         * levels. Note: getTilt returns the current tilt angle, not the value
         * specified by this option. Because getTilt and this option refer to
         * different things, do not bind() the tilt property; doing so may yield
         * unpredictable effects. (Default of AGM is 0 (disabled). Enable it with value 45.)
         */
        this.tilt = 0;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event is fired when the mapTypeId property changes.
         */
        this.mapTypeIdChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new EventEmitter();
        /**
         * This event is fired when the visible tiles have finished loading.
         */
        this.tilesLoaded = new EventEmitter();
    }
    AgmMap_1 = AgmMap;
    /** @internal */
    AgmMap.prototype.ngOnInit = function () {
        if (isPlatformServer(this._platformId)) {
            // The code is running on the server, do nothing
            return;
        }
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
        this._initMapInstance(container);
    };
    AgmMap.prototype._initMapInstance = function (el) {
        var _this = this;
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            controlSize: this.controlSize,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            styles: this.styles,
            zoomControl: this.zoomControl,
            zoomControlOptions: this.zoomControlOptions,
            streetViewControl: this.streetViewControl,
            streetViewControlOptions: this.streetViewControlOptions,
            scaleControl: this.scaleControl,
            scaleControlOptions: this.scaleControlOptions,
            mapTypeControl: this.mapTypeControl,
            mapTypeControlOptions: this.mapTypeControlOptions,
            panControl: this.panControl,
            panControlOptions: this.panControlOptions,
            rotateControl: this.rotateControl,
            rotateControlOptions: this.rotateControlOptions,
            fullscreenControl: this.fullscreenControl,
            fullscreenControlOptions: this.fullscreenControlOptions,
            mapTypeId: this.mapTypeId,
            clickableIcons: this.clickableIcons,
            gestureHandling: this.gestureHandling,
            tilt: this.tilt,
            restriction: this.restriction,
        })
            .then(function () { return _this._mapsWrapper.getNativeMap(); })
            .then(function (map) { return _this.mapReady.emit(map); });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleMapTypeIdChange();
        this._handleTilesLoadedEvent();
        this._handleIdleEvent();
    };
    /** @internal */
    AgmMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        // remove all listeners from the map instance
        this._mapsWrapper.clearInstanceListeners();
        if (this._fitBoundsSubscription) {
            this._fitBoundsSubscription.unsubscribe();
        }
    };
    /* @internal */
    AgmMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    AgmMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmMap_1._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    AgmMap.prototype.triggerResize = function (recenter) {
        var _this = this;
        if (recenter === void 0) { recenter = true; }
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () {
                return _this._mapsWrapper.triggerMapEvent('resize').then(function () {
                    if (recenter) {
                        _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
                    }
                    resolve();
                });
            });
        });
    };
    AgmMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            !changes['fitBounds']) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if ('fitBounds' in changes) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        this._setCenter();
    };
    AgmMap.prototype._setCenter = function () {
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    AgmMap.prototype._fitBounds = function () {
        switch (this.fitBounds) {
            case true:
                this._subscribeToFitBoundsUpdates();
                break;
            case false:
                if (this._fitBoundsSubscription) {
                    this._fitBoundsSubscription.unsubscribe();
                }
                break;
            default:
                this._updateBounds(this.fitBounds, this.fitBoundsPadding);
        }
    };
    AgmMap.prototype._subscribeToFitBoundsUpdates = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._fitBoundsSubscription = _this._fitBoundsService.getBounds$().subscribe(function (b) {
                _this._zone.run(function () { return _this._updateBounds(b, _this.fitBoundsPadding); });
            });
        });
    };
    AgmMap.prototype._updateBounds = function (bounds, padding) {
        if (!bounds) {
            return;
        }
        if (this._isLatLngBoundsLiteral(bounds) && typeof google !== 'undefined' && google && google.maps && google.maps.LatLngBounds) {
            var newBounds = new google.maps.LatLngBounds();
            newBounds.union(bounds);
            bounds = newBounds;
        }
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(bounds, padding);
            return;
        }
        this._mapsWrapper.fitBounds(bounds, padding);
    };
    AgmMap.prototype._isLatLngBoundsLiteral = function (bounds) {
        return bounds != null && bounds.extend === undefined;
    };
    AgmMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapTypeIdChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(function () {
            _this._mapsWrapper.getMapTypeId().then(function (mapTypeId) { _this.mapTypeIdChange.emit(mapTypeId); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleTilesLoadedEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('tilesloaded').subscribe(function () { return _this.tilesLoaded.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
            { name: 'dblclick', emitter: this.mapDblClick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = {
                    coords: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    },
                    placeId: event.placeId,
                };
                // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
                if (value.placeId && !_this.showDefaultInfoWindow) {
                    event.stop();
                }
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    var AgmMap_1;
    /**
     * Map option attributes that can change over time
     */
    AgmMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl',
        'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom',
        'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions',
        'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions',
        'mapTypeId', 'clickableIcons', 'gestureHandling', 'tilt', 'restriction',
    ];
    AgmMap.ctorParameters = function () { return [
        { type: ElementRef },
        { type: GoogleMapsAPIWrapper },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: FitBoundsService },
        { type: NgZone }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "zoom", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "minZoom", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "maxZoom", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "controlSize", void 0);
    tslib_1.__decorate([
        Input('mapDraggable')
    ], AgmMap.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "disableDoubleClickZoom", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "disableDefaultUI", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "scrollwheel", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "backgroundColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "draggableCursor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "draggingCursor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "keyboardShortcuts", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "zoomControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "zoomControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "styles", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "usePanning", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "streetViewControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "streetViewControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "fitBounds", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "fitBoundsPadding", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "scaleControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "scaleControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "mapTypeControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "mapTypeControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "panControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "panControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "rotateControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "rotateControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "fullscreenControl", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "fullscreenControlOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "mapTypeId", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "clickableIcons", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "showDefaultInfoWindow", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "gestureHandling", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "tilt", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmMap.prototype, "restriction", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "mapClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "mapRightClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "mapDblClick", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "centerChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "boundsChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "mapTypeIdChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "idle", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "zoomChange", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "mapReady", void 0);
    tslib_1.__decorate([
        Output()
    ], AgmMap.prototype, "tilesLoaded", void 0);
    AgmMap = AgmMap_1 = tslib_1.__decorate([
        Component({
            selector: 'agm-map',
            providers: [
                CircleManager,
                DataLayerManager,
                DataLayerManager,
                FitBoundsService,
                GoogleMapsAPIWrapper,
                InfoWindowManager,
                KmlLayerManager,
                LayerManager,
                MarkerManager,
                PolygonManager,
                PolylineManager,
                RectangleManager,
            ],
            host: {
                // todo: deprecated - we will remove it with the next version
                '[class.sebm-google-map-container]': 'true',
            },
            template: "\n              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n              <div class='agm-map-content'>\n                <ng-content></ng-content>\n              </div>\n  ",
            styles: ["\n    .agm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "]
        }),
        tslib_1.__param(2, Inject(PLATFORM_ID))
    ], AgmMap);
    return AgmMap;
}());
export { AgmMap };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUk3SixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQU0zRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUkzRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQXFDSDtJQTBTRSxnQkFDVSxLQUFpQixFQUNqQixZQUFrQyxFQUNiLFdBQW1CLEVBQ3RDLGlCQUFtQyxFQUNyQyxLQUFhO1FB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ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFBMQVRGT1JNX0lELCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL21hcC10eXBlcyc7XHJcbmltcG9ydCB7IEZpdEJvdW5kc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcbmltcG9ydCB7XHJcbiAgRnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zLCBMYXRMbmcsIExhdExuZ0JvdW5kcywgTGF0TG5nQm91bmRzTGl0ZXJhbCwgTGF0TG5nTGl0ZXJhbCxcclxuICBNYXBSZXN0cmljdGlvbiwgTWFwVHlwZUNvbnRyb2xPcHRpb25zLCBNYXBUeXBlSWQsIE1hcFR5cGVTdHlsZSwgUGFkZGluZywgUGFuQ29udHJvbE9wdGlvbnMsXHJcbiAgUm90YXRlQ29udHJvbE9wdGlvbnMsIFNjYWxlQ29udHJvbE9wdGlvbnMsIFN0cmVldFZpZXdDb250cm9sT3B0aW9ucywgWm9vbUNvbnRyb2xPcHRpb25zLFxyXG59IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcclxuaW1wb3J0IHsgQ2lyY2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcclxuaW1wb3J0IHsgTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlcic7XHJcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XHJcbmltcG9ydCB7IFBvbHlnb25NYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyJztcclxuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XHJcbmltcG9ydCB7IFJlY3RhbmdsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9yZWN0YW5nbGUtbWFuYWdlcic7XHJcbmltcG9ydCB7IERhdGFMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2RhdGEtbGF5ZXItbWFuYWdlcic7XHJcbmltcG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogQWdtTWFwIHJlbmRlcnMgYSBHb29nbGUgTWFwLlxyXG4gKiAqKkltcG9ydGFudCBub3RlKio6IFRvIGJlIGFibGUgc2VlIGEgbWFwIGluIHRoZSBicm93c2VyLCB5b3UgaGF2ZSB0byBkZWZpbmUgYSBoZWlnaHQgZm9yIHRoZVxyXG4gKiBlbGVtZW50IGBhZ20tbWFwYC5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICBhZ20tbWFwIHtcclxuICogICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgICB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxyXG4gKiAgICA8L2FnbS1tYXA+XHJcbiAqICBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZ20tbWFwJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENpcmNsZU1hbmFnZXIsXHJcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLFxyXG4gICAgRGF0YUxheWVyTWFuYWdlcixcclxuICAgIEZpdEJvdW5kc1NlcnZpY2UsXHJcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlcixcclxuICAgIEluZm9XaW5kb3dNYW5hZ2VyLFxyXG4gICAgS21sTGF5ZXJNYW5hZ2VyLFxyXG4gICAgTGF5ZXJNYW5hZ2VyLFxyXG4gICAgTWFya2VyTWFuYWdlcixcclxuICAgIFBvbHlnb25NYW5hZ2VyLFxyXG4gICAgUG9seWxpbmVNYW5hZ2VyLFxyXG4gICAgUmVjdGFuZ2xlTWFuYWdlcixcclxuICBdLFxyXG4gIGhvc3Q6IHtcclxuICAgIC8vIHRvZG86IGRlcHJlY2F0ZWQgLSB3ZSB3aWxsIHJlbW92ZSBpdCB3aXRoIHRoZSBuZXh0IHZlcnNpb25cclxuICAgICdbY2xhc3Muc2VibS1nb29nbGUtbWFwLWNvbnRhaW5lcl0nOiAndHJ1ZScsXHJcbiAgfSxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuYWdtLW1hcC1jb250YWluZXItaW5uZXIge1xyXG4gICAgICB3aWR0aDogaW5oZXJpdDtcclxuICAgICAgaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgfVxyXG4gICAgLmFnbS1tYXAtY29udGVudCB7XHJcbiAgICAgIGRpc3BsYXk6bm9uZTtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FnbS1tYXAtY29udGFpbmVyLWlubmVyIHNlYm0tZ29vZ2xlLW1hcC1jb250YWluZXItaW5uZXInPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FnbS1tYXAtY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbU1hcCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBsb25naXR1ZGUgdGhhdCBkZWZpbmVzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cclxuICAgKi9cclxuICBASW5wdXQoKSBsb25naXR1ZGUgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgdGhhdCBkZWZpbmVzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cclxuICAgKi9cclxuICBASW5wdXQoKSBsYXRpdHVkZSA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIFRoZSBkZWZhdWx0IHpvb20gbGV2ZWwgaXMgOC5cclxuICAgKi9cclxuICBASW5wdXQoKSB6b29tID0gODtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1pbmltYWwgem9vbSBsZXZlbCBvZiB0aGUgbWFwIGFsbG93ZWQuIFdoZW4gbm90IHByb3ZpZGVkLCBubyByZXN0cmljdGlvbnMgdG8gdGhlIHpvb20gbGV2ZWxcclxuICAgKiBhcmUgZW5mb3JjZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWluWm9vbTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4aW1hbCB6b29tIGxldmVsIG9mIHRoZSBtYXAgYWxsb3dlZC4gV2hlbiBub3QgcHJvdmlkZWQsIG5vIHJlc3RyaWN0aW9ucyB0byB0aGUgem9vbSBsZXZlbFxyXG4gICAqIGFyZSBlbmZvcmNlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhab29tOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb250cm9sIHNpemUgZm9yIHRoZSBkZWZhdWx0IG1hcCBjb250cm9scy4gT25seSBnb3Zlcm5zIHRoZSBjb250cm9scyBtYWRlIGJ5IHRoZSBNYXBzIEFQSSBpdHNlbGZcclxuICAgKi9cclxuICBASW5wdXQoKSBjb250cm9sU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGVzL2Rpc2FibGVzIGlmIG1hcCBpcyBkcmFnZ2FibGUuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgnbWFwRHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlcy9kaXNhYmxlcyB6b29tIGFuZCBjZW50ZXIgb24gZG91YmxlIGNsaWNrLiBFbmFibGVkIGJ5IGRlZmF1bHQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZURvdWJsZUNsaWNrWm9vbSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGVzL2Rpc2FibGVzIGFsbCBkZWZhdWx0IFVJIG9mIHRoZSBHb29nbGUgbWFwLiBQbGVhc2Ugbm90ZTogV2hlbiB0aGUgbWFwIGlzIGNyZWF0ZWQsIHRoaXNcclxuICAgKiB2YWx1ZSBjYW5ub3QgZ2V0IHVwZGF0ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZURlZmF1bHRVSSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBmYWxzZSwgZGlzYWJsZXMgc2Nyb2xsd2hlZWwgem9vbWluZyBvbiB0aGUgbWFwLiBUaGUgc2Nyb2xsd2hlZWwgaXMgZW5hYmxlZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNjcm9sbHdoZWVsID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sb3IgdXNlZCBmb3IgdGhlIGJhY2tncm91bmQgb2YgdGhlIE1hcCBkaXYuIFRoaXMgY29sb3Igd2lsbCBiZSB2aXNpYmxlIHdoZW4gdGlsZXMgaGF2ZSBub3RcclxuICAgKiB5ZXQgbG9hZGVkIGFzIHRoZSB1c2VyIHBhbnMuIFRoaXMgb3B0aW9uIGNhbiBvbmx5IGJlIHNldCB3aGVuIHRoZSBtYXAgaXMgaW5pdGlhbGl6ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9yIHVybCBvZiB0aGUgY3Vyc29yIHRvIGRpc3BsYXkgd2hlbiBtb3VzaW5nIG92ZXIgYSBkcmFnZ2FibGUgbWFwLiBUaGlzIHByb3BlcnR5IHVzZXNcclxuICAgKiB0aGUgY3NzICAqIGN1cnNvciBhdHRyaWJ1dGUgdG8gY2hhbmdlIHRoZSBpY29uLiBBcyB3aXRoIHRoZSBjc3MgcHJvcGVydHksIHlvdSBtdXN0IHNwZWNpZnkgYXRcclxuICAgKiBsZWFzdCBvbmUgZmFsbGJhY2sgY3Vyc29yIHRoYXQgaXMgbm90IGEgVVJMLiBGb3IgZXhhbXBsZTpcclxuICAgKiBbZHJhZ2dhYmxlQ3Vyc29yXT1cIid1cmwoaHR0cDovL3d3dy5leGFtcGxlLmNvbS9pY29uLnBuZyksIGF1dG87J1wiXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJhZ2dhYmxlQ3Vyc29yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9yIHVybCBvZiB0aGUgY3Vyc29yIHRvIGRpc3BsYXkgd2hlbiB0aGUgbWFwIGlzIGJlaW5nIGRyYWdnZWQuIFRoaXMgcHJvcGVydHkgdXNlcyB0aGVcclxuICAgKiBjc3MgY3Vyc29yIGF0dHJpYnV0ZSB0byBjaGFuZ2UgdGhlIGljb24uIEFzIHdpdGggdGhlIGNzcyBwcm9wZXJ0eSwgeW91IG11c3Qgc3BlY2lmeSBhdCBsZWFzdFxyXG4gICAqIG9uZSBmYWxsYmFjayBjdXJzb3IgdGhhdCBpcyBub3QgYSBVUkwuIEZvciBleGFtcGxlOlxyXG4gICAqIFtkcmFnZ2luZ0N1cnNvcl09XCIndXJsKGh0dHA6Ly93d3cuZXhhbXBsZS5jb20vaWNvbi5wbmcpLCBhdXRvOydcIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYWdnaW5nQ3Vyc29yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGZhbHNlLCBwcmV2ZW50cyB0aGUgbWFwIGZyb20gYmVpbmcgY29udHJvbGxlZCBieSB0aGUga2V5Ym9hcmQuIEtleWJvYXJkIHNob3J0Y3V0cyBhcmVcclxuICAgKiBlbmFibGVkIGJ5IGRlZmF1bHQuXHJcbiAgICovXHJcbiAgQElucHV0KCkga2V5Ym9hcmRTaG9ydGN1dHMgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgWm9vbSBjb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHpvb21Db250cm9sOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciB0aGUgWm9vbSBjb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHpvb21Db250cm9sT3B0aW9uczogWm9vbUNvbnRyb2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBTdHlsZXMgdG8gYXBwbHkgdG8gZWFjaCBvZiB0aGUgZGVmYXVsdCBtYXAgdHlwZXMuIE5vdGUgdGhhdCBmb3IgU2F0ZWxsaXRlL0h5YnJpZCBhbmQgVGVycmFpblxyXG4gICAqIG1vZGVzLCB0aGVzZSBzdHlsZXMgd2lsbCBvbmx5IGFwcGx5IHRvIGxhYmVscyBhbmQgZ2VvbWV0cnkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3R5bGVzOiBNYXBUeXBlU3R5bGVbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRydWUgYW5kIHRoZSBsYXRpdHVkZSBhbmQvb3IgbG9uZ2l0dWRlIHZhbHVlcyBjaGFuZ2VzLCB0aGUgR29vZ2xlIE1hcHMgcGFuVG8gbWV0aG9kIGlzXHJcbiAgICogdXNlZCB0b1xyXG4gICAqIGNlbnRlciB0aGUgbWFwLiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L3JlZmVyZW5jZSNNYXBcclxuICAgKi9cclxuICBASW5wdXQoKSB1c2VQYW5uaW5nID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFN0cmVldCBWaWV3IFBlZ21hbiBjb250cm9sLlxyXG4gICAqIFRoaXMgY29udHJvbCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IFVJLCBhbmQgc2hvdWxkIGJlIHNldCB0byBmYWxzZSB3aGVuIGRpc3BsYXlpbmcgYSBtYXAgdHlwZVxyXG4gICAqIG9uIHdoaWNoIHRoZSBTdHJlZXQgVmlldyByb2FkIG92ZXJsYXkgc2hvdWxkIG5vdCBhcHBlYXIgKGUuZy4gYSBub24tRWFydGggbWFwIHR5cGUpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cmVldFZpZXdDb250cm9sOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciB0aGUgU3RyZWV0IFZpZXcgY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM6IFN0cmVldFZpZXdDb250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmlld3BvcnQgdG8gY29udGFpbiB0aGUgZ2l2ZW4gYm91bmRzLlxyXG4gICAqIElmIHRoaXMgb3B0aW9uIHRvIGB0cnVlYCwgdGhlIGJvdW5kcyBnZXQgYXV0b21hdGljYWxseSBjb21wdXRlZCBmcm9tIGFsbCBlbGVtZW50cyB0aGF0IHVzZSB0aGUge0BsaW5rIEFnbUZpdEJvdW5kc30gZGlyZWN0aXZlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZpdEJvdW5kczogTGF0TG5nQm91bmRzTGl0ZXJhbCB8IExhdExuZ0JvdW5kcyB8IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFkZGluZyBhbW91bnQgZm9yIHRoZSBib3VuZHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZml0Qm91bmRzUGFkZGluZzogbnVtYmVyIHwgUGFkZGluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgU2NhbGUgY29udHJvbC4gVGhpcyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNjYWxlQ29udHJvbCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciB0aGUgc2NhbGUgY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzY2FsZUNvbnRyb2xPcHRpb25zOiBTY2FsZUNvbnRyb2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXAgdHlwZSBjb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcFR5cGVDb250cm9sID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBNYXAgdHlwZSBjb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcFR5cGVDb250cm9sT3B0aW9uczogTWFwVHlwZUNvbnRyb2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBQYW4gY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYW5Db250cm9sICA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciB0aGUgUGFuIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFuQ29udHJvbE9wdGlvbnM6IFBhbkNvbnRyb2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBSb3RhdGUgY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSByb3RhdGVDb250cm9sID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBSb3RhdGUgY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSByb3RhdGVDb250cm9sT3B0aW9uczogUm90YXRlQ29udHJvbE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIEZ1bGxzY3JlZW4gY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBmdWxsc2NyZWVuQ29udHJvbCAgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyBmb3IgdGhlIEZ1bGxzY3JlZW4gY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM6IEZ1bGxzY3JlZW5Db250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCBtYXBUeXBlSWQuIERlZmF1bHRzIHRvICdyb2FkbWFwJy5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXBUeXBlSWQ6ICdyb2FkbWFwJyB8ICdoeWJyaWQnIHwgJ3NhdGVsbGl0ZScgfCAndGVycmFpbicgfCBzdHJpbmcgPSAncm9hZG1hcCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZmFsc2UsIG1hcCBpY29ucyBhcmUgbm90IGNsaWNrYWJsZS4gQSBtYXAgaWNvbiByZXByZXNlbnRzIGEgcG9pbnQgb2YgaW50ZXJlc3QsXHJcbiAgICogYWxzbyBrbm93biBhcyBhIFBPSS4gQnkgZGVmYXVsdCBtYXAgaWNvbnMgYXJlIGNsaWNrYWJsZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbGlja2FibGVJY29ucyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbWFwIGljb24gcmVwcmVzZW50cyBhIHBvaW50IG9mIGludGVyZXN0LCBhbHNvIGtub3duIGFzIGEgUE9JLlxyXG4gICAqIFdoZW4gbWFwIGljb25zIGFyZSBjbGlja2FibGUgYnkgZGVmYXVsdCwgYW4gaW5mbyB3aW5kb3cgaXMgZGlzcGxheWVkLlxyXG4gICAqIFdoZW4gdGhpcyBwcm9wZXJ0eSBpcyBzZXQgdG8gZmFsc2UsIHRoZSBpbmZvIHdpbmRvdyB3aWxsIG5vdCBiZSBzaG93biBidXQgdGhlIGNsaWNrIGV2ZW50XHJcbiAgICogd2lsbCBzdGlsbCBmaXJlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd0RlZmF1bHRJbmZvV2luZG93ID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBzZXR0aW5nIGNvbnRyb2xzIGhvdyBnZXN0dXJlcyBvbiB0aGUgbWFwIGFyZSBoYW5kbGVkLlxyXG4gICAqIEFsbG93ZWQgdmFsdWVzOlxyXG4gICAqIC0gJ2Nvb3BlcmF0aXZlJyAoVHdvLWZpbmdlciB0b3VjaCBnZXN0dXJlcyBwYW4gYW5kIHpvb20gdGhlIG1hcC4gT25lLWZpbmdlciB0b3VjaCBnZXN0dXJlcyBhcmUgbm90IGhhbmRsZWQgYnkgdGhlIG1hcC4pXHJcbiAgICogLSAnZ3JlZWR5JyAgICAgIChBbGwgdG91Y2ggZ2VzdHVyZXMgcGFuIG9yIHpvb20gdGhlIG1hcC4pXHJcbiAgICogLSAnbm9uZScgICAgICAgIChUaGUgbWFwIGNhbm5vdCBiZSBwYW5uZWQgb3Igem9vbWVkIGJ5IHVzZXIgZ2VzdHVyZXMuKVxyXG4gICAqIC0gJ2F1dG8nICAgICAgICBbZGVmYXVsdF0gKEdlc3R1cmUgaGFuZGxpbmcgaXMgZWl0aGVyIGNvb3BlcmF0aXZlIG9yIGdyZWVkeSwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIHBhZ2UgaXMgc2Nyb2xsYWJsZSBvciBub3QuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnIHwgJ2dyZWVkeScgfCAnbm9uZScgfCAnYXV0bycgPSAnYXV0byc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cm9scyB0aGUgYXV0b21hdGljIHN3aXRjaGluZyBiZWhhdmlvciBmb3IgdGhlIGFuZ2xlIG9mIGluY2lkZW5jZSBvZlxyXG4gICAgICogdGhlIG1hcC4gVGhlIG9ubHkgYWxsb3dlZCB2YWx1ZXMgYXJlIDAgYW5kIDQ1LiBUaGUgdmFsdWUgMCBjYXVzZXMgdGhlIG1hcFxyXG4gICAgICogdG8gYWx3YXlzIHVzZSBhIDDCsCBvdmVyaGVhZCB2aWV3IHJlZ2FyZGxlc3Mgb2YgdGhlIHpvb20gbGV2ZWwgYW5kXHJcbiAgICAgKiB2aWV3cG9ydC4gVGhlIHZhbHVlIDQ1IGNhdXNlcyB0aGUgdGlsdCBhbmdsZSB0byBhdXRvbWF0aWNhbGx5IHN3aXRjaCB0b1xyXG4gICAgICogNDUgd2hlbmV2ZXIgNDXCsCBpbWFnZXJ5IGlzIGF2YWlsYWJsZSBmb3IgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBhbmRcclxuICAgICAqIHZpZXdwb3J0LCBhbmQgc3dpdGNoIGJhY2sgdG8gMCB3aGVuZXZlciA0NcKwIGltYWdlcnkgaXMgbm90IGF2YWlsYWJsZVxyXG4gICAgICogKHRoaXMgaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IpLiA0NcKwIGltYWdlcnkgaXMgb25seSBhdmFpbGFibGUgZm9yXHJcbiAgICAgKiBzYXRlbGxpdGUgYW5kIGh5YnJpZCBtYXAgdHlwZXMsIHdpdGhpbiBzb21lIGxvY2F0aW9ucywgYW5kIGF0IHNvbWUgem9vbVxyXG4gICAgICogbGV2ZWxzLiBOb3RlOiBnZXRUaWx0IHJldHVybnMgdGhlIGN1cnJlbnQgdGlsdCBhbmdsZSwgbm90IHRoZSB2YWx1ZVxyXG4gICAgICogc3BlY2lmaWVkIGJ5IHRoaXMgb3B0aW9uLiBCZWNhdXNlIGdldFRpbHQgYW5kIHRoaXMgb3B0aW9uIHJlZmVyIHRvXHJcbiAgICAgKiBkaWZmZXJlbnQgdGhpbmdzLCBkbyBub3QgYmluZCgpIHRoZSB0aWx0IHByb3BlcnR5OyBkb2luZyBzbyBtYXkgeWllbGRcclxuICAgICAqIHVucHJlZGljdGFibGUgZWZmZWN0cy4gKERlZmF1bHQgb2YgQUdNIGlzIDAgKGRpc2FibGVkKS4gRW5hYmxlIGl0IHdpdGggdmFsdWUgNDUuKVxyXG4gICAgICovXHJcbiAgQElucHV0KCkgdGlsdCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgZm9yIHJlc3RyaWN0aW5nIHRoZSBib3VuZHMgb2YgdGhlIG1hcC5cclxuICAgKiBVc2VyIGNhbm5vdCBwYW4gb3Igem9vbSBhd2F5IGZyb20gcmVzdHJpY3RlZCBhcmVhLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3RyaWN0aW9uOiBNYXBSZXN0cmljdGlvbjtcclxuICAvKipcclxuICAgKiBNYXAgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBjYW4gY2hhbmdlIG92ZXIgdGltZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAnZGlzYWJsZURvdWJsZUNsaWNrWm9vbScsICdzY3JvbGx3aGVlbCcsICdkcmFnZ2FibGUnLCAnZHJhZ2dhYmxlQ3Vyc29yJywgJ2RyYWdnaW5nQ3Vyc29yJyxcclxuICAgICdrZXlib2FyZFNob3J0Y3V0cycsICd6b29tQ29udHJvbCcsICd6b29tQ29udHJvbE9wdGlvbnMnLCAnc3R5bGVzJywgJ3N0cmVldFZpZXdDb250cm9sJyxcclxuICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnLCAnem9vbScsICdtYXBUeXBlQ29udHJvbCcsICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnLCAnbWluWm9vbScsXHJcbiAgICAnbWF4Wm9vbScsICdwYW5Db250cm9sJywgJ3BhbkNvbnRyb2xPcHRpb25zJywgJ3JvdGF0ZUNvbnRyb2wnLCAncm90YXRlQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgJ2Z1bGxzY3JlZW5Db250cm9sJywgJ2Z1bGxzY3JlZW5Db250cm9sT3B0aW9ucycsICdzY2FsZUNvbnRyb2wnLCAnc2NhbGVDb250cm9sT3B0aW9ucycsXHJcbiAgICAnbWFwVHlwZUlkJywgJ2NsaWNrYWJsZUljb25zJywgJ2dlc3R1cmVIYW5kbGluZycsICd0aWx0JywgJ3Jlc3RyaWN0aW9uJyxcclxuICBdO1xyXG5cclxuICBwcml2YXRlIF9vYnNlcnZhYmxlU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIF9maXRCb3VuZHNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGljayBvbiBhXHJcbiAgICogbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtYXBDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgcmlnaHQtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFwRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBjZW50ZXIgY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2VudGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdmlld3BvcnQgYm91bmRzIGhhdmUgY2hhbmdlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgYm91bmRzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGF0TG5nQm91bmRzPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF0TG5nQm91bmRzPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1hcFR5cGVJZCBwcm9wZXJ0eSBjaGFuZ2VzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtYXBUeXBlSWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXBUeXBlSWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUeXBlSWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGJlY29tZXMgaWRsZSBhZnRlciBwYW5uaW5nIG9yIHpvb21pbmcuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGlkbGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB6b29tIGxldmVsIGhhcyBjaGFuZ2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB6b29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGdvb2dsZSBtYXAgaXMgZnVsbHkgaW5pdGlhbGl6ZWQuXHJcbiAgICogWW91IGdldCB0aGUgZ29vZ2xlLm1hcHMuTWFwIGluc3RhbmNlIGFzIGEgcmVzdWx0IG9mIHRoaXMgRXZlbnRFbWl0dGVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtYXBSZWFkeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB2aXNpYmxlIHRpbGVzIGhhdmUgZmluaXNoZWQgbG9hZGluZy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgdGlsZXNMb2FkZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZDogT2JqZWN0LFxyXG4gICAgcHJvdGVjdGVkIF9maXRCb3VuZHNTZXJ2aWNlOiBGaXRCb3VuZHNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lXHJcbiAgKSB7fVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAvLyBUaGUgY29kZSBpcyBydW5uaW5nIG9uIHRoZSBzZXJ2ZXIsIGRvIG5vdGhpbmdcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gdG9kbzogdGhpcyBzaG91bGQgYmUgc29sdmVkIHdpdGggYSBuZXcgY29tcG9uZW50IGFuZCBhIHZpZXdDaGlsZCBkZWNvcmF0b3JcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2VsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWdtLW1hcC1jb250YWluZXItaW5uZXInKTtcclxuICAgIHRoaXMuX2luaXRNYXBJbnN0YW5jZShjb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaW5pdE1hcEluc3RhbmNlKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlTWFwKGVsLCB7XHJcbiAgICAgIGNlbnRlcjoge2xhdDogdGhpcy5sYXRpdHVkZSB8fCAwLCBsbmc6IHRoaXMubG9uZ2l0dWRlIHx8IDB9LFxyXG4gICAgICB6b29tOiB0aGlzLnpvb20sXHJcbiAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcclxuICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxyXG4gICAgICBjb250cm9sU2l6ZTogdGhpcy5jb250cm9sU2l6ZSxcclxuICAgICAgZGlzYWJsZURlZmF1bHRVSTogdGhpcy5kaXNhYmxlRGVmYXVsdFVJLFxyXG4gICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0aGlzLmRpc2FibGVEb3VibGVDbGlja1pvb20sXHJcbiAgICAgIHNjcm9sbHdoZWVsOiB0aGlzLnNjcm9sbHdoZWVsLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICBkcmFnZ2FibGU6IHRoaXMuZHJhZ2dhYmxlLFxyXG4gICAgICBkcmFnZ2FibGVDdXJzb3I6IHRoaXMuZHJhZ2dhYmxlQ3Vyc29yLFxyXG4gICAgICBkcmFnZ2luZ0N1cnNvcjogdGhpcy5kcmFnZ2luZ0N1cnNvcixcclxuICAgICAga2V5Ym9hcmRTaG9ydGN1dHM6IHRoaXMua2V5Ym9hcmRTaG9ydGN1dHMsXHJcbiAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXHJcbiAgICAgIHpvb21Db250cm9sOiB0aGlzLnpvb21Db250cm9sLFxyXG4gICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zLFxyXG4gICAgICBzdHJlZXRWaWV3Q29udHJvbDogdGhpcy5zdHJlZXRWaWV3Q29udHJvbCxcclxuICAgICAgc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zOiB0aGlzLnN0cmVldFZpZXdDb250cm9sT3B0aW9ucyxcclxuICAgICAgc2NhbGVDb250cm9sOiB0aGlzLnNjYWxlQ29udHJvbCxcclxuICAgICAgc2NhbGVDb250cm9sT3B0aW9uczogdGhpcy5zY2FsZUNvbnRyb2xPcHRpb25zLFxyXG4gICAgICBtYXBUeXBlQ29udHJvbDogdGhpcy5tYXBUeXBlQ29udHJvbCxcclxuICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB0aGlzLm1hcFR5cGVDb250cm9sT3B0aW9ucyxcclxuICAgICAgcGFuQ29udHJvbDogdGhpcy5wYW5Db250cm9sLFxyXG4gICAgICBwYW5Db250cm9sT3B0aW9uczogdGhpcy5wYW5Db250cm9sT3B0aW9ucyxcclxuICAgICAgcm90YXRlQ29udHJvbDogdGhpcy5yb3RhdGVDb250cm9sLFxyXG4gICAgICByb3RhdGVDb250cm9sT3B0aW9uczogdGhpcy5yb3RhdGVDb250cm9sT3B0aW9ucyxcclxuICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IHRoaXMuZnVsbHNjcmVlbkNvbnRyb2wsXHJcbiAgICAgIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9uczogdGhpcy5mdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMsXHJcbiAgICAgIG1hcFR5cGVJZDogdGhpcy5tYXBUeXBlSWQsXHJcbiAgICAgIGNsaWNrYWJsZUljb25zOiB0aGlzLmNsaWNrYWJsZUljb25zLFxyXG4gICAgICBnZXN0dXJlSGFuZGxpbmc6IHRoaXMuZ2VzdHVyZUhhbmRsaW5nLFxyXG4gICAgICB0aWx0OiB0aGlzLnRpbHQsXHJcbiAgICAgIHJlc3RyaWN0aW9uOiB0aGlzLnJlc3RyaWN0aW9uLFxyXG4gICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkpXHJcbiAgICAgIC50aGVuKG1hcCA9PiB0aGlzLm1hcFJlYWR5LmVtaXQobWFwKSk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICB0aGlzLl9oYW5kbGVNYXBDZW50ZXJDaGFuZ2UoKTtcclxuICAgIHRoaXMuX2hhbmRsZU1hcFpvb21DaGFuZ2UoKTtcclxuICAgIHRoaXMuX2hhbmRsZU1hcE1vdXNlRXZlbnRzKCk7XHJcbiAgICB0aGlzLl9oYW5kbGVCb3VuZHNDaGFuZ2UoKTtcclxuICAgIHRoaXMuX2hhbmRsZU1hcFR5cGVJZENoYW5nZSgpO1xyXG4gICAgdGhpcy5faGFuZGxlVGlsZXNMb2FkZWRFdmVudCgpO1xyXG4gICAgdGhpcy5faGFuZGxlSWRsZUV2ZW50KCk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcblxyXG4gICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZnJvbSB0aGUgbWFwIGluc3RhbmNlXHJcbiAgICB0aGlzLl9tYXBzV3JhcHBlci5jbGVhckluc3RhbmNlTGlzdGVuZXJzKCk7XHJcbiAgICBpZiAodGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyogQGludGVybmFsICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgdGhpcy5fdXBkYXRlTWFwT3B0aW9uc0NoYW5nZXMoY2hhbmdlcyk7XHJcbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihjaGFuZ2VzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGxldCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XHJcbiAgICBsZXQgb3B0aW9uS2V5cyA9XHJcbiAgICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihrID0+IEFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpO1xyXG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChrKSA9PiB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XHJcbiAgICB0aGlzLl9tYXBzV3JhcHBlci5zZXRNYXBPcHRpb25zKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcnMgYSByZXNpemUgZXZlbnQgb24gdGhlIGdvb2dsZSBtYXAgaW5zdGFuY2UuXHJcbiAgICogV2hlbiByZWNlbnRlciBpcyB0cnVlLCB0aGUgb2YgdGhlIGdvb2dsZSBtYXAgZ2V0cyBjYWxsZWQgd2l0aCB0aGUgY3VycmVudCBsYXQvbG5nIHZhbHVlcyBvciBmaXRCb3VuZHMgdmFsdWUgdG8gcmVjZW50ZXIgdGhlIG1hcC5cclxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGdldHMgcmVzb2x2ZWQgYWZ0ZXIgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQuXHJcbiAgICovXHJcbiAgdHJpZ2dlclJlc2l6ZShyZWNlbnRlcjogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIE5vdGU6IFdoZW4gd2Ugd291bGQgdHJpZ2dlciB0aGUgcmVzaXplIGV2ZW50IGFuZCBzaG93IHRoZSBtYXAgaW4gdGhlIHNhbWUgdHVybiAod2hpY2ggaXMgYVxyXG4gICAgLy8gY29tbW9uIGNhc2UgZm9yIHRyaWdnZXJpbmcgYSByZXNpemUgZXZlbnQpLCB0aGVuIHRoZSByZXNpemUgZXZlbnQgd291bGQgbm90XHJcbiAgICAvLyB3b3JrICh0byBzaG93IHRoZSBtYXApLCBzbyB3ZSB0cmlnZ2VyIHRoZSBldmVudCBpbiBhIHRpbWVvdXQuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcHNXcmFwcGVyLnRyaWdnZXJNYXBFdmVudCgncmVzaXplJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVjZW50ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5maXRCb3VuZHMgIT0gbnVsbCA/IHRoaXMuX2ZpdEJvdW5kcygpIDogdGhpcy5fc2V0Q2VudGVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVQb3NpdGlvbihjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSA9PSBudWxsICYmIGNoYW5nZXNbJ2xvbmdpdHVkZSddID09IG51bGwgJiZcclxuICAgICAgICAhY2hhbmdlc1snZml0Qm91bmRzJ10pIHtcclxuICAgICAgLy8gbm8gcG9zaXRpb24gdXBkYXRlIG5lZWRlZFxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgcHJlZmVyIGZpdEJvdW5kcyBpbiBjaGFuZ2VzXHJcbiAgICBpZiAoJ2ZpdEJvdW5kcycgaW4gY2hhbmdlcykge1xyXG4gICAgICB0aGlzLl9maXRCb3VuZHMoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXRpdHVkZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHRoaXMubG9uZ2l0dWRlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXRDZW50ZXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldENlbnRlcigpIHtcclxuICAgIGxldCBuZXdDZW50ZXIgPSB7XHJcbiAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcclxuICAgICAgbG5nOiB0aGlzLmxvbmdpdHVkZSxcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XHJcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnBhblRvKG5ld0NlbnRlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5zZXRDZW50ZXIobmV3Q2VudGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2ZpdEJvdW5kcygpIHtcclxuICAgIHN3aXRjaCAodGhpcy5maXRCb3VuZHMpIHtcclxuICAgICAgY2FzZSB0cnVlOlxyXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZVRvRml0Qm91bmRzVXBkYXRlcygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIGZhbHNlOlxyXG4gICAgICAgIGlmICh0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgIHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLl91cGRhdGVCb3VuZHModGhpcy5maXRCb3VuZHMsIHRoaXMuZml0Qm91bmRzUGFkZGluZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zdWJzY3JpYmVUb0ZpdEJvdW5kc1VwZGF0ZXMoKSB7XHJcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uID0gdGhpcy5fZml0Qm91bmRzU2VydmljZS5nZXRCb3VuZHMkKCkuc3Vic2NyaWJlKGIgPT4ge1xyXG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuX3VwZGF0ZUJvdW5kcyhiLCB0aGlzLmZpdEJvdW5kc1BhZGRpbmcpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdXBkYXRlQm91bmRzKGJvdW5kczogTGF0TG5nQm91bmRzIHwgTGF0TG5nQm91bmRzTGl0ZXJhbCwgcGFkZGluZz86IG51bWJlciB8IFBhZGRpbmcpIHtcclxuICAgIGlmICghYm91bmRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9pc0xhdExuZ0JvdW5kc0xpdGVyYWwoYm91bmRzKSAmJiB0eXBlb2YgZ29vZ2xlICE9PSAndW5kZWZpbmVkJyAmJiBnb29nbGUgJiYgZ29vZ2xlLm1hcHMgJiYgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKSB7XHJcbiAgICAgIGNvbnN0IG5ld0JvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcclxuICAgICAgbmV3Qm91bmRzLnVuaW9uKGJvdW5kcyk7XHJcbiAgICAgIGJvdW5kcyA9IG5ld0JvdW5kcztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnVzZVBhbm5pbmcpIHtcclxuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIucGFuVG9Cb3VuZHMoYm91bmRzLCBwYWRkaW5nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuZml0Qm91bmRzKGJvdW5kcywgcGFkZGluZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pc0xhdExuZ0JvdW5kc0xpdGVyYWwoYm91bmRzOiBMYXRMbmdCb3VuZHMgfCBMYXRMbmdCb3VuZHNMaXRlcmFsKTogYm91bmRzIGlzIExhdExuZ0JvdW5kc0xpdGVyYWwge1xyXG4gICAgcmV0dXJuIGJvdW5kcyAhPSBudWxsICYmIChib3VuZHMgYXMgYW55KS5leHRlbmQgPT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZU1hcENlbnRlckNoYW5nZSgpIHtcclxuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdjZW50ZXJfY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldENlbnRlcigpLnRoZW4oKGNlbnRlcjogTGF0TG5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGNlbnRlci5sYXQoKTtcclxuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGNlbnRlci5sbmcoKTtcclxuICAgICAgICB0aGlzLmNlbnRlckNoYW5nZS5lbWl0KHtsYXQ6IHRoaXMubGF0aXR1ZGUsIGxuZzogdGhpcy5sb25naXR1ZGV9IGFzIExhdExuZ0xpdGVyYWwpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZUJvdW5kc0NoYW5nZSgpIHtcclxuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdib3VuZHNfY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldEJvdW5kcygpLnRoZW4oXHJcbiAgICAgICAgKGJvdW5kczogTGF0TG5nQm91bmRzKSA9PiB7IHRoaXMuYm91bmRzQ2hhbmdlLmVtaXQoYm91bmRzKTsgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVNYXBUeXBlSWRDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignbWFwdHlwZWlkX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRNYXBUeXBlSWQoKS50aGVuKFxyXG4gICAgICAgIChtYXBUeXBlSWQ6IE1hcFR5cGVJZCkgPT4geyB0aGlzLm1hcFR5cGVJZENoYW5nZS5lbWl0KG1hcFR5cGVJZCk7IH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlTWFwWm9vbUNoYW5nZSgpIHtcclxuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCd6b29tX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRab29tKCkudGhlbigoejogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy56b29tID0gejtcclxuICAgICAgICB0aGlzLnpvb21DaGFuZ2UuZW1pdCh6KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVJZGxlRXZlbnQoKSB7XHJcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignaWRsZScpLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4geyB0aGlzLmlkbGUuZW1pdCh2b2lkIDApOyB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVUaWxlc0xvYWRlZEV2ZW50KCkge1xyXG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ3RpbGVzbG9hZGVkJykuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB0aGlzLnRpbGVzTG9hZGVkLmVtaXQodm9pZCAwKSxcclxuICAgICk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlTWFwTW91c2VFdmVudHMoKSB7XHJcbiAgICBpbnRlcmZhY2UgRW1pdHRlciB7XHJcbiAgICAgIGVtaXQodmFsdWU6IGFueSk6IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSBFdmVudCA9IHsgbmFtZTogc3RyaW5nLCBlbWl0dGVyOiBFbWl0dGVyIH07XHJcblxyXG4gICAgY29uc3QgZXZlbnRzOiBFdmVudFtdID0gW1xyXG4gICAgICB7bmFtZTogJ2NsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBDbGlja30sXHJcbiAgICAgIHtuYW1lOiAncmlnaHRjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwUmlnaHRDbGlja30sXHJcbiAgICAgIHtuYW1lOiAnZGJsY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcERibENsaWNrfSxcclxuICAgIF07XHJcblxyXG4gICAgZXZlbnRzLmZvckVhY2goKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHtsYXRMbmc6IExhdExuZ30+KGUubmFtZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgIChldmVudDoge2xhdExuZzogTGF0TG5nfSkgPT4ge1xyXG4gICAgICAgICAgbGV0IHZhbHVlOiBNb3VzZUV2ZW50ID0ge1xyXG4gICAgICAgICAgICBjb29yZHM6IHtcclxuICAgICAgICAgICAgICBsYXQ6IGV2ZW50LmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgICBsbmc6IGV2ZW50LmxhdExuZy5sbmcoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxhY2VJZDogKGV2ZW50IGFzIHtsYXRMbmc6IExhdExuZywgcGxhY2VJZDogc3RyaW5nfSkucGxhY2VJZCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvLyB0aGUgcGxhY2VJZCB3aWxsIGJlIHVuZGVmaW5lZCBpbiBjYXNlIHRoZSBldmVudCB3YXMgbm90IGFuIEljb25Nb3VzZUV2ZW50IChnb29nbGUgdHlwZXMpXHJcbiAgICAgICAgICBpZiAodmFsdWUucGxhY2VJZCAmJiAhdGhpcy5zaG93RGVmYXVsdEluZm9XaW5kb3cpIHtcclxuICAgICAgICAgICAgKGV2ZW50IGFzIGFueSkuc3RvcCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZS5lbWl0dGVyLmVtaXQodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==