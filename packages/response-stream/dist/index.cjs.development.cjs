'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stream = require('stream');

function responseStream(serverResponse, data) {
  let readStream = new stream.PassThrough();
  readStream.end(data);
  return readStream.pipe(serverResponse);
}

exports["default"] = responseStream;
exports.responseStream = responseStream;
//# sourceMappingURL=index.cjs.development.cjs.map
