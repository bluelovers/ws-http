import { PassThrough } from 'stream';

function responseStream(serverResponse, data) {
  let readStream = new PassThrough();
  readStream.end(data);
  return readStream.pipe(serverResponse);
}

export { responseStream as default, responseStream };
//# sourceMappingURL=http-response-stream.esm.js.map
