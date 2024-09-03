import { z } from 'zod';

export interface CheckoutCustomize {
	customizations: {
		checkout: {
			guest_checkout: number;
			set_minimum_allowed_order_subtotal: number;
			minimum_order_subtotal: number;
			ask_for_company_name: number;
			customer_can_checkout_with: string;
			ask_for_zip_postal_code: number;
		},
	}
}

export default function useCustomHookCheckoutCustomize() {
	const zodNumber = z.coerce.number().min(0).max(1);

	const CheckoutCustomizeSchema = {
		customizations: z.object({
			checkout: z.object({
				guest_checkout: zodNumber,
				set_minimum_allowed_order_subtotal: zodNumber,
				minimum_order_subtotal: z.coerce.number().positive().min(1),
				ask_for_company_name: zodNumber,
				customer_can_checkout_with: z.enum(['email_phone', 'email_only', 'phone_only']),
				ask_for_zip_postal_code: zodNumber,
			})
		}),
	};

	const handelDefaultValue = (): CheckoutCustomize => {
		return {
			customizations: {
				checkout: {
					guest_checkout: 0,
					set_minimum_allowed_order_subtotal: 0,
					minimum_order_subtotal: 0,
					ask_for_company_name: 0,
					customer_can_checkout_with: 'email_phone',
					ask_for_zip_postal_code: 0,
				}
			}
		};
	};

	return {
		handelDefaultValue,
		CheckoutCustomizeSchema,
	};
}
