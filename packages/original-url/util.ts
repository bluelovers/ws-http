
import { parse as parseUrl } from "url";

/**
 * In case there's more than one header of a given name, we want the first one
 * as it should be the one that was added by the first proxy in the chain
 */
export function getFirstHeader(req: {
	headers: Record<any, any>
}, header: string): string
{
	const value = req.headers[header]
	return (Array.isArray(value) ? value[0] : value).split(', ')[0]
}

export function parsePartialURL(url: string)
{
	const containsProtocol = url.indexOf('://') !== -1
	const result = parseUrl(containsProtocol ? url : 'invalid://' + url)
	if (!containsProtocol) result.protocol = ''
	return result
}
