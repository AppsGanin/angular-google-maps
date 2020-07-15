import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
/**
 * AgmPolylineIcon enables to add polyline sequences to add arrows, circle,
 * or custom icons either along the entire line, or in a specific part of it.
 * See https://developers.google.com/maps/documentation/javascript/shapes#polyline_customize
 *
 * ### Example
 * ```html
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-icon-sequence [fixedRotation]="true" [path]="'FORWARD_OPEN_ARROW'">
 *          </agm-icon-sequence>
 *      </agm-polyline>
 *    </agm-map>
 * ```
 *
 * @export
 * @class AgmPolylineIcon
 */
var AgmPolylineIcon = /** @class */ (function () {
    function AgmPolylineIcon() {
    }
    AgmPolylineIcon.prototype.ngOnInit = function () {
        if (this.path == null) {
            throw new Error('Icon Sequence path is required');
        }
    };
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "fixedRotation", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "offset", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "repeat", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "anchorX", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "anchorY", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "fillColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "fillOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "path", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "rotation", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "scale", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input()
    ], AgmPolylineIcon.prototype, "strokeWeight", void 0);
    AgmPolylineIcon = tslib_1.__decorate([
        Directive({ selector: 'agm-polyline agm-icon-sequence' })
    ], AgmPolylineIcon);
    return AgmPolylineIcon;
}());
export { AgmPolylineIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtaWNvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcG9seWxpbmUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUg7SUFBQTtJQWdJQSxDQUFDO0lBTEMsa0NBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQXJIUTtRQUFSLEtBQUssRUFBRTswREFBd0I7SUFVdkI7UUFBUixLQUFLLEVBQUU7bURBQWdCO0lBVWY7UUFBUixLQUFLLEVBQUU7bURBQWdCO0lBV2Y7UUFBUixLQUFLLEVBQUU7b0RBQWlCO0lBV2hCO1FBQVIsS0FBSyxFQUFFO29EQUFpQjtJQVNoQjtRQUFSLEtBQUssRUFBRTtzREFBbUI7SUFLbEI7UUFBUixLQUFLLEVBQUU7d0RBQXFCO0lBU3BCO1FBQVIsS0FBSyxFQUFFO2lEQUM0QjtJQVUzQjtRQUFSLEtBQUssRUFBRTtxREFBa0I7SUFVakI7UUFBUixLQUFLLEVBQUU7a0RBQWU7SUFTZDtRQUFSLEtBQUssRUFBRTt3REFBcUI7SUFRcEI7UUFBUixLQUFLLEVBQUU7MERBQXVCO0lBUXRCO1FBQVIsS0FBSyxFQUFFO3lEQUFzQjtJQXpIbkIsZUFBZTtRQUQzQixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsZ0NBQWdDLEVBQUMsQ0FBQztPQUMzQyxlQUFlLENBZ0kzQjtJQUFELHNCQUFDO0NBQUEsQUFoSUQsSUFnSUM7U0FoSVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEFnbVBvbHlsaW5lSWNvbiBlbmFibGVzIHRvIGFkZCBwb2x5bGluZSBzZXF1ZW5jZXMgdG8gYWRkIGFycm93cywgY2lyY2xlLFxyXG4gKiBvciBjdXN0b20gaWNvbnMgZWl0aGVyIGFsb25nIHRoZSBlbnRpcmUgbGluZSwgb3IgaW4gYSBzcGVjaWZpYyBwYXJ0IG9mIGl0LlxyXG4gKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvc2hhcGVzI3BvbHlsaW5lX2N1c3RvbWl6ZVxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGBodG1sXHJcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cclxuICogICAgICA8YWdtLXBvbHlsaW5lPlxyXG4gKiAgICAgICAgICA8YWdtLWljb24tc2VxdWVuY2UgW2ZpeGVkUm90YXRpb25dPVwidHJ1ZVwiIFtwYXRoXT1cIidGT1JXQVJEX09QRU5fQVJST1cnXCI+XHJcbiAqICAgICAgICAgIDwvYWdtLWljb24tc2VxdWVuY2U+XHJcbiAqICAgICAgPC9hZ20tcG9seWxpbmU+XHJcbiAqICAgIDwvYWdtLW1hcD5cclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEFnbVBvbHlsaW5lSWNvblxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdhZ20tcG9seWxpbmUgYWdtLWljb24tc2VxdWVuY2UnfSlcclxuZXhwb3J0IGNsYXNzIEFnbVBvbHlsaW5lSWNvbiBpbXBsZW1lbnRzIE9uSW5pdHtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCBlYWNoIGljb24gaW4gdGhlIHNlcXVlbmNlIGhhcyB0aGUgc2FtZSBmaXhlZCByb3RhdGlvbiByZWdhcmRsZXNzIG9mIHRoZVxyXG4gICAqIGFuZ2xlIG9mIHRoZSBlZGdlIG9uIHdoaWNoIGl0IGxpZXMuIERlZmF1bHRzIHRvIGBmYWxzZWAsIGluIHdoaWNoIGNhc2UgZWFjaCBpY29uXHJcbiAgICogaW4gdGhlIHNlcXVlbmNlIGlzIHJvdGF0ZWQgdG8gYWxpZ24gd2l0aCBpdHMgZWRnZS5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBBZ21Qb2x5bGluZUljb25cclxuICAgKi9cclxuICBASW5wdXQoKSBmaXhlZFJvdGF0aW9uOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlzdGFuY2UgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIGxpbmUgYXQgd2hpY2ggYW4gaWNvbiBpcyB0byBiZSByZW5kZXJlZC4gVGhpc1xyXG4gICAqIGRpc3RhbmNlIG1heSBiZSBleHByZXNzZWQgYXMgYSBwZXJjZW50YWdlIG9mIGxpbmUncyBsZW5ndGggKGUuZy4gJzUwJScpIG9yIGluIHBpeGVsc1xyXG4gICAqIChlLmcuICc1MHB4JykuIERlZmF1bHRzIHRvICcxMDAlJy5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICogQG1lbWJlcm9mIEFnbVBvbHlsaW5lSWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9mZnNldDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlzdGFuY2UgYmV0d2VlbiBjb25zZWN1dGl2ZSBpY29ucyBvbiB0aGUgbGluZS4gVGhpcyBkaXN0YW5jZSBtYXkgYmUgZXhwcmVzc2VkIGFzXHJcbiAgICogYSBwZXJjZW50YWdlIG9mIHRoZSBsaW5lJ3MgbGVuZ3RoIChlLmcuICc1MCUnKSBvciBpbiBwaXhlbHMgKGUuZy4gJzUwcHgnKS4gVG8gZGlzYWJsZVxyXG4gICAqIHJlcGVhdGluZyBvZiB0aGUgaWNvbiwgc3BlY2lmeSAnMCcuIERlZmF1bHRzIHRvICcwJy5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICogQG1lbWJlcm9mIEFnbVBvbHlsaW5lSWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlcGVhdDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3ltYm9sIHJlbGF0aXZlIHRvIHRoZSBwb2x5bGluZS4gVGhlIGNvb3JkaW5hdGVcclxuICAgKiBvZiB0aGUgc3ltYm9sJ3MgcGF0aCBpcyB0cmFuc2xhdGVkIF9sZWZ0XyBieSB0aGUgYW5jaG9yJ3MgeCBjb29yZGluYXRlLiBCeSBkZWZhdWx0LCBhXHJcbiAgICogc3ltYm9sIGlzIGFuY2hvcmVkIGF0ICgwLCAwKS4gVGhlIHBvc2l0aW9uIGlzIGV4cHJlc3NlZCBpbiB0aGUgc2FtZSBjb29yZGluYXRlIHN5c3RlbSBhcyB0aGVcclxuICAgKiBzeW1ib2wncyBwYXRoLlxyXG4gICAqXHJcbiAgICogQHR5cGUge251bWJlcn1cclxuICAgKiBAbWVtYmVyb2YgQWdtUG9seWxpbmVJY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5jaG9yWDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgeSBjb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3ltYm9sIHJlbGF0aXZlIHRvIHRoZSBwb2x5bGluZS4gVGhlIGNvb3JkaW5hdGVcclxuICAgKiBvZiB0aGUgc3ltYm9sJ3MgcGF0aCBpcyB0cmFuc2xhdGVkIF91cF8gYnkgdGhlIGFuY2hvcidzIHkgY29vcmRpbmF0ZS4gQnkgZGVmYXVsdCwgYVxyXG4gICAqIHN5bWJvbCBpcyBhbmNob3JlZCBhdCAoMCwgMCkuIFRoZSBwb3NpdGlvbiBpcyBleHByZXNzZWQgaW4gdGhlIHNhbWUgY29vcmRpbmF0ZSBzeXN0ZW0gYXMgdGhlXHJcbiAgICogc3ltYm9sJ3MgcGF0aC5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICogQG1lbWJlcm9mIEFnbVBvbHlsaW5lSWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuY2hvclk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN5bWJvbCdzIGZpbGwgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWRcclxuICAgKiBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBzdHJva2UgY29sb3Igb2YgdGhlIGNvcnJlc3BvbmRpbmcgcG9seWxpbmUuXHJcbiAgICpcclxuICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAqIEBtZW1iZXJvZiBBZ21Qb2x5bGluZUljb25cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWxsQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN5bWJvbCdzIGZpbGwgb3BhY2l0eS4gRGVmYXVsdHMgdG8gMC5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWxsT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3ltYm9sJ3MgcGF0aCwgd2hpY2ggaXMgYSBidWlsdC1pbiBzeW1ib2wgcGF0aCwgb3IgYSBjdXN0b20gcGF0aCBleHByZXNzZWQgdXNpbmdcclxuICAgKiBTVkcgcGF0aCBub3RhdGlvbi4gUmVxdWlyZWQuXHJcbiAgICpcclxuICAgKiBAdHlwZSB7U3ltYm9sUGF0aH1cclxuICAgKiBAbWVtYmVyb2YgQWdtUG9seWxpbmVJY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGF0aDogJ0NJUkNMRScgfCAnQkFDS1dBUkRfQ0xPU0VEX0FSUk9XJyB8ICdCQUNLV0FSRF9PUEVOX0FSUk9XJyB8ICdGT1JXQVJEX0NMT1NFRF9BUlJPVycgfFxyXG4gICAgICAgICdGT1JXQVJEX09QRU5fQVJST1cnIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW5nbGUgYnkgd2hpY2ggdG8gcm90YXRlIHRoZSBzeW1ib2wsIGV4cHJlc3NlZCBjbG9ja3dpc2UgaW4gZGVncmVlcy5cclxuICAgKiBEZWZhdWx0cyB0byAwLiBBIHN5bWJvbCB3aGVyZSBgZml4ZWRSb3RhdGlvbmAgaXMgYGZhbHNlYCBpcyByb3RhdGVkIHJlbGF0aXZlIHRvXHJcbiAgICogdGhlIGFuZ2xlIG9mIHRoZSBlZGdlIG9uIHdoaWNoIGl0IGxpZXMuXHJcbiAgICpcclxuICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAqIEBtZW1iZXJvZiBBZ21Qb2x5bGluZUljb25cclxuICAgKi9cclxuICBASW5wdXQoKSByb3RhdGlvbjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IGJ5IHdoaWNoIHRoZSBzeW1ib2wgaXMgc2NhbGVkIGluIHNpemUuIERlZmF1bHRzIHRvIHRoZSBzdHJva2Ugd2VpZ2h0XHJcbiAgICogb2YgdGhlIHBvbHlsaW5lOyBhZnRlciBzY2FsaW5nLCB0aGUgc3ltYm9sIG11c3QgbGllIGluc2lkZSBhIHNxdWFyZSAyMiBwaXhlbHMgaW5cclxuICAgKiBzaXplIGNlbnRlcmVkIGF0IHRoZSBzeW1ib2wncyBhbmNob3IuXHJcbiAgICpcclxuICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAqIEBtZW1iZXJvZiBBZ21Qb2x5bGluZUljb25cclxuICAgKi9cclxuICBASW5wdXQoKSBzY2FsZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3ltYm9sJ3Mgc3Ryb2tlIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkXHJcbiAgICogY29sb3JzLiBEZWZhdWx0cyB0byB0aGUgc3Ryb2tlIGNvbG9yIG9mIHRoZSBwb2x5bGluZS5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICogQG1lbWJlcm9mIEFnbVBvbHlsaW5lSWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzeW1ib2wncyBzdHJva2Ugb3BhY2l0eS4gRGVmYXVsdHMgdG8gdGhlIHN0cm9rZSBvcGFjaXR5IG9mIHRoZSBwb2x5bGluZS5cclxuICAgKlxyXG4gICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICogQG1lbWJlcm9mIEFnbVBvbHlsaW5lSWNvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN5bWJvbCdzIHN0cm9rZSB3ZWlnaHQuIERlZmF1bHRzIHRvIHRoZSBzY2FsZSBvZiB0aGUgc3ltYm9sLlxyXG4gICAqXHJcbiAgICogQHR5cGUge251bWJlcn1cclxuICAgKiBAbWVtYmVyb2YgQWdtUG9seWxpbmVJY29uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0OiBudW1iZXI7XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGF0aCA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSWNvbiBTZXF1ZW5jZSBwYXRoIGlzIHJlcXVpcmVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==