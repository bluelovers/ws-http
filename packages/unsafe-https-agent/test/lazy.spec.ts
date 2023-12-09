import getUnSafeAgent from '../index';
import fetch from 'cross-fetch';

describe(`describe`, () =>
{

	test.skip(`ipfs.denarius.io`, () =>
	{

		expect(fetch('https://ipfs.denarius.io/ipfs/QmWGpaUBePXU3jyCXtY4hmtmawYSep8QnnBoziiqdzbGVH', {
			// @ts-ignore
			agent: getUnSafeAgent(),
		})).resolves.not.toThrow();

	});

})
