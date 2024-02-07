//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { entriesToJSON, jsonToSearchParams, searchParamsToJSON } from '../src/index';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	test.each([
		{ foo: ["first_value", "second_value"] },
		{
			foo: ['a', 'b', 'c'],
			bar: 'xyz'
		},
	] as const)('%j', (input) =>
	{
		//let input = { foo: ["first_value", "second_value"] } as const;

		let actual = jsonToSearchParams(input);

		let json = searchParamsToJSON(actual);

		expect(json).toStrictEqual(input)
		expect(entriesToJSON(actual.entries())).toStrictEqual(input)
		expect(entriesToJSON([...actual.entries()])).toStrictEqual(input)

		expect([...actual.entries()]).toMatchSnapshot();
		expect(actual.toString()).toMatchSnapshot();
		expect(json).toMatchSnapshot();

	});

})
