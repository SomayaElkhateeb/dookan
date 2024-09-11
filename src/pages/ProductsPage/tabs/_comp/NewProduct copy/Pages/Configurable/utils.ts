import { z, ZodRawShape } from 'zod';
import {
	// Schema
	productDescriptionAndSpecificationsRawSchema,
	productFaqsSchema,
	productInventoryBranchesSchema,
	productOptionsAndVariationsRawSchema,
	productPricingSchema,
	productQuickActionsSchema,
	productSeoSchema,
	productShippingSchema,
	productBasicInfoSchema,
	// DefaultValues
	productBasicInfoDefaultValues,
	productBundleDefaultValues,
	productDescriptionAndSpecificationsDefaultValues,
	productFaqsDefaultValues,
	productOptionsAndVariationsDefaultValues,
	productPricingDefaultValues,
	productQuickActionsDefaultValues,
	productSeoDefaultValues,
	productShippingDefaultValues,
	productInventoryBranchesDefaultValues,
	productVariantSchema,
	productVariantDefaultValues,
} from '../../Forms';

export const ProductSchema: ZodRawShape = {
	images: z.object({
		files: z.array(z.instanceof(File)).optional()
	}),
	imagesMedia: z.array(z.instanceof(File)),
	videoMedia: z.instanceof(File),
	threeSixtyViewMedia: z.instanceof(File),
	threeDModelMedia: z.instanceof(File),
	...productBasicInfoSchema,
	...productDescriptionAndSpecificationsRawSchema,
	...productPricingSchema,
	...productInventoryBranchesSchema,
	...productShippingSchema,
	...productOptionsAndVariationsRawSchema,
	...productVariantSchema,
	...productSeoSchema,
	...productFaqsSchema.shape,
	...productQuickActionsSchema,
};

export const ProductDefaultValues = {
	images: { files: [] },
	...productBasicInfoDefaultValues,
	...productBundleDefaultValues,
	...productDescriptionAndSpecificationsDefaultValues,
	...productFaqsDefaultValues,
	...productOptionsAndVariationsDefaultValues,
	...productVariantDefaultValues,
	...productPricingDefaultValues,
	...productQuickActionsDefaultValues,
	...productSeoDefaultValues,
	...productShippingDefaultValues,
	...productInventoryBranchesDefaultValues,

};
