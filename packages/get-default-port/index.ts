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

export function getDefaultPort(options: {
	preferPorts?: IPortsInput,
	fallbackPorts?: IPortsInput,
} = {}): number
{
	const { preferPorts, fallbackPorts } = options;

	let port: number | string;

	port = iifFallbackPort(port, preferPorts);

	if (port === 0 && typeof process !== 'undefined' && process?.env)
	{
		port = iifFallbackPort(port, [
			process.env.OPENSHIFT_NODEJS_PORT,
			process.env.VCAP_APP_PORT,
			process.env.PORT,
		]);
	}

	port = iifFallbackPort(port, fallbackPorts);

	return port || 3000
}

export default getDefaultPort
