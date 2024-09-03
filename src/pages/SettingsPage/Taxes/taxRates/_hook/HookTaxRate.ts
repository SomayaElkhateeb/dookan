
import { z } from "zod";

export interface TaxRateInterface {
	identifier: string;
	is_zip: number;
	zip_code: string;
	zip_from?: number;
	zip_to?: number;
	country: string;
	tax_rate: number;
}
// ////////////////////////
export default function useCustomHookTaxRate() {

	// Constants
	const handelDefaultValue = () => {
		return {
			identifier: '',
			is_zip: 0,
			zip_code: '',
			zip_from: 0,
			zip_to: 0,
			country: '',
			tax_rate: 0,
		};
	};
	const zodString = z.string().min(1);
	const zodNumber =  z.coerce.number().positive().min(1);

	const taxRateSettingsSchema = {
		identifier: zodString,
		is_zip: z.coerce.number().min(0).max(1),
		zip_code: zodNumber,
		zip_from: zodNumber.optional(),
		zip_to: zodNumber.optional(),
		country: zodString,
		tax_rate: zodString,
	};

	return {
		taxRateSettingsSchema,
		handelDefaultValue
	}
}