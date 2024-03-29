/**
 * Created by user on 2020/6/16.
 */

import Timeout = NodeJS.Timeout;
import AbortController from './lib/abort-controller';
import {
	_getControllerFromSignal,
	_setControllerFromSignal,
	IAbortSignalWithController,
	linkAbortSignalWithController,
} from 'abort-controller-util/index';

export { AbortController }

const SymbolChildren = Symbol.for('AbortControllerTimer#children');
const SymbolParents = Symbol.for('AbortControllerTimer#parents');
const SymbolAbortController = Symbol.for('controller');

export { SymbolChildren, SymbolParents, SymbolAbortController }

export type ISetAllowedValue<Timer extends number | Timeout = number | Timeout> = AbortSignal | AbortControllerTimer<Timer> | AbortController;

export class AbortControllerTimer<Timer extends number | Timeout = number | Timeout> extends AbortController
{
	override readonly signal: IAbortSignalWithController<AbortSignal, AbortControllerTimer<Timer>>

	#timer?: Timer
	#ms: number

	[SymbolChildren]: Set<ISetAllowedValue>;
	[SymbolParents]: Set<ISetAllowedValue>;

	readonly [SymbolAbortController]: AbortControllerTimer<Timer>;

	constructor(ms?: number)
	{
		super();

		this._init(ms)
	}

	protected _init(ms: number)
	{
		// @ts-ignore
		this[SymbolAbortController] = this;

		this.#ms = ms;
		this.reset()

		_setControllerFromSignal(this.signal, this);

		this.on('abort', (ev) =>
		{
			this.clear();
			this._removeMeFromParents();

			this.abortChildrenAll();

		}, {
			once: true,
		})
	}

	protected _addChildren<C extends ISetAllowedValue>(child: C)
	{
		if (!(child as AbortControllerTimer).aborted)
		{
			child[SymbolParents] ??= new Set();
			child[SymbolParents].add(this);

			this[SymbolChildren] ??= new Set();
			this[SymbolChildren].add(child);
		}

		return child
	}

	protected _removeChildren(child: ISetAllowedValue)
	{
		child?.[SymbolParents]?.delete(this);
		this?.[SymbolChildren]?.delete(child);
	}

	abortChildrenAll()
	{
		return this[SymbolChildren]?.forEach(c => {
			(_getControllerFromSignal(c as any) ?? c)?.abort?.();
			this._removeChildren(c);
		});
	}

	protected _removeMeFromParents()
	{
		return this[SymbolParents]?.forEach(p => this._removeChildren.call(p, this))
	}

	attachToParent(parent: ISetAllowedValue)
	{
		let p: AbortControllerTimer = (_getControllerFromSignal<AbortControllerTimer>(parent as any) ?? parent) as any
		this._addChildren.call(p, this);

		return this;
	}

	child(ms?: number)
	{
		return this._addChildren(new AbortControllerTimer<Timer>(ms))
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

		this.reset();
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
			this.#timer = setTimeout(() => this.abort(), this.#ms) as Timer
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
			this.#timer = this.#timer.refresh() as Timer
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