import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
// import { selectItemsInterface } from 'src/pages/PagesPage/_comp/PagesSection/_comp/AddPage/_comp/ContentSeoPage';

export interface PaymentFormProps {
	formStore: UseFormReturn<AddPayment_MethodTypes>;
}
export interface AddPayment_MethodTypes {
	payment_method_id: string;
	account_number?: number;
	account_name?: string;
	bank_name?: string;
	iban?: number;
	price_more_than: number;
	items_more_than: number;
	// apply_with: string;
	active: number;
	main_method: number;
	show_in_footer: number;
	additional_data: string;
	// specificProducts?: selectItemsInterface[];
	// specificCustomers?: selectItemsInterface[];
}

export default function useAddMerchantPaymentMethod() {
	const stringZod = z.string().min(1);
	const numberZod = z.coerce.number().positive();

	const AddMerchantPaymentMethodSchema = {
		payment_method_id: stringZod,
		account_number: numberZod,
		account_name: stringZod.optional().or(z.literal('')),
		bank_name: stringZod.optional().or(z.literal('')),
		iban: numberZod,
		price_more_than: numberZod,
		items_more_than: numberZod,
		// apply_with: stringZod,
		active: z.number(),
		main_method: z.number(),
		show_in_footer: z.number(),
		additional_data: stringZod,
		////////////////////////////////////////////////////////////
		// specificProducts:
		// 	apply_with === 'Specific products'
		// 		? z
		// 			.array(
		// 				z.object({
		// 					id: stringZod,
		// 					name: stringZod,
		// 				}),
		// 			)
		// 			.min(1)
		// 		: z.optional(
		// 			z.array(
		// 				z.object({
		// 					id: stringZod,
		// 					name: stringZod,
		// 				}),
		// 			),
		// 		),
		// specificCustomers:
		// 	apply_with === 'Specific customers'
		// 		? z
		// 			.array(
		// 				z.object({
		// 					id: stringZod,
		// 					name: stringZod,
		// 				}),
		// 			)
		// 			.min(1)
		// 		: z.optional(
		// 			z.array(
		// 				z.object({
		// 					id: stringZod,
		// 					name: stringZod,
		// 				}),
		// 			),
		// 		),
	};
	const handelDefaultValue = (): AddPayment_MethodTypes => {
		return {
			payment_method_id: '',
			account_number: 0,
			account_name: '',
			bank_name: '',
			iban: 0,
			price_more_than: 0,
			items_more_than: 0,
			// apply_with: 'All',
			active: 0,
			main_method: 0,
			show_in_footer: 0,
			additional_data: '',
			// specificProducts: [],
			// specificCustomers: [],
		};
	};

	return { AddMerchantPaymentMethodSchema, handelDefaultValue };
}
