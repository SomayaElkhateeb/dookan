import { InferredZodSchema } from 'src/app/utils/hooks/form';
import { z } from 'zod';

export const Mdh_Shipping_FormSchema = {
	active: z.number(),
	sandbox_mode: z.number(),
	access_id: z.string().min(1),
	account_number: z.coerce.number().positive(),
	weight_unit: z.string().min(1),
	dimension_unit: z.string().min(1),
	ready_time: z.string().min(1),
	allow_seller: z.coerce.number().positive(),
	price_exchange_api: z.string().min(1),
	error_message: z.string().min(1),
	content_type: z.string().min(1),
	password: z.string().min(1),
	type: z.string().min(1),
	allowed_methods: z.array(
		z.object({
			id: z.string().min(1),
			name: z.string().min(1),
		}),
	),
    allowed_country: z.array(
		z.object({
			id: z.string().min(1),
			name: z.string().min(1),
		}),
	),
};
export type MdhShippingFormSchemaValues = InferredZodSchema<typeof Mdh_Shipping_FormSchema>;

export default function UseCustomMdhShipping() {
	const handelDefaultValue = () => {
		return {
			active: 0,
			sandbox_mode: 0,
			access_id: '',
			account_number: 0,
			weight_unit: '',
			dimension_unit: '',
			ready_time: '',
			price_exchange_api: '',
			error_message: '',
			allow_seller: 0,
			password: '',
			type: '',
			content_type: '',
			allowed_methods: [],
            allowed_country:[]
		};
	};
	return {
		handelDefaultValue,
	};
}
