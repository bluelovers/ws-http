import LazyURL from '../lib/index';

describe(`describe`, () =>
{

	test(`reset port`, () =>
	{
		let actual = new LazyURL('https://gitee.com:3000/api/v5/');

		expect(actual.port).toStrictEqual('3000');

		actual.port = 456;

		actual.port = null as null;

		expect(actual.port).toStrictEqual('');

		actual.port = 456;

		actual.port = void 0;

		expect(actual.port).toStrictEqual('');

		actual.port = 456;

		actual.port = '';

		expect(actual.port).toStrictEqual('');
	})

	test(`port:0`, () =>
	{
		let actual = new LazyURL('https://gitee.com:0/api/v5/');

		expect(actual.port).toStrictEqual('0');

		actual.port = '';

		expect(actual.port).toStrictEqual('');

		actual.port = 456;

		actual.port = 0;

		expect(actual.port).toStrictEqual('0');

		actual.port = 456;

		actual.port = '0';

		expect(actual.port).toStrictEqual('0');
	})

	test(`port:number`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		expect(actual.port).toStrictEqual('');
		//expect(actual).toMatchSnapshot();

		actual.port = '123';

		expect(actual.port).toStrictEqual('123');

		actual.port = 456;

		expect(actual.port).toStrictEqual('456');
	});

})
