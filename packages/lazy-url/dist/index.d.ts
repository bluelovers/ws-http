import { StringifyQuery, URLPart } from 'url-parse';

export type IURLLike = string | URL | IURLObjectLike;
export declare const SYM_URL: unique symbol;
export declare const SYM_HIDDEN: unique symbol;
export declare const enum ENUM_FAKE {
	protocol = "fake+http:",
	hostname = "url-fake-hostname"
}
export declare class LazyURL extends URL implements URL {
	/**
	 * @deprecated
	 */
	protected [SYM_URL]?: URL;
	protected [SYM_HIDDEN]: Partial<URL>;
	static create(url: IURLLike | [
		IURLLike,
		IURLLike?
	], base?: IURLLike): LazyURL;
	constructor(url: IURLLike | [
		IURLLike,
		IURLLike?
	], base?: IURLLike);
	get paths(): string[];
	fakeExists(): number;
	fakeKeys(): string[];
	fakeEntries(): [
		string,
		string | (() => string) | URLSearchParams | (() => string)
	][];
	/**
	 * get the real url (remove fake value)
	 * throw error if not a valid url
	 *
	 * @returns {string}
	 */
	toRealString(options?: {
		ignoreInvalid?: boolean;
		stringify?: StringifyQuery;
	}): string;
	toString(): string;
	get hostname(): string;
	set hostname(value: string);
	get href(): string;
	set href(value: string);
	get origin(): string;
	get port(): string;
	set port(value: string | number);
	get protocol(): string;
	set protocol(value: string);
	get auth(): string;
	set auth(value: string);
	/**
	 * @alias protocol
	 */
	get scheme(): string;
	/**
	 * @alias protocol
	 */
	set scheme(value: string);
	/**
	 * @alias hash
	 */
	get fragment(): string;
	/**
	 * @alias hash
	 */
	set fragment(value: string);
	/**
	 * @alias search
	 */
	get query(): string;
	/**
	 * @alias search
	 */
	set query(value: string);
	toObject(): IURLObject;
	/**
	 * clone into a object
	 *
	 * @returns {IURLObject}
	 */
	static toObject(url: URL): IURLObject;
	keys(): IUrlKeys[];
	values(): (string | URLSearchParams)[];
	entries(): IEntries;
	static keys(): IUrlKeys[];
	static values(url: URL): (string | URLSearchParams)[];
	static entries(url: URL): IEntries;
	createURLSearchParams(init?: string[][] | Record<string, string> | string | URLSearchParams | URL): URLSearchParams;
	set<K extends Extract<URLPart, keyof LazyURL>>(part: K, value: LazyURL[K]): void;
	get<K extends Extract<URLPart, keyof LazyURL>>(part: K): LazyURL[K];
}
export type IEntries = ([
	"hash" | "host" | "hostname" | "href" | "password" | "pathname" | "port" | "protocol" | "search" | "username",
	string
] | [
	"searchParams",
	URLSearchParams
])[];
export type IEntriesRow<T extends IUrlKeys> = [
	T,
	URL[T]
];
export type IUrlKeys = "href" | "username" | "password" | "host" | "hostname" | "port" | "pathname" | "search" | "searchParams" | "protocol" | "hash";
export declare function findSymbolContext(): symbol;
export interface IURLObjectLike {
	href: string;
}
export interface IURLObject {
	href: string;
	protocol: string;
	username: string;
	password: string;
	host: string;
	hostname: string;
	port: string;
	pathname: string;
	search: string;
	searchParams: URLSearchParams;
	hash: string;
}
/**
 * @private
 */
export declare function _core(url: IURLLike | [
	IURLLike,
	IURLLike?
], base?: IURLLike): {
	url: URL;
	hidden: Partial<URL>;
};
export interface IURLErrorNode extends Error {
	code: "ERR_INVALID_URL" | string;
	input: IURLLike;
}
export interface IURLError extends IURLErrorNode {
	baseURL: IURLLike;
}
export declare function isFakeProtocol(protocol: string): protocol is ENUM_FAKE.protocol;
export declare function isFakeHostname(hostname: string): hostname is ENUM_FAKE.protocol;

export {
	LazyURL as default,
};

export {};
