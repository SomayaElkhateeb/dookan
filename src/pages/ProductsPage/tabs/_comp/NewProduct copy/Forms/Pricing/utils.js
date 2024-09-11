import { z } from 'zod';

export const productPricingSchema = {
	price: z.coerce.number().min(1).default(0),
	discount: z.coerce.number().min(0).optional(),
	cost: z.coerce.number().min(0).optional(),
	taxable: z.number(),
	// continue_selling:z.number(),
	profit: z.coerce.number().min(0).optional(),
	// bulkPrices: z.array(
	// 	z.object({
	// 		tempId: z.string(),
	// 		from: z.coerce.number().min(0),
	// 		to: z.coerce.number().min(0),
	// 		currency: z.string(),
	// 	}),
	// ),
};

// Define default values for the schema
export const productPricingDefaultValues = {
	price: 0,
	discount: undefined,
	cost: undefined,
	taxable: 0,
	// continue_selling:0,
	profit: undefined,
	// bulkPrices: [],
};
