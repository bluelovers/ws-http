"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._requestToURL = exports.requestToURL = exports.resultToURL = void 0;
const lazy_url_1 = require("lazy-url");
function resultToURL(result) {
    return requestToURL(result.request);
}
exports.resultToURL = resultToURL;
function requestToURL(req) {
    var _a, _b, _c;
    return new lazy_url_1.LazyURL((_c = (_a = req.url) !== null && _a !== void 0 ? _a : (_b = req.res) === null || _b === void 0 ? void 0 : _b.responseUrl) !== null && _c !== void 0 ? _c : _requestToURL(req));
}
exports.requestToURL = requestToURL;
function _requestToURL(req) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let href = req._currentUrl;
    let _currentRequest = (_a = req._currentRequest) !== null && _a !== void 0 ? _a : {};
    let _options = (_b = req._options) !== null && _b !== void 0 ? _b : {};
    if ((_c = _options.protocol) === null || _c === void 0 ? void 0 : _c.length) {
        let u;
        if (_options.protocol && _options.hostname) {
            u = new lazy_url_1.LazyURL(_options.protocol + '//' + _options.hostname);
        }
        else {
            u = new lazy_url_1.LazyURL(_currentRequest.path);
        }
        u.set('protocol', (_d = _options.protocol) !== null && _d !== void 0 ? _d : _currentRequest.protocol);
        u.set('port', _options.port);
        u.set('pathname', (_e = _options.pathname) !== null && _e !== void 0 ? _e : _currentRequest.path);
        u.set('query', _options.search);
        u.set('auth', _options.auth);
        u.set('hostname', (_h = (_f = _options.hostname) !== null && _f !== void 0 ? _f : (_g = _currentRequest.getHeader) === null || _g === void 0 ? void 0 : _g.call(_currentRequest, 'Host')) !== null && _h !== void 0 ? _h : _currentRequest.host);
        href = u;
    }
    else if (typeof _currentRequest.getHeader === 'function') {
        let u = new lazy_url_1.LazyURL((_j = req.protocol + '//' + _currentRequest.getHeader('Host')) !== null && _j !== void 0 ? _j : _currentRequest.host);
        u.pathname = req.path;
        u.protocol = req.protocol;
        href = u;
    }
    else {
        //req;
    }
    return new lazy_url_1.LazyURL(href);
}
exports._requestToURL = _requestToURL;
exports.default = requestToURL;
//# sourceMappingURL=index.js.map