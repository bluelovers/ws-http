"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._requestToURL = exports.requestToURL = exports.resultToURL = void 0;
const lazy_url_1 = require("lazy-url");
function resultToURL(result, options) {
    return requestToURL(result.request, options);
}
exports.resultToURL = resultToURL;
function requestToURL(req, options) {
    var _a, _b, _c;
    try {
        return new lazy_url_1.LazyURL((_c = (_a = req.url) !== null && _a !== void 0 ? _a : (_b = req.res) === null || _b === void 0 ? void 0 : _b.responseUrl) !== null && _c !== void 0 ? _c : _requestToURL(req));
    }
    catch (e) {
        if (!(options === null || options === void 0 ? void 0 : options.ignoreError)) {
            throw e;
        }
    }
}
exports.requestToURL = requestToURL;
function _requestToURL(req) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let href = req._currentUrl;
    let _currentRequest = (_b = (_a = req._currentRequest) !== null && _a !== void 0 ? _a : req) !== null && _b !== void 0 ? _b : {};
    let _options = (_c = req._options) !== null && _c !== void 0 ? _c : {};
    if ((_d = _options.protocol) === null || _d === void 0 ? void 0 : _d.length) {
        let u;
        if (_options.protocol && _options.hostname) {
            u = new lazy_url_1.LazyURL(_options.protocol + '//' + _options.hostname);
        }
        else {
            u = new lazy_url_1.LazyURL(_currentRequest.path);
        }
        u.set('protocol', (_e = _options.protocol) !== null && _e !== void 0 ? _e : _currentRequest.protocol);
        u.set('port', _options.port);
        u.set('pathname', (_f = _options.pathname) !== null && _f !== void 0 ? _f : _currentRequest.path);
        u.set('query', _options.search);
        u.set('auth', _options.auth);
        u.set('hostname', (_j = (_g = _options.hostname) !== null && _g !== void 0 ? _g : (_h = _currentRequest.getHeader) === null || _h === void 0 ? void 0 : _h.call(_currentRequest, 'Host')) !== null && _j !== void 0 ? _j : _currentRequest.host);
        href = u;
    }
    else if (typeof _currentRequest.getHeader === 'function') {
        let u = new lazy_url_1.LazyURL((_k = req.protocol + '//' + _currentRequest.getHeader('Host')) !== null && _k !== void 0 ? _k : _currentRequest.host);
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