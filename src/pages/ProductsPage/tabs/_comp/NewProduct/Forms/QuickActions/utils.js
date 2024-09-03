import { z } from 'zod';

export const productQuickActionsSchema = {
	status: z.number(),
	// isFeaturedOnTheFrontPage: z.boolean().default(false),
};

// Define default values for the schema
export const productQuickActionsDefaultValues = {
	status: true,
	// isFeaturedOnTheFrontPage: false,
};
