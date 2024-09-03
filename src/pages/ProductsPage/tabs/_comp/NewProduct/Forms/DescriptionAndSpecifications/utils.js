import { z } from 'zod';

// Define the schema for product specifications
export const productSpecificationsRawSchema = z.object({
	specNameEn: z.string().min(10).max(1000),
	specNameAr: z.string().min(10).max(1000),
	specValueEn: z.string().min(10).max(1000),
	specValueAr: z.string().min(10).max(1000),
});

// Define the schema for product description and specifications
export const productDescriptionAndSpecificationsRawSchema = {
	descriptionEn: z.string().min(10).max(1000),
	descriptionAr: z.string().min(10).max(1000),
	// specifications: z.array(productSpecificationsRawSchema),
};

// Define default values for the schema
export const productDescriptionAndSpecificationsDefaultValues = {
	descriptionEn: '',
	descriptionAr: '',
	// specifications: [],
};
