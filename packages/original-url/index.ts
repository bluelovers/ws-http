import { parse as parseUrl, UrlWithStringQuery } from 'url';
import parseForwarded from 'forwarded-parse';
import { parsePartialURL, getFirstHeader, isIPv6 } from './util';
import { valueFromRecord, keyFromRecord, IRecordLike } from 'value-from-record';

export interface IResult
{
	raw: string;
	protocol: string | 'https:' | 'http:';
	/**
	 * hostname + port
	 */
	host: string;
	hostname: string;
	port: number;
	pathname: string;
	search: string;
	hash: string;
	full: string;
}

export function originalUrl(req)
{
	const raw: string = req.originalUrl || req.url
	const url = parseUrl(raw || '')
	const secure: boolean = req.secure || req.connection?.encrypted
	const result: IResult = {
		raw: raw,
	} as any
	let host: UrlWithStringQuery

	const headers: IRecordLike<any, string> = req.headers;

	if (valueFromRecord('forwarded', headers))
	{
		try
		{
			// Always choose the original (first) Forwarded pair in case the request
			// passed through multiple proxies
			let forwarded = (parseForwarded(getFirstHeader(req, 'forwarded')) as [{
				for: string,
				by: string,
				proto: string,
				host: string
			}])[0]
			host = parsePartialURL(forwarded.host)
			if (forwarded.for)
			{
				const conn = forwarded.for.split(']') // in case of IPv6 addr: [2001:db8:cafe::17]:1337
				const port = conn[conn.length - 1].split(':')[1]
				// @ts-ignore
				if (port) host.port = Number(port)
			}
			if (forwarded.proto) host.protocol = forwarded.proto + ':'
		}
		catch (e)
		{}
	}
	else if (valueFromRecord('x-forwarded-host', headers))
	{
		host = parsePartialURL(getFirstHeader(req, 'x-forwarded-host'))
	}

	if (!host)
	{
		const _host = valueFromRecord('host', headers);

		if (typeof _host === 'string')
		{
			host = parsePartialURL(_host)
		}
		else
		{
			host = {} as any
		}
	}

	// protocol
	if (url.protocol)
	{
		result.protocol = url.protocol
	}
	else if (valueFromRecord('x-forwarded-proto', headers))
	{
		result.protocol = getFirstHeader(req, 'x-forwarded-proto') + ':'
	}
	else if (valueFromRecord('x-forwarded-protocol', headers))
	{
		result.protocol = getFirstHeader(req, 'x-forwarded-protocol') + ':'
	}
	else if (valueFromRecord('x-url-scheme', headers))
	{
		result.protocol = getFirstHeader(req, 'x-url-scheme') + ':'
	}
	else if (valueFromRecord('front-end-https', headers))
	{
		result.protocol = getFirstHeader(req, 'front-end-https') === 'on'
			? 'https:'
			: 'http:'
	}
	else if (valueFromRecord('x-forwarded-ssl', headers))
	{
		result.protocol = getFirstHeader(req, 'x-forwarded-ssl') === 'on'
			? 'https:'
			: 'http:'
	}
	else if (host.protocol)
	{
		result.protocol = host.protocol
	}
	else if (secure)
	{
		result.protocol = 'https:'
	}
	else
	{
		result.protocol = 'http:'
	}

	// hostname
	if (url.hostname)
	{
		result.hostname = url.hostname
	}
	else if (host.hostname) result.hostname = host.hostname

	// fix for IPv6 literal bug in legacy url - see https://github.com/watson/original-url/issues/3
	if (isIPv6(result.hostname)) result.hostname = '[' + result.hostname + ']'

	// port
	if (url.port)
	{
		result.port = Number(url.port)
	}
	else if (valueFromRecord('x-forwarded-port', headers))
	{
		result.port = Number(getFirstHeader(req, 'x-forwarded-port'))
	}
	else if (host.port) result.port = Number(host.port)

	if (result.hostname)
	{
		result.host = result.hostname + (host.port ? ':' + host.port : '');
	}

	// pathname
	if (url.pathname)
	{
		result.pathname = url.pathname
	}
	else if (host.pathname) result.pathname = host.pathname // TODO: Consider if this should take priority over url.pathname

	// search
	if (url.search)
	{
		result.search = url.search
	}
	else if (host.search) result.search = host.search // TODO: Consider if this shoudl take priority over uri.search

	// hash
	if (host.hash) result.hash = host.hash

	// full
	if (result.protocol && result.hostname)
	{
		result.full = result.protocol + '//' + result.hostname
		if (result.port) result.full += ':' + result.port
		if (result.pathname) result.full += result.pathname
		if (result.search) result.full += result.search
		if (result.hash) result.full += result.hash
	}

	return result
}

export default originalUrl
