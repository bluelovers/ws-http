(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream')) :
	typeof define === 'function' && define.amd ? define(['exports', 'stream'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HttpResponseStream = {}, global.stream));
})(this, (function (exports, stream) { 'use strict';

	/**
	 * Created by user on 2020/2/26.
	 */
	function responseStream(serverResponse, data) {
	  let readStream = new stream.PassThrough();
	  readStream.end(data);
	  return readStream.pipe(serverResponse);
	}

	exports.default = responseStream;
	exports.responseStream = responseStream;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.development.cjs.map
