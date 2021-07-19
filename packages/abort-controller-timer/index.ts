/**
 * Created by user on 2020/6/16.
 */

import Timeout = NodeJS.Timeout;
import AbortController from './lib/abort-controller';
import {
	IAbortSignalWithController,
	linkAbortChildWithParent,
	linkAbortSignalWithController,
} from 'abort-controller-util/index';

export { AbortController }

export class AbortControllerTimer extends AbortController
{
	override readonly signal: IAbortSignalWithController<AbortSignal, AbortControllerTimer>

	#timer?: Timeout | number
	#ms: number

	constructor(ms?: number)
	{
		super();
		this.#ms = ms;
		this.reset()

		linkAbortSignalWithController(this.signal, this);

		this.on('abort', (ev) =>
		{
			this.clear();
		}, {
			once: true,
		})
	}

	child(ms?: number)
	{
		const child = new AbortControllerTimer(ms);

		linkAbortChildWithParent(child, this);

		return child
	}

	addEventListener<K extends keyof AbortSignalEventMap>(type: K,
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	)
	{
		this.signal.addEventListener(type, listener, options)
	}

	removeEventListener<K extends keyof AbortSignalEventMap>(type: K,
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	)
	{
		this.signal.removeEventListener(type, listener, options)
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
		options?: boolean | EventListenerOptions,
	)
	{
		this.signal.removeEventListener(type, listener, options)
	}

	get onabort()
	{
		return this.signal.onabort
	}

	set onabort(value: ((this: AbortSignal, ev: Event) => any) | null)
	{
		this.signal.onabort = value
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
		if (this.#ms > 0)
		{
			return this.#ms
		}
	}

	set timeout(ms: number)
	{
		ms |= 0;

		if (ms <= 0)
		{
			this.abort();
			throw new TypeError(`ms should be greater than 0, but got {${ms}}`)
		}

		this.#ms = ms;
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

		const ms = this.#ms;

		this.#ms |= 0;

		if (this.#ms > 0)
		{
			this.#timer = setTimeout(() => this.abort(), this.#ms)
		}
		else if (this.#ms < 0)
		{
			try
			{
				super.abort();
			}
			catch (e)
			{
				console.trace(e)
			}

			throw new TypeError(`ms should be greater than or equal to 0, but got {${ms} => ${this.#ms}}`)
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

	override abort()
	{
		this.clear();
		super.abort();
	}

}

export default AbortControllerTimer
