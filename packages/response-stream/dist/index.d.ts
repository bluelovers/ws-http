import { ServerResponse } from 'http';

export declare function responseStream<T>(serverResponse: ServerResponse, data: T): ServerResponse;
export default responseStream;

export {};
