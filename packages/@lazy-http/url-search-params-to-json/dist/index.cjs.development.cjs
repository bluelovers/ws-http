'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @see https://stackoverflow.com/a/52539264/4563339
 */
function entriesToJSON(entries, options) {
  const {
    removeSquareBracketsArrayKey = false,
    squareBracketsArrayKey = false
  } = options !== null && options !== void 0 ? options : {};
  const ks = new Set();
  let json = {};
  for (const [key, val] of entries) {
    if (squareBracketsArrayKey && key.endsWith('[]')) {
      // @ts-ignore
      json[key] = [];
    }
    if (json.hasOwnProperty(key)) {
      if (Array.isArray(json[key])) {
        json[key].push(val);
      } else {
        // @ts-ignore
        json[key] = [json[key], val];
      }
      ks.add(key);
    } else {
      // @ts-ignore
      json[key] = val;
    }
  }
  if (removeSquareBracketsArrayKey) {
    json = removeSquareBracketsFromJSON(json, ks);
  }
  return json;
}
function removeSquareBracketsFromJSON(json, ks) {
  var _ks;
  (_ks = ks) !== null && _ks !== void 0 ? _ks : ks = new Set(Object.keys(json));
  json = {
    ...json
  };
  ks.forEach(key => {
    const val = json[key];
    if (key.endsWith('[]') && Array.isArray(val)) {
      const key2 = key.replace(/\[\]$/, '');
      if (!key2.length) {
        throw new TypeError(`Invalid key: '${key}'`);
      } else if (json.hasOwnProperty(key2)) {
        throw new TypeError(`'${key2}' already exists in keys`);
      }
      delete json[key];
      // @ts-ignore
      json[key2] = val;
    }
  });
  return json;
}
/**
 * @see https://stackoverflow.com/a/52539264/4563339
 */
function searchParamsToJSON(sp, options) {
  return entriesToJSON(sp.entries(), options);
}
function searchParamsStringToJSON(sp, options) {
  return searchParamsToJSON(new URLSearchParams(sp), options);
}
function jsonToEntries(json, options) {
  const {
    squareBracketsArrayKey = false,
    removeSquareBracketsArrayKey = false
  } = options !== null && options !== void 0 ? options : {};
  if (removeSquareBracketsArrayKey) {
    json = removeSquareBracketsFromJSON(json);
  }
  return Object.entries(json).reduce((entries, [key, val]) => {
    if (Array.isArray(val)) {
      let bool = key.endsWith('[]');
      if (squareBracketsArrayKey && !bool) {
        key += '[]';
      }
      val.forEach(v => {
        entries.push([key, v]);
      });
    } else {
      entries.push([key, val]);
    }
    return entries;
  }, []);
}
function jsonToSearchParams(json, options) {
  return new URLSearchParams(jsonToEntries(json, options));
}

exports.default = searchParamsToJSON;
exports.entriesToJSON = entriesToJSON;
exports.jsonToEntries = jsonToEntries;
exports.jsonToSearchParams = jsonToSearchParams;
exports.removeSquareBracketsFromJSON = removeSquareBracketsFromJSON;
exports.searchParamsStringToJSON = searchParamsStringToJSON;
exports.searchParamsToJSON = searchParamsToJSON;
//# sourceMappingURL=index.cjs.development.cjs.map
