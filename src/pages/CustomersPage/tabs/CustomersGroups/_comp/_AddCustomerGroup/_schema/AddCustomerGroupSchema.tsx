import { InferredZodSchema } from 'src/app/utils/hooks/form';
import { z } from 'zod';

const Requiredstring = z.string().min(1);

export const AddCustomerGroupPageSchema = {
	customers: z.array(
		z.object({
			id: Requiredstring,
			name: Requiredstring,
		}),
	),
	code: z.optional(Requiredstring).or(z.literal('')),
	name: Requiredstring,
	description: Requiredstring,
	status: z.number().optional(),
};
export type AddCustomerGroupPageSchemaValues = InferredZodSchema<typeof AddCustomerGroupPageSchema>;
