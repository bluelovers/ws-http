import LazyURL, { IURLLike } from 'lazy-url';
export declare function betterQualityURL(input: IURLLike | [IURLLike, IURLLike?], base?: IURLLike): {
    changed: boolean;
    not_suppertd: boolean;
    url: LazyURL;
    pd: import("parse-domain").ParseResult;
};
export default betterQualityURL;
