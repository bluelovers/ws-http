import fixtureCanged from './fixture/canged';
import { betterQualityURL } from '../index';

console.log(`\n-----------\n`)

fixtureCanged.forEach(input => {

	let actual = betterQualityURL(input);

	console.log(input)
	console.log(`// => `, actual.url.toRealString())
	console.log(`\n-----------\n`)

})
