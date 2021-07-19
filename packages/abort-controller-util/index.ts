const SymbolAbortController = Symbol.for('controller');

export type IAbortSignalWithController<Signal, Controller = AbortController> = Signal & {
	readonly [SymbolAbortController]: Controller
}

export interface IEventAbort extends Omit<Event, 'type'>
{
	type: 'abort',
}

export function _getControllerFromSignal<T extends AbortController>(signal: AbortSignal | IAbortSignalWithController<AbortSignal, T>)
{
	return signal[SymbolAbortController]
}

export function _setControllerFromSignal<T extends AbortController>(signal: AbortSignal, controller: T): asserts signal is IAbortSignalWithController<AbortSignal, T>
{
	// @ts-ignore
	signal[SymbolAbortController] = controller;
}

export function linkAbortSignalWithController<T extends AbortController>(signal: AbortSignal, controller: T, ignoreExists?: boolean): asserts signal is IAbortSignalWithController<AbortSignal, T>
{
	if (!ignoreExists && _getControllerFromSignal(signal))
	{
		throw new TypeError(`Target signal already has exists controller`)
	}

	if (!controller)
	{
		throw new TypeError(`Invalid controller`)
	}

	_setControllerFromSignal(signal, controller)
}

export function _addEventListener(target: AbortController | AbortSignal, fn: (...argv: any) => any)
{
	if (typeof _getControllerFromSignal(target as AbortSignal)?.addEventListener !== 'undefined')
	{
		_getControllerFromSignal(target as AbortSignal).addEventListener('abort', fn)
	}
	else if (typeof (target as AbortSignal).addEventListener !== 'undefined')
	{
		(target as AbortSignal).addEventListener('abort', fn)
	}
	else
	{
		(target as AbortController).signal.addEventListener('abort', fn);
	}
}

/**
 * when parent aborted, child will abort too
 */
export function linkAbortChildWithParent(child: AbortController | AbortSignal, parent: AbortController | AbortSignal)
{
	if (typeof (_getControllerFromSignal(child as any as AbortSignal) ?? child).abort !== 'function')
	{
		throw new TypeError(`Target parent can't emit abort`)
	}

	const fn = (): void => ((_getControllerFromSignal(child as AbortSignal) ?? (child as AbortController)).abort());

	_addEventListener(child, () => unlinkAbortChildWithParent(parent, fn));
	_addEventListener(parent, fn);

	return fn
}

export function unlinkAbortChildWithParent(parent: AbortController | AbortSignal, fn: (...argv: any) => any)
{
	_getControllerFromSignal(parent as AbortSignal)?.removeEventListener('abort', fn);
	(parent as AbortSignal).removeEventListener?.('abort', fn);
	(parent as AbortController).signal?.removeEventListener('abort', fn);
}

export default linkAbortSignalWithController
