import { IRecordLike } from 'value-from-record';
export declare function getCookieFromHeader<T = string>(headers: IRecordLike<string, any>): T[];
export default getCookieFromHeader;
