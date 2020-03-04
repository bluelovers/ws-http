/**
 * Created by user on 2020/2/26.
 */
/// <reference types="node" />
import { ServerResponse } from "http";
export declare function responseStream(serverResponse: ServerResponse, data: any): ServerResponse;
export default responseStream;
