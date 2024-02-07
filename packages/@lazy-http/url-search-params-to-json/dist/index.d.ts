export type IEntriesLike<K extends string, V extends unknown> = [
	key: K,
	val: V
][] | IterableIterator<[
	K,
	V
]>;
export declare function entriesToJSON<T extends Record<string, any>>(entries: IEntriesLike<string, unknown>): T;
export declare function searchParamsToJSON<T extends Record<string, any>>(sp: URLSearchParams): T;
export declare function jsonToEntries(json: Record<string, unknown>): [
	string,
	unknown
][];
export declare function jsonToSearchParams(json: Record<string, unknown>): URLSearchParams;

export {
	searchParamsToJSON as default,
};

export {};
