/**
 * Created by user on 2020/3/16.
 */
export declare type IPortsInput = string | number | (number | string)[];
export declare function iifFallbackPort(port: string | number, ports: IPortsInput): number;
/**
 * OPENSHIFT_NODEJS_PORT
 * VCAP_APP_PORT
 * PORT
 */
export declare function getPortEnv(): number;
export declare function getDefaultPort(options?: {
    preferPorts?: IPortsInput;
    fallbackPorts?: IPortsInput;
}): number;
export default getDefaultPort;
