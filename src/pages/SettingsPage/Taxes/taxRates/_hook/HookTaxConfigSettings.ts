
import { z } from "zod";

export interface TaxConfigSetting {
	taxes: {
		general: {
			applied_to: string;
			include_in_product_prices: number;
			default_class: string;
			display_in_checkout: string;
		}
	}
}
// ////////////////////////
export default function useCustomHookTaxConfigSetting() {

	// Constants
	const handelDefaultValue = () => {
		return {
			taxes: {
				general: {
					applied_to: 'sub total',
					include_in_product_prices: 0,
					default_class: 'none',
					display_in_checkout: 'hide tax',
				}
			}
		};
	};
	const zodString = z.string().min(1);

	const taxConfigSettingSchema = {
		taxes: {
			general: {
				applied_to: zodString,
				include_in_product_prices: z.coerce.number().min(0).max(1),
				default_class: zodString,
				display_in_checkout: zodString,
			}
		}
	};

	return {
		taxConfigSettingSchema,
		handelDefaultValue
	}
}