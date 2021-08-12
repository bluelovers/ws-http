import { LazyURL } from 'lazy-url';
export interface IReqInfo {
    protocol?: string;
    auth?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
}
export declare function resultToURL<T extends {
    request: any;
}>(result: any): LazyURL;
export declare function requestToURL(req: any): LazyURL;
export declare function _requestToURL(req: any): LazyURL;
export default requestToURL;
