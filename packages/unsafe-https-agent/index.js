"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnSafeAgent = exports.disableAgentRejectUnauthorized = exports.newUnSafeAgent = exports.nodeRejectUnauthorized = void 0;
const https_1 = require("https");
let httpsAgent;
/**
 * set process.env.NODE_TLS_REJECT_UNAUTHORIZED
 */
function nodeRejectUnauthorized(value) {
    if (typeof process === 'undefined' || process === null) {
        return;
    }
    if (typeof value === 'undefined' || value === null) {
        return process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = value;
    return process.env.NODE_TLS_REJECT_UNAUTHORIZED;
}
exports.nodeRejectUnauthorized = nodeRejectUnauthorized;
function newUnSafeAgent() {
    return new https_1.Agent({
        rejectUnauthorized: false,
    });
}
exports.newUnSafeAgent = newUnSafeAgent;
function disableAgentRejectUnauthorized(agent) {
    agent.options.rejectUnauthorized = false;
    return agent;
}
exports.disableAgentRejectUnauthorized = disableAgentRejectUnauthorized;
function getUnSafeAgent(force) {
    if (force)
        httpsAgent = void 0;
    return httpsAgent !== null && httpsAgent !== void 0 ? httpsAgent : (httpsAgent = newUnSafeAgent());
}
exports.getUnSafeAgent = getUnSafeAgent;
exports.default = getUnSafeAgent;
//# sourceMappingURL=index.js.map