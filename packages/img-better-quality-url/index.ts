import LazyURL, { IURLLike } from 'lazy-url';
import { parseDomain, ParseResultType, ParseResultListed } from "parse-domain";
import { parse as parse_mitemin } from 'mitemin';

export function betterQualityURL(input: IURLLike | [IURLLike, IURLLike?], base?: IURLLike)
{
	let url = new LazyURL(input, base);
	let pd = parseDomain(url.hostname);

	let changed = false;
	let pathname = url.pathname;
	let not_suppertd = false;

	switch ((pd as ParseResultListed)?.domain ?? url.hostname)
	{
		case 'novelstar':
			pathname = pathname.replace('/cutw_300h_450/', '/cutw_460h_690/');
			break;
		case 'masiro':
			if (url.searchParams.has('quality'))
			{
				url.searchParams.delete('quality')
				changed = true;
			}
			break;
		case 'mitemin':

			let actual = parse_mitemin(url);

			if (actual.fullsize !== actual.url)
			{
				url = new LazyURL(actual.fullsize);
				changed = true;
			}

			break;
		default:
			not_suppertd = true;
			break;
	}

	if (changed === false && pathname !== url.pathname)
	{
		url.pathname = pathname;
		changed = true;
	}

	return {
		changed,
		not_suppertd,
		url,
		pd,
	}
}

export default betterQualityURL
