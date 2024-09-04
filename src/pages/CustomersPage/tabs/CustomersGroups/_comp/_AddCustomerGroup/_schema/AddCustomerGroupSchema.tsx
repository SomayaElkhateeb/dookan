import { InferredZodSchema } from 'src/app/utils/hooks/form';
import { z } from 'zod';

const RequiredString = z.string().min(1);

export const AddCustomerGroupPageSchema = {
	customers: z.array(
		z.object({
			id: RequiredString,
			name: RequiredString,
		}),
	),
	code: z.optional(RequiredString).or(z.literal('')),
	name: RequiredString,
	description: RequiredString,
	status: z.number().optional(),
};
export type AddCustomerGroupPageSchemaValues = InferredZodSchema<typeof AddCustomerGroupPageSchema>;
