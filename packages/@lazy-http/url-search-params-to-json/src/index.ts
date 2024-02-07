
export type IEntriesLike<K extends string, V extends unknown> = [key: K, val: V][] | IterableIterator<[K, V]>

export interface IOptions
{
	removeSquareBracketsArrayKey?: boolean,
	squareBracketsArrayKey?: boolean,
}

/**
 * @see https://stackoverflow.com/a/52539264/4563339
 */
export function entriesToJSON<T extends Record<string, any>>(entries: IEntriesLike<string, unknown>, options?: IOptions)
{
	const { removeSquareBracketsArrayKey = false, squareBracketsArrayKey = false } = options ?? {};

	const ks = new Set<string>();

	let json : T = {} as any;
	for (const [key, val] of entries)
	{
		if (squareBracketsArrayKey && key.endsWith('[]'))
		{
			// @ts-ignore
			json[key] = [];
		}

		if (Object.prototype.hasOwnProperty.call(json, key))
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

			ks.add(key)
		}
		else
		{
			// plain assignment if no special case is present
			// @ts-ignore
			json[key] = val;
		}
	}

	if (removeSquareBracketsArrayKey)
	{
		json = removeSquareBracketsFromJSON(json, ks)
	}

	return json
}

export function removeSquareBracketsFromJSON<T extends Record<string, unknown>>(json: T, ks?: Set<string>)
{
	ks ??= new Set(Object.keys(json));

	json = {
		...json,
	}

	ks.forEach(key =>
	{
		const val = json[key];
		if (key.endsWith('[]') && Array.isArray(val))
		{
			const key2 = key.replace(/\[\]$/, '');
			if (!key2.length)
			{
				throw new TypeError(`Invalid key: '${key}'`)
			}
			else if (Object.prototype.hasOwnProperty.call(json, key2))
			{
				throw new TypeError(`'${key2}' already exists in keys`)
			}
			delete json[key]
			// @ts-ignore
			json[key2] = val;
		}
	})

	return json
}

/**
 * @see https://stackoverflow.com/a/52539264/4563339
 */
export function searchParamsToJSON<T extends Record<string, any>>(sp: URLSearchParams, options?: IOptions)
{
	return entriesToJSON<T>(sp.entries(), options)
}

export function searchParamsStringToJSON<T extends Record<string, any>>(sp: string, options?: IOptions)
{
	return searchParamsToJSON<T>(new URLSearchParams(sp), options)
}

export function jsonToEntries(json: Record<string, unknown>, options?: IOptions)
{
	const { squareBracketsArrayKey = false, removeSquareBracketsArrayKey = false } = options ?? {};

	if (removeSquareBracketsArrayKey)
	{
		json = removeSquareBracketsFromJSON(json)
	}

	return Object.entries(json)
		.reduce((entries, [key, val]) => {
			if (Array.isArray(val))
			{
				let bool = key.endsWith('[]');

				if (squareBracketsArrayKey && !bool)
				{
					key += '[]';
				}

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

export function jsonToSearchParams(json: Record<string, unknown>, options?: IOptions)
{
	return new URLSearchParams(jsonToEntries(json, options) as any)
}

export default searchParamsToJSON
