/// <reference types="node" />
import { Agent } from 'https';
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_TLS_REJECT_UNAUTHORIZED?: "0" | "1";
        }
    }
}
/**
 * set process.env.NODE_TLS_REJECT_UNAUTHORIZED
 */
export declare function nodeRejectUnauthorized(value?: "0" | "1"): "0" | "1";
export declare function newUnSafeAgent(): Agent;
export declare function disableAgentRejectUnauthorized(agent: Agent): Agent;
export declare function getUnSafeAgent(force?: boolean): Agent;
export default getUnSafeAgent;
