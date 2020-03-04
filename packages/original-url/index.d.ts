export interface IResult {
    raw: string;
    protocol: string | 'https:' | 'http:';
    hostname: string;
    port: number;
    pathname: string;
    search: string;
    hash: string;
    full: string;
}
export declare function originalUrl(req: any): IResult;
export default originalUrl;
