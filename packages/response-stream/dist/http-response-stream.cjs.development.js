'use strict';

var stream = require('stream');

/**
 * Created by user on 2020/2/26.
 */
function responseStream(serverResponse, data) {
  var readStream = new stream.PassThrough();
  readStream.end(data);
  return readStream.pipe(serverResponse);
}

exports.default = responseStream;
exports.responseStream = responseStream;
//# sourceMappingURL=http-response-stream.cjs.development.js.map
