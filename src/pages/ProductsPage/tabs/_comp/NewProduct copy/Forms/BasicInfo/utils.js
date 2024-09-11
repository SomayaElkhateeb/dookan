import { z } from 'zod';
import { productCategorySchema } from './Fields/Category/utils';
import { productBrandSchema } from './Fields/Brand/utils';

export const productBasicInfoSchema = {
	nameEn: z.string().min(3).max(50),
	nameAr: z.string().min(3).max(50),
	sku: z.string().min(3).max(50),
	...productBrandSchema,
	...productCategorySchema,
};

export const productBasicInfoDefaultValues = {
	nameEn: '',
	nameAr: '',
	sku: '',
	brand_id: '',
	category: '',
};
