import { parse as parseUrl } from "url";
import { v6 } from 'ip-regex';
import { valueFromRecord, keyFromRecord, IRecordLike } from 'value-from-record';

const re_v6 = v6({ exact: true });

/**
 * In case there's more than one header of a given name, we want the first one
 * as it should be the one that was added by the first proxy in the chain
 */
export function getFirstHeader(req: {
	headers: IRecordLike<any, any>
}, header: string): string
{
	const value = valueFromRecord<string>(header, req.headers)
	return (Array.isArray(value) ? value[0] : value).split(', ')[0]
}

export function parsePartialURL(url: string)
{
	const containsProtocol = url.indexOf('://') !== -1
	const result = parseUrl(containsProtocol ? url : 'invalid://' + url)
	if (!containsProtocol) result.protocol = ''
	return result
}

export function isIPv6(ip: string)
{
	return re_v6.test(ip)
}
