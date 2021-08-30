"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieFromHeader = void 0;
const value_from_record_1 = require("value-from-record");
function getCookieFromHeader(headers) {
    return [(0, value_from_record_1.valueFromRecord)('set-cookie', headers)].flat().filter(Boolean);
}
exports.getCookieFromHeader = getCookieFromHeader;
exports.default = getCookieFromHeader;
//# sourceMappingURL=index.js.map