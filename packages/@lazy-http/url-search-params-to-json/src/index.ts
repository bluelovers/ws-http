
export type IEntriesLike<K extends string, V extends unknown> = [key: K, val: V][] | IterableIterator<[K, V]>

export function entriesToJSON<T extends Record<string, any>>(entries: IEntriesLike<string, unknown>)
{
	const json : T = {} as any;
	for (const [key, val] of entries)
	{
		if (json.hasOwnProperty(key))
		{
			// if the current key is already an array, we'll add the value to it
			if (Array.isArray(json[key]))
			{
				json[key].push(val)
			}
			else
			{
				// if it's not an array, but contains a value, we'll convert it into an array
				// and add the current value to it
				// @ts-ignore
				json[key] = [json[key], val];
			}
		}
		else
		{
			// plain assignment if no special case is present
			// @ts-ignore
			json[key] = val;
		}
	}
	return json
}

export function searchParamsToJSON<T extends Record<string, any>>(sp: URLSearchParams)
{
	return entriesToJSON<T>(sp.entries())
}

export function jsonToEntries(json: Record<string, unknown>)
{
	return Object.entries(json)
		.reduce((entries, [key, val]) => {

			if (Array.isArray(val))
			{
				val.forEach(v => {
					entries.push([key, v])
				})
			}
			else
			{
				entries.push([key, val])
			}

			return entries
		}, [] as [string, unknown][])
}

export function jsonToSearchParams(json: Record<string, unknown>)
{
	return new URLSearchParams(jsonToEntries(json) as any)
}

export default searchParamsToJSON
