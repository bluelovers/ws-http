/**
 * Created by user on 2020/6/16.
 */

import AbortController2 from 'abort-controller';
import Timeout = NodeJS.Timeout;

export { AbortController2 as AbortController }

export class AbortControllerTimer extends (AbortController2 as typeof AbortController)
{
	// @ts-ignore
	readonly signal: AbortSignal

	#timer?: Timeout | number

	constructor(public ms?: number)
	{
		super();
		this.reset()

		this.on('abort', (ev) =>
		{
			this.clear();
		}, {
			once: true,
		})
	}

	on<K extends keyof AbortSignalEventMap>(type: K,
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	)
	{
		this.signal.addEventListener(type, listener, options)
	}

	off<K extends keyof AbortSignalEventMap>(type: K,
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	)
	{
		this.signal.removeEventListener(type, listener, options)
	}

	get aborted(): boolean
	{
		return this.signal.aborted
	}

	get timer()
	{
		return this.#timer;
	}

	get timeout(): number
	{
		return this.ms
	}

	/**
	 * warning: reset the timer will not abort signal
	 *
	 * @internal
	 */
	reset()
	{
		this.clear();

		if (this.aborted)
		{
			throw new Error(`signal already aborted, can't be refresh`)
		}

		const ms = this.ms;

		this.ms |= 0;

		if (this.ms > 0)
		{
			this.#timer = setTimeout(() => this.abort(), this.ms)
		}
		else if (this.ms < 0)
		{
			try
			{
				super.abort();
			}
			catch (e)
			{
				console.trace(e)
			}

			throw new TypeError(`ms should be greater than or equal to 0, but got {${ms} => ${this.ms}}`)
		}

		return this.#timer
	}

	/**
	 * warning: clear the timer will not abort signal
	 *
	 * @internal
	 */
	clear()
	{
		if (typeof this.#timer !== 'undefined')
		{
			clearTimeout(this.#timer as any)
		}

		this.#timer = void 0
	}

	/**
	 * refresh the timer will throw error when signal is aborted
	 */
	refresh()
	{
		if (this.aborted)
		{
			throw new Error(`signal already aborted, can't be refresh`)
		}

		if (typeof this.#timer === 'number')
		{
			this.reset()
		}
		else if (typeof this.#timer !== 'undefined')
		{
			this.#timer = this.#timer.refresh()
		}

		return this.#timer
	}

	abort()
	{
		this.clear();
		super.abort();
	}

}

export default AbortControllerTimer
