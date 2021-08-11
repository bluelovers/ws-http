import { notStrictEqual } from 'assert';

export function replaceProtocol(href: string, protocol: string)
{
	return href.replace(/^[^:]+:/, protocol)
}

/**
 * helper for avoid node.js can't update protocol for some url
 *
 * @see https://github.com/nodejs/node/issues/39732
 */
export function replaceURLProtocol<T extends URL>(url: URL, protocol: string)
{
	const old = url.protocol;
	if (old !== protocol)
	{
		url.protocol = protocol
		if (url.protocol === old)
		{
			url.href = replaceProtocol(url.href, protocol);
			notStrictEqual(url.protocol, old);
		}
	}

	return url;
}

export default replaceURLProtocol
