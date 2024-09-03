import { z } from 'zod';

export interface OrdercustomerFormInterface {
	customer_first_name: string;
	customer_last_name: string;
	customer_email: string;
	customer_phone: string;
}

export default function useOrderCustomerForm() {
	const handelDefaultValue = () => {
		return {
			customer_first_name: '',
			customer_last_name:'',
			customer_email: '',
			customer_phone: '',
		};
	};

	const orderCustomerSchema = {
		customer_first_name: z.string().min(1, { message: 'First name is required' }),
		customer_last_name: z.string().min(1, { message: 'last name is required' }),
		customer_email: z.string().min(1, { message: 'Email is required' }).email(),
		customer_phone: z.string().min(7, { message: 'Phone is required' }),
	};

	return {
		handelDefaultValue,
		orderCustomerSchema,
	};
}
