export type IEntriesLike<K extends string, V extends unknown> = [
	key: K,
	val: V
][] | IterableIterator<[
	K,
	V
]>;
export interface IOptions {
	removeSquareBracketsArrayKey?: boolean;
	squareBracketsArrayKey?: boolean;
}
/**
 * @see https://stackoverflow.com/a/52539264/4563339
 */
export declare function entriesToJSON<T extends Record<string, any>>(entries: IEntriesLike<string, unknown>, options?: IOptions): T;
export declare function removeSquareBracketsFromJSON<T extends Record<string, unknown>>(json: T, ks?: Set<string>): T;
/**
 * @see https://stackoverflow.com/a/52539264/4563339
 */
export declare function searchParamsToJSON<T extends Record<string, any>>(sp: URLSearchParams, options?: IOptions): T;
export declare function searchParamsStringToJSON<T extends Record<string, any>>(sp: string, options?: IOptions): T;
export declare function jsonToEntries(json: Record<string, unknown>, options?: IOptions): [
	string,
	unknown
][];
export declare function jsonToSearchParams(json: Record<string, unknown>, options?: IOptions): URLSearchParams;

export {
	searchParamsToJSON as default,
};

export {};
