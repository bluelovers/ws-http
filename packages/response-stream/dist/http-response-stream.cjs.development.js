'use strict';

var stream = require('stream');

function responseStream(serverResponse, data) {
  let readStream = new stream.PassThrough();
  readStream.end(data);
  return readStream.pipe(serverResponse);
}

exports.default = responseStream;
exports.responseStream = responseStream;
//# sourceMappingURL=http-response-stream.cjs.development.js.map
