"use strict";
/**
 * Created by user on 2020/3/16.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultPort = exports.getPortEnv = exports.iifFallbackPort = void 0;
function iifFallbackPort(port, ports) {
    port = port | 0;
    if (port <= 0 && ports) {
        if (Array.isArray(ports)) {
            for (let p of ports) {
                port = p | 0;
                if (port > 0) {
                    break;
                }
            }
        }
        else {
            port = ports | 0;
        }
    }
    return port > 0 ? port : 0;
}
exports.iifFallbackPort = iifFallbackPort;
/**
 * OPENSHIFT_NODEJS_PORT
 * VCAP_APP_PORT
 * PORT
 */
function getPortEnv() {
    return iifFallbackPort(0, [
        process.env.OPENSHIFT_NODEJS_PORT,
        process.env.VCAP_APP_PORT,
        process.env.PORT,
    ]);
}
exports.getPortEnv = getPortEnv;
function getDefaultPort(options = {}) {
    const { preferPorts, fallbackPorts } = options;
    let port;
    port = iifFallbackPort(port, preferPorts);
    if (port === 0 && typeof process !== 'undefined' && (process === null || process === void 0 ? void 0 : process.env)) {
        port = getPortEnv();
    }
    port = iifFallbackPort(port, fallbackPorts);
    return port || 3000;
}
exports.getDefaultPort = getDefaultPort;
exports.default = getDefaultPort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUlILFNBQWdCLGVBQWUsQ0FBQyxJQUFxQixFQUFFLEtBQWtCO0lBRXhFLElBQUksR0FBSSxJQUFlLEdBQUcsQ0FBQyxDQUFDO0lBRTVCLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQ3RCO1FBQ0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUN4QjtZQUNDLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxFQUNuQjtnQkFDQyxJQUFJLEdBQUksQ0FBWSxHQUFHLENBQUMsQ0FBQztnQkFFekIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUNaO29CQUNDLE1BQU07aUJBQ047YUFDRDtTQUNEO2FBRUQ7WUFDQyxJQUFJLEdBQUksS0FBZ0IsR0FBRyxDQUFDLENBQUM7U0FDN0I7S0FDRDtJQUVELE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQXpCRCwwQ0F5QkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVTtJQUV6QixPQUFPLGVBQWUsQ0FBQyxDQUFDLEVBQUU7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtLQUNoQixDQUFDLENBQUM7QUFDSixDQUFDO0FBUEQsZ0NBT0M7QUFFRCxTQUFnQixjQUFjLENBQUMsVUFHM0IsRUFBRTtJQUVMLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRS9DLElBQUksSUFBcUIsQ0FBQztJQUUxQixJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUUxQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxLQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLENBQUEsRUFDaEU7UUFDQyxJQUFJLEdBQUcsVUFBVSxFQUFFLENBQUM7S0FDcEI7SUFFRCxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUU1QyxPQUFPLElBQUksSUFBSSxJQUFJLENBQUE7QUFDcEIsQ0FBQztBQW5CRCx3Q0FtQkM7QUFFRCxrQkFBZSxjQUFjLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDIwLzMvMTYuXG4gKi9cblxuZXhwb3J0IHR5cGUgSVBvcnRzSW5wdXQgPSBzdHJpbmcgfCBudW1iZXIgfCAobnVtYmVyIHwgc3RyaW5nKVtdO1xuXG5leHBvcnQgZnVuY3Rpb24gaWlmRmFsbGJhY2tQb3J0KHBvcnQ6IHN0cmluZyB8IG51bWJlciwgcG9ydHM6IElQb3J0c0lucHV0KTogbnVtYmVyXG57XG5cdHBvcnQgPSAocG9ydCBhcyBudW1iZXIpIHwgMDtcblxuXHRpZiAocG9ydCA8PSAwICYmIHBvcnRzKVxuXHR7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocG9ydHMpKVxuXHRcdHtcblx0XHRcdGZvciAobGV0IHAgb2YgcG9ydHMpXG5cdFx0XHR7XG5cdFx0XHRcdHBvcnQgPSAocCBhcyBudW1iZXIpIHwgMDtcblxuXHRcdFx0XHRpZiAocG9ydCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cG9ydCA9IChwb3J0cyBhcyBudW1iZXIpIHwgMDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcG9ydCA+IDAgPyBwb3J0IDogMDtcbn1cblxuLyoqXG4gKiBPUEVOU0hJRlRfTk9ERUpTX1BPUlRcbiAqIFZDQVBfQVBQX1BPUlRcbiAqIFBPUlRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcnRFbnYoKVxue1xuXHRyZXR1cm4gaWlmRmFsbGJhY2tQb3J0KDAsIFtcblx0XHRwcm9jZXNzLmVudi5PUEVOU0hJRlRfTk9ERUpTX1BPUlQsXG5cdFx0cHJvY2Vzcy5lbnYuVkNBUF9BUFBfUE9SVCxcblx0XHRwcm9jZXNzLmVudi5QT1JULFxuXHRdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRQb3J0KG9wdGlvbnM6IHtcblx0cHJlZmVyUG9ydHM/OiBJUG9ydHNJbnB1dCxcblx0ZmFsbGJhY2tQb3J0cz86IElQb3J0c0lucHV0LFxufSA9IHt9KTogbnVtYmVyXG57XG5cdGNvbnN0IHsgcHJlZmVyUG9ydHMsIGZhbGxiYWNrUG9ydHMgfSA9IG9wdGlvbnM7XG5cblx0bGV0IHBvcnQ6IG51bWJlciB8IHN0cmluZztcblxuXHRwb3J0ID0gaWlmRmFsbGJhY2tQb3J0KHBvcnQsIHByZWZlclBvcnRzKTtcblxuXHRpZiAocG9ydCA9PT0gMCAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcz8uZW52KVxuXHR7XG5cdFx0cG9ydCA9IGdldFBvcnRFbnYoKTtcblx0fVxuXG5cdHBvcnQgPSBpaWZGYWxsYmFja1BvcnQocG9ydCwgZmFsbGJhY2tQb3J0cyk7XG5cblx0cmV0dXJuIHBvcnQgfHwgMzAwMFxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXREZWZhdWx0UG9ydFxuIl19