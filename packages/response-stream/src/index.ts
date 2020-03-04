/**
 * Created by user on 2020/2/26.
 */

import { PassThrough } from "stream";
import { ServerResponse } from "http";

export function responseStream(serverResponse: ServerResponse, data)
{
	let readStream = new PassThrough();
	readStream.end(data);
	return readStream.pipe(serverResponse);
}

export default responseStream
