import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { DataLayerManager } from './../services/managers/data-layer-manager';
var layerId = 0;
/**
 * AgmDataLayer enables the user to add data layers to the map.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { AgmMap, AgmDataLayer } from
 * 'angular-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [AgmMap, AgmDataLayer],
 *  styles: [`
 *    .agm-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
 * 	  </agm-data-layer>
 * </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = -25.274449;
 *   lng: number = 133.775060;
 *   zoom: number = 5;
 *
 * clicked(clickEvent) {
 *    console.log(clickEvent);
 *  }
 *
 *  styleFunc(feature) {
 *    return ({
 *      clickable: false,
 *      fillColor: feature.getProperty('color'),
 *      strokeWeight: 1
 *    });
 *  }
 *
 *  geoJsonObject: Object = {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "G",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "71"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
 *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
 *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
 *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
 *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
 *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
 *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
 *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "red",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
 *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
 *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
 *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
 *            ],
 *            [
 *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
 *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "yellow",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
 *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
 *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
 *              [132.71, -25.64], [131.87, -25.76]
 *            ],
 *            [
 *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
 *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "g",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "103"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
 *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
 *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
 *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
 *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
 *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
 *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
 *            ],
 *            [
 *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
 *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "l",
 *          "color": "green",
 *          "rank": "12",
 *          "ascii": "108"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "e",
 *          "color": "red",
 *          "rank": "5",
 *          "ascii": "101"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
 *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
 *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
 *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
 *              [144.31, -28.26], [144.14, -27.41]
 *            ],
 *            [
 *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
 *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
 *            ]
 *          ]
 *        }
 *      }
 *    ]
 *  };
 * }
 * ```
 */
