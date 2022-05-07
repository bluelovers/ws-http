import LazyURL, { ENUM_FAKE } from '../src/index';

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

	test(`baseURL`, () =>
	{
		let actual = new LazyURL('api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5');
		let actual2 = new LazyURL('/api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5');
		let actual3 = new LazyURL('api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5/');

		expect(actual).toMatchSnapshot();
		expect(actual2).toMatchSnapshot();
		expect(actual3).toMatchSnapshot();

		expect(actual.pathname).not.toStrictEqual(actual2.pathname);
		expect(actual.pathname).not.toStrictEqual(actual3.pathname);
		expect(actual2.pathname).not.toStrictEqual(actual3.pathname);
	});

})

describe(`hostname`, () =>
{
	test(`fake`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		expect(actual.fakeExists()).toBeTruthy();

		expect(actual.fakeEntries()).toContainEqual(["hostname", ENUM_FAKE.hostname]);

		actual.hostname = 'developer.mozilla.org';

		expect(actual).toHaveProperty('hostname', 'developer.mozilla.org');

		expect(actual.fakeKeys()).toContainEqual('protocol');
		expect(actual.fakeKeys()).not.toContainEqual('hostname');

		expect(actual.toString()).toContain('developer.mozilla.org');
	});
})

describe(`protocol`, () =>
{
	test(`fake`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		expect(actual.fakeExists()).toBeTruthy();

		expect(actual.fakeEntries()).toContainEqual(["protocol", ENUM_FAKE.protocol]);

		actual.protocol = 'http:';

		expect(actual).toHaveProperty('protocol', 'http:');

		expect(actual.fakeKeys()).not.toContainEqual('protocol');
		expect(actual.fakeKeys()).toContainEqual('hostname');

		expect(actual.toString()).not.toContain(ENUM_FAKE.protocol);
	});
})

describe(`origin`, () =>
{
	test(`fake`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		expect(actual.fakeExists()).toBeTruthy();

		expect(actual.fakeEntries()).toContainEqual(["protocol", ENUM_FAKE.protocol]);

		expect(actual).not.toHaveProperty('origin', 'null');
		expect(actual).toHaveProperty('origin', `${ENUM_FAKE.protocol}//${ENUM_FAKE.hostname}`);

		actual.protocol = 'http:';

		expect(actual).toHaveProperty('origin', `http://${ENUM_FAKE.hostname}`);
		expect(actual).toHaveProperty('origin', new URL(actual.toString()).origin);

		actual.hostname = 'developer.mozilla.org';

		expect(actual).toHaveProperty('origin', `http://developer.mozilla.org`);
		expect(actual).toHaveProperty('origin', new URL(actual.toString()).origin);

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

describe(`auth`, () =>
{
	const username = 'username';
	const password = 'password';

	test(`${username}:${password}`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		actual.auth = `${username}:${password}`;

		expect(actual).toMatchSnapshot();
		expect(actual).toHaveProperty('username', username);
		expect(actual).toHaveProperty('password', password);
		expect(actual).toHaveProperty('auth', `${username}:${password}`);

		expect(actual.toObject()).toMatchSnapshot();
		expect(actual.toString()).toMatchSnapshot();
		expect(() => actual.toRealString()).toThrowErrorMatchingSnapshot();
		expect(actual.toRealString({
			ignoreInvalid: true,
		})).toMatchSnapshot();

	});

	test(`${username}:`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		actual.auth = `${username}:`;

		expect(actual).toMatchSnapshot();
		expect(actual).toHaveProperty('username', username);
		expect(actual).toHaveProperty('password', '');
		expect(actual).toHaveProperty('auth', `${username}:`);

		expect(actual.toObject()).toMatchSnapshot();
		expect(actual.toString()).toMatchSnapshot();
		expect(() => actual.toRealString()).toThrowErrorMatchingSnapshot();
		expect(actual.toRealString({
			ignoreInvalid: true,
		})).toMatchSnapshot();

	});

	test(`void`, () =>
	{
		let actual = new LazyURL('zh-TW/scripts');

		actual.auth = void 0;

		expect(actual).toMatchSnapshot();
		expect(actual).toHaveProperty('username', '');
		expect(actual).toHaveProperty('password', '');
		expect(actual).toHaveProperty('auth', '');

		expect(actual.toObject()).toMatchSnapshot();
		expect(actual.toString()).toMatchSnapshot();
		expect(actual.toRealString()).toMatchSnapshot();
		expect(actual.toRealString({
			ignoreInvalid: true,
		})).toMatchSnapshot();

	});

});

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
