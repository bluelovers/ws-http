import { PassThrough as e } from "stream";

function responseStream(r, t) {
  let n = new e;
  return n.end(t), n.pipe(r);
}

export { responseStream as default, responseStream };
//# sourceMappingURL=index.esm.mjs.map
