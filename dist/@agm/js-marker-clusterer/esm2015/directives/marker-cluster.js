import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { InfoWindowManager, MarkerManager } from '@agm/core';
import { ClusterManager } from '../services/managers/cluster-manager';
/**
 * AgmMarkerCluster clusters map marker if they are near together
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
 *      <agm-marker-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
let AgmMarkerCluster = class AgmMarkerCluster {
    constructor(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    ngOnDestroy() {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
        if (changes['gridSize']) {
            this._clusterManager.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this._clusterManager.setMaxZoom(this);
        }
        if (changes['zoomOnClick']) {
            this._clusterManager.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this._clusterManager.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this._clusterManager.setMinimumClusterSize(this);
        }
        if (changes['imagePath']) {
            this._clusterManager.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this._clusterManager.setImageExtension(this);
        }
        if (changes['calculator']) {
            this._clusterManager.setCalculator(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
    }
    _addEventListeners() {
        const handlers = [
            {
                name: 'clusterclick',
                handler: (args) => this.clusterClick.emit(args),
            },
        ];
        handlers.forEach((obj) => {
            const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            this._observableSubscriptions.push(os);
        });
    }
    /** @internal */
    ngOnInit() {
        this._addEventListeners();
        this._clusterManager.init({
            gridSize: this.gridSize,
            maxZoom: this.maxZoom,
            zoomOnClick: this.zoomOnClick,
            averageCenter: this.averageCenter,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            imagePath: this.imagePath,
            imageExtension: this.imageExtension,
            calculator: this.calculator,
        });
    }
};
AgmMarkerCluster.ctorParameters = () => [
    { type: ClusterManager }
];
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "gridSize", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "maxZoom", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "zoomOnClick", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "averageCenter", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "minimumClusterSize", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "styles", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "calculator", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "imagePath", void 0);
tslib_1.__decorate([
    Input()
], AgmMarkerCluster.prototype, "imageExtension", void 0);
tslib_1.__decorate([
    Output()
], AgmMarkerCluster.prototype, "clusterClick", void 0);
AgmMarkerCluster = tslib_1.__decorate([
    Directive({
        selector: 'agm-marker-cluster',
        providers: [
            ClusterManager,
            { provide: MarkerManager, useExisting: ClusterManager },
            InfoWindowManager,
        ],
    })
], AgmMarkerCluster);
export { AgmMarkerCluster };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2pzLW1hcmtlci1jbHVzdGVyZXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL21hcmtlci1jbHVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFNdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBU0gsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUEwQzNCLFlBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUh6QyxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTlELDZCQUF3QixHQUFtQixFQUFFLENBQUM7SUFDQyxDQUFDO0lBRXhELGdCQUFnQjtJQUNoQixXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLFdBQVcsQ0FBQyxPQUF3QztRQUNsRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NB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QztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsU0FBUyxFQUFFO1lBQ1QsY0FBYztZQUNkLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO1lBQ3ZELGlCQUFpQjtTQUNsQjtLQUNGLENBQUM7R0FDVyxnQkFBZ0IsQ0E2RzVCO1NBN0dZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIsIE1hcmtlck1hbmFnZXIgfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgQ2x1c3Rlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jbHVzdGVyLW1hbmFnZXInO1xuXG5pbXBvcnQgeyBDYWxjdWxhdGVGdW5jdGlvbiwgQ2x1c3Rlck9wdGlvbnMsIENsdXN0ZXJTdHlsZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1jbHVzdGVyZXItdHlwZXMnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBBZ21NYXJrZXJDbHVzdGVyIGNsdXN0ZXJzIG1hcCBtYXJrZXIgaWYgdGhleSBhcmUgbmVhciB0b2dldGhlclxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIGFnbS1tYXAge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgICAgPGFnbS1tYXJrZXItY2x1c3Rlcj5cbiAqICAgICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbbGFiZWxdPVwiJ00nXCI+XG4gKiAgICAgICAgPC9hZ20tbWFya2VyPlxuICogICAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXQyXCIgW2xvbmdpdHVkZV09XCJsbmcyXCIgW2xhYmVsXT1cIidOJ1wiPlxuICogICAgICAgIDwvYWdtLW1hcmtlcj5cbiAqICAgICAgPC9hZ20tbWFya2VyLWNsdXN0ZXI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tbWFya2VyLWNsdXN0ZXInLFxuICBwcm92aWRlcnM6IFtcbiAgICBDbHVzdGVyTWFuYWdlcixcbiAgICB7IHByb3ZpZGU6IE1hcmtlck1hbmFnZXIsIHVzZUV4aXN0aW5nOiBDbHVzdGVyTWFuYWdlciB9LFxuICAgIEluZm9XaW5kb3dNYW5hZ2VyLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21NYXJrZXJDbHVzdGVyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCwgQ2x1c3Rlck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzXG4gICAqL1xuICBASW5wdXQoKSBncmlkU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYSBjbHVzdGVyLlxuICAgKi9cbiAgQElucHV0KCkgbWF4Wm9vbTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiBjbGlja2luZyBvbiBhIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICAgKi9cbiAgQElucHV0KCkgem9vbU9uQ2xpY2s6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICAgKi9cbiAgQElucHV0KCkgYXZlcmFnZUNlbnRlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIG1pbmltdW0gbnVtYmVyIG9mIG1hcmtlcnMgdG8gYmUgaW4gYSBjbHVzdGVyIGJlZm9yZSB0aGUgbWFya2VycyBhcmUgaGlkZGVuIGFuZCBhIGNvdW50IGlzIHNob3duLlxuICAgKi9cbiAgQElucHV0KCkgbWluaW11bUNsdXN0ZXJTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgQElucHV0KCkgc3R5bGVzOiBDbHVzdGVyU3R5bGVbXTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgdGhlIGNsdXN0ZXIgc3R5bGUgYW5kIHRleHQgYmFzZWQgb24gdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gICAqL1xuICBASW5wdXQoKSBjYWxjdWxhdG9yOiBDYWxjdWxhdGVGdW5jdGlvbjtcblxuICBASW5wdXQoKSBpbWFnZVBhdGg6IHN0cmluZztcbiAgQElucHV0KCkgaW1hZ2VFeHRlbnNpb246IHN0cmluZztcblxuICBAT3V0cHV0KCkgY2x1c3RlckNsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NsdXN0ZXJNYW5hZ2VyOiBDbHVzdGVyTWFuYWdlcikgeyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5jbGVhck1hcmtlcnMoKTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKGNoYW5nZXNbJ2dyaWRTaXplJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEdyaWRTaXplKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4Wm9vbSddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRNYXhab29tKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snem9vbU9uQ2xpY2snXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0Wm9vbU9uQ2xpY2sodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydhdmVyYWdlQ2VudGVyJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEF2ZXJhZ2VDZW50ZXIodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW5pbXVtQ2x1c3RlclNpemUnXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0TWluaW11bUNsdXN0ZXJTaXplKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaW1hZ2VQYXRoJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlUGF0aCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2ltYWdlRXh0ZW5zaW9uJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlRXh0ZW5zaW9uKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snY2FsY3VsYXRvciddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRDYWxjdWxhdG9yKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snc3R5bGVzJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldFN0eWxlcyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBoYW5kbGVycyA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2NsdXN0ZXJjbGljaycsXG4gICAgICAgIGhhbmRsZXI6IChhcmdzOmFueSkgPT4gdGhpcy5jbHVzdGVyQ2xpY2suZW1pdChhcmdzKSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fY2x1c3Rlck1hbmFnZXIuY3JlYXRlQ2x1c3RlckV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSkuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLmluaXQoe1xuICAgICAgZ3JpZFNpemU6IHRoaXMuZ3JpZFNpemUsXG4gICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICB6b29tT25DbGljazogdGhpcy56b29tT25DbGljayxcbiAgICAgIGF2ZXJhZ2VDZW50ZXI6IHRoaXMuYXZlcmFnZUNlbnRlcixcbiAgICAgIG1pbmltdW1DbHVzdGVyU2l6ZTogdGhpcy5taW5pbXVtQ2x1c3RlclNpemUsXG4gICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgICAgaW1hZ2VQYXRoOiB0aGlzLmltYWdlUGF0aCxcbiAgICAgIGltYWdlRXh0ZW5zaW9uOiB0aGlzLmltYWdlRXh0ZW5zaW9uLFxuICAgICAgY2FsY3VsYXRvcjogdGhpcy5jYWxjdWxhdG9yLFxuICAgIH0pO1xuICB9XG59XG4iXX0=