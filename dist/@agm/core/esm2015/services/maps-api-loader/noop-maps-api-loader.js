/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
export class NoOpMapsAPILoader {
    load() {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9vcC1tYXBzLWFwaS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbm9vcC1tYXBzLWFwaS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsSUFBSTtRQUNGLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxJQUFJLENBQUUsTUFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyJztcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzaW5nIHRoZSBOb09wTWFwc0FQSUxvYWRlciwgdGhlIEdvb2dsZSBNYXBzIEFQSSBtdXN0IGJlIGFkZGVkIHRvIHRoZSBwYWdlIHZpYSBhIGA8c2NyaXB0PmBcclxuICogVGFnLlxyXG4gKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBHb29nbGUgTWFwcyBBUEkgc2NyaXB0IGdldHMgbG9hZGVkIGZpcnN0IG9uIHRoZSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vT3BNYXBzQVBJTG9hZGVyIGltcGxlbWVudHMgTWFwc0FQSUxvYWRlciB7XHJcbiAgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLmdvb2dsZSB8fCAhKHdpbmRvdyBhcyBhbnkpLmdvb2dsZS5tYXBzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdHb29nbGUgTWFwcyBBUEkgbm90IGxvYWRlZCBvbiBwYWdlLiBNYWtlIHN1cmUgd2luZG93Lmdvb2dsZS5tYXBzIGlzIGF2YWlsYWJsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9XHJcbn1cclxuIl19