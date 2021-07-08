"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalUrl = void 0;
const tslib_1 = require("tslib");
const url_1 = require("url");
const forwarded_parse_1 = (0, tslib_1.__importDefault)(require("forwarded-parse"));
const util_1 = require("./util");
function originalUrl(req) {
    const raw = req.originalUrl || req.url;
    const url = (0, url_1.parse)(raw || '');
    const secure = req.secure || (req.connection && req.connection.encrypted);
    const result = {
        raw: raw,
    };
    let host;
    if (req.headers.forwarded) {
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
    else if (req.headers['x-forwarded-host']) {
        host = (0, util_1.parsePartialURL)((0, util_1.getFirstHeader)(req, 'x-forwarded-host'));
    }
    if (!host) {
        if (typeof req.headers.host === 'string') {
            host = (0, util_1.parsePartialURL)(req.headers.host);
        }
        else {
            host = {};
        }
    }
    // protocol
    if (url.protocol) {
        result.protocol = url.protocol;
    }
    else if (req.headers['x-forwarded-proto']) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-forwarded-proto') + ':';
    }
    else if (req.headers['x-forwarded-protocol']) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-forwarded-protocol') + ':';
    }
    else if (req.headers['x-url-scheme']) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'x-url-scheme') + ':';
    }
    else if (req.headers['front-end-https']) {
        result.protocol = (0, util_1.getFirstHeader)(req, 'front-end-https') === 'on'
            ? 'https:'
            : 'http:';
    }
    else if (req.headers['x-forwarded-ssl']) {
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
    else if (req.headers['x-forwarded-port']) {
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