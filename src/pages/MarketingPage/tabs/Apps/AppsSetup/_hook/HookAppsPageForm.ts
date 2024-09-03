import { useForm } from 'src/app/utils/hooks/form';
import { selectItemsInterface } from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/GeneralInfoCustomerForm';
import { z } from 'zod';

export interface IAppsPage {
	isCheck: boolean;
	idPixel: number;
	action?: selectItemsInterface[];
}

export default function useCustomHookApps() {
	const handelDefaultValue = () => {
		return {
			isCheck: false,
			idPixel: 0,
			action: [],
		};
	};

	const appSchema = {
		isCheck: z.boolean(),
		idPixel: z.coerce.number().positive().min(1),
		action: z
			.optional(
				z.array(
					z.object({
						id: z.string().min(1),
						name: z.string().min(1),
					}),
				),
			)
			.default([]),
	};

	const handleSubmit = (values: IAppsPage) => {
		// console.log(values);
	};
	const { formStore, onSubmit } = useForm({
		schema: appSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return {
		handelDefaultValue,
		appSchema,
		formStore,
		onSubmit,
	};
}
