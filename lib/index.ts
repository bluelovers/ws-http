/**
 * Created by user on 2019/6/6.
 */

import urlParse from 'url-parse';
import SymbolInspect from 'symbol.inspect';
import util from 'util';

export type IURLLike = string | URL | IURLObjectLike;
export const SYM_URL = Symbol('url');
export const SYM_HIDDEN = Symbol('hidden');

const enum ENUM_FAKE
{
	protocol = 'fake+http:',
	hostname = 'url-fake-hostname',
}

const SymbolContext = findSymbolContext();

export class LazyURL extends URL implements URL
{
	protected [SYM_URL]?: URL;
	protected [SYM_HIDDEN]: Partial<URL>;

	static create(url: IURLLike | [IURLLike, IURLLike?], base?: IURLLike)
	{
		return new this(url, base)
	}

	constructor(url: IURLLike | [IURLLike, IURLLike?], base?: IURLLike)
	{
		let u = _core(url, base)

		super(u.url.href);

		//this[SYM_URL] = _url;
		this[SYM_HIDDEN] = u.hidden;

		//_numerable(this)
	}

	/*
	[SymbolInspect]()
	{
		return `LazyURL {
  href: '${this.href}',
  href: '${this.toRealString()}',
  origin: '${this.origin}',
  protocol: '${this.protocol}',
  username: '${this.username}',
  password: '${this.password}',
  host: '${this.host}',
  hostname: '${this.hostname}',
  port: '${this.port}',
  pathname: '${this.pathname}',
  search: '${this.search}',
  searchParams: ${util.inspect(this.searchParams)},
  hash: '${this.hash}'
}`;
	}
	 */

	/*
	[SymbolInspect]()
	{
		return `LazyURL(${this.href})`;
	}

	 */

	get paths()
	{
		if (SymbolContext != null && this[SymbolContext] && Array.isArray(this[SymbolContext].path))
		{
			return this[SymbolContext].path.slice();
		}

		return this.pathname
			.split('/')
			.filter(v => v != '')
	}

	fakeExists()
	{
		return this.fakeKeys().length
	}

	fakeKeys()
	{
		return Object.keys(this[SYM_HIDDEN])
	}

	fakeEntries()
	{
		return Object.entries(this[SYM_HIDDEN])
	}

