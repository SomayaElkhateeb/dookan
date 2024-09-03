import { InferredZodSchema } from "src/app/utils/hooks/form";
import { z } from "zod";
// //////////////////////////////////
const stringValidation = z.string().min(1);
// ////////////////////////////
export const addBrandFormSchema = {
    name_en: stringValidation,
    name_ar: stringValidation,
    description_en: stringValidation,
    description_ar: stringValidation,
    slug: stringValidation,
    
    image: z.instanceof(File),
    status: z.number(),

    products: z
        .array(
            z.object({
                id: stringValidation,
                name: stringValidation,
            }),
        )
        .optional(),
};

export type AddBrandSchemaValues = InferredZodSchema<typeof addBrandFormSchema>;