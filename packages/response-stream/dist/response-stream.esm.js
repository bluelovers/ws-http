import { PassThrough } from 'stream';

/**
 * Created by user on 2020/2/26.
 */
function responseStream(serverResponse, data) {
  var readStream = new PassThrough();
  readStream.end(data);
  return readStream.pipe(serverResponse);
}

export default responseStream;
export { responseStream };
//# sourceMappingURL=response-stream.esm.js.map
