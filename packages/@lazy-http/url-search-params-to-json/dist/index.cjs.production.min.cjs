"use strict";

function entriesToJSON(r) {
  const e = {};
  for (const [s, o] of r) e.hasOwnProperty(s) ? Array.isArray(e[s]) ? e[s].push(o) : e[s] = [ e[s], o ] : e[s] = o;
  return e;
}

function searchParamsToJSON(r) {
  return entriesToJSON(r.entries());
}

function jsonToEntries(r) {
  return Object.entries(r).reduce(((r, [e, s]) => (Array.isArray(s) ? s.forEach((s => {
    r.push([ e, s ]);
  })) : r.push([ e, s ]), r)), []);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = searchParamsToJSON, exports.entriesToJSON = entriesToJSON, 
exports.jsonToEntries = jsonToEntries, exports.jsonToSearchParams = function jsonToSearchParams(r) {
  return new URLSearchParams(jsonToEntries(r));
}, exports.searchParamsToJSON = searchParamsToJSON;
//# sourceMappingURL=index.cjs.production.min.cjs.map
