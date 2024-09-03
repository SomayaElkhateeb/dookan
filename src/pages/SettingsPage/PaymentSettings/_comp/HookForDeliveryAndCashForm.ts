
import { z } from "zod";

export interface DeliveryPaymentTypes {
	instructions?: string;
	minimumPrice?: number;
	maximumPrice?: number;
}


// ////////////////////////
export default function useCustomHookDeliveryAndCashForm(addCondition: boolean) {

	// //////////////////////////////////////////
	const addPaymentSchema = () => {
		return {
			instructions: z.string().optional(),
			minimumPrice: addCondition
				? z.coerce.number().positive().min(1)
				: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),
			maximumPrice: addCondition
				? z.coerce.number().positive().min(1)
				: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),
		};
	};


	const handelDefaultValue = () => {
		return {
			instructions: '',
			minimumPrice: 0,
			maximumPrice: 0,
		};
	};

	

	return {
		addPaymentSchema,
		handelDefaultValue
	}
}