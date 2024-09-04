import { z } from 'zod';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
const zodNumber = z.coerce.number().min(0).max(1);
export interface OrderCustomize {
	customizations: {
		order_invoice: {
			show_tax_number: number;
			tax_number: number;
			hide_product_images: number;
			show_products_description: number;
			show_sku: number;
			show_contacts: number;
		};
	};
}

export const OrderCustomizeSchema = {
	customizations: z.object({
		order_invoice: z.object({
			show_tax_number: zodNumber,
			tax_number: z.coerce.number().positive().min(1),
			hide_product_images: zodNumber,
			show_products_description: zodNumber,
			show_sku: zodNumber,
			show_contacts: zodNumber,
		}),
	}),
};

export const defaultValues: OrderCustomize = {
	customizations: {
		order_invoice: {
			show_tax_number: 0,
			tax_number: 0,
			hide_product_images: 0,
			show_products_description: 0,
			show_sku: 0,
			show_contacts: 0,
		},
	},
};

type OrderField = keyof OrderCustomize['customizations']['order_invoice'];

const orderFields: OrderField[] = [
	'show_tax_number',
	'hide_product_images',
	'show_products_description',
	'show_sku',
	'show_contacts',
];

export const useOrderForm = (formStore: UseFormReturn<OrderCustomize>) => {
	orderFields.forEach((field) => {
		useEffect(() => {
			const value = formStore.watch(`customizations.order_invoice.${field}`);
			formStore.setValue(`customizations.order_invoice.${field}`, Boolean(value) ? 1 : 0);
		}, [formStore, field]);
	});
};
