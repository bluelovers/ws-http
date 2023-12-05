import { ServerResponse } from 'http';

export declare function responseStream<T>(serverResponse: ServerResponse, data: T): ServerResponse<import("http").IncomingMessage>;

export {
	responseStream as default,
};

export {};
