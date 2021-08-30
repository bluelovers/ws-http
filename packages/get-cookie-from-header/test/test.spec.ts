import { basename, extname } from 'path';
import getCookieFromHeader from '../index';

const headerRecord = {
	connection: 'close',
	'cache-control': 'private',
	'content-type': 'text/html; charset=utf-8',
	'last-modified': 'Fri, 09 Apr 2021 12:48:19 GMT',
	'strict-transport-security': 'max-age=15552000',
	'x-frame-options': 'SAMEORIGIN',
	'x-request-guid': 'e2486fc1-9087-40f7-b72e-27f3c62a24e7',
	'feature-policy': "microphone 'none'; speaker 'none'",
	'content-security-policy': "upgrade-insecure-requests; frame-ancestors 'self' https://stackexchange.com",
	'accept-ranges': 'bytes',
	date: 'Mon, 30 Aug 2021 12:05:30 GMT',
	via: '1.1 varnish',
	'x-served-by': 'cache-hkg17928-HKG',
	'x-cache': 'MISS',
	'x-cache-hits': '0',
	'x-timer': 'S1630325131.768775,VS0,VE230',
	vary: 'Fastly-SSL',
	'x-dns-prefetch-control': 'off',
	'set-cookie': [
		'prov=054870e7-81da-3797-f52f-6177b3a718c5; domain=.stackoverflow.com; expires=Fri, 01-Jan-2055 00:00:00 GMT; path=/; HttpOnly',
	],
	'transfer-encoding': 'chunked',
}

const headerMap: Headers = new Map(Object.entries(headerRecord)) as any

test(`headerRecord`, () =>
{
	const actual = getCookieFromHeader(headerRecord);

	expect(actual).toBeInstanceOf(Array);
	expect(actual).toMatchSnapshot();

});

test(`headerMap`, () =>
{
	const actual = getCookieFromHeader(headerMap);

	expect(actual).toBeInstanceOf(Array);
	expect(actual).toMatchSnapshot();

});
