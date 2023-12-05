//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import LazyURL from '../src/index';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	test('returns true when given matching URL', () =>
	{
		const a = new LazyURL('https://jestjs.io/');
		const b = new LazyURL('https://jestjs.io/');
		expect(a).toEqual(b);
	});

	test('returns false when given non-matching URL', () =>
	{
		const a = new LazyURL('https://jestjs.io/docs/getting-started');
		const b = new LazyURL('https://jestjs.io/docs/getting-started#using-babel');
		expect(a.toObject()).not.toEqual(b.toObject());
	});

})
