/**
 * Created by user on 2020/6/16.
 */
/// <reference types="node" />
import AbortController2 from 'abort-controller';
import Timeout = NodeJS.Timeout;
export { AbortController2 as AbortController };
declare const AbortControllerTimer_base: {
    new (): AbortController;
    prototype: AbortController;
};
export declare class AbortControllerTimer extends AbortControllerTimer_base {
    #private;
    readonly signal: AbortSignal;
    constructor(ms?: number);
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
