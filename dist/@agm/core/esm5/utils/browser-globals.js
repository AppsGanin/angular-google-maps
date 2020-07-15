var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());
export { WindowRef };
var DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());
export { DocumentRef };
export var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1nbG9iYWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsidXRpbHMvYnJvd3Nlci1nbG9iYWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBQUE7SUFFQSxDQUFDO0lBREMsbUNBQWUsR0FBZixjQUF5QixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDM0MsZ0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUFBO0lBRUEsQ0FBQztJQURDLHVDQUFpQixHQUFqQixjQUEyQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0Msa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRCxNQUFNLENBQUMsSUFBTSx5QkFBeUIsR0FBZSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93UmVmIHtcclxuICBnZXROYXRpdmVXaW5kb3coKTogYW55IHsgcmV0dXJuIHdpbmRvdzsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRSZWYge1xyXG4gIGdldE5hdGl2ZURvY3VtZW50KCk6IGFueSB7IHJldHVybiBkb2N1bWVudDsgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtXaW5kb3dSZWYsIERvY3VtZW50UmVmXTtcclxuIl19