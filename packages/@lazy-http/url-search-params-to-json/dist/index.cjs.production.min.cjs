"use strict";

function entriesToJSON(r, e) {
  const {removeSquareBracketsArrayKey: s = !1, squareBracketsArrayKey: a = !1} = null != e ? e : {}, t = new Set;
  let o = {};
  for (const [e, s] of r) a && e.endsWith("[]") && (o[e] = []), Object.prototype.hasOwnProperty.call(o, e) ? (Array.isArray(o[e]) ? o[e].push(s) : o[e] = [ o[e], s ], 
  t.add(e)) : o[e] = s;
  return s && (o = removeSquareBracketsFromJSON(o, t)), o;
}

function removeSquareBracketsFromJSON(r, e) {
  var s;
  return null !== (s = e) && void 0 !== s || (e = new Set(Object.keys(r))), r = {
    ...r
  }, e.forEach((e => {
    const s = r[e];
    if (e.endsWith("[]") && Array.isArray(s)) {
      const a = e.replace(/\[\]$/, "");
      if (!a.length) throw new TypeError(`Invalid key: '${e}'`);
      if (Object.prototype.hasOwnProperty.call(r, a)) throw new TypeError(`'${a}' already exists in keys`);
      delete r[e], r[a] = s;
    }
  })), r;
}

function searchParamsToJSON(r, e) {
  return entriesToJSON(r.entries(), e);
}

function jsonToEntries(r, e) {
  const {squareBracketsArrayKey: s = !1, removeSquareBracketsArrayKey: a = !1} = null != e ? e : {};
  return a && (r = removeSquareBracketsFromJSON(r)), Object.entries(r).reduce(((r, [e, a]) => {
    if (Array.isArray(a)) {
      let t = e.endsWith("[]");
      s && !t && (e += "[]"), a.forEach((s => {
        r.push([ e, s ]);
      }));
    } else r.push([ e, a ]);
    return r;
  }), []);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = searchParamsToJSON, exports.entriesToJSON = entriesToJSON, 
exports.jsonToEntries = jsonToEntries, exports.jsonToSearchParams = function jsonToSearchParams(r, e) {
  return new URLSearchParams(jsonToEntries(r, e));
}, exports.removeSquareBracketsFromJSON = removeSquareBracketsFromJSON, exports.searchParamsStringToJSON = function searchParamsStringToJSON(r, e) {
  return searchParamsToJSON(new URLSearchParams(r), e);
}, exports.searchParamsToJSON = searchParamsToJSON;
//# sourceMappingURL=index.cjs.production.min.cjs.map
