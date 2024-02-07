'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function entriesToJSON(entries) {
  const json = {};
  for (const [key, val] of entries) {
    if (json.hasOwnProperty(key)) {
      if (Array.isArray(json[key])) {
        json[key].push(val);
      } else {
        // @ts-ignore
        json[key] = [json[key], val];
      }
    } else {
      // @ts-ignore
      json[key] = val;
    }
  }
  return json;
}
function searchParamsToJSON(sp) {
  return entriesToJSON(sp.entries());
}
function jsonToEntries(json) {
  return Object.entries(json).reduce((entries, [key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => {
        entries.push([key, v]);
      });
    } else {
      entries.push([key, val]);
    }
    return entries;
  }, []);
}
function jsonToSearchParams(json) {
  return new URLSearchParams(jsonToEntries(json));
}

exports.default = searchParamsToJSON;
exports.entriesToJSON = entriesToJSON;
exports.jsonToEntries = jsonToEntries;
exports.jsonToSearchParams = jsonToSearchParams;
exports.searchParamsToJSON = searchParamsToJSON;
//# sourceMappingURL=index.cjs.development.cjs.map
