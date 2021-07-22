import getUnSafeAgent from '../index';
import fetch from 'cross-fetch';

describe(`describe`, () =>
{

	test(`ipfs.denarius.io`, () =>
	{

		expect(() => fetch('https://ipfs.denarius.io/ipfs/QmWGpaUBePXU3jyCXtY4hmtmawYSep8QnnBoziiqdzbGVH', {
			// @ts-ignore
			agent: getUnSafeAgent(),
		})).not.toThrowError();

	});

})
