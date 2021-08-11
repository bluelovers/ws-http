import { basename, extname } from 'path';
import replaceURLProtocol, { replaceProtocol } from '../index';

describe('node.js#39732', () =>
{

	test(`git+https:`, () =>
	{
		let u = new URL( 'git+https://url-fake-hostname/zh-TW/scripts')
		let expected = 'https:';
		replaceURLProtocol(u, expected);
		expect(u).toHaveProperty('protocol', expected);
	});

	test(`fake:`, () =>
	{
		let u = new URL( 'fake://url-fake-hostname/zh-TW/scripts')
		let expected = 'https:';
		replaceURLProtocol(u, expected);
		expect(u).toHaveProperty('protocol', expected);
	});

	test(`fake+http:`, () =>
	{
		let u = new URL( 'fake+http://url-fake-hostname/zh-TW/scripts')
		let expected = 'https:';
		replaceURLProtocol(u, expected);
		expect(u).toHaveProperty('protocol', expected);
	});

})
