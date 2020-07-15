/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = /** @class */ (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    return NoOpMapsAPILoader;
}());
export { NoOpMapsAPILoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9vcC1tYXBzLWFwaS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbm9vcC1tYXBzLWFwaS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7Ozs7R0FJRztBQUNIO0lBQUE7SUFRQSxDQUFDO0lBUEMsZ0NBQUksR0FBSjtRQUNFLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxJQUFJLENBQUUsTUFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXInO1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gdXNpbmcgdGhlIE5vT3BNYXBzQVBJTG9hZGVyLCB0aGUgR29vZ2xlIE1hcHMgQVBJIG11c3QgYmUgYWRkZWQgdG8gdGhlIHBhZ2UgdmlhIGEgYDxzY3JpcHQ+YFxyXG4gKiBUYWcuXHJcbiAqIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIEdvb2dsZSBNYXBzIEFQSSBzY3JpcHQgZ2V0cyBsb2FkZWQgZmlyc3Qgb24gdGhlIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9PcE1hcHNBUElMb2FkZXIgaW1wbGVtZW50cyBNYXBzQVBJTG9hZGVyIHtcclxuICBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCEod2luZG93IGFzIGFueSkuZ29vZ2xlIHx8ICEod2luZG93IGFzIGFueSkuZ29vZ2xlLm1hcHMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgJ0dvb2dsZSBNYXBzIEFQSSBub3QgbG9hZGVkIG9uIHBhZ2UuIE1ha2Ugc3VyZSB3aW5kb3cuZ29vZ2xlLm1hcHMgaXMgYXZhaWxhYmxlIScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=