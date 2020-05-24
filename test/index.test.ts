/**
 * Created by User on 2019/6/6.
 */

import LazyURL from '../lib/index';
// @ts-ignore
import SymbolInspect from 'symbol.inspect';
// @ts-ignore
import urlParse from 'url-parse';
import { inspect } from 'util';

describe(`suite`, () =>
{
	[
		[
			['zh-TW/scripts', 'zh-TW:8080'],
			`fake+http://zh-tw:8080/zh-TW/scripts`,
			`//zh-tw:8080/zh-TW/scripts`,
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
		it(inspect(test[0]), () =>
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			// @ts-ignore
			let actual = new LazyURL(...test[0] as [any, any]);
			let expected = test[1];

			expect(actual.toString()).toEqual(expected);

			//expect(actual.toString()).to.be.deep.equal(actual[Symbol.for('nodejs.util.inspect.custom')]());

			if (test[2] != null)
			{
				expect(actual.toRealString()).toEqual(test[2]);
			}

			expect(actual).toMatchSnapshot();

			let up = urlParse(actual.href);
			let up2 = urlParse(actual.toRealString());

			expect(up).toEqual(urlParse(expected as string));

			expect(up).toMatchSnapshot();
			expect(up2).toMatchSnapshot();

			//console.dir(up);
			//console.dir(up2);

			Object.keys(up)
				.forEach(name =>
				{

					if (typeof actual[name] === 'string' && !['origin'].includes(name))
					{
						// name
						expect(actual[name]).toEqual(up[name]);

						expect(actual[name]).toMatchSnapshot();
					}

				})
			;

			//console.dir(actual);
			//console.log(actual);
		});

	});

});
