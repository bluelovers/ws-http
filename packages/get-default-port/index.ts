/**
 * Created by user on 2020/3/16.
 */

export type IPortsInput = string | number | (number | string)[];

export function iifFallbackPort(port: string | number, ports: IPortsInput): number
{
	port = (port as number) | 0;

	if (port <= 0 && ports)
	{
		if (Array.isArray(ports))
		{
			for (let p of ports)
			{
				port = (p as number) | 0;

				if (port > 0)
				{
					break;
				}
			}
		}
		else
		{
			port = (ports as number) | 0;
		}
	}

	return port > 0 ? port : 0;
}

/**
 * OPENSHIFT_NODEJS_PORT
 * VCAP_APP_PORT
 * PORT
 */
export function getPortEnv()
{
	return iifFallbackPort(0, [
		process.env.OPENSHIFT_NODEJS_PORT,
		process.env.VCAP_APP_PORT,
		process.env.NODE_PORT,
		process.env.PORT,
	]);
}

export function getDefaultPort(options: {
	preferPorts?: IPortsInput,
	fallbackPorts?: IPortsInput,
	defaultPort?: number,
} = {}): number
{
	const { preferPorts, fallbackPorts, defaultPort } = options;

	let port: number | string;

	port = iifFallbackPort(port, preferPorts);

	if (port === 0 && typeof process !== 'undefined' && process?.env)
	{
		port = getPortEnv();
	}

	port = iifFallbackPort(port, fallbackPorts);

	return port || defaultPort && iifFallbackPort(defaultPort, 0) || 3000
}

export default getDefaultPort
