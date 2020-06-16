"use strict";
/**
 * Created by user on 2020/6/16.
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _timer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortControllerTimer = exports.AbortController = void 0;
const abort_controller_1 = __importDefault(require("abort-controller"));
exports.AbortController = abort_controller_1.default;
class AbortControllerTimer extends abort_controller_1.default {
    constructor(ms) {
        super();
        this.ms = ms;
        _timer.set(this, void 0);
        this.reset();
        this.on('abort', (ev) => {
            this.clear();
        }, {
            once: true,
        });
    }
    on(type, listener, options) {
        this.signal.addEventListener(type, listener, options);
    }
    off(type, listener, options) {
        this.signal.removeEventListener(type, listener, options);
    }
    get aborted() {
        return this.signal.aborted;
    }
    get timer() {
        return __classPrivateFieldGet(this, _timer);
    }
    get timeout() {
        return this.ms;
    }
    /**
     * warning: reset the timer will not abort signal
     *
     * @internal
     */
    reset() {
        this.clear();
        if (this.aborted) {
            throw new Error(`signal already aborted, can't be refresh`);
        }
        const ms = this.ms;
        this.ms |= 0;
        if (this.ms > 0) {
            __classPrivateFieldSet(this, _timer, setTimeout(() => this.abort(), this.ms));
        }
        else if (this.ms < 0) {
            try {
                super.abort();
            }
            catch (e) {
                console.trace(e);
            }
            throw new TypeError(`ms should be greater than or equal to 0, but got {${ms} => ${this.ms}}`);
        }
        return __classPrivateFieldGet(this, _timer);
    }
    /**
     * warning: clear the timer will not abort signal
     *
     * @internal
     */
    clear() {
        if (typeof __classPrivateFieldGet(this, _timer) !== 'undefined') {
            clearTimeout(__classPrivateFieldGet(this, _timer));
        }
        __classPrivateFieldSet(this, _timer, void 0);
    }
    /**
     * refresh the timer will throw error when signal is aborted
     */
    refresh() {
        if (this.aborted) {
            throw new Error(`signal already aborted, can't be refresh`);
        }
        if (typeof __classPrivateFieldGet(this, _timer) === 'number') {
            this.reset();
        }
        else if (typeof __classPrivateFieldGet(this, _timer) !== 'undefined') {
            __classPrivateFieldSet(this, _timer, __classPrivateFieldGet(this, _timer).refresh());
        }
        return __classPrivateFieldGet(this, _timer);
    }
    abort() {
        this.clear();
        super.abort();
    }
}
exports.AbortControllerTimer = AbortControllerTimer;
_timer = new WeakMap();
exports.default = AbortControllerTimer;
//# sourceMappingURL=index.js.map