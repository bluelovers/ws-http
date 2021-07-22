import { Agent } from 'https';
let httpsAgent: Agent;

declare global
{
	namespace NodeJS
	{
		interface ProcessEnv
		{
			NODE_TLS_REJECT_UNAUTHORIZED?: "0" | "1"
		}
	}
}

/**
 * set process.env.NODE_TLS_REJECT_UNAUTHORIZED
 */
export function nodeRejectUnauthorized(value?: "0" | "1")
{
	if (typeof process === 'undefined' || process === null)
	{
		return;
	}

	if (typeof value === 'undefined' || value === null)
	{
		return process.env.NODE_TLS_REJECT_UNAUTHORIZED
	}

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = value;

	return process.env.NODE_TLS_REJECT_UNAUTHORIZED
}

export function newUnSafeAgent()
{
	return new Agent({
		rejectUnauthorized: false,
	})
}

export function disableAgentRejectUnauthorized(agent: Agent)
{
	agent.options.rejectUnauthorized = false

	return agent;
}

export function getUnSafeAgent(force?: boolean)
{
	if (force) httpsAgent = void 0;
	return httpsAgent ??= newUnSafeAgent();
}

export default getUnSafeAgent
