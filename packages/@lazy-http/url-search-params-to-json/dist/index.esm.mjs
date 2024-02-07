function entriesToJSON(r) {
  const s = {};
  for (const [e, n] of r) s.hasOwnProperty(e) ? Array.isArray(s[e]) ? s[e].push(n) : s[e] = [ s[e], n ] : s[e] = n;
  return s;
}

function searchParamsToJSON(r) {
  return entriesToJSON(r.entries());
}

function jsonToEntries(r) {
  return Object.entries(r).reduce(((r, [s, e]) => (Array.isArray(e) ? e.forEach((e => {
    r.push([ s, e ]);
  })) : r.push([ s, e ]), r)), []);
}

function jsonToSearchParams(r) {
  return new URLSearchParams(jsonToEntries(r));
}

export { searchParamsToJSON as default, entriesToJSON, jsonToEntries, jsonToSearchParams, searchParamsToJSON };
//# sourceMappingURL=index.esm.mjs.map
