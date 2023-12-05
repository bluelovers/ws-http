!function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports, require("stream")) : "function" == typeof define && define.amd ? define([ "exports", "stream" ], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).HttpResponseStream = {}, e.stream);
}(this, (function(e, t) {
  "use strict";
  function responseStream(e, s) {
    let n = new t.PassThrough;
    return n.end(s), n.pipe(e);
  }
  e.default = responseStream, e.responseStream = responseStream, Object.defineProperty(e, "__esModule", {
    value: !0
  });
}));
//# sourceMappingURL=index.umd.production.min.cjs.map