	/**
	 * get the real url (remove fake value)
	 * throw error if not a valid url
	 *
	 * @returns {string}
	 */
	toRealString()
	{
		let ks = this.fakeEntries();

		if (ks.length)
		{
			let u = urlParse(this.href);

			ks
				.forEach(([name, value]) =>
				{
					if (u[name] === value)
					{
						u.set(name as any, '');
					}
				})
			;

			if (u.host === '')
			{
				if (u.username !== '' || u.password !== '' || u.port !== '' || u.protocol !== '')
				{
					throw new TypeError(`Invalid URL ${u}`)
				}
			}

			let s = u.toString();

			if (u.protocol === '' && u.host === '')
			{
				s = s.replace(/^\/\//, '');
			}

			return s
		}

		return this.href;
	}

	toString()
	{
		return this.href;
	}

	/*
	toJSON()
	{
		return this[SYM_URL].toJSON();
	}
	 */

	/*
	get hash()
	{
		return this[SYM_URL].hash
	}

	set hash(value)
	{
		this[SYM_URL].hash = value
	}

	get host()
	{
		return this[SYM_URL].host
	}

	set host(value)
	{
		delete this[SYM_HIDDEN].hostname;

		this[SYM_URL].host = value
	}
	 */

	get hostname()
	{
		return super.hostname
	}

	set hostname(value)
	{
		delete this[SYM_HIDDEN].hostname;

		super.hostname = value
	}

	/*
	get href()
	{
		return this[SYM_URL].href
	}

	set href(value)
	{
		this[SYM_URL].href = value
	}

	get origin()
	{
		return this[SYM_URL].origin
	}

	get password()
	{
		return this[SYM_URL].password
	}

	set password(value)
	{
		this[SYM_URL].password = value
	}

	get pathname()
	{
		return this[SYM_URL].pathname
	}

	set pathname(value)
	{
		this[SYM_URL].pathname = value
	}

	get port()
	{
		return this[SYM_URL].port
	}

	set port(value)
	{
		this[SYM_URL].port = value
	}
	 */

	get protocol()
	{
		return super.protocol
	}

	set protocol(value)
	{
		delete this[SYM_HIDDEN].protocol;

		super.protocol = value
	}

	/*
	get search()
	{
		return this[SYM_URL].search
	}

	set search(value)
	{
		this[SYM_URL].search = value
	}

	get searchParams()
	{
		return this[SYM_URL].searchParams
	}

	get username()
	{
		return this[SYM_URL].username
	}

	set username(value)
	{
		this[SYM_URL].username = value
	}

	 */

	/**
	 * @alias protocol
	 */
	get scheme()
	{
		return this.protocol
	}

	/**
	 * @alias protocol
	 */
	set scheme(value: string)
	{
		this.protocol = value;
	}

	/**
	 * @alias hash
	 */
	get fragment()
	{
		return this.hash
	}

	/**
	 * @alias hash
	 */
	set fragment(value: string)
	{
		this.hash = value;
	}

	/**
	 * @alias search
	 */
	get query()
	{
		return this.search
	}

	/**
	 * @alias search
	 */
	set query(value: string)
	{
		this.search = value;
	}

	/**
	 * clone into a object
	 *
	 * @returns {IURLObject}
	 */
	toObject(url: URL): IURLObject
	{
		return LazyURL.toObject(url)
	}

	static toObject(url: URL): IURLObject
	{
		return LazyURL.keys().reduce((a, b) =>
		{
			if (b === 'searchParams')
			{
				a[b] = new URLSearchParams(url.searchParams.entries() as any as [string, string][])
			}
			else
			{
				a[b] = this[b];
			}

			return a
		}, {} as IURLObject)
	}

	keys(): IUrlKeys[]
	{
		return LazyURL.keys()
	}

	values()
	{
		return LazyURL.values(this)
	}

	entries(): IEntries
	{
		return LazyURL.entries(this)
	}

	static keys(): IUrlKeys[]
	{
		return [
			'href',
			'protocol',
			'username',
			'password',
			'host',
			'hostname',
			'port',
			'pathname',
			'search',
			'searchParams',
			'hash',
		]
	}

	static values(url: URL)
	{
		return LazyURL.keys().map(name => url[name])
	}

	static entries(url: URL): IEntries
	{
		return LazyURL.keys().map(name => [name, url[name]]) as IEntries
	}

	createURLSearchParams(init?: string[][] | Record<string, string> | string | URLSearchParams | URL)
	{
		if (init instanceof URL)
		{
			init = init.searchParams;
		}

		return new URLSearchParams(init)
	}

}

export type IEntries = (["hash" | "host" | "hostname" | "href" | "password" | "pathname" | "port" | "protocol" | "search" | "username", string] | ["searchParams", URLSearchParams])[]

export type IEntriesRow<T extends IUrlKeys> = [T, URL[T]]

function _numerable(lib)
{
	let ds = Object.getOwnPropertyDescriptors(lib);

	([
		'href',
		'protocol',
		'username',
		'password',
		'host',
		'hostname',
		'port',
		'pathname',
		'search',
		'searchParams',
		'hash',
	] as const)
		.forEach((name) =>
		{
			if (name in ds)
			{
				ds[name].enumerable = true;

				Object.defineProperty(lib, name, ds[name])
			}
		})
	;
}

export type IUrlKeys =
	| 'href'
	| 'username'
	| 'password'
	| 'host'
	| 'hostname'
	| 'port'
	| 'pathname'
	| 'search'
	| 'searchParams'
	| 'protocol'
	| 'hash'
	;

export function findSymbolContext(): symbol
{
	let u = new URL(`https://localhost`);

	const SymbolContext = Object.getOwnPropertySymbols(u)
		.filter(sym => u[sym].host == 'localhost')[0]
	;

	return SymbolContext;
}

export interface IURLObjectLike
{
	href: string;
}

export interface IURLObject
{
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

export function _core(url: IURLLike | [IURLLike, IURLLike?], base?: IURLLike)
{
	if (Array.isArray(url))
	{
		if (base == null)
		{
			[url, base] = url;
		}
	}

	if (url && url instanceof LazyURL)
	{
		url = url.toRealString();
	}
	else if (url && url instanceof URL)
	{
		url = url.href;
	}
	else if (url != null && typeof (url as IURLObjectLike).href === 'string')
	{
		url = (url as IURLObjectLike).href;
	}
	else if (typeof url !== 'string')
	{
		throw new TypeError(`Argument '${url}' is not assignable to url like.`)
	}

	let _url: URL;
	const _hidden_: Partial<URL> = {};

	if (typeof base !== 'string' && base != null && typeof base.href === 'string')
	{
		base = base.href;
	}

	if (base === '')
	{
		base = void 0;
	}

	try
	{
		_url = new URL(url, base as string)
	}
	catch (e)
	{
		let ok: boolean;

		if (/Invalid URL/.test(e.message))
		{
			if (typeof base === 'string')
			{
				let old = base;
				let u = urlParse(base)/* as URL & {
						set(name: keyof URL, value: string): void
					}*/;

				if ((
					u.host === ''
					|| u.protocol === ''
				))
				{
					if (!old.includes('/') && [
						u.protocol + u.host,
						u.protocol + u.pathname,
					].includes(old.toLowerCase()))
					{
						u = urlParse('');

						u.set('host', old);
						u.set('protocol', ENUM_FAKE.protocol);
						u.set('pathname', '');

						_hidden_.protocol = ENUM_FAKE.protocol;
					}

					if (u.host === '')
					{
						if (u.pathname != '' && !u.pathname.includes('/'))
						{
							u.set('host', u.pathname);
							u.set('pathname', '');
						}
						else
						{
							u.set('host', ENUM_FAKE.hostname);

							_hidden_.hostname = u.hostname;
						}
					}

					if (u.protocol === '')
					{
						u.set('protocol', ENUM_FAKE.protocol);
						_hidden_.protocol = u.protocol;
					}

					// @ts-ignore
					if (u.pathname !== '' && !u.pathname.startsWith('/'))
					{
						// @ts-ignore
						u.set('pathname', '/' + u.pathname);
					}

					_url = new URL(url, u.toString());

					ok = true;
				}
			}
			else if (base == null)
			{
				base = `${ENUM_FAKE.protocol}//${ENUM_FAKE.hostname}`;

				_url = new URL(url, base);

				_hidden_.protocol = ENUM_FAKE.protocol;
				_hidden_.hostname = ENUM_FAKE.hostname;

				ok = true;
			}
		}

		if (!ok)
		{
			throw e
		}
	}

	return {
		url: _url,
		hidden: _hidden_,
	}
}

export default LazyURL
