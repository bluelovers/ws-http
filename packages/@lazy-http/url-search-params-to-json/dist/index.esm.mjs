function entriesToJSON(r, e) {
  const {removeSquareBracketsArrayKey: a = !1, squareBracketsArrayKey: s = !1} = null != e ? e : {}, t = new Set;
  let n = {};
  for (const [e, a] of r) s && e.endsWith("[]") && (n[e] = []), Object.prototype.hasOwnProperty.call(n, e) ? (Array.isArray(n[e]) ? n[e].push(a) : n[e] = [ n[e], a ], 
  t.add(e)) : n[e] = a;
  return a && (n = removeSquareBracketsFromJSON(n, t)), n;
}

function removeSquareBracketsFromJSON(r, e) {
  var a;
  return null !== (a = e) && void 0 !== a || (e = new Set(Object.keys(r))), r = {
    ...r
  }, e.forEach((e => {
    const a = r[e];
    if (e.endsWith("[]") && Array.isArray(a)) {
      const s = e.replace(/\[\]$/, "");
      if (!s.length) throw new TypeError(`Invalid key: '${e}'`);
      if (Object.prototype.hasOwnProperty.call(r, s)) throw new TypeError(`'${s}' already exists in keys`);
      delete r[e], r[s] = a;
    }
  })), r;
}

function searchParamsToJSON(r, e) {
  return entriesToJSON(r.entries(), e);
}

function searchParamsStringToJSON(r, e) {
  return searchParamsToJSON(new URLSearchParams(r), e);
}

function jsonToEntries(r, e) {
  const {squareBracketsArrayKey: a = !1, removeSquareBracketsArrayKey: s = !1} = null != e ? e : {};
  return s && (r = removeSquareBracketsFromJSON(r)), Object.entries(r).reduce(((r, [e, s]) => {
    if (Array.isArray(s)) {
      let t = e.endsWith("[]");
      a && !t && (e += "[]"), s.forEach((a => {
        r.push([ e, a ]);
      }));
    } else r.push([ e, s ]);
    return r;
  }), []);
}

function jsonToSearchParams(r, e) {
  return new URLSearchParams(jsonToEntries(r, e));
}

export { searchParamsToJSON as default, entriesToJSON, jsonToEntries, jsonToSearchParams, removeSquareBracketsFromJSON, searchParamsStringToJSON, searchParamsToJSON };
//# sourceMappingURL=index.esm.mjs.map
