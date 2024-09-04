import { z } from 'zod';
const zodEnumOptions = ["email_phone", "email_only", "phone_only"] as const;
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface CheckoutCustomize {
	customizations: {
		checkout: {
			guest_checkout: number;
			set_minimum_allowed_order_subtotal: number;
			minimum_order_subtotal: number;
			ask_for_company_name: number;
			customer_can_checkout_with: typeof zodEnumOptions[number];
			ask_for_zip_postal_code: number;
		};
	};
}

const zodNumber = z.coerce.number().min(0).max(1);

export const CheckoutCustomizeSchema = {
	customizations: z.object({
		checkout: z.object({
			guest_checkout: zodNumber,
			set_minimum_allowed_order_subtotal: zodNumber,
			minimum_order_subtotal: z.coerce.number().positive().min(1),
			ask_for_company_name: zodNumber,
			customer_can_checkout_with: z.enum(zodEnumOptions),
			ask_for_zip_postal_code: zodNumber,
		}),
	}),
};

export const defaultValues: CheckoutCustomize = {
	customizations: {
		checkout: {
			guest_checkout: 0,
			set_minimum_allowed_order_subtotal: 0,
			minimum_order_subtotal: 1, // Since `min(1)` is required, ensure the default is 1
			ask_for_company_name: 0,
			customer_can_checkout_with: "email_phone", // Must match the union type
			ask_for_zip_postal_code: 0,
		},
	},
};

const booleanToNumber = (value: boolean): number => (value ? 1 : 0);

type CheckoutField = keyof CheckoutCustomize['customizations']['checkout'];

const fieldsToWatch: CheckoutField[] = [
  'guest_checkout',
  'set_minimum_allowed_order_subtotal',
  'ask_for_company_name',
  'ask_for_zip_postal_code',
];

export const useCheckoutForm = (formStore: UseFormReturn<CheckoutCustomize>) => {
  fieldsToWatch.forEach((field) => {
    useEffect(() => {
      const value = formStore.watch(`customizations.checkout.${field}`);
      formStore.setValue(
        `customizations.checkout.${field}`,
        booleanToNumber(Boolean(value))
      );
    }, [formStore, field]);
  });
};
