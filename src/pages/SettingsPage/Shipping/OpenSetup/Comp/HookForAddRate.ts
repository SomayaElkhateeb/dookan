import { useTranslation } from 'react-i18next';
import { z } from 'zod';


export interface IAddRate {
	sales: {
		carriers: {
			mpdhl: {
				active: number;
				type: string; // select
				sandbox_mode: number;
				access_id: number;
				password: string;
				account_number: number;
				weight_unit: string;
				dimension_unit: string;
				content_type: string; // select
				allowed_methods: string; // array
				ready_time: string;
				allow_seller: number;
				allowed_country: string; // array
				price_exchange_api: string;
				error_message: string;
			}
		}
	}


	///////////////////////////////////////
	rateNameEn: string;
	rateNameAr: string;
	shippingSpeed: string;
	supportedCities?: string;
	shippingPrice: number;
	weight: number;
	minimumPrice: number;
	maximumPrice: number;
}

const zodNumber = z.coerce.number().positive().min(0);
const zodString = z.string().min(1);
const zodArray = z
	.array(
		z.object({
			id: zodString,
			name: zodString,
		}),
	)
	.min(1);


export default function useCustomHookAddRate() {

	const rateSchema = {

		sales: {
			carriers: {
				mpdhl: {
					active: zodNumber,
					type: zodArray, // select
					sandbox_mode: zodNumber,
					access_id: zodNumber,
					password: zodString,
					account_number: zodNumber,
					weight_unit: zodString,
					dimension_unit: zodString,
					content_type: zodArray, // select
					allowed_methods: zodArray, // array
					ready_time: zodString,
					allow_seller: zodNumber,
					allowed_country: zodArray, // array
					price_exchange_api: zodString,
					error_message: zodString,
				}
			}
		},


		//////////////////////////////////////////////////////////////////////////////////////////
		rateNameEn: z.string().min(3),
		rateNameAr: z.string().min(3),
		shippingSpeed: z.string(),
		supportedCities: z.string().optional(),
		shippingPrice: z.coerce.number().positive().min(0),
		weight: z.coerce.number().positive().min(0),
		minimumPrice: z.coerce.number().positive().min(0),
		maximumPrice: z.coerce.number().positive().min(0),
	};


	const handelDefaultValue = () => {
		return {
			sales: {
				carriers: {
					mpdhl: {
						active: 0,
						type: [], // select
						sandbox_mode: 0,
						access_id: 0,
						password: '',
						account_number: 0,
						weight_unit: '',
						dimension_unit: '',
						content_type: [], // select
						allowed_methods: [], // array
						ready_time: '',
						allow_seller: 0,
						allowed_country: [], // array
						price_exchange_api: '',
						error_message: '',
					}
				}
			},

			//////////////////////////////////////////////
			rateNameEn: '',
			rateNameAr: '',
			shippingSpeed: '',
			supportedCities: '',
			shippingPrice: 0,
			weight: 0,
			minimumPrice: 0,
			maximumPrice: 0,
		};
	};



	return {
		handelDefaultValue,
		rateSchema,
	};
}
