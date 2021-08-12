import { LazyURL } from 'lazy-url';
import type { ClientRequest } from 'http';

export interface IReqInfo
{
	protocol?: string
	auth?: string
	hostname?: string
	port?: string
	pathname?: string
	search?: string
}

export interface IOptions
{
	ignoreError?: boolean
}

export function resultToURL<T extends {
	request: any;
}>(result, options?: IOptions)
{
	return requestToURL(result.request, options)
}

export function requestToURL(req, options?: IOptions)
{
	try
	{
		return new LazyURL(req.url ?? req.res?.responseUrl ?? _requestToURL(req))
	}
	catch (e)
	{
		if (!options?.ignoreError)
		{
			throw e
		}
	}
}

export function _requestToURL(req)
{
	let href: string | URL = req._currentUrl;
	let _currentRequest: ClientRequest = req._currentRequest ?? req ?? {};
	let _options: IReqInfo = req._options ?? {};

	if (_options.protocol?.length)
	{
		let u: LazyURL;

		if (_options.protocol && _options.hostname)
		{
			u = new LazyURL(_options.protocol + '//' + _options.hostname);
		}
		else
		{
			u = new LazyURL(_currentRequest.path);
		}

		u.set('protocol', _options.protocol ?? _currentRequest.protocol);
		u.set('port', _options.port);
		u.set('pathname', _options.pathname ?? _currentRequest.path);
		u.set('query', _options.search);
		u.set('auth', _options.auth);
		u.set('hostname', _options.hostname ?? _currentRequest.getHeader?.('Host') as string ?? _currentRequest.host);

		href = u;
	}
	else if (typeof _currentRequest.getHeader === 'function')
	{
		let u = new LazyURL(req.protocol + '//' + _currentRequest.getHeader('Host') ?? _currentRequest.host);

		u.pathname = req.path;
		u.protocol = req.protocol;

		href = u;
	}
	else
	{
		//req;
	}

	return new LazyURL(href)
}

export default requestToURL
