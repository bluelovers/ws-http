import { basename, extname } from 'path';
import { resultToURL } from '../src/index';

describe(basename(__filename, extname(__filename)), () =>
{

	test(`fromCache`, () =>
	{

		let actual = resultToURL({
			config: {
				"url": "https://www.novelstar.com.tw/books/",
				"method": "get",
				"headers": {
					"Accept": "application/json, text/plain, */*",
					"Referer": "https://www.novelstar.com.tw/",
				},
				"params": {
					"p": 1,
				},
				"transformRequest": [
					null,
				],
				"transformResponse": [
					null,
				],
				"timeout": 0,
				"withCredentials": true,
				"responseType": "arraybuffer",
				"xsrfCookieName": "XSRF-TOKEN",
				"xsrfHeaderName": "X-XSRF-TOKEN",
				"maxContentLength": -1,
				"maxBodyLength": -1,
				"cache": {
					"maxAge": 21600000,
				},
				"raxConfig": {
					"retry": 1,
					"retryDelay": 1000,
				},
				"maxRedirects": 0,
				"baseURL": "https://www.novelstar.com.tw/",
			},
			request: {
				"fromCache": true,
			},
		});
		let expected = 'https://www.novelstar.com.tw/books/?p=1';

		expect(actual).toHaveProperty('href', expected);
		expect(actual).toMatchSnapshot();

	});

})
