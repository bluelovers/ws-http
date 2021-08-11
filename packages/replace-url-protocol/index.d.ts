export declare function replaceProtocol(href: string, protocol: string): string;
/**
 * helper for avoid node.js can't update protocol for some url
 *
 * @see https://github.com/nodejs/node/issues/39732
 */
export declare function replaceURLProtocol<T extends URL>(url: URL, protocol: string): URL;
export default replaceURLProtocol;
