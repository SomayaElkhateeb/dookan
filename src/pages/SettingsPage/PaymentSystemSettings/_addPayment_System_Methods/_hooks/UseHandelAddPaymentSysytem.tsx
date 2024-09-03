import { InferredZodSchema } from 'src/app/utils/hooks/form';
import { z } from 'zod';

const zodNumber = z.coerce.number().positive().min(1);
const zodString = z.string().min(1);

export const Add_PaymentSystem_Schema = {
	method: zodString,
	method_title: zodString,
	description: zodString,
	type: zodString,
	monthly_fees_title: zodString,
	monthly_fees: zodNumber,
	extra_fee: zodNumber,
	sercret_code: zodString,
	key_code: zodString,
	status: z.number(),
	icon: z.instanceof(File),
	sort: z.number(),
};

export type AddPaymentSystemSchemaValues = InferredZodSchema<typeof Add_PaymentSystem_Schema>;
export default function useCustomHookAddPaymentSystemSettings() {
	const handelDefaultValue = () => {
		return {
			method: '',
			method_title: '',
			description: '',
			type: '',
			monthly_fees_title: '',
			monthly_fees: 0,
			extra_fee: 0,
			sercret_code: '',
			key_code: '',
			status: 0,
			icon: undefined,
			sort: 0,
		};
	};

	return {
		handelDefaultValue,
	};
}
