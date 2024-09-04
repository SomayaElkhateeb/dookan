import { z } from 'zod';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
const zodNumber = z.coerce.number().min(0).max(1);

export interface ProductCustomize {
	customizations: {
		product: {
			activate_product_comparison: number;
			auto_archive_order: number;
			stock_limit: number;
			show_purchases_number_in_product_page: number;
			when_purchases_number_exceeds_times: number;
			download_digital_product_limit: number;
		};
	};
}

export const productCustomizeSchema = {
	customizations: z.object({
		product: z.object({
			activate_product_comparison: zodNumber,
			auto_archive_order: zodNumber,
			stock_limit: zodNumber,
			show_purchases_number_in_product_page: zodNumber,
			when_purchases_number_exceeds_times: zodNumber,
			download_digital_product_limit: zodNumber,
		}),
	}),
};
export const defaultValues: ProductCustomize = {
	customizations: {
		product: {
			activate_product_comparison: 0,
			auto_archive_order: 0,
			stock_limit: 0,
			show_purchases_number_in_product_page: 0,
			when_purchases_number_exceeds_times: 0,
			download_digital_product_limit: 0,
		},
	},
};

type ProductField = keyof ProductCustomize['customizations']['product'];

const productFields: ProductField[] = [
	'activate_product_comparison',
	'auto_archive_order',
	'stock_limit',
	'show_purchases_number_in_product_page',
	'when_purchases_number_exceeds_times',
	'download_digital_product_limit',
];

export const useProductForm = (formStore: UseFormReturn<ProductCustomize>) => {
	productFields.forEach((field) => {
		useEffect(() => {
			const value = formStore.watch(`customizations.product.${field}`);
			formStore.setValue(`customizations.product.${field}`, Boolean(value) ? 1 : 0);
		}, [formStore, field]);
	});
};
