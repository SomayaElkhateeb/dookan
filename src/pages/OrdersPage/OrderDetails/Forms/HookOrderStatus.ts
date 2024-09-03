import { z } from 'zod';

export interface orderStatusFormInterface {
	status: string;
	comment?: string;
	customer_notified: boolean;
}

export default function useOrderStatusForm() {
	const handelDefaultValue = () => {
		return {
			status: '',
			comment: '',
			customer_notified: false,
		};
	};

	const orderStatusSchema = {
		status: z.string().min(5, { message: 'Please choose order status is required' }),
		comment: z.optional(z.string().min(5)).or(z.literal("")),
		customer_notified: z.boolean().default(false),
	};

	return {
		handelDefaultValue,
		orderStatusSchema,
	};
}
