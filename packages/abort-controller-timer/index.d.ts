/**
 * Created by user on 2020/6/16.
 */
/// <reference types="node" />
import Timeout = NodeJS.Timeout;
import AbortController from './lib/abort-controller';
import { IAbortSignalWithController } from 'abort-controller-util/index';
export { AbortController };
declare const SymbolChildren: unique symbol;
declare const SymbolParents: unique symbol;
declare const SymbolAbortController: unique symbol;
declare type ISetAllowedValue = AbortSignal | AbortControllerTimer | AbortController;
export declare class AbortControllerTimer extends AbortController {
    #private;
    readonly signal: IAbortSignalWithController<AbortSignal, AbortControllerTimer>;
    [SymbolChildren]: Set<ISetAllowedValue>;
    [SymbolParents]: Set<ISetAllowedValue>;
    readonly [SymbolAbortController]: AbortControllerTimer;
    constructor(ms?: number);
    protected _init(ms: number): void;
    protected _addChildren(child: ISetAllowedValue): ISetAllowedValue;
    protected _removeChildren(child: ISetAllowedValue): void;
    abortChildrenAll(): void;
    protected _removeMeFromParents(): void;
    attachToParent(parent: ISetAllowedValue): this;
    child(ms?: number): ISetAllowedValue;
    addEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    on<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    off<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    get onabort(): ((this: AbortSignal, ev: Event) => any) | null;
    set onabort(value: ((this: AbortSignal, ev: Event) => any) | null);
    get aborted(): boolean;
    get timer(): number | Timeout;
    get timeout(): number;
    set timeout(ms: number);
    /**
     * warning: reset the timer will not abort signal
     *
     * @internal
     */
    reset(): number | Timeout;
    /**
     * warning: clear the timer will not abort signal
     *
     * @internal
     */
    clear(): void;
    /**
     * refresh the timer will throw error when signal is aborted
     */
    refresh(): number | Timeout;
    abort(): void;
}
export default AbortControllerTimer;
