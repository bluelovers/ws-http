"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalUrl = void 0;
const tslib_1 = require("tslib");
const url_1 = require("url");
const forwarded_parse_1 = (0, tslib_1.__importDefault)(require("forwarded-parse"));
const util_1 = require("./util");
const value_from_record_1 = require("value-from-record");
function originalUrl(req) {
    var _a;
    const raw = req.originalUrl || req.url;
    const url = (0, url_1.parse)(raw || '');
    const secure = req.secure || ((_a = req.connection) === null || _a === void 0 ? void 0 : _a.encrypted);
    const result = {
        raw: raw,
    };
    let host;
    const headers = req.headers;
    if ((0, value_from_record_1.valueFromRecord)('forwarded', headers)) {
        try {
            // Always choose the original (first) Forwarded pair in case the request
            // passed through multiple proxies
            let forwarded = (0, forwarded_parse_1.default)((0, util_1.getFirstHeader)(req, 'forwarded'))[0];
            host = (0, util_1.parsePartialURL)(forwarded.host);
            if (forwarded.for) {
                const conn = forwarded.for.split(']'); // in case of IPv6 addr: [2001:db8:cafe::17]:1337
                const port = conn[conn.length - 1].split(':')[1];
                // @ts-ignore
                if (port)
                    host.port = Number(port);
            }
            if (forwarded.proto)
                host.protocol = forwarded.proto + ':';
        }
        catch (e) { }
    }
    else if ((0, value_from_record_1.valueFromRecord)('x-forwarded-host', headers)) {
        host = (0, util_1.parsePartialURL)((0, util_1.getFirstHeader)(req, 'x-forwarded-host'));
    }
    if (!host) {
        const _host = (0, value_from_record_1.valueFromRecord)('host', headers);
        if (typeof _host === 'string') {
            host = (0, util_1.parsePartialURL)(_host);
        }
        else {
            host = {};
        }
    }
    // protocol
    if (url.protocol) {
        result.protocol = url.protocol;
    }
    else if ((0, value_from_record_1.valueFromRecord)('x-forwarded-proto', headers)) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-forwarded-proto') + ':';
    }
    else if ((0, value_from_record_1.valueFromRecord)('x-forwarded-protocol', headers)) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-forwarded-protocol') + ':';
    }
    else if ((0, value_from_record_1.valueFromRecord)('x-url-scheme', headers)) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-url-scheme') + ':';
    }
    else if ((0, value_from_record_1.valueFromRecord)('front-end-https', headers)) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'front-end-https') === 'on'
            ? 'https:'
            : 'http:';
    }
    else if ((0, value_from_record_1.valueFromRecord)('x-forwarded-ssl', headers)) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-forwarded-ssl') === 'on'
            ? 'https:'
            : 'http:';
    }
    else if (host.protocol) {
        result.protocol = host.protocol;
    }
    else if (secure) {
        result.protocol = 'https:';
    }
    else {
        result.protocol = 'http:';
    }
    // hostname
    if (url.hostname) {
        result.hostname = url.hostname;
    }
    else if (host.hostname)
        result.hostname = host.hostname;
    // fix for IPv6 literal bug in legacy url - see https://github.com/watson/original-url/issues/3
    if ((0, util_1.isIPv6)(result.hostname))
        result.hostname = '[' + result.hostname + ']';
    // port
    if (url.port) {
        result.port = Number(url.port);
    }
    else if ((0, value_from_record_1.valueFromRecord)('x-forwarded-port', headers)) {
        result.port = Number((0, util_1.getFirstHeader)(req, 'x-forwarded-port'));
    }
    else if (host.port)
        result.port = Number(host.port);
    if (result.hostname) {
        result.host = result.hostname + (host.port ? ':' + host.port : '');
    }
    // pathname
    if (url.pathname) {
        result.pathname = url.pathname;
    }
    else if (host.pathname)
        result.pathname = host.pathname; // TODO: Consider if this should take priority over url.pathname
    // search
    if (url.search) {
        result.search = url.search;
    }
    else if (host.search)
        result.search = host.search; // TODO: Consider if this shoudl take priority over uri.search
    // hash
    if (host.hash)
        result.hash = host.hash;
    // full
    if (result.protocol && result.hostname) {
        result.full = result.protocol + '//' + result.hostname;
        if (result.port)
            result.full += ':' + result.port;
        if (result.pathname)
            result.full += result.pathname;
        if (result.search)
            result.full += result.search;
        if (result.hash)
            result.full += result.hash;
    }
    return result;
}
exports.originalUrl = originalUrl;
exports.default = originalUrl;
//# sourceMappingURL=index.js.map