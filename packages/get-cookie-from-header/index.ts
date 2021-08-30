import { valueFromRecord, keyFromRecord, IRecordLike } from 'value-from-record';

export function getCookieFromHeader<T = string>(headers: IRecordLike<string,  any>): T[]
{
	return [valueFromRecord('set-cookie', headers)].flat().filter(Boolean)
}

export default getCookieFromHeader
