//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import {
	entriesToJSON,
	jsonToSearchParams,
	removeSquareBracketsFromJSON,
	searchParamsStringToJSON,
	searchParamsToJSON,
} from '../src/index';

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

	test(`squareBrackets`, () => {
		let input = { foo: ["first_value", "second_value"] } as const;

		let actual = searchParamsToJSON(jsonToSearchParams(input));
		let actual2 = searchParamsToJSON(jsonToSearchParams(input, {
			squareBracketsArrayKey: true,
		}));

		expect(actual).toStrictEqual(input);
		expect(actual).not.toStrictEqual(actual2);

		expect(actual2).toMatchSnapshot();

		let json2 = removeSquareBracketsFromJSON(actual2);

		expect(json2).toStrictEqual(actual);
		expect(jsonToSearchParams(actual2).toString()).toMatchSnapshot();

		expect(searchParamsStringToJSON(jsonToSearchParams(actual2).toString())).toStrictEqual(actual2);
		expect(searchParamsStringToJSON(jsonToSearchParams(actual2).toString().replace(/%5B%5D/g, '[]'))).toStrictEqual(actual2);

	})

})
