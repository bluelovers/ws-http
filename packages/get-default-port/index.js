"use strict";
/**
 * Created by user on 2020/3/16.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultPort = exports.iifFallbackPort = void 0;
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
function getDefaultPort(options = {}) {
    const { preferPorts, fallbackPorts } = options;
    let port;
    port = iifFallbackPort(port, preferPorts);
    if (port === 0 && typeof process !== 'undefined' && (process === null || process === void 0 ? void 0 : process.env)) {
        port = iifFallbackPort(port, [
            process.env.OPENSHIFT_NODEJS_PORT,
            process.env.VCAP_APP_PORT,
            process.env.PORT,
        ]);
    }
    port = iifFallbackPort(port, fallbackPorts);
    return port || 3000;
}
exports.getDefaultPort = getDefaultPort;
exports.default = getDefaultPort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUlILFNBQWdCLGVBQWUsQ0FBQyxJQUFxQixFQUFFLEtBQWtCO0lBRXhFLElBQUksR0FBSSxJQUFlLEdBQUcsQ0FBQyxDQUFDO0lBRTVCLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQ3RCO1FBQ0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUN4QjtZQUNDLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxFQUNuQjtnQkFDQyxJQUFJLEdBQUksQ0FBWSxHQUFHLENBQUMsQ0FBQztnQkFFekIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUNaO29CQUNDLE1BQU07aUJBQ047YUFDRDtTQUNEO2FBRUQ7WUFDQyxJQUFJLEdBQUksS0FBZ0IsR0FBRyxDQUFDLENBQUM7U0FDN0I7S0FDRDtJQUVELE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQXpCRCwwQ0F5QkM7QUFFRCxTQUFnQixjQUFjLENBQUMsVUFHM0IsRUFBRTtJQUVMLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRS9DLElBQUksSUFBcUIsQ0FBQztJQUUxQixJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUUxQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxLQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLENBQUEsRUFDaEU7UUFDQyxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQjtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJO1NBQ2hCLENBQUMsQ0FBQztLQUNIO0lBRUQsSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFNUMsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFBO0FBQ3BCLENBQUM7QUF2QkQsd0NBdUJDO0FBRUQsa0JBQWUsY0FBYyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAyMC8zLzE2LlxuICovXG5cbmV4cG9ydCB0eXBlIElQb3J0c0lucHV0ID0gc3RyaW5nIHwgbnVtYmVyIHwgKG51bWJlciB8IHN0cmluZylbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlpZkZhbGxiYWNrUG9ydChwb3J0OiBzdHJpbmcgfCBudW1iZXIsIHBvcnRzOiBJUG9ydHNJbnB1dCk6IG51bWJlclxue1xuXHRwb3J0ID0gKHBvcnQgYXMgbnVtYmVyKSB8IDA7XG5cblx0aWYgKHBvcnQgPD0gMCAmJiBwb3J0cylcblx0e1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBvcnRzKSlcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBwIG9mIHBvcnRzKVxuXHRcdFx0e1xuXHRcdFx0XHRwb3J0ID0gKHAgYXMgbnVtYmVyKSB8IDA7XG5cblx0XHRcdFx0aWYgKHBvcnQgPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHBvcnQgPSAocG9ydHMgYXMgbnVtYmVyKSB8IDA7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHBvcnQgPiAwID8gcG9ydCA6IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0UG9ydChvcHRpb25zOiB7XG5cdHByZWZlclBvcnRzPzogSVBvcnRzSW5wdXQsXG5cdGZhbGxiYWNrUG9ydHM/OiBJUG9ydHNJbnB1dCxcbn0gPSB7fSk6IG51bWJlclxue1xuXHRjb25zdCB7IHByZWZlclBvcnRzLCBmYWxsYmFja1BvcnRzIH0gPSBvcHRpb25zO1xuXG5cdGxldCBwb3J0OiBudW1iZXIgfCBzdHJpbmc7XG5cblx0cG9ydCA9IGlpZkZhbGxiYWNrUG9ydChwb3J0LCBwcmVmZXJQb3J0cyk7XG5cblx0aWYgKHBvcnQgPT09IDAgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3M/LmVudilcblx0e1xuXHRcdHBvcnQgPSBpaWZGYWxsYmFja1BvcnQocG9ydCwgW1xuXHRcdFx0cHJvY2Vzcy5lbnYuT1BFTlNISUZUX05PREVKU19QT1JULFxuXHRcdFx0cHJvY2Vzcy5lbnYuVkNBUF9BUFBfUE9SVCxcblx0XHRcdHByb2Nlc3MuZW52LlBPUlQsXG5cdFx0XSk7XG5cdH1cblxuXHRwb3J0ID0gaWlmRmFsbGJhY2tQb3J0KHBvcnQsIGZhbGxiYWNrUG9ydHMpO1xuXG5cdHJldHVybiBwb3J0IHx8IDMwMDBcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGVmYXVsdFBvcnRcbiJdfQ==