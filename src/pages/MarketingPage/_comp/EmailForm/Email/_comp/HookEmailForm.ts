import { selectItemsInterface } from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/GeneralInfoCustomerForm';
import { z } from 'zod';
export interface IEmailForm {
	to: selectItemsInterface[];
	subject: string;
	from: string;
}
export default function useCustomHookEmailForm() {
	const handelDefaultValue = () => {
		return {
			to: [],
			subject: '',
			from: '',
		};
	};

	const emailFormSchema = () => {
		return {
			to: z
				.array(
					z.object({
						id: z.string().min(1),
						name: z.string().min(1),
					}),
				)
				.min(1),
			subject: z.string().min(1),
			from: z.string().min(1).email(),
		};
	};

	return {
		handelDefaultValue,
		emailFormSchema,
	};
}
