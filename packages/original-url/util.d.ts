/// <reference types="node" />
/**
 * In case there's more than one header of a given name, we want the first one
 * as it should be the one that was added by the first proxy in the chain
 */
export declare function getFirstHeader(req: {
    headers: Record<any, any>;
}, header: string): string;
export declare function parsePartialURL(url: string): import("url").UrlWithStringQuery;
export declare function isIPv6(ip: string): boolean;
