import { basename, extname } from 'path';
import Axios from 'axios';
import { resultToURL } from '../src/index';

describe('axios', () =>
{
	const axios = Axios;

	test(`error:timeout`, async () =>
	{
		let actual = await axios.get('user?ID=12345', {
			baseURL: 'https://user@mozilla.org:8989/tw/',
			timeout: 10,
		}).catch(error => resultToURL(error));
		let expected = 'https://user@mozilla.org:8989/tw/user?ID=12345';

		expect(actual).toHaveProperty('href', expected);
		expect(actual).toMatchSnapshot();

	});

	test(`error2:timeout`, async () =>
	{
		let actual = await axios.get('/tw/user?ID=12345', {
			timeout: 10,
		}).catch(error => resultToURL(error));
		let expected = 'http://localhost/tw/user?ID=12345';

		expect(actual).toHaveProperty('href', expected);
		expect(actual).toMatchSnapshot();

	});

	test(`error3:timeout`, async () =>
	{
		let actual = await axios.get('user?ID=12345', {
			baseURL: 'https://mozilla.org:443/tw/',
			timeout: 10,
		})
			.catch(error => resultToURL(error));
		let expected = 'https://mozilla.org/tw/user?ID=12345';

		expect(actual).toHaveProperty('href', expected);
		expect(actual).toMatchSnapshot();

	});

	test(`ok`, async () =>
	{
		let actual = await axios.get('en-US/docs/Web/API/URL/origin', {
				baseURL: 'https://developer.mozilla.org/',
			})
			.then(res => resultToURL(res));
		let expected = 'https://developer.mozilla.org/en-US/docs/Web/API/URL/origin';

		expect(actual).toHaveProperty('href', expected);
		expect(actual).toMatchSnapshot();

	});

})
