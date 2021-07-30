"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkAbortChildWithParent = exports.linkAbortChildWithParent = exports._addEventListener = exports.linkAbortSignalWithController = exports._setControllerFromSignal = exports._getControllerFromSignal = void 0;
const SymbolAbortController = Symbol.for('controller');
function _getControllerFromSignal(signal) {
    return signal[SymbolAbortController];
}
exports._getControllerFromSignal = _getControllerFromSignal;
function _setControllerFromSignal(signal, controller) {
    // @ts-ignore
    signal[SymbolAbortController] = controller;
}
exports._setControllerFromSignal = _setControllerFromSignal;
function linkAbortSignalWithController(signal, controller, ignoreExists) {
    if (!ignoreExists && _getControllerFromSignal(signal)) {
        throw new TypeError(`Target signal already has exists controller`);
    }
    if (!controller) {
        throw new TypeError(`Invalid controller`);
    }
    _setControllerFromSignal(signal, controller);
}
exports.linkAbortSignalWithController = linkAbortSignalWithController;
/**
 * @deprecated
 */
function _addEventListener(target, fn) {
    var _a;
    if (typeof ((_a = _getControllerFromSignal(target)) === null || _a === void 0 ? void 0 : _a.addEventListener) !== 'undefined') {
        _getControllerFromSignal(target).addEventListener('abort', fn);
    }
    else if (typeof target.addEventListener !== 'undefined') {
        target.addEventListener('abort', fn);
    }
    else {
        target.signal.addEventListener('abort', fn);
    }
}
exports._addEventListener = _addEventListener;
/**
 * when parent aborted, child will abort too
 * @deprecated
 */
function linkAbortChildWithParent(child, parent) {
    var _a;
    if (typeof ((_a = _getControllerFromSignal(child)) !== null && _a !== void 0 ? _a : child).abort !== 'function') {
        throw new TypeError(`Target parent can't emit abort`);
    }
    const fn = () => { var _a; return (((_a = _getControllerFromSignal(child)) !== null && _a !== void 0 ? _a : child).abort()); };
    _addEventListener(child, () => unlinkAbortChildWithParent(parent, fn));
    _addEventListener(parent, fn);
    return fn;
}
exports.linkAbortChildWithParent = linkAbortChildWithParent;
/**
 * @deprecated
 */
function unlinkAbortChildWithParent(parent, fn) {
    var _a, _b, _c, _d;
    (_a = _getControllerFromSignal(parent)) === null || _a === void 0 ? void 0 : _a.removeEventListener('abort', fn);
    (_c = (_b = parent).removeEventListener) === null || _c === void 0 ? void 0 : _c.call(_b, 'abort', fn);
    (_d = parent.signal) === null || _d === void 0 ? void 0 : _d.removeEventListener('abort', fn);
}
exports.unlinkAbortChildWithParent = unlinkAbortChildWithParent;
exports.default = linkAbortSignalWithController;
//# sourceMappingURL=index.js.map