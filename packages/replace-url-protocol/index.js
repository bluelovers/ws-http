"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceURLProtocol = exports.replaceProtocol = void 0;
const assert_1 = require("assert");
function replaceProtocol(href, protocol) {
    return href.replace(/^[^:]+:/, protocol);
}
exports.replaceProtocol = replaceProtocol;
/**
 * helper for avoid node.js can't update protocol for some url
 *
 * @see https://github.com/nodejs/node/issues/39732
 */
function replaceURLProtocol(url, protocol) {
    const old = url.protocol;
    if (old !== protocol) {
        url.protocol = protocol;
        if (url.protocol === old) {
            url.href = replaceProtocol(url.href, protocol);
            (0, assert_1.notStrictEqual)(url.protocol, old);
        }
    }
    return url;
}
exports.replaceURLProtocol = replaceURLProtocol;
exports.default = replaceURLProtocol;
//# sourceMappingURL=index.js.map