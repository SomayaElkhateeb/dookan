import { z } from 'zod';
const zodString = z.string().min(1);
const zodNumber = z.coerce.number().positive().min(1);
export interface TaxRateInterface {
	identifier: string;
	is_zip: number;
	zip_code: string;
	zip_from?: number;
	zip_to?: number;
	country: string;
	tax_rate: number;
}
export const taxRateSettingsSchema = {
	identifier: zodString,
	is_zip: z.coerce.number().min(0).max(1),
	zip_code: z.string(),
	zip_from: zodNumber.optional(),
	zip_to: zodNumber.optional(),
	country: zodString,
	tax_rate: z.coerce.number(),
};
export const defaultValues = {
	identifier: '',
	is_zip: 0,
	zip_code: '',
	zip_from: undefined,
	zip_to: undefined,
	country: '',
	tax_rate: 0,
};
