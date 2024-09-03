import { useForm } from 'src/app/utils/hooks/form';
import { z } from 'zod';

export interface reviewsInterface {
	reply: string;
}

export const handelReviewsDefaultValue = () => {
	return {
		reply: '',
	};
};

export const reviewsSchema = () => {
	return {
		reply: z.string().min(7),
	};
};

export default function useCustomReviewsForm() {
	const handleSubmit = (values: reviewsInterface) => {
		console.log('values: ', values);
	};

	const { formStore, onSubmit } = useForm({
		schema: reviewsSchema(),
		handleSubmit: handleSubmit,
		defaultValues: handelReviewsDefaultValue(),
	});

	return { formStore, onSubmit };
}
