import { z } from 'zod';
export interface checkOutDetailsInterface {
	purchase: string;
	branch?: string;
	payment: string;
	delivery: string;
	shipping: string;
}

export default function useCustomCheckOutForm(purchase: string) {
	const handelDefaultValue = () => {
		return {
			purchase: 'branch',
			branch: '',
			payment: 'Cash',
			delivery: 'Shipping',
			shipping: 'DHL (main)',
		};
	};

	const checkOutSchema = () => {
		const stringValidation = z.string().min(3);
		const branchValidation = {
			branch:
				purchase === 'branch' ? stringValidation : z.optional(stringValidation).or(z.literal('')),
		};

		return {
			purchase: stringValidation,
			...branchValidation,
			payment: stringValidation,
			delivery: stringValidation,
			shipping: stringValidation,
		};
	};

	return {
		handelDefaultValue,
		checkOutSchema,
	};
}
