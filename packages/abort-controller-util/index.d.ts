declare const SymbolAbortController: unique symbol;
export type IAbortSignalWithController<Signal, Controller = AbortController> = Signal & {
    readonly [SymbolAbortController]: Controller;
};
/**
 * @deprecated
 */
export interface IEventAbort extends Omit<Event, 'type'> {
    type: 'abort';
}
export declare function _getControllerFromSignal<T extends AbortController>(signal: AbortSignal | IAbortSignalWithController<AbortSignal, T>): any;
export declare function _setControllerFromSignal<T extends AbortController>(signal: AbortSignal, controller: T): asserts signal is IAbortSignalWithController<AbortSignal, T>;
export declare function linkAbortSignalWithController<T extends AbortController>(signal: AbortSignal, controller: T, ignoreExists?: boolean): asserts signal is IAbortSignalWithController<AbortSignal, T>;
/**
 * @deprecated
 */
export declare function _addEventListener(target: AbortController | AbortSignal, fn: (...argv: any) => any): void;
/**
 * when parent aborted, child will abort too
 * @deprecated
 */
export declare function linkAbortChildWithParent(child: AbortController | AbortSignal, parent: AbortController | AbortSignal): () => void;
/**
 * @deprecated
 */
export declare function unlinkAbortChildWithParent(parent: AbortController | AbortSignal, fn: (...argv: any) => any): void;
export default linkAbortSignalWithController;
