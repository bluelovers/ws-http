import LazyURL from '../lib/index';

describe(`lazy`, () =>
{

	test(`lazy`, () =>
	{
		let actual = new LazyURL('docs/Web/JavaScript/Reference/Global_Objects/parseInt?file=333#7777?file=222', 'https://user:pass@developer.mozilla.org:999/zh-TW/');

		let u = new LazyURL(['docs/Web/JavaScript/Reference/Global_Objects/parseInt?file=333#7777?file=222', 'https://user:pass@developer.mozilla.org:999/zh-TW/']);

		expect(actual).toStrictEqual(u);

		expect(actual).toMatchSnapshot();
		expect(actual.toObject()).toMatchSnapshot();
		expect(actual.toString()).toMatchSnapshot();
		expect(actual.toRealString()).toMatchSnapshot();

		expect(actual.scheme).toStrictEqual(actual.protocol);
		expect(actual.scheme).toStrictEqual("https:");

		expect(actual.fragment).toStrictEqual(actual.hash);
		expect(actual.fragment).toStrictEqual('#7777?file=222');

		expect(actual.query).toStrictEqual(actual.search);
		expect(actual.query).toStrictEqual("?file=333");

		expect(actual.pathname).toStrictEqual("/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/parseInt");

		expect(actual.port).toStrictEqual("999");

		expect(actual.origin).toStrictEqual("https://developer.mozilla.org:999");

		expect(actual.host).toStrictEqual("developer.mozilla.org:999");
		expect(actual.hostname).toStrictEqual("developer.mozilla.org");

	});

	test(`blob:`, () =>
	{
		let actual = new LazyURL('blob:https://user:pass@developer.mozilla.org:999/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/parseInt?file=333#7777?file=222');

		expect(actual.origin).toStrictEqual("https://developer.mozilla.org:999");

		expect(actual.scheme).toStrictEqual("blob:");

		expect(actual).toMatchSnapshot();
		expect(actual.toObject()).toMatchSnapshot();
		expect(actual.toString()).toMatchSnapshot();
		expect(actual.toRealString()).toMatchSnapshot();
	})

	test(`check`, () =>
	{
		let href = 'blob:https://user:pass@developer.mozilla.org:999/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/parseInt?file=333#7777?file=222';

		let u = new LazyURL(href);
		let actual = new LazyURL(u);

		expect(actual).toStrictEqual(u);
		expect(new LazyURL(new URL(href))).toStrictEqual(u);
		expect(new LazyURL({ href })).toStrictEqual(u);
		expect(new LazyURL({ href }, '')).toStrictEqual(u);
		expect(new LazyURL('', { href: actual.pathname }).toString()).toStrictEqual(actual.pathname);

		expect(() => new LazyURL(null)).toThrowErrorMatchingSnapshot();
		expect(() => new LazyURL(1 as any)).toThrowErrorMatchingSnapshot();
		expect(() => new LazyURL('')).toThrowErrorMatchingSnapshot();
		expect(() => new LazyURL(void 0)).toThrowErrorMatchingSnapshot();
		expect(() => new LazyURL(void 0, href)).toThrowErrorMatchingSnapshot();
		expect(() => new LazyURL(null, href)).toThrowErrorMatchingSnapshot();
	})

})

describe(`hostname`, () =>
{
	test(`fake`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		expect(actual.fakeExists()).toBeTruthy();

		expect(actual.fakeEntries()).toContainEqual(["hostname", "url-fake-hostname"]);

		actual.hostname = 'developer.mozilla.org';

		expect(actual.fakeEntries()).not.toContainEqual('hostname');

		expect(actual.toString()).toContain('developer.mozilla.org');
	});
})

describe(`port`, () =>
{

	test(`reset`, () =>
	{
		let actual = new LazyURL('https://gitee.com:3000/api/v5/');

		_checkPort(actual, '3000');

		_checkPortSet(actual, 456);

		_checkPortSet(actual, null, '');

		_checkPortSet(actual, 456);

		_checkPortSet(actual, void 0, '');

		_checkPortSet(actual, 456);

		_checkPortSet(actual, '');
	})

	test(`zero`, () =>
	{
		let actual = new LazyURL('https://gitee.com:0/api/v5/');

		_checkPort(actual, '0');

		_checkPortSet(actual, 456);
		_checkPortSet(actual, 0);

		_checkPortSet(actual, 456);
		_checkPortSet(actual, '0');
	})

	test(`number`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		_checkPort(actual, '');

		_checkPortSet(actual, '123');
		_checkPortSet(actual, 456);
	});

	test(`invalid`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		expect(() => actual.port = -1).toThrowErrorMatchingSnapshot()
		expect(() => actual.port = '-1').toThrowErrorMatchingSnapshot()
		expect(() => actual.port = Number.NaN).toThrowErrorMatchingSnapshot()
		expect(() => actual.port = Number.MAX_SAFE_INTEGER).toThrowErrorMatchingSnapshot()
		expect(() => actual.port = Infinity).toThrowErrorMatchingSnapshot()
		expect(() => actual.port = -Infinity).toThrowErrorMatchingSnapshot()
		expect(() => actual.port = ' 0xF').toThrowErrorMatchingSnapshot()
		expect(() => actual.port = ' 0123').toThrowErrorMatchingSnapshot()

	});

})

function _checkPort(actual: LazyURL, port: string)
{
	expect(actual.port).toStrictEqual(port);
	expect(actual.toString()).toContain(`:${port}/`);
}

function _checkPortSet(actual: LazyURL, port: string | number, expected?: string)
{
	actual.port = port;
	_checkPort(actual, (expected ?? port).toString())
}
