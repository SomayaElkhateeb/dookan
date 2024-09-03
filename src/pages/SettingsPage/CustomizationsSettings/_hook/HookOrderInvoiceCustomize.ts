import { z } from 'zod';

export interface OrderCustomize {
	customizations: {
		order_invoice: {
			show_tax_number: number;
			tax_number: number;
			hide_product_images: number;
			show_products_description: number;
			show_sku: number;
			show_contacts: number;
		}
	}
}

export default function useCustomHookOrderCustomize() {
	const zodNumber = z.coerce.number().min(0).max(1);

	const OrderCustomizeSchema = {
		customizations: z.object({
			order_invoice: z.object({
				show_tax_number: zodNumber,
				tax_number: z.coerce.number().positive().min(1),
				hide_product_images: zodNumber,
				show_products_description: zodNumber,
				show_sku: zodNumber,
				show_contacts: zodNumber,
			})
		}),
	};

	const handelDefaultValue = (): OrderCustomize => {
		return {
			customizations: {
				order_invoice: {
					show_tax_number: 0,
					tax_number: 0,
					hide_product_images: 0,
					show_products_description: 0,
					show_sku: 0,
					show_contacts: 0,
				},
			}
		};
	};

	return {
		handelDefaultValue,
		OrderCustomizeSchema,
	};
}
