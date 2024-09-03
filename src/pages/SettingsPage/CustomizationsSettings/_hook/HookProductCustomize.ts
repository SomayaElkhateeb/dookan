import { z } from 'zod';

export interface ProductCustomize {
	customizations: {
		product: {
			activate_product_comparison: number;
			auto_archive_order: number;
			stock_limit: number;
			show_purchases_number_in_product_page: number;
			when_purchases_number_exceeds_times: number;
			download_digital_product_limit: number;
		}
	}
}

export default function useCustomHookProductCustomize() {
	const zodNumber = z.coerce.number().min(0).max(1);

	const productCustomizeSchema = {
		customizations: z.object({
			product: z.object({
				activate_product_comparison: zodNumber,
				auto_archive_order: zodNumber,
				stock_limit: zodNumber,
				show_purchases_number_in_product_page: zodNumber,
				when_purchases_number_exceeds_times: zodNumber,
				download_digital_product_limit: zodNumber,
			})
		}),
	};

	const handelDefaultValue = (): ProductCustomize => {
		return {
			customizations: {
				product: {
					activate_product_comparison: 0,
					auto_archive_order: 0,
					stock_limit: 0,
					show_purchases_number_in_product_page: 0,
					when_purchases_number_exceeds_times: 0,
					download_digital_product_limit: 0,
				}
			}
		};
	};

	return {
		handelDefaultValue,
		productCustomizeSchema,
	};
}
