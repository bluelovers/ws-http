function entriesToJSON(r, e) {
  const {removeSquareBracketsArrayKey: a = !1, squareBracketsArrayKey: s = !1} = null != e ? e : {}, n = new Set;
  let t = {};
  for (const [e, a] of r) s && e.endsWith("[]") && (t[e] = []), t.hasOwnProperty(e) ? (Array.isArray(t[e]) ? t[e].push(a) : t[e] = [ t[e], a ], 
  n.add(e)) : t[e] = a;
  return a && (t = removeSquareBracketsFromJSON(t, n)), t;
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
      if (r.hasOwnProperty(s)) throw new TypeError(`'${s}' already exists in keys`);
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
      let n = e.endsWith("[]");
      a && !n && (e += "[]"), s.forEach((a => {
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
