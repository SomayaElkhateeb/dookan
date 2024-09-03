

import { InferredZodSchema } from 'src/app/utils/hooks/form';
import { z } from 'zod';

const RequiredAddressData = z.string().min(1);

export const AddCustomerPageSchema = {

	gender: RequiredAddressData,

	first_name: RequiredAddressData,
	last_name: RequiredAddressData,
	email: RequiredAddressData.email(),
	phone: z.string().min(7),

	customer_group_id: RequiredAddressData,
	default_address: z.object({
		first_name: RequiredAddressData,
		last_name: RequiredAddressData,
		country: RequiredAddressData,
		city: RequiredAddressData.optional().or(z.literal("")),
		state: RequiredAddressData,
		street: RequiredAddressData,
		building: RequiredAddressData,
		landmark: RequiredAddressData,
		phone: z.string().min(7),
	}),

	subscribed_to_news_letter: z.number(),
	status: z.number().optional()

};
export type AddCustomerPageSchemaValues = InferredZodSchema<typeof AddCustomerPageSchema>;

export default function useCustomHookAddCustomerForm() {
	const handelDefaultValue = () => {
		return {

			gender: 'Male',
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			customer_group_id: "",
			default_address: {
				first_name: "",
				last_name: "",
				country: "",
				city: "",
				state: "",
				street: "",
				building: "",
				landmark: "",
				phone: "",
			},
			subscribed_to_news_letter: 0,
			status: 0
		};
	};

	return {
		handelDefaultValue,
	};
}
