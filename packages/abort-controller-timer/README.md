# README.md

    An AbortController that aborts after a specified timeout

## install

```bash
yarn add abort-controller-timer abort-controller
yarn-tool add abort-controller-timer abort-controller
yt add abort-controller-timer abort-controller
```

```typescript
import AbortControllerTimer from 'abort-controller-timer';

test(`base`, (done) =>
{
	expect.assertions(8);

	let start = Date.now();

	let timeout = 100;
	let actual = new AbortControllerTimer(timeout);

	actual.on('abort', () => {
		let d = Date.now() - start;
		console.dir(d);

		expect(d).toBeGreaterThanOrEqual(100);
		expect(d).toBeLessThanOrEqual(110);
	})

	setTimeout(() => {
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

	expect(actual).toHaveProperty('ms', timeout);

});

test(`refresh`, (done) =>
{
	expect.assertions(12);

	let start = Date.now();

	let timeout = 100;
	let actual = new AbortControllerTimer(timeout);

	actual.on('abort', () => {
		let d = Date.now() - start;
		console.dir(d);

		expect(d).toBeGreaterThanOrEqual(170);
		expect(d).toBeLessThanOrEqual(180);
	})

	setTimeout(() => {
		expect(Date.now() - start).toBeGreaterThanOrEqual(70);
		expect(actual.aborted).toBeFalsy();
		expect(actual.refresh()).toBeTruthy()
	}, 70);

	setTimeout(() => {
		expect(Date.now() - start).toBeGreaterThanOrEqual(100);
		expect(actual.aborted).toBeFalsy()
	}, 100);
	setTimeout(() => {
		expect(Date.now() - start).toBeGreaterThanOrEqual(150);
		expect(actual.aborted).toBeFalsy()
	}, 150);
	setTimeout(() =>
	{
		expect(Date.now() - start).toBeGreaterThanOrEqual(200);
		expect(actual.aborted).toBeTruthy();
		done();
	}, 200);

	expect(actual).toHaveProperty('ms', timeout);

});
```
