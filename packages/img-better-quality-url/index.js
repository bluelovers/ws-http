"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betterQualityURL = void 0;
const tslib_1 = require("tslib");
const lazy_url_1 = (0, tslib_1.__importDefault)(require("lazy-url"));
const parse_domain_1 = require("parse-domain");
const mitemin_1 = require("mitemin");
function betterQualityURL(input, base) {
    var _a, _b;
    let url = new lazy_url_1.default(input, base);
    let pd = (0, parse_domain_1.parseDomain)(url.hostname);
    let changed = false;
    let pathname = url.pathname;
    let not_suppertd = false;
    switch ((_b = (_a = pd) === null || _a === void 0 ? void 0 : _a.domain) !== null && _b !== void 0 ? _b : url.hostname) {
        case 'novelstar':
            pathname = pathname.replace('/cutw_300h_450/', '/cutw_460h_690/');
            break;
        case 'masiro':
            if (url.searchParams.has('quality')) {
                url.searchParams.delete('quality');
                changed = true;
            }
            break;
        case 'mitemin':
            let actual = (0, mitemin_1.parse)(url);
            if (actual.fullsize !== actual.url) {
                url = new lazy_url_1.default(actual.fullsize);
                changed = true;
            }
            break;
        default:
            not_suppertd = true;
            break;
    }
    if (changed === false && pathname !== url.pathname) {
        url.pathname = pathname;
        changed = true;
    }
    return {
        changed,
        not_suppertd,
        url,
        pd,
    };
}
exports.betterQualityURL = betterQualityURL;
exports.default = betterQualityURL;
//# sourceMappingURL=index.js.map