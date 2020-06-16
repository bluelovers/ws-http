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
        process.env.NODE_PORT,
        process.env.PORT,
    ]);
}
exports.getPortEnv = getPortEnv;
function getDefaultPort(options = {}) {
    const { preferPorts, fallbackPorts, defaultPort } = options;
    let port;
    port = iifFallbackPort(port, preferPorts);
    if (port === 0 && typeof process !== 'undefined' && (process === null || process === void 0 ? void 0 : process.env)) {
        port = getPortEnv();
    }
    port = iifFallbackPort(port, fallbackPorts);
    return port || defaultPort && iifFallbackPort(defaultPort, 0) || 3000;
}
exports.getDefaultPort = getDefaultPort;
exports.default = getDefaultPort;
//# sourceMappingURL=index.js.map