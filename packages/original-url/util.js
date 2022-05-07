"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIPv6 = exports.parsePartialURL = exports.getFirstHeader = void 0;
const tslib_1 = require("tslib");
const url_1 = require("url");
const ip_regex_1 = tslib_1.__importDefault(require("ip-regex"));
const value_from_record_1 = require("value-from-record");
const re_v6 = ip_regex_1.default.v6({ exact: true });
/**
 * In case there's more than one header of a given name, we want the first one
 * as it should be the one that was added by the first proxy in the chain
 */
function getFirstHeader(req, header) {
    const value = (0, value_from_record_1.valueFromRecord)(header, req.headers);
    return (Array.isArray(value) ? value[0] : value).split(', ')[0];
}
exports.getFirstHeader = getFirstHeader;
function parsePartialURL(url) {
    const containsProtocol = url.indexOf('://') !== -1;
    const result = (0, url_1.parse)(containsProtocol ? url : 'invalid://' + url);
    if (!containsProtocol)
        result.protocol = '';
    return result;
}
exports.parsePartialURL = parsePartialURL;
function isIPv6(ip) {
    return re_v6.test(ip);
}
exports.isIPv6 = isIPv6;
//# sourceMappingURL=util.js.map