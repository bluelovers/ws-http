/**
 * Created by User on 2019/6/6.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import LazyURL from '../lib/index';
import SymbolInspect from 'symbol.inspect';
import urlParse from 'url-parse';

// @ts-ignore
describe(relative(__filename), () =>
{
	// @ts-ignore
	let currentTest: Mocha.Test;

	// @ts-ignore
	beforeEach(function ()
	{
		// @ts-ignore
		currentTest = this.currentTest;

		delete currentTest[SymbolLogOutput];

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	afterEach(function ()
	{
		let out = currentTest[SymbolLogOutput];
		let t = typeof out;

		if (t === 'string')
		{
			console.log(`----------`);
			console.dir(out);
			console.log(`----------`);
		}
		else if (t === 'function')
		{
			out(currentTest)
		}
		else if (out != null)
		{
			console.dir(out);
		}

	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		[
			[
				['zh-TW/scripts', 'zh-TW:8080'],
				`fake+http://zh-tw:8080/zh-TW/scripts`,
				`//zh-tw:8080/zh-TW/scripts`
			],
			[
				['zh-TW/scripts', 'zh-TW'],
				`fake+http://zh-tw/zh-TW/scripts`,
				`//zh-tw/zh-TW/scripts`,
			],
			[
				['zh-TW/scripts', 'http://zh-TW'],
				`http://zh-tw/zh-TW/scripts`,
				`http://zh-tw/zh-TW/scripts`,
			],
			[
				['zh-TW/scripts'],
				`fake+http://url-fake-hostname/zh-TW/scripts`,
				`/zh-TW/scripts`,
			],
			[
				['/api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5/'],
				'https://gitee.com/api/v5/repos/xxxx/xxxx/contents',
				'https://gitee.com/api/v5/repos/xxxx/xxxx/contents',
			],
			[
				['/api/v5/repos/xxxx/xxxx/contents', '/api/v5/'],
				'fake+http://url-fake-hostname/api/v5/repos/xxxx/xxxx/contents',
				'/api/v5/repos/xxxx/xxxx/contents',
			],
		].forEach(test =>
		{
			// @ts-ignore
			it(util.inspect(test[0]), function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				let actual = new LazyURL(...test[0] as [any, any]);
				let expected = test[1];

				currentTest[SymbolLogOutput] = [actual, actual.toString(), actual.toRealString()];

				expect(actual.toString()).to.be.deep.equal(expected);

				//expect(actual.toString()).to.be.deep.equal(actual[Symbol.for('nodejs.util.inspect.custom')]());

				if (test[2] != null)
				{
					expect(actual.toRealString()).to.be.deep.equal(test[2]);
				}

				let up = urlParse(actual.href);
				let up2 = urlParse(actual.toRealString());

				expect(up).to.be.deep.equal(urlParse(expected as string));

				//console.dir(up);
				//console.dir(up2);

				Object.keys(up)
					.forEach(name => {

						if (typeof actual[name] === 'string' && !['origin'].includes(name))
						{
							expect(actual[name], name).to.be.deep.equal(up[name]);
						}

				})
				;

				//console.dir(actual);
				//console.log(actual);
			});
		});
	});
});
