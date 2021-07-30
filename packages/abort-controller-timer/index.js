"use strict";
/**
 * Created by user on 2020/6/16.
 */
var _AbortControllerTimer_timer, _AbortControllerTimer_ms;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortControllerTimer = exports.AbortController = void 0;
const tslib_1 = require("tslib");
const abort_controller_1 = (0, tslib_1.__importDefault)(require("./lib/abort-controller"));
exports.AbortController = abort_controller_1.default;
const index_1 = require("abort-controller-util/index");
const SymbolChildren = Symbol.for('AbortControllerTimer#children');
const SymbolParents = Symbol.for('AbortControllerTimer#parents');
const SymbolAbortController = Symbol.for('controller');
class AbortControllerTimer extends abort_controller_1.default {
    constructor(ms) {
        super();
        _AbortControllerTimer_timer.set(this, void 0);
        _AbortControllerTimer_ms.set(this, void 0);
        this._init(ms);
    }
    _init(ms) {
        // @ts-ignore
        this[SymbolAbortController] = this;
        (0, tslib_1.__classPrivateFieldSet)(this, _AbortControllerTimer_ms, ms, "f");
        this.reset();
        (0, index_1._setControllerFromSignal)(this.signal, this);
        this.on('abort', (ev) => {
            this.clear();
            this._removeMeFromParents();
            this.abortChildrenAll();
        }, {
            once: true,
        });
    }
    _addChildren(child) {
        var _a, _b;
        if (!child.aborted) {
            (_a = child[SymbolParents]) !== null && _a !== void 0 ? _a : (child[SymbolParents] = new Set());
            child[SymbolParents].add(this);
            (_b = this[SymbolChildren]) !== null && _b !== void 0 ? _b : (this[SymbolChildren] = new Set());
            this[SymbolChildren].add(child);
        }
        return child;
    }
    _removeChildren(child) {
        var _a, _b;
        (_a = child === null || child === void 0 ? void 0 : child[SymbolParents]) === null || _a === void 0 ? void 0 : _a.delete(this);
        (_b = this === null || this === void 0 ? void 0 : this[SymbolChildren]) === null || _b === void 0 ? void 0 : _b.delete(child);
    }
    abortChildrenAll() {
        var _a;
        return (_a = this[SymbolChildren]) === null || _a === void 0 ? void 0 : _a.forEach(c => {
            var _a, _b, _c;
            (_c = (_b = ((_a = (0, index_1._getControllerFromSignal)(c)) !== null && _a !== void 0 ? _a : c)) === null || _b === void 0 ? void 0 : _b.abort) === null || _c === void 0 ? void 0 : _c.call(_b);
            this._removeChildren(c);
        });
    }
    _removeMeFromParents() {
        var _a;
        return (_a = this[SymbolParents]) === null || _a === void 0 ? void 0 : _a.forEach(p => this._removeChildren.call(p, this));
    }
    attachToParent(parent) {
        var _a;
        let p = ((_a = (0, index_1._getControllerFromSignal)(parent)) !== null && _a !== void 0 ? _a : parent);
        this._addChildren.call(p, this);
        return this;
    }
    child(ms) {
        return this._addChildren(new AbortControllerTimer(ms));
    }
    addEventListener(type, listener, options) {
        this.signal.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
        this.signal.removeEventListener(type, listener, options);
    }
    on(type, listener, options) {
        this.signal.addEventListener(type, listener, options);
    }
    off(type, listener, options) {
        this.signal.removeEventListener(type, listener, options);
    }
    get onabort() {
        return this.signal.onabort;
    }
    set onabort(value) {
        this.signal.onabort = value;
    }
    get aborted() {
        return this.signal.aborted;
    }
    get timer() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f");
    }
    get timeout() {
        if ((0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f") > 0) {
            return (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f");
        }
    }
    set timeout(ms) {
        ms |= 0;
        if (ms <= 0) {
            this.abort();
            throw new TypeError(`ms should be greater than 0, but got {${ms}}`);
        }
        (0, tslib_1.__classPrivateFieldSet)(this, _AbortControllerTimer_ms, ms, "f");
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
        const ms = (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _AbortControllerTimer_ms, (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f") | 0, "f");
        if ((0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f") > 0) {
            (0, tslib_1.__classPrivateFieldSet)(this, _AbortControllerTimer_timer, setTimeout(() => this.abort(), (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f")), "f");
        }
        else if ((0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f") < 0) {
            try {
                super.abort();
            }
            catch (e) {
                console.trace(e);
            }
            throw new TypeError(`ms should be greater than or equal to 0, but got {${ms} => ${(0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_ms, "f")}}`);
        }
        return (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f");
    }
    /**
     * warning: clear the timer will not abort signal
     *
     * @internal
     */
    clear() {
        if (typeof (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f") !== 'undefined') {
            clearTimeout((0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f"));
        }
        (0, tslib_1.__classPrivateFieldSet)(this, _AbortControllerTimer_timer, void 0, "f");
    }
    /**
     * refresh the timer will throw error when signal is aborted
     */
    refresh() {
        if (this.aborted) {
            throw new Error(`signal already aborted, can't be refresh`);
        }
        if (typeof (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f") === 'number') {
            this.reset();
        }
        else if (typeof (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f") !== 'undefined') {
            (0, tslib_1.__classPrivateFieldSet)(this, _AbortControllerTimer_timer, (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f").refresh(), "f");
        }
        return (0, tslib_1.__classPrivateFieldGet)(this, _AbortControllerTimer_timer, "f");
    }
    abort() {
        this.clear();
        super.abort();
    }
}
exports.AbortControllerTimer = AbortControllerTimer;
_AbortControllerTimer_timer = new WeakMap(), _AbortControllerTimer_ms = new WeakMap();
exports.default = AbortControllerTimer;
//# sourceMappingURL=index.js.map