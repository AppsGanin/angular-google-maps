import * as tslib_1 from "tslib";
var AgmMap_1;
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
let AgmMap = AgmMap_1 = class AgmMap {
    constructor(_elem, _mapsWrapper, _platformId, _fitBoundsService, _zone) {
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
    /** @internal */
    ngOnInit() {
        if (isPlatformServer(this._platformId)) {
            // The code is running on the server, do nothing
            return;
        }
        // todo: this should be solved with a new component and a viewChild decorator
        const container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
        this._initMapInstance(container);
    }
    _initMapInstance(el) {
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
            .then(() => this._mapsWrapper.getNativeMap())
            .then(map => this.mapReady.emit(map));
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleMapTypeIdChange();
        this._handleTilesLoadedEvent();
        this._handleIdleEvent();
    }
    /** @internal */
    ngOnDestroy() {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
        // remove all listeners from the map instance
        this._mapsWrapper.clearInstanceListeners();
        if (this._fitBoundsSubscription) {
            this._fitBoundsSubscription.unsubscribe();
        }
    }
    /* @internal */
    ngOnChanges(changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    }
    _updateMapOptionsChanges(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => AgmMap_1._mapOptionsAttributes.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    }
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    triggerResize(recenter = true) {
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise((resolve) => {
            setTimeout(() => {
                return this._mapsWrapper.triggerMapEvent('resize').then(() => {
                    if (recenter) {
                        this.fitBounds != null ? this._fitBounds() : this._setCenter();
                    }
                    resolve();
                });
            });
        });
    }
    _updatePosition(changes) {
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
    }
    _setCenter() {
        let newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    }
    _fitBounds() {
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
    }
    _subscribeToFitBoundsUpdates() {
        this._zone.runOutsideAngular(() => {
            this._fitBoundsSubscription = this._fitBoundsService.getBounds$().subscribe(b => {
                this._zone.run(() => this._updateBounds(b, this.fitBoundsPadding));
            });
        });
    }
    _updateBounds(bounds, padding) {
        if (!bounds) {
            return;
        }
        if (this._isLatLngBoundsLiteral(bounds) && typeof google !== 'undefined' && google && google.maps && google.maps.LatLngBounds) {
            const newBounds = new google.maps.LatLngBounds();
            newBounds.union(bounds);
            bounds = newBounds;
        }
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(bounds, padding);
            return;
        }
        this._mapsWrapper.fitBounds(bounds, padding);
    }
    _isLatLngBoundsLiteral(bounds) {
        return bounds != null && bounds.extend === undefined;
    }
    _handleMapCenterChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(() => {
            this._mapsWrapper.getCenter().then((center) => {
                this.latitude = center.lat();
                this.longitude = center.lng();
                this.centerChange.emit({ lat: this.latitude, lng: this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    }
    _handleBoundsChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(() => {
            this._mapsWrapper.getBounds().then((bounds) => { this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    }
    _handleMapTypeIdChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(() => {
            this._mapsWrapper.getMapTypeId().then((mapTypeId) => { this.mapTypeIdChange.emit(mapTypeId); });
        });
        this._observableSubscriptions.push(s);
    }
    _handleMapZoomChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(() => {
            this._mapsWrapper.getZoom().then((z) => {
                this.zoom = z;
                this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    }
    _handleIdleEvent() {
        const s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(() => { this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    }
    _handleTilesLoadedEvent() {
        const s = this._mapsWrapper.subscribeToMapEvent('tilesloaded').subscribe(() => this.tilesLoaded.emit(void 0));
        this._observableSubscriptions.push(s);
    }
    _handleMapMouseEvents() {
        const events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
            { name: 'dblclick', emitter: this.mapDblClick },
        ];
        events.forEach((e) => {
            const s = this._mapsWrapper.subscribeToMapEvent(e.name).subscribe((event) => {
                let value = {
                    coords: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    },
                    placeId: event.placeId,
                };
                // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
                if (value.placeId && !this.showDefaultInfoWindow) {
                    event.stop();
                }
                e.emitter.emit(value);
            });
            this._observableSubscriptions.push(s);
        });
    }
};
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
AgmMap.ctorParameters = () => [
    { type: ElementRef },
    { type: GoogleMapsAPIWrapper },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: FitBoundsService },
    { type: NgZone }
];
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
        template: `
              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>
              <div class='agm-map-content'>
                <ng-content></ng-content>
              </div>
  `,
        styles: [`
    .agm-map-container-inner {
      width: inherit;
      height: inherit;
    }
    .agm-map-content {
      display:none;
    }
  `]
    }),
    tslib_1.__param(2, Inject(PLATFORM_ID))
], AgmMap);
export { AgmMap };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJN0osT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFNM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFJM0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFxQ0gsSUFBYSxNQUFNLGNBQW5CLE1BQWEsTUFBTTtJQTBTakIsWUFDVSxLQUFpQixFQUNqQixZQUFrQyxFQUNiLFdBQW1C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QUFSLEtBQUssRUFBRTsrQ0FBc0U7QUFnQnJFO0lBQVIsS0FBSyxFQUFFO29DQUFVO0FBTVQ7SUFBUixLQUFLLEVBQUU7MkNBQTZCO0FBb0IzQjtJQUFULE1BQU0sRUFBRTt3Q0FBcUU7QUFNcEU7SUFBVCxNQUFNLEVBQUU7NkNBQTBFO0FBTXpFO0lBQVQsTUFBTSxFQUFFOzJDQUF3RTtBQUt2RTtJQUFULE1BQU0sRUFBRTs0Q0FBK0U7QUFLOUU7SUFBVCxNQUFNLEVBQUU7NENBQTZFO0FBSzVFO0lBQVQsTUFBTSxFQUFFOytDQUEwRTtBQUt6RTtJQUFULE1BQU0sRUFBRTtvQ0FBcUQ7QUFLcEQ7SUFBVCxNQUFNLEVBQUU7MENBQStEO0FBTTlEO0lBQVQsTUFBTSxFQUFFO3dDQUF1RDtBQUt0RDtJQUFULE1BQU0sRUFBRTsyQ0FBNEQ7QUF4UzFELE1BQU07SUFwQ2xCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLFNBQVMsRUFBRTtZQUNULGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixvQkFBb0I7WUFDcEIsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZixZQUFZO1lBQ1osYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osNkRBQTZEO1lBQzdELG1DQUFtQyxFQUFFLE1BQU07U0FDNUM7UUFVRCxRQUFRLEVBQUU7Ozs7O0dBS1Q7aUJBZFE7Ozs7Ozs7O0dBUVI7S0FPRixDQUFDO0lBOFNHLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQTdTWCxNQUFNLENBeWpCbEI7U0F6akJZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBQTEFURk9STV9JRCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9tYXAtdHlwZXMnO1xyXG5pbXBvcnQgeyBGaXRCb3VuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZml0LWJvdW5kcyc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xyXG5pbXBvcnQge1xyXG4gIEZ1bGxzY3JlZW5Db250cm9sT3B0aW9ucywgTGF0TG5nLCBMYXRMbmdCb3VuZHMsIExhdExuZ0JvdW5kc0xpdGVyYWwsIExhdExuZ0xpdGVyYWwsXHJcbiAgTWFwUmVzdHJpY3Rpb24sIE1hcFR5cGVDb250cm9sT3B0aW9ucywgTWFwVHlwZUlkLCBNYXBUeXBlU3R5bGUsIFBhZGRpbmcsIFBhbkNvbnRyb2xPcHRpb25zLFxyXG4gIFJvdGF0ZUNvbnRyb2xPcHRpb25zLCBTY2FsZUNvbnRyb2xPcHRpb25zLCBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMsIFpvb21Db250cm9sT3B0aW9ucyxcclxufSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XHJcbmltcG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlcic7XHJcbmltcG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvaW5mby13aW5kb3ctbWFuYWdlcic7XHJcbmltcG9ydCB7IExheWVyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XHJcbmltcG9ydCB7IFBvbHlsaW5lTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcmVjdGFuZ2xlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBLbWxMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIEFnbU1hcCByZW5kZXJzIGEgR29vZ2xlIE1hcC5cclxuICogKipJbXBvcnRhbnQgbm90ZSoqOiBUbyBiZSBhYmxlIHNlZSBhIG1hcCBpbiB0aGUgYnJvd3NlciwgeW91IGhhdmUgdG8gZGVmaW5lIGEgaGVpZ2h0IGZvciB0aGVcclxuICogZWxlbWVudCBgYWdtLW1hcGAuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAgYWdtLW1hcCB7XHJcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICogICAgfVxyXG4gKiBgXSxcclxuICogIHRlbXBsYXRlOiBgXHJcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cclxuICogICAgPC9hZ20tbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLW1hcCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDaXJjbGVNYW5hZ2VyLFxyXG4gICAgRGF0YUxheWVyTWFuYWdlcixcclxuICAgIERhdGFMYXllck1hbmFnZXIsXHJcbiAgICBGaXRCb3VuZHNTZXJ2aWNlLFxyXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIsXHJcbiAgICBJbmZvV2luZG93TWFuYWdlcixcclxuICAgIEttbExheWVyTWFuYWdlcixcclxuICAgIExheWVyTWFuYWdlcixcclxuICAgIE1hcmtlck1hbmFnZXIsXHJcbiAgICBQb2x5Z29uTWFuYWdlcixcclxuICAgIFBvbHlsaW5lTWFuYWdlcixcclxuICAgIFJlY3RhbmdsZU1hbmFnZXIsXHJcbiAgXSxcclxuICBob3N0OiB7XHJcbiAgICAvLyB0b2RvOiBkZXByZWNhdGVkIC0gd2Ugd2lsbCByZW1vdmUgaXQgd2l0aCB0aGUgbmV4dCB2ZXJzaW9uXHJcbiAgICAnW2NsYXNzLnNlYm0tZ29vZ2xlLW1hcC1jb250YWluZXJdJzogJ3RydWUnLFxyXG4gIH0sXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmFnbS1tYXAtY29udGFpbmVyLWlubmVyIHtcclxuICAgICAgd2lkdGg6IGluaGVyaXQ7XHJcbiAgICAgIGhlaWdodDogaW5oZXJpdDtcclxuICAgIH1cclxuICAgIC5hZ20tbWFwLWNvbnRlbnQge1xyXG4gICAgICBkaXNwbGF5Om5vbmU7XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhZ20tbWFwLWNvbnRhaW5lci1pbm5lciBzZWJtLWdvb2dsZS1tYXAtY29udGFpbmVyLWlubmVyJz48L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhZ20tbWFwLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21NYXAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBUaGUgbG9uZ2l0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9uZ2l0dWRlID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxhdGl0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF0aXR1ZGUgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLiBUaGUgZGVmYXVsdCB6b29tIGxldmVsIGlzIDguXHJcbiAgICovXHJcbiAgQElucHV0KCkgem9vbSA9IDg7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbWFsIHpvb20gbGV2ZWwgb2YgdGhlIG1hcCBhbGxvd2VkLiBXaGVuIG5vdCBwcm92aWRlZCwgbm8gcmVzdHJpY3Rpb25zIHRvIHRoZSB6b29tIGxldmVsXHJcbiAgICogYXJlIGVuZm9yY2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pblpvb206IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltYWwgem9vbSBsZXZlbCBvZiB0aGUgbWFwIGFsbG93ZWQuIFdoZW4gbm90IHByb3ZpZGVkLCBubyByZXN0cmljdGlvbnMgdG8gdGhlIHpvb20gbGV2ZWxcclxuICAgKiBhcmUgZW5mb3JjZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWF4Wm9vbTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29udHJvbCBzaXplIGZvciB0aGUgZGVmYXVsdCBtYXAgY29udHJvbHMuIE9ubHkgZ292ZXJucyB0aGUgY29udHJvbHMgbWFkZSBieSB0aGUgTWFwcyBBUEkgaXRzZWxmXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udHJvbFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlcy9kaXNhYmxlcyBpZiBtYXAgaXMgZHJhZ2dhYmxlLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ21hcERyYWdnYWJsZScpIGRyYWdnYWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZXMvZGlzYWJsZXMgem9vbSBhbmQgY2VudGVyIG9uIGRvdWJsZSBjbGljay4gRW5hYmxlZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVEb3VibGVDbGlja1pvb20gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlcy9kaXNhYmxlcyBhbGwgZGVmYXVsdCBVSSBvZiB0aGUgR29vZ2xlIG1hcC4gUGxlYXNlIG5vdGU6IFdoZW4gdGhlIG1hcCBpcyBjcmVhdGVkLCB0aGlzXHJcbiAgICogdmFsdWUgY2Fubm90IGdldCB1cGRhdGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVEZWZhdWx0VUkgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgZmFsc2UsIGRpc2FibGVzIHNjcm9sbHdoZWVsIHpvb21pbmcgb24gdGhlIG1hcC4gVGhlIHNjcm9sbHdoZWVsIGlzIGVuYWJsZWQgYnkgZGVmYXVsdC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JvbGx3aGVlbCA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbG9yIHVzZWQgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBNYXAgZGl2LiBUaGlzIGNvbG9yIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRpbGVzIGhhdmUgbm90XHJcbiAgICogeWV0IGxvYWRlZCBhcyB0aGUgdXNlciBwYW5zLiBUaGlzIG9wdGlvbiBjYW4gb25seSBiZSBzZXQgd2hlbiB0aGUgbWFwIGlzIGluaXRpYWxpemVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvciB1cmwgb2YgdGhlIGN1cnNvciB0byBkaXNwbGF5IHdoZW4gbW91c2luZyBvdmVyIGEgZHJhZ2dhYmxlIG1hcC4gVGhpcyBwcm9wZXJ0eSB1c2VzXHJcbiAgICogdGhlIGNzcyAgKiBjdXJzb3IgYXR0cmlidXRlIHRvIGNoYW5nZSB0aGUgaWNvbi4gQXMgd2l0aCB0aGUgY3NzIHByb3BlcnR5LCB5b3UgbXVzdCBzcGVjaWZ5IGF0XHJcbiAgICogbGVhc3Qgb25lIGZhbGxiYWNrIGN1cnNvciB0aGF0IGlzIG5vdCBhIFVSTC4gRm9yIGV4YW1wbGU6XHJcbiAgICogW2RyYWdnYWJsZUN1cnNvcl09XCIndXJsKGh0dHA6Ly93d3cuZXhhbXBsZS5jb20vaWNvbi5wbmcpLCBhdXRvOydcIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYWdnYWJsZUN1cnNvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvciB1cmwgb2YgdGhlIGN1cnNvciB0byBkaXNwbGF5IHdoZW4gdGhlIG1hcCBpcyBiZWluZyBkcmFnZ2VkLiBUaGlzIHByb3BlcnR5IHVzZXMgdGhlXHJcbiAgICogY3NzIGN1cnNvciBhdHRyaWJ1dGUgdG8gY2hhbmdlIHRoZSBpY29uLiBBcyB3aXRoIHRoZSBjc3MgcHJvcGVydHksIHlvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3RcclxuICAgKiBvbmUgZmFsbGJhY2sgY3Vyc29yIHRoYXQgaXMgbm90IGEgVVJMLiBGb3IgZXhhbXBsZTpcclxuICAgKiBbZHJhZ2dpbmdDdXJzb3JdPVwiJ3VybChodHRwOi8vd3d3LmV4YW1wbGUuY29tL2ljb24ucG5nKSwgYXV0bzsnXCJcclxuICAgKi9cclxuICBASW5wdXQoKSBkcmFnZ2luZ0N1cnNvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBmYWxzZSwgcHJldmVudHMgdGhlIG1hcCBmcm9tIGJlaW5nIGNvbnRyb2xsZWQgYnkgdGhlIGtleWJvYXJkLiBLZXlib2FyZCBzaG9ydGN1dHMgYXJlXHJcbiAgICogZW5hYmxlZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGtleWJvYXJkU2hvcnRjdXRzID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFpvb20gY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSB6b29tQ29udHJvbDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyBmb3IgdGhlIFpvb20gY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSB6b29tQ29udHJvbE9wdGlvbnM6IFpvb21Db250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogU3R5bGVzIHRvIGFwcGx5IHRvIGVhY2ggb2YgdGhlIGRlZmF1bHQgbWFwIHR5cGVzLiBOb3RlIHRoYXQgZm9yIFNhdGVsbGl0ZS9IeWJyaWQgYW5kIFRlcnJhaW5cclxuICAgKiBtb2RlcywgdGhlc2Ugc3R5bGVzIHdpbGwgb25seSBhcHBseSB0byBsYWJlbHMgYW5kIGdlb21ldHJ5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0eWxlczogTWFwVHlwZVN0eWxlW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cnVlIGFuZCB0aGUgbGF0aXR1ZGUgYW5kL29yIGxvbmdpdHVkZSB2YWx1ZXMgY2hhbmdlcywgdGhlIEdvb2dsZSBNYXBzIHBhblRvIG1ldGhvZCBpc1xyXG4gICAqIHVzZWQgdG9cclxuICAgKiBjZW50ZXIgdGhlIG1hcC4gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9yZWZlcmVuY2UjTWFwXHJcbiAgICovXHJcbiAgQElucHV0KCkgdXNlUGFubmluZyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBTdHJlZXQgVmlldyBQZWdtYW4gY29udHJvbC5cclxuICAgKiBUaGlzIGNvbnRyb2wgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBVSSwgYW5kIHNob3VsZCBiZSBzZXQgdG8gZmFsc2Ugd2hlbiBkaXNwbGF5aW5nIGEgbWFwIHR5cGVcclxuICAgKiBvbiB3aGljaCB0aGUgU3RyZWV0IFZpZXcgcm9hZCBvdmVybGF5IHNob3VsZCBub3QgYXBwZWFyIChlLmcuIGEgbm9uLUVhcnRoIG1hcCB0eXBlKS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJlZXRWaWV3Q29udHJvbDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyBmb3IgdGhlIFN0cmVldCBWaWV3IGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zOiBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHZpZXdwb3J0IHRvIGNvbnRhaW4gdGhlIGdpdmVuIGJvdW5kcy5cclxuICAgKiBJZiB0aGlzIG9wdGlvbiB0byBgdHJ1ZWAsIHRoZSBib3VuZHMgZ2V0IGF1dG9tYXRpY2FsbHkgY29tcHV0ZWQgZnJvbSBhbGwgZWxlbWVudHMgdGhhdCB1c2UgdGhlIHtAbGluayBBZ21GaXRCb3VuZHN9IGRpcmVjdGl2ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaXRCb3VuZHM6IExhdExuZ0JvdW5kc0xpdGVyYWwgfCBMYXRMbmdCb3VuZHMgfCBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhZGRpbmcgYW1vdW50IGZvciB0aGUgYm91bmRzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZpdEJvdW5kc1BhZGRpbmc6IG51bWJlciB8IFBhZGRpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFNjYWxlIGNvbnRyb2wuIFRoaXMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzY2FsZUNvbnRyb2wgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyBmb3IgdGhlIHNjYWxlIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2NhbGVDb250cm9sT3B0aW9uczogU2NhbGVDb250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWFwIHR5cGUgY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXBUeXBlQ29udHJvbCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciB0aGUgTWFwIHR5cGUgY29udHJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IE1hcFR5cGVDb250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgUGFuIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFuQ29udHJvbCAgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyBmb3IgdGhlIFBhbiBjb250cm9sLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhbkNvbnRyb2xPcHRpb25zOiBQYW5Db250cm9sT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgUm90YXRlIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm90YXRlQ29udHJvbCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciB0aGUgUm90YXRlIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm90YXRlQ29udHJvbE9wdGlvbnM6IFJvdGF0ZUNvbnRyb2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBGdWxsc2NyZWVuIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZnVsbHNjcmVlbkNvbnRyb2wgID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBGdWxsc2NyZWVuIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zOiBGdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgbWFwVHlwZUlkLiBEZWZhdWx0cyB0byAncm9hZG1hcCcuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwVHlwZUlkOiAncm9hZG1hcCcgfCAnaHlicmlkJyB8ICdzYXRlbGxpdGUnIHwgJ3RlcnJhaW4nIHwgc3RyaW5nID0gJ3JvYWRtYXAnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGZhbHNlLCBtYXAgaWNvbnMgYXJlIG5vdCBjbGlja2FibGUuIEEgbWFwIGljb24gcmVwcmVzZW50cyBhIHBvaW50IG9mIGludGVyZXN0LFxyXG4gICAqIGFsc28ga25vd24gYXMgYSBQT0kuIEJ5IGRlZmF1bHQgbWFwIGljb25zIGFyZSBjbGlja2FibGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xpY2thYmxlSWNvbnMgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBBIG1hcCBpY29uIHJlcHJlc2VudHMgYSBwb2ludCBvZiBpbnRlcmVzdCwgYWxzbyBrbm93biBhcyBhIFBPSS5cclxuICAgKiBXaGVuIG1hcCBpY29ucyBhcmUgY2xpY2thYmxlIGJ5IGRlZmF1bHQsIGFuIGluZm8gd2luZG93IGlzIGRpc3BsYXllZC5cclxuICAgKiBXaGVuIHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvIGZhbHNlLCB0aGUgaW5mbyB3aW5kb3cgd2lsbCBub3QgYmUgc2hvd24gYnV0IHRoZSBjbGljayBldmVudFxyXG4gICAqIHdpbGwgc3RpbGwgZmlyZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dEZWZhdWx0SW5mb1dpbmRvdyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgc2V0dGluZyBjb250cm9scyBob3cgZ2VzdHVyZXMgb24gdGhlIG1hcCBhcmUgaGFuZGxlZC5cclxuICAgKiBBbGxvd2VkIHZhbHVlczpcclxuICAgKiAtICdjb29wZXJhdGl2ZScgKFR3by1maW5nZXIgdG91Y2ggZ2VzdHVyZXMgcGFuIGFuZCB6b29tIHRoZSBtYXAuIE9uZS1maW5nZXIgdG91Y2ggZ2VzdHVyZXMgYXJlIG5vdCBoYW5kbGVkIGJ5IHRoZSBtYXAuKVxyXG4gICAqIC0gJ2dyZWVkeScgICAgICAoQWxsIHRvdWNoIGdlc3R1cmVzIHBhbiBvciB6b29tIHRoZSBtYXAuKVxyXG4gICAqIC0gJ25vbmUnICAgICAgICAoVGhlIG1hcCBjYW5ub3QgYmUgcGFubmVkIG9yIHpvb21lZCBieSB1c2VyIGdlc3R1cmVzLilcclxuICAgKiAtICdhdXRvJyAgICAgICAgW2RlZmF1bHRdIChHZXN0dXJlIGhhbmRsaW5nIGlzIGVpdGhlciBjb29wZXJhdGl2ZSBvciBncmVlZHksIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBwYWdlIGlzIHNjcm9sbGFibGUgb3Igbm90LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJyB8ICdncmVlZHknIHwgJ25vbmUnIHwgJ2F1dG8nID0gJ2F1dG8nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udHJvbHMgdGhlIGF1dG9tYXRpYyBzd2l0Y2hpbmcgYmVoYXZpb3IgZm9yIHRoZSBhbmdsZSBvZiBpbmNpZGVuY2Ugb2ZcclxuICAgICAqIHRoZSBtYXAuIFRoZSBvbmx5IGFsbG93ZWQgdmFsdWVzIGFyZSAwIGFuZCA0NS4gVGhlIHZhbHVlIDAgY2F1c2VzIHRoZSBtYXBcclxuICAgICAqIHRvIGFsd2F5cyB1c2UgYSAwwrAgb3ZlcmhlYWQgdmlldyByZWdhcmRsZXNzIG9mIHRoZSB6b29tIGxldmVsIGFuZFxyXG4gICAgICogdmlld3BvcnQuIFRoZSB2YWx1ZSA0NSBjYXVzZXMgdGhlIHRpbHQgYW5nbGUgdG8gYXV0b21hdGljYWxseSBzd2l0Y2ggdG9cclxuICAgICAqIDQ1IHdoZW5ldmVyIDQ1wrAgaW1hZ2VyeSBpcyBhdmFpbGFibGUgZm9yIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgYW5kXHJcbiAgICAgKiB2aWV3cG9ydCwgYW5kIHN3aXRjaCBiYWNrIHRvIDAgd2hlbmV2ZXIgNDXCsCBpbWFnZXJ5IGlzIG5vdCBhdmFpbGFibGVcclxuICAgICAqICh0aGlzIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yKS4gNDXCsCBpbWFnZXJ5IGlzIG9ubHkgYXZhaWxhYmxlIGZvclxyXG4gICAgICogc2F0ZWxsaXRlIGFuZCBoeWJyaWQgbWFwIHR5cGVzLCB3aXRoaW4gc29tZSBsb2NhdGlvbnMsIGFuZCBhdCBzb21lIHpvb21cclxuICAgICAqIGxldmVscy4gTm90ZTogZ2V0VGlsdCByZXR1cm5zIHRoZSBjdXJyZW50IHRpbHQgYW5nbGUsIG5vdCB0aGUgdmFsdWVcclxuICAgICAqIHNwZWNpZmllZCBieSB0aGlzIG9wdGlvbi4gQmVjYXVzZSBnZXRUaWx0IGFuZCB0aGlzIG9wdGlvbiByZWZlciB0b1xyXG4gICAgICogZGlmZmVyZW50IHRoaW5ncywgZG8gbm90IGJpbmQoKSB0aGUgdGlsdCBwcm9wZXJ0eTsgZG9pbmcgc28gbWF5IHlpZWxkXHJcbiAgICAgKiB1bnByZWRpY3RhYmxlIGVmZmVjdHMuIChEZWZhdWx0IG9mIEFHTSBpcyAwIChkaXNhYmxlZCkuIEVuYWJsZSBpdCB3aXRoIHZhbHVlIDQ1LilcclxuICAgICAqL1xyXG4gIEBJbnB1dCgpIHRpbHQgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25zIGZvciByZXN0cmljdGluZyB0aGUgYm91bmRzIG9mIHRoZSBtYXAuXHJcbiAgICogVXNlciBjYW5ub3QgcGFuIG9yIHpvb20gYXdheSBmcm9tIHJlc3RyaWN0ZWQgYXJlYS5cclxuICAgKi9cclxuICBASW5wdXQoKSByZXN0cmljdGlvbjogTWFwUmVzdHJpY3Rpb247XHJcbiAgLyoqXHJcbiAgICogTWFwIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgY2FuIGNoYW5nZSBvdmVyIHRpbWVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nLCAnc2Nyb2xsd2hlZWwnLCAnZHJhZ2dhYmxlJywgJ2RyYWdnYWJsZUN1cnNvcicsICdkcmFnZ2luZ0N1cnNvcicsXHJcbiAgICAna2V5Ym9hcmRTaG9ydGN1dHMnLCAnem9vbUNvbnRyb2wnLCAnem9vbUNvbnRyb2xPcHRpb25zJywgJ3N0eWxlcycsICdzdHJlZXRWaWV3Q29udHJvbCcsXHJcbiAgICAnc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zJywgJ3pvb20nLCAnbWFwVHlwZUNvbnRyb2wnLCAnbWFwVHlwZUNvbnRyb2xPcHRpb25zJywgJ21pblpvb20nLFxyXG4gICAgJ21heFpvb20nLCAncGFuQ29udHJvbCcsICdwYW5Db250cm9sT3B0aW9ucycsICdyb3RhdGVDb250cm9sJywgJ3JvdGF0ZUNvbnRyb2xPcHRpb25zJyxcclxuICAgICdmdWxsc2NyZWVuQ29udHJvbCcsICdmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMnLCAnc2NhbGVDb250cm9sJywgJ3NjYWxlQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgJ21hcFR5cGVJZCcsICdjbGlja2FibGVJY29ucycsICdnZXN0dXJlSGFuZGxpbmcnLCAndGlsdCcsICdyZXN0cmljdGlvbicsXHJcbiAgXTtcclxuXHJcbiAgcHJpdmF0ZSBfb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBfZml0Qm91bmRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2sgb24gYVxyXG4gICAqIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFwQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHJpZ2h0LWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xyXG4gICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtYXBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcERibENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgY2VudGVyIGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNlbnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHZpZXdwb3J0IGJvdW5kcyBoYXZlIGNoYW5nZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGJvdW5kc0NoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0JvdW5kcz4gPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZ0JvdW5kcz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtYXBUeXBlSWQgcHJvcGVydHkgY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFwVHlwZUlkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWFwVHlwZUlkPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVHlwZUlkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBiZWNvbWVzIGlkbGUgYWZ0ZXIgcGFubmluZyBvciB6b29taW5nLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBpZGxlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgem9vbSBsZXZlbCBoYXMgY2hhbmdlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgem9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBnb29nbGUgbWFwIGlzIGZ1bGx5IGluaXRpYWxpemVkLlxyXG4gICAqIFlvdSBnZXQgdGhlIGdvb2dsZS5tYXBzLk1hcCBpbnN0YW5jZSBhcyBhIHJlc3VsdCBvZiB0aGlzIEV2ZW50RW1pdHRlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFwUmVhZHk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdmlzaWJsZSB0aWxlcyBoYXZlIGZpbmlzaGVkIGxvYWRpbmcuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHRpbGVzTG9hZGVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZWxlbTogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlcixcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHByb3RlY3RlZCBfZml0Qm91bmRzU2VydmljZTogRml0Qm91bmRzU2VydmljZSxcclxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcclxuICAgICAgLy8gVGhlIGNvZGUgaXMgcnVubmluZyBvbiB0aGUgc2VydmVyLCBkbyBub3RoaW5nXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIHRvZG86IHRoaXMgc2hvdWxkIGJlIHNvbHZlZCB3aXRoIGEgbmV3IGNvbXBvbmVudCBhbmQgYSB2aWV3Q2hpbGQgZGVjb3JhdG9yXHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFnbS1tYXAtY29udGFpbmVyLWlubmVyJyk7XHJcbiAgICB0aGlzLl9pbml0TWFwSW5zdGFuY2UoY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luaXRNYXBJbnN0YW5jZShlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZU1hcChlbCwge1xyXG4gICAgICBjZW50ZXI6IHtsYXQ6IHRoaXMubGF0aXR1ZGUgfHwgMCwgbG5nOiB0aGlzLmxvbmdpdHVkZSB8fCAwfSxcclxuICAgICAgem9vbTogdGhpcy56b29tLFxyXG4gICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXHJcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcclxuICAgICAgY29udHJvbFNpemU6IHRoaXMuY29udHJvbFNpemUsXHJcbiAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRoaXMuZGlzYWJsZURlZmF1bHRVSSxcclxuICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdGhpcy5kaXNhYmxlRG91YmxlQ2xpY2tab29tLFxyXG4gICAgICBzY3JvbGx3aGVlbDogdGhpcy5zY3JvbGx3aGVlbCxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcclxuICAgICAgZHJhZ2dhYmxlOiB0aGlzLmRyYWdnYWJsZSxcclxuICAgICAgZHJhZ2dhYmxlQ3Vyc29yOiB0aGlzLmRyYWdnYWJsZUN1cnNvcixcclxuICAgICAgZHJhZ2dpbmdDdXJzb3I6IHRoaXMuZHJhZ2dpbmdDdXJzb3IsXHJcbiAgICAgIGtleWJvYXJkU2hvcnRjdXRzOiB0aGlzLmtleWJvYXJkU2hvcnRjdXRzLFxyXG4gICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxyXG4gICAgICB6b29tQ29udHJvbDogdGhpcy56b29tQ29udHJvbCxcclxuICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB0aGlzLnpvb21Db250cm9sT3B0aW9ucyxcclxuICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2wsXHJcbiAgICAgIHN0cmVldFZpZXdDb250cm9sT3B0aW9uczogdGhpcy5zdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMsXHJcbiAgICAgIHNjYWxlQ29udHJvbDogdGhpcy5zY2FsZUNvbnRyb2wsXHJcbiAgICAgIHNjYWxlQ29udHJvbE9wdGlvbnM6IHRoaXMuc2NhbGVDb250cm9sT3B0aW9ucyxcclxuICAgICAgbWFwVHlwZUNvbnRyb2w6IHRoaXMubWFwVHlwZUNvbnRyb2wsXHJcbiAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczogdGhpcy5tYXBUeXBlQ29udHJvbE9wdGlvbnMsXHJcbiAgICAgIHBhbkNvbnRyb2w6IHRoaXMucGFuQ29udHJvbCxcclxuICAgICAgcGFuQ29udHJvbE9wdGlvbnM6IHRoaXMucGFuQ29udHJvbE9wdGlvbnMsXHJcbiAgICAgIHJvdGF0ZUNvbnRyb2w6IHRoaXMucm90YXRlQ29udHJvbCxcclxuICAgICAgcm90YXRlQ29udHJvbE9wdGlvbnM6IHRoaXMucm90YXRlQ29udHJvbE9wdGlvbnMsXHJcbiAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiB0aGlzLmZ1bGxzY3JlZW5Db250cm9sLFxyXG4gICAgICBmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM6IHRoaXMuZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zLFxyXG4gICAgICBtYXBUeXBlSWQ6IHRoaXMubWFwVHlwZUlkLFxyXG4gICAgICBjbGlja2FibGVJY29uczogdGhpcy5jbGlja2FibGVJY29ucyxcclxuICAgICAgZ2VzdHVyZUhhbmRsaW5nOiB0aGlzLmdlc3R1cmVIYW5kbGluZyxcclxuICAgICAgdGlsdDogdGhpcy50aWx0LFxyXG4gICAgICByZXN0cmljdGlvbjogdGhpcy5yZXN0cmljdGlvbixcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpKVxyXG4gICAgICAudGhlbihtYXAgPT4gdGhpcy5tYXBSZWFkeS5lbWl0KG1hcCkpO1xyXG5cclxuICAgIC8vIHJlZ2lzdGVyIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgdGhpcy5faGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XHJcbiAgICB0aGlzLl9oYW5kbGVNYXBab29tQ2hhbmdlKCk7XHJcbiAgICB0aGlzLl9oYW5kbGVNYXBNb3VzZUV2ZW50cygpO1xyXG4gICAgdGhpcy5faGFuZGxlQm91bmRzQ2hhbmdlKCk7XHJcbiAgICB0aGlzLl9oYW5kbGVNYXBUeXBlSWRDaGFuZ2UoKTtcclxuICAgIHRoaXMuX2hhbmRsZVRpbGVzTG9hZGVkRXZlbnQoKTtcclxuICAgIHRoaXMuX2hhbmRsZUlkbGVFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG5cclxuICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gdGhlIG1hcCBpbnN0YW5jZVxyXG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuY2xlYXJJbnN0YW5jZUxpc3RlbmVycygpO1xyXG4gICAgaWYgKHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHRoaXMuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xyXG4gICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oY2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVNYXBPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBsZXQgb3B0aW9uczoge1twcm9wTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xyXG4gICAgbGV0IG9wdGlvbktleXMgPVxyXG4gICAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoayA9PiBBZ21NYXAuX21hcE9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKTtcclxuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoaykgPT4geyBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xyXG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0TWFwT3B0aW9ucyhvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJzIGEgcmVzaXplIGV2ZW50IG9uIHRoZSBnb29nbGUgbWFwIGluc3RhbmNlLlxyXG4gICAqIFdoZW4gcmVjZW50ZXIgaXMgdHJ1ZSwgdGhlIG9mIHRoZSBnb29nbGUgbWFwIGdldHMgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbGF0L2xuZyB2YWx1ZXMgb3IgZml0Qm91bmRzIHZhbHVlIHRvIHJlY2VudGVyIHRoZSBtYXAuXHJcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIGFmdGVyIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkLlxyXG4gICAqL1xyXG4gIHRyaWdnZXJSZXNpemUocmVjZW50ZXI6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBOb3RlOiBXaGVuIHdlIHdvdWxkIHRyaWdnZXIgdGhlIHJlc2l6ZSBldmVudCBhbmQgc2hvdyB0aGUgbWFwIGluIHRoZSBzYW1lIHR1cm4gKHdoaWNoIGlzIGFcclxuICAgIC8vIGNvbW1vbiBjYXNlIGZvciB0cmlnZ2VyaW5nIGEgcmVzaXplIGV2ZW50KSwgdGhlbiB0aGUgcmVzaXplIGV2ZW50IHdvdWxkIG5vdFxyXG4gICAgLy8gd29yayAodG8gc2hvdyB0aGUgbWFwKSwgc28gd2UgdHJpZ2dlciB0aGUgZXZlbnQgaW4gYSB0aW1lb3V0LlxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci50cmlnZ2VyTWFwRXZlbnQoJ3Jlc2l6ZScpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZml0Qm91bmRzICE9IG51bGwgPyB0aGlzLl9maXRCb3VuZHMoKSA6IHRoaXMuX3NldENlbnRlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlUG9zaXRpb24oY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gPT0gbnVsbCAmJiBjaGFuZ2VzWydsb25naXR1ZGUnXSA9PSBudWxsICYmXHJcbiAgICAgICAgIWNoYW5nZXNbJ2ZpdEJvdW5kcyddKSB7XHJcbiAgICAgIC8vIG5vIHBvc2l0aW9uIHVwZGF0ZSBuZWVkZWRcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIHByZWZlciBmaXRCb3VuZHMgaW4gY2hhbmdlc1xyXG4gICAgaWYgKCdmaXRCb3VuZHMnIGluIGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5fZml0Qm91bmRzKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLmxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2V0Q2VudGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRDZW50ZXIoKSB7XHJcbiAgICBsZXQgbmV3Q2VudGVyID0ge1xyXG4gICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXHJcbiAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMudXNlUGFubmluZykge1xyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5UbyhuZXdDZW50ZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0Q2VudGVyKG5ld0NlbnRlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9maXRCb3VuZHMoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuZml0Qm91bmRzKSB7XHJcbiAgICAgIGNhc2UgdHJ1ZTpcclxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVUb0ZpdEJvdW5kc1VwZGF0ZXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBmYWxzZTpcclxuICAgICAgICBpZiAodGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQm91bmRzKHRoaXMuZml0Qm91bmRzLCB0aGlzLmZpdEJvdW5kc1BhZGRpbmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9GaXRCb3VuZHNVcGRhdGVzKCkge1xyXG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbiA9IHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UuZ2V0Qm91bmRzJCgpLnN1YnNjcmliZShiID0+IHtcclxuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLl91cGRhdGVCb3VuZHMoYiwgdGhpcy5maXRCb3VuZHNQYWRkaW5nKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3VwZGF0ZUJvdW5kcyhib3VuZHM6IExhdExuZ0JvdW5kcyB8IExhdExuZ0JvdW5kc0xpdGVyYWwsIHBhZGRpbmc/OiBudW1iZXIgfCBQYWRkaW5nKSB7XHJcbiAgICBpZiAoIWJvdW5kcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5faXNMYXRMbmdCb3VuZHNMaXRlcmFsKGJvdW5kcykgJiYgdHlwZW9mIGdvb2dsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ29vZ2xlICYmIGdvb2dsZS5tYXBzICYmIGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcykge1xyXG4gICAgICBjb25zdCBuZXdCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcbiAgICAgIG5ld0JvdW5kcy51bmlvbihib3VuZHMpO1xyXG4gICAgICBib3VuZHMgPSBuZXdCb3VuZHM7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XHJcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnBhblRvQm91bmRzKGJvdW5kcywgcGFkZGluZyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX21hcHNXcmFwcGVyLmZpdEJvdW5kcyhib3VuZHMsIHBhZGRpbmcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNMYXRMbmdCb3VuZHNMaXRlcmFsKGJvdW5kczogTGF0TG5nQm91bmRzIHwgTGF0TG5nQm91bmRzTGl0ZXJhbCk6IGJvdW5kcyBpcyBMYXRMbmdCb3VuZHNMaXRlcmFsIHtcclxuICAgIHJldHVybiBib3VuZHMgIT0gbnVsbCAmJiAoYm91bmRzIGFzIGFueSkuZXh0ZW5kID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVNYXBDZW50ZXJDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignY2VudGVyX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRDZW50ZXIoKS50aGVuKChjZW50ZXI6IExhdExuZykgPT4ge1xyXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSBjZW50ZXIubGF0KCk7XHJcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBjZW50ZXIubG5nKCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJDaGFuZ2UuZW1pdCh7bGF0OiB0aGlzLmxhdGl0dWRlLCBsbmc6IHRoaXMubG9uZ2l0dWRlfSBhcyBMYXRMbmdMaXRlcmFsKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVCb3VuZHNDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignYm91bmRzX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRCb3VuZHMoKS50aGVuKFxyXG4gICAgICAgIChib3VuZHM6IExhdExuZ0JvdW5kcykgPT4geyB0aGlzLmJvdW5kc0NoYW5nZS5lbWl0KGJvdW5kcyk7IH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlTWFwVHlwZUlkQ2hhbmdlKCkge1xyXG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ21hcHR5cGVpZF9jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TWFwVHlwZUlkKCkudGhlbihcclxuICAgICAgICAobWFwVHlwZUlkOiBNYXBUeXBlSWQpID0+IHsgdGhpcy5tYXBUeXBlSWRDaGFuZ2UuZW1pdChtYXBUeXBlSWQpOyB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZU1hcFpvb21DaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignem9vbV9jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Wm9vbSgpLnRoZW4oKHo6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuem9vbSA9IHo7XHJcbiAgICAgICAgdGhpcy56b29tQ2hhbmdlLmVtaXQoeik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlSWRsZUV2ZW50KCkge1xyXG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2lkbGUnKS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHsgdGhpcy5pZGxlLmVtaXQodm9pZCAwKTsgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlVGlsZXNMb2FkZWRFdmVudCgpIHtcclxuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCd0aWxlc2xvYWRlZCcpLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4gdGhpcy50aWxlc0xvYWRlZC5lbWl0KHZvaWQgMCksXHJcbiAgICApO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZU1hcE1vdXNlRXZlbnRzKCkge1xyXG4gICAgaW50ZXJmYWNlIEVtaXR0ZXIge1xyXG4gICAgICBlbWl0KHZhbHVlOiBhbnkpOiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHR5cGUgRXZlbnQgPSB7IG5hbWU6IHN0cmluZywgZW1pdHRlcjogRW1pdHRlciB9O1xyXG5cclxuICAgIGNvbnN0IGV2ZW50czogRXZlbnRbXSA9IFtcclxuICAgICAge25hbWU6ICdjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwQ2xpY2t9LFxyXG4gICAgICB7bmFtZTogJ3JpZ2h0Y2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcFJpZ2h0Q2xpY2t9LFxyXG4gICAgICB7bmFtZTogJ2RibGNsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBEYmxDbGlja30sXHJcbiAgICBdO1xyXG5cclxuICAgIGV2ZW50cy5mb3JFYWNoKChlOiBFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx7bGF0TG5nOiBMYXRMbmd9PihlLm5hbWUpLnN1YnNjcmliZShcclxuICAgICAgICAoZXZlbnQ6IHtsYXRMbmc6IExhdExuZ30pID0+IHtcclxuICAgICAgICAgIGxldCB2YWx1ZTogTW91c2VFdmVudCA9IHtcclxuICAgICAgICAgICAgY29vcmRzOiB7XHJcbiAgICAgICAgICAgICAgbGF0OiBldmVudC5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgICAgbG5nOiBldmVudC5sYXRMbmcubG5nKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsYWNlSWQ6IChldmVudCBhcyB7bGF0TG5nOiBMYXRMbmcsIHBsYWNlSWQ6IHN0cmluZ30pLnBsYWNlSWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy8gdGhlIHBsYWNlSWQgd2lsbCBiZSB1bmRlZmluZWQgaW4gY2FzZSB0aGUgZXZlbnQgd2FzIG5vdCBhbiBJY29uTW91c2VFdmVudCAoZ29vZ2xlIHR5cGVzKVxyXG4gICAgICAgICAgaWYgKHZhbHVlLnBsYWNlSWQgJiYgIXRoaXMuc2hvd0RlZmF1bHRJbmZvV2luZG93KSB7XHJcbiAgICAgICAgICAgIChldmVudCBhcyBhbnkpLnN0b3AoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGUuZW1pdHRlci5lbWl0KHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=