var AgmDataLayer = /** @class */ (function () {
    function AgmDataLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * The geoJson to be displayed
         */
        this.geoJson = null;
    }
    AgmDataLayer_1 = AgmDataLayer;
    AgmDataLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addDataLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmDataLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmDataLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmDataLayer.prototype.toString = function () { return "AgmDataLayer-" + this._id.toString(); };
    /** @internal */
    AgmDataLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteDataLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmDataLayer.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this._addedToManager) {
            return;
        }
        var geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._manager.updateGeoJson(this, geoJsonChange.currentValue);
        }
        var dataOptions = {};
        AgmDataLayer_1._dataOptionsAttributes.forEach(function (k) { return dataOptions[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : _this[k]; });
        this._manager.setDataOptions(this, dataOptions);
    };
    var AgmDataLayer_1;
    AgmDataLayer._dataOptionsAttributes = ['style'];
    AgmDataLayer.ctorParameters = function () { return [
        { type: DataLayerManager }
    ]; };
    tslib_1.__decorate([
        Output()
    ], AgmDataLayer.prototype, "layerClick", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDataLayer.prototype, "geoJson", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmDataLayer.prototype, "style", void 0);
    AgmDataLayer = AgmDataLayer_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-data-layer',
        })
    ], AgmDataLayer);
    return AgmDataLayer;
}());
export { AgmDataLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZGF0YS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSXBILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTdFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkxHO0FBSUg7SUFzQkUsc0JBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBbkJ0QyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixRQUFHLEdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUU1Qzs7V0FFRztRQUNPLGVBQVUsR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFeEY7O1dBRUc7UUFDTSxZQUFPLEdBQTJCLElBQUksQ0FBQztJQU9FLENBQUM7cUJBdEJ4QyxZQUFZO0lBd0J2QiwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyx5Q0FBa0IsR0FBMUI7UUFBQSxpQkFRQztRQVBDLElBQU0sU0FBUyxHQUFHO1lBQ2hCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBQyxFQUFrQixJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXhCLENBQXdCLEVBQUU7U0FDN0UsQ0FBQztRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ3BCLElBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RGLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNoQix5QkFBRSxHQUFGLGNBQWUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsK0JBQVEsR0FBUixjQUFxQixPQUFPLGtCQUFnQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBSSxDQUFDLENBQUMsQ0FBQztJQUVwRSxnQkFBZ0I7SUFDaEIsa0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGtDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFlQztRQWRDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUVELElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxXQUFXLEdBQWdCLEVBQUUsQ0FBQztRQUVsQyxjQUFZLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUMsV0FBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBRSxLQUFZLENBQUMsQ0FBQyxDQUFDLEVBQWhHLENBQWdHLENBQUMsQ0FBQztRQUVuSixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7SUF2RWMsbUNBQXNCLEdBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7O2dCQXFCbkMsZ0JBQWdCOztJQVpwQztRQUFULE1BQU0sRUFBRTtvREFBK0U7SUFLL0U7UUFBUixLQUFLLEVBQUU7aURBQXdDO0lBS3ZDO1FBQVIsS0FBSyxFQUFFOytDQUFtQjtJQXBCaEIsWUFBWTtRQUh4QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCLENBQUM7T0FDVyxZQUFZLENBeUV4QjtJQUFELG1CQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F6RVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YU1vdXNlRXZlbnQsIERhdGFPcHRpb25zIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XHJcbmltcG9ydCB7IERhdGFMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2RhdGEtbGF5ZXItbWFuYWdlcic7XHJcblxyXG5sZXQgbGF5ZXJJZCA9IDA7XHJcblxyXG4vKipcclxuICogQWdtRGF0YUxheWVyIGVuYWJsZXMgdGhlIHVzZXIgdG8gYWRkIGRhdGEgbGF5ZXJzIHRvIHRoZSBtYXAuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbiAqIGltcG9ydCB7IEFnbU1hcCwgQWdtRGF0YUxheWVyIH0gZnJvbVxyXG4gKiAnYW5ndWxhci1nb29nbGUtbWFwcy9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgZGlyZWN0aXZlczogW0FnbU1hcCwgQWdtRGF0YUxheWVyXSxcclxuICogIHN0eWxlczogW2BcclxuICogICAgLmFnbS1jb250YWluZXIge1xyXG4gKiAgICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgIH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XHJcbiAqIFx0ICA8YWdtLWRhdGEtbGF5ZXIgW2dlb0pzb25dPVwiZ2VvSnNvbk9iamVjdFwiIChsYXllckNsaWNrKT1cImNsaWNrZWQoJGV2ZW50KVwiIFtzdHlsZV09XCJzdHlsZUZ1bmNcIj5cclxuICogXHQgIDwvYWdtLWRhdGEtbGF5ZXI+XHJcbiAqIDwvYWdtLW1hcD5cclxuICogIGBcclxuICogfSlcclxuICogZXhwb3J0IGNsYXNzIE15TWFwQ21wIHtcclxuICogICBsYXQ6IG51bWJlciA9IC0yNS4yNzQ0NDk7XHJcbiAqICAgbG5nOiBudW1iZXIgPSAxMzMuNzc1MDYwO1xyXG4gKiAgIHpvb206IG51bWJlciA9IDU7XHJcbiAqXHJcbiAqIGNsaWNrZWQoY2xpY2tFdmVudCkge1xyXG4gKiAgICBjb25zb2xlLmxvZyhjbGlja0V2ZW50KTtcclxuICogIH1cclxuICpcclxuICogIHN0eWxlRnVuYyhmZWF0dXJlKSB7XHJcbiAqICAgIHJldHVybiAoe1xyXG4gKiAgICAgIGNsaWNrYWJsZTogZmFsc2UsXHJcbiAqICAgICAgZmlsbENvbG9yOiBmZWF0dXJlLmdldFByb3BlcnR5KCdjb2xvcicpLFxyXG4gKiAgICAgIHN0cm9rZVdlaWdodDogMVxyXG4gKiAgICB9KTtcclxuICogIH1cclxuICpcclxuICogIGdlb0pzb25PYmplY3Q6IE9iamVjdCA9IHtcclxuICogICAgXCJ0eXBlXCI6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcclxuICogICAgXCJmZWF0dXJlc1wiOiBbXHJcbiAqICAgICAge1xyXG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxyXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJHXCIsXHJcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJibHVlXCIsXHJcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjdcIixcclxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjcxXCJcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcclxuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxyXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTIzLjYxLCAtMjIuMTRdLCBbMTIyLjM4LCAtMjEuNzNdLCBbMTIxLjA2LCAtMjEuNjldLCBbMTE5LjY2LCAtMjIuMjJdLCBbMTE5LjAwLCAtMjMuNDBdLFxyXG4gKiAgICAgICAgICAgICAgWzExOC42NSwgLTI0Ljc2XSwgWzExOC40MywgLTI2LjA3XSwgWzExOC43OCwgLTI3LjU2XSwgWzExOS4yMiwgLTI4LjU3XSwgWzEyMC4yMywgLTI5LjQ5XSxcclxuICogICAgICAgICAgICAgIFsxMjEuNzcsIC0yOS44N10sIFsxMjMuNTcsIC0yOS42NF0sIFsxMjQuNDUsIC0yOS4wM10sIFsxMjQuNzEsIC0yNy45NV0sIFsxMjQuODAsIC0yNi43MF0sXHJcbiAqICAgICAgICAgICAgICBbMTI0LjgwLCAtMjUuNjBdLCBbMTIzLjYxLCAtMjUuNjRdLCBbMTIyLjU2LCAtMjUuNjRdLCBbMTIxLjcyLCAtMjUuNzJdLCBbMTIxLjgxLCAtMjYuNjJdLFxyXG4gKiAgICAgICAgICAgICAgWzEyMS44NiwgLTI2Ljk4XSwgWzEyMi42MCwgLTI2LjkwXSwgWzEyMy41NywgLTI3LjA1XSwgWzEyMy41NywgLTI3LjY4XSwgWzEyMy4zNSwgLTI4LjE4XSxcclxuICogICAgICAgICAgICAgIFsxMjIuNTEsIC0yOC4zOF0sIFsxMjEuNzcsIC0yOC4yNl0sIFsxMjEuMDIsIC0yNy45MV0sIFsxMjAuNDksIC0yNy4yMV0sIFsxMjAuMTQsIC0yNi41MF0sXHJcbiAqICAgICAgICAgICAgICBbMTIwLjEwLCAtMjUuNjRdLCBbMTIwLjI3LCAtMjQuNTJdLCBbMTIwLjY3LCAtMjMuNjhdLCBbMTIxLjcyLCAtMjMuMzJdLCBbMTIyLjQzLCAtMjMuNDhdLFxyXG4gKiAgICAgICAgICAgICAgWzEyMy4wNCwgLTI0LjA0XSwgWzEyNC41NCwgLTI0LjI4XSwgWzEyNC41OCwgLTIzLjIwXSwgWzEyMy42MSwgLTIyLjE0XVxyXG4gKiAgICAgICAgICAgIF1cclxuICogICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAge1xyXG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxyXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJvXCIsXHJcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJyZWRcIixcclxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTVcIixcclxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjExMVwiXHJcbiAqICAgICAgICB9LFxyXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XHJcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcclxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzEyOC44NCwgLTI1Ljc2XSwgWzEyOC4xOCwgLTI1LjYwXSwgWzEyNy45NiwgLTI1LjUyXSwgWzEyNy44OCwgLTI1LjUyXSwgWzEyNy43MCwgLTI1LjYwXSxcclxuICogICAgICAgICAgICAgIFsxMjcuMjYsIC0yNS43OV0sIFsxMjYuNjAsIC0yNi4xMV0sIFsxMjYuMTYsIC0yNi43OF0sIFsxMjYuMTIsIC0yNy42OF0sIFsxMjYuMjEsIC0yOC40Ml0sXHJcbiAqICAgICAgICAgICAgICBbMTI2LjY5LCAtMjkuNDldLCBbMTI3Ljc0LCAtMjkuODBdLCBbMTI4LjgwLCAtMjkuNzJdLCBbMTI5LjQxLCAtMjkuMDNdLCBbMTI5LjcyLCAtMjcuOTVdLFxyXG4gKiAgICAgICAgICAgICAgWzEyOS42OCwgLTI3LjIxXSwgWzEyOS4zMywgLTI2LjIzXSwgWzEyOC44NCwgLTI1Ljc2XVxyXG4gKiAgICAgICAgICAgIF0sXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzEyOC40NSwgLTI3LjQ0XSwgWzEyOC4zMiwgLTI2Ljk0XSwgWzEyNy43MCwgLTI2LjgyXSwgWzEyNy4zNSwgLTI3LjA1XSwgWzEyNy4xNywgLTI3LjgwXSxcclxuICogICAgICAgICAgICAgIFsxMjcuNTcsIC0yOC4yMl0sIFsxMjguMTAsIC0yOC40Ml0sIFsxMjguNDksIC0yNy44MF0sIFsxMjguNDUsIC0yNy40NF1cclxuICogICAgICAgICAgICBdXHJcbiAqICAgICAgICAgIF1cclxuICogICAgICAgIH1cclxuICogICAgICB9LFxyXG4gKiAgICAgIHtcclxuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcclxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XHJcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwib1wiLFxyXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwieWVsbG93XCIsXHJcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjE1XCIsXHJcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMTFcIlxyXG4gKiAgICAgICAgfSxcclxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xyXG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXHJcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xyXG4gKiAgICAgICAgICAgIFtcclxuICogICAgICAgICAgICAgIFsxMzEuODcsIC0yNS43Nl0sIFsxMzEuMzUsIC0yNi4wN10sIFsxMzAuOTUsIC0yNi43OF0sIFsxMzAuODIsIC0yNy42NF0sIFsxMzAuODYsIC0yOC41M10sXHJcbiAqICAgICAgICAgICAgICBbMTMxLjI2LCAtMjkuMjJdLCBbMTMxLjkyLCAtMjkuNzZdLCBbMTMyLjQ1LCAtMjkuODddLCBbMTMzLjA2LCAtMjkuNzZdLCBbMTMzLjcyLCAtMjkuMzRdLFxyXG4gKiAgICAgICAgICAgICAgWzEzNC4wNywgLTI4LjgwXSwgWzEzNC4yMCwgLTI3LjkxXSwgWzEzNC4wNywgLTI3LjIxXSwgWzEzMy44MSwgLTI2LjMxXSwgWzEzMy4zNywgLTI1LjgzXSxcclxuICogICAgICAgICAgICAgIFsxMzIuNzEsIC0yNS42NF0sIFsxMzEuODcsIC0yNS43Nl1cclxuICogICAgICAgICAgICBdLFxyXG4gKiAgICAgICAgICAgIFtcclxuICogICAgICAgICAgICAgIFsxMzMuMTUsIC0yNy4xN10sIFsxMzIuNzEsIC0yNi44Nl0sIFsxMzIuMDksIC0yNi45MF0sIFsxMzEuNzQsIC0yNy41Nl0sIFsxMzEuNzksIC0yOC4yNl0sXHJcbiAqICAgICAgICAgICAgICBbMTMyLjM2LCAtMjguNDVdLCBbMTMyLjkzLCAtMjguMzRdLCBbMTMzLjE1LCAtMjcuNzZdLCBbMTMzLjE1LCAtMjcuMTddXHJcbiAqICAgICAgICAgICAgXVxyXG4gKiAgICAgICAgICBdXHJcbiAqICAgICAgICB9XHJcbiAqICAgICAgfSxcclxuICogICAgICB7XHJcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXHJcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xyXG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImdcIixcclxuICogICAgICAgICAgXCJjb2xvclwiOiBcImJsdWVcIixcclxuICogICAgICAgICAgXCJyYW5rXCI6IFwiN1wiLFxyXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTAzXCJcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcclxuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxyXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTM4LjEyLCAtMjUuMDRdLCBbMTM2Ljg0LCAtMjUuMTZdLCBbMTM1Ljk2LCAtMjUuMzZdLCBbMTM1LjI2LCAtMjUuOTldLCBbMTM1LCAtMjYuOTBdLFxyXG4gKiAgICAgICAgICAgICAgWzEzNS4wNCwgLTI3LjkxXSwgWzEzNS4yNiwgLTI4Ljg4XSwgWzEzNi4wNSwgLTI5LjQ1XSwgWzEzNy4wMiwgLTI5LjQ5XSwgWzEzNy44MSwgLTI5LjQ5XSxcclxuICogICAgICAgICAgICAgIFsxMzcuOTQsIC0yOS45OV0sIFsxMzcuOTAsIC0zMS4yMF0sIFsxMzcuODUsIC0zMi4yNF0sIFsxMzYuODgsIC0zMi42OV0sIFsxMzYuNDUsIC0zMi4zNl0sXHJcbiAqICAgICAgICAgICAgICBbMTM2LjI3LCAtMzEuODBdLCBbMTM0Ljk1LCAtMzEuODRdLCBbMTM1LjE3LCAtMzIuOTldLCBbMTM1LjUyLCAtMzMuNDNdLCBbMTM2LjE0LCAtMzMuNzZdLFxyXG4gKiAgICAgICAgICAgICAgWzEzNy4wNiwgLTMzLjgzXSwgWzEzOC4xMiwgLTMzLjY1XSwgWzEzOC44NiwgLTMzLjIxXSwgWzEzOS4zMCwgLTMyLjI4XSwgWzEzOS4zMCwgLTMxLjI0XSxcclxuICogICAgICAgICAgICAgIFsxMzkuMzAsIC0zMC4xNF0sIFsxMzkuMjEsIC0yOC45Nl0sIFsxMzkuMTcsIC0yOC4yMl0sIFsxMzkuMDgsIC0yNy40MV0sIFsxMzkuMDgsIC0yNi40N10sXHJcbiAqICAgICAgICAgICAgICBbMTM4Ljk5LCAtMjUuNDBdLCBbMTM4LjczLCAtMjUuMDBdLCBbMTM4LjEyLCAtMjUuMDRdXHJcbiAqICAgICAgICAgICAgXSxcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTM3LjUwLCAtMjYuNTRdLCBbMTM2Ljk3LCAtMjYuNDddLCBbMTM2LjQ5LCAtMjYuNThdLCBbMTM2LjMxLCAtMjcuMTNdLCBbMTM2LjMxLCAtMjcuNzJdLFxyXG4gKiAgICAgICAgICAgICAgWzEzNi41OCwgLTI3Ljk5XSwgWzEzNy41MCwgLTI4LjAzXSwgWzEzNy42OCwgLTI3LjY4XSwgWzEzNy41OSwgLTI2Ljc4XSwgWzEzNy41MCwgLTI2LjU0XVxyXG4gKiAgICAgICAgICAgIF1cclxuICogICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAge1xyXG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxyXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJsXCIsXHJcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJncmVlblwiLFxyXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxMlwiLFxyXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTA4XCJcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcclxuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxyXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTQwLjE0LCAtMjEuMDRdLCBbMTQwLjMxLCAtMjkuNDJdLCBbMTQxLjY3LCAtMjkuNDldLCBbMTQxLjU5LCAtMjAuOTJdLCBbMTQwLjE0LCAtMjEuMDRdXHJcbiAqICAgICAgICAgICAgXVxyXG4gKiAgICAgICAgICBdXHJcbiAqICAgICAgICB9XHJcbiAqICAgICAgfSxcclxuICogICAgICB7XHJcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXHJcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xyXG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImVcIixcclxuICogICAgICAgICAgXCJjb2xvclwiOiBcInJlZFwiLFxyXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI1XCIsXHJcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDFcIlxyXG4gKiAgICAgICAgfSxcclxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xyXG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXHJcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xyXG4gKiAgICAgICAgICAgIFtcclxuICogICAgICAgICAgICAgIFsxNDQuMTQsIC0yNy40MV0sIFsxNDUuNjcsIC0yNy41Ml0sIFsxNDYuODYsIC0yNy4wOV0sIFsxNDYuODIsIC0yNS42NF0sIFsxNDYuMjUsIC0yNS4wNF0sXHJcbiAqICAgICAgICAgICAgICBbMTQ1LjQ1LCAtMjQuNjhdLCBbMTQ0LjY2LCAtMjQuNjBdLCBbMTQ0LjA5LCAtMjQuNzZdLCBbMTQzLjQzLCAtMjUuMDhdLCBbMTQyLjk5LCAtMjUuNDBdLFxyXG4gKiAgICAgICAgICAgICAgWzE0Mi42NCwgLTI2LjAzXSwgWzE0Mi42NCwgLTI3LjA1XSwgWzE0Mi42NCwgLTI4LjI2XSwgWzE0My4zMCwgLTI5LjExXSwgWzE0NC4xOCwgLTI5LjU3XSxcclxuICogICAgICAgICAgICAgIFsxNDUuNDEsIC0yOS42NF0sIFsxNDYuNDYsIC0yOS4xOV0sIFsxNDYuNjQsIC0yOC43Ml0sIFsxNDYuODIsIC0yOC4xNF0sIFsxNDQuODQsIC0yOC40Ml0sXHJcbiAqICAgICAgICAgICAgICBbMTQ0LjMxLCAtMjguMjZdLCBbMTQ0LjE0LCAtMjcuNDFdXHJcbiAqICAgICAgICAgICAgXSxcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTQ0LjE4LCAtMjYuMzldLCBbMTQ0LjUzLCAtMjYuNThdLCBbMTQ1LjE5LCAtMjYuNjJdLCBbMTQ1LjcyLCAtMjYuMzVdLCBbMTQ1LjgxLCAtMjUuOTFdLFxyXG4gKiAgICAgICAgICAgICAgWzE0NS40MSwgLTI1LjY4XSwgWzE0NC45NywgLTI1LjY4XSwgWzE0NC40OSwgLTI1LjY0XSwgWzE0NCwgLTI1Ljk5XSwgWzE0NC4xOCwgLTI2LjM5XVxyXG4gKiAgICAgICAgICAgIF1cclxuICogICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgIH1cclxuICogICAgXVxyXG4gKiAgfTtcclxuICogfVxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLWRhdGEtbGF5ZXInLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtRGF0YUxheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2RhdGFPcHRpb25zQXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IFsnc3R5bGUnXTtcclxuXHJcbiAgcHJpdmF0ZSBfYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9pZDogc3RyaW5nID0gKGxheWVySWQrKykudG9TdHJpbmcoKTtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBmZWF0dXJlIGluIHRoZSBsYXllciBpcyBjbGlja2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsYXllckNsaWNrOiBFdmVudEVtaXR0ZXI8RGF0YU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRhTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdlb0pzb24gdG8gYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvSnNvbjogT2JqZWN0IHwgc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsYXllcidzIHN0eWxlIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0eWxlOiAoKSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYW5hZ2VyOiBEYXRhTGF5ZXJNYW5hZ2VyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbWFuYWdlci5hZGREYXRhTGF5ZXIodGhpcyk7XHJcbiAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXHJcbiAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBEYXRhTW91c2VFdmVudCkgPT4gdGhpcy5sYXllckNsaWNrLmVtaXQoZXYpIH0sXHJcbiAgICBdO1xyXG4gICAgbGlzdGVuZXJzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICBjb25zdCBvcyA9IHRoaXMuX21hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEFnbURhdGFMYXllci0ke3RoaXMuX2lkLnRvU3RyaW5nKCl9YDsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZURhdGFMYXllcih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZ2VvSnNvbkNoYW5nZSA9IGNoYW5nZXNbJ2dlb0pzb24nXTtcclxuICAgIGlmIChnZW9Kc29uQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIudXBkYXRlR2VvSnNvbih0aGlzLCBnZW9Kc29uQ2hhbmdlLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGFPcHRpb25zOiBEYXRhT3B0aW9ucyA9IHt9O1xyXG5cclxuICAgIEFnbURhdGFMYXllci5fZGF0YU9wdGlvbnNBdHRyaWJ1dGVzLmZvckVhY2goayA9PiAoZGF0YU9wdGlvbnMgYXMgYW55KVtrXSA9IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoaykgPyBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZSA6ICh0aGlzIGFzIGFueSlba10pO1xyXG5cclxuICAgIHRoaXMuX21hbmFnZXIuc2V0RGF0YU9wdGlvbnModGhpcywgZGF0YU9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=