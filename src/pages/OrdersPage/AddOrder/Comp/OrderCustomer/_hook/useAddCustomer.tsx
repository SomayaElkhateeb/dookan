import { z } from 'zod';
import { useForm } from 'src/app/utils/hooks/form';

interface AddCustomer {
	fullName: string;
	phone: string;
	email: string;
}

export default function useAddCustomer() {
	const handelDefaultValue = (): AddCustomer => {
		return {
			fullName: '',
			phone: '',
			email: '',
		};
	};

	const handleSubmit = (values: AddCustomer) => {
		console.log(values);
	};

	const RequireData = z.string().min(5);
	const addCustomerSchema = () => {
		return {
			fullName: RequireData,
			phone: RequireData,
			email: RequireData.email(),
		};
	};
	const { formStore, onSubmit } = useForm({
		schema: addCustomerSchema(),
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	return {
		formStore,
		onSubmit,
	};
}
