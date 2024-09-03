import { z } from 'zod';

export interface TaxCategory {
	code: string;
	name: string;
	description?: string;
	taxrates: string[];
}

const stringZod = z.string().min(1);

export default function useCustomHookAddTaxCategory() {
    const handelDefaultValue = () => {
		return {
			cod: '',
			name: '',
			description: '',
			taxrates: '',
		};
	};

    const AddTaxCategorySchema = {
        code: stringZod,
        name: stringZod,
        description: stringZod.optional(),
        taxrates: stringZod,
    };

    return {
		handelDefaultValue,
		AddTaxCategorySchema,
	};
}
