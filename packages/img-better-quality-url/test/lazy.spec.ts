import { basename, extname } from 'path';
import { betterQualityURL } from '../index';
import fixtureCanged from './fixture/canged';

describe('suppertd', () => {


	describe('can be changed', () =>
	{

		fixtureCanged.forEach(input => {
			test(input, () =>
			{

				let actual = betterQualityURL(input);

				expect(actual).toMatchSnapshot({
					changed: true,
					not_suppertd: false,
				});

			});
		})

	})

	describe('maybe not changed', () =>
	{
		[
			'https://img1.mitemin.net/k0/78/84kqizdv2mupf8n135o55zfol2wb_xan_by_go_2f0x.jpg',
		].forEach(input => {
			test(input, () =>
			{

				let actual = betterQualityURL(input);

				expect(actual).toMatchSnapshot({
					not_suppertd: false,
				});

			});
		})

	})


});
