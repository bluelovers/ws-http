import AbortControllerTimer from '../index';
import AbortController2 from 'abort-controller';

test(`base`, (done) =>
{
	expect.assertions(8);

	let start = Date.now();

	let timeout = 100;
	let actual = new AbortControllerTimer(timeout);

	actual.on('abort', () =>
	{
		let d = Date.now() - start;
		console.dir(d);

		expect(d).toBeGreaterThanOrEqual(100);
		expect(d).toBeLessThanOrEqual(110);
	})

	setTimeout(() =>
	{
		expect(actual.aborted).toBeFalsy();
		expect(actual.timer).toBeTruthy()
	}, 70);

	setTimeout(() => expect(actual.aborted).toBeTruthy(), 100);
	setTimeout(() => expect(actual.aborted).toBeTruthy(), 150);
	setTimeout(() =>
	{
		expect(actual.aborted).toBeTruthy();
		done();
	}, 200);

	expect(actual).toHaveProperty('timeout', timeout);

});

test(`refresh`, (done) =>
{
	expect.assertions(12);

	let start = Date.now();

	let timeout = 100;
	let actual = new AbortControllerTimer(timeout);

	actual.on('abort', () =>
	{
		let d = Date.now() - start;
		console.dir(d);

		expect(d).toBeGreaterThanOrEqual(170);
		expect(d).toBeLessThanOrEqual(180);
	})

	setTimeout(() =>
	{
		expect(Date.now() - start).toBeGreaterThanOrEqual(70);
		expect(actual.aborted).toBeFalsy();
		expect(actual.refresh()).toBeTruthy()
	}, 70);

	setTimeout(() =>
	{
		expect(Date.now() - start).toBeGreaterThanOrEqual(100);
		expect(actual.aborted).toBeFalsy()
	}, 100);
	setTimeout(() =>
	{
		expect(Date.now() - start).toBeGreaterThanOrEqual(150);
		expect(actual.aborted).toBeFalsy()
	}, 150);
	setTimeout(() =>
	{
		expect(Date.now() - start).toBeGreaterThanOrEqual(200);
		expect(actual.aborted).toBeTruthy();
		done();
	}, 200);

	expect(actual).toHaveProperty('timeout', timeout);

});

test(`throw`, () =>
{
	expect.assertions(1);
	expect(() => new AbortControllerTimer(-1)).toThrowError(TypeError)
})

test(`not throw when 0`, () =>
{
	expect.assertions(3);

	expect(() =>
	{
		let actual = new AbortControllerTimer(0)

		expect(actual.aborted).toBeFalsy();
		expect(actual.timer).toBeUndefined();

		actual.abort();
	}).not.toThrow()
})

test(`throw when try refresh after aborted`, (done) =>
{
	expect.assertions(5);

	let actual = new AbortControllerTimer(100)

	expect(actual.aborted).toBeFalsy();
	expect(actual.timer).toBeTruthy();

	AbortController2.prototype.abort.call(actual);

	expect(actual.aborted).toBeTruthy();
	expect(actual.timer).toBeUndefined();

	expect(() => actual.refresh()).toThrowError()

	actual.abort();
	done();
})

test(`throw when try reset after aborted`, (done) =>
{
	expect.assertions(5);

	let actual = new AbortControllerTimer(100)

	expect(actual.aborted).toBeFalsy();
	expect(actual.timer).toBeTruthy();

	AbortController2.prototype.abort.call(actual);

	expect(actual.aborted).toBeTruthy();
	expect(actual.timer).toBeUndefined();

	expect(() => actual.reset()).toThrowError()

	actual.abort();
	done();
})
