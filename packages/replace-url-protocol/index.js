"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceURLProtocol = exports.replaceThisProtocol = exports.assertProtocolEqual = exports.assertProtocolNotEqual = exports._isSameProtocol = exports._fixReplaceURLProtocol = exports.replaceProtocol = void 0;
const assert_1 = require("assert");
function replaceProtocol(href, protocol) {
    return href.replace(/^[^:]+:/, protocol);
}
exports.replaceProtocol = replaceProtocol;
/**
 * @internal
 */
function _fixReplaceURLProtocol(url, oldProtocol, newProtocol) {
    if (_isSameProtocol(url.protocol, oldProtocol)) {
        url.href = replaceProtocol(url.href, newProtocol);
        assertProtocolNotEqual(url.protocol, oldProtocol);
    }
}
exports._fixReplaceURLProtocol = _fixReplaceURLProtocol;
/**
 * @internal
 */
function _isSameProtocol(actualProtocol, expectedProtocol) {
    return actualProtocol === expectedProtocol;
}
exports._isSameProtocol = _isSameProtocol;
function assertProtocolNotEqual(actualProtocol, expectedProtocol) {
    (0, assert_1.notStrictEqual)(actualProtocol, expectedProtocol);
}
exports.assertProtocolNotEqual = assertProtocolNotEqual;
function assertProtocolEqual(actualProtocol, expectedProtocol) {
    (0, assert_1.strictEqual)(actualProtocol, expectedProtocol);
}
exports.assertProtocolEqual = assertProtocolEqual;
function replaceThisProtocol(protocol) {
    return replaceURLProtocol(this, protocol);
}
exports.replaceThisProtocol = replaceThisProtocol;
/**
 * helper for avoid node.js can't update protocol for some url
 *
 * @see https://github.com/nodejs/node/issues/39732
 */
function replaceURLProtocol(url, protocol) {
    const old = url.protocol;
    if (!_isSameProtocol(old, protocol)) {
        url.protocol = protocol;
        _fixReplaceURLProtocol(url, old, protocol);
    }
    return url;
}
exports.replaceURLProtocol = replaceURLProtocol;
exports.default = replaceURLProtocol;
//# sourceMappingURL=index.js.map