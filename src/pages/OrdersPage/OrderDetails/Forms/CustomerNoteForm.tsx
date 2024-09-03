import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useForm } from 'src/app/utils/hooks/form';
import { Button } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import Textarea from 'src/app/components/optimized/InputsFields/Textarea';
import {
	AddOrderNote,
	getOrderInfo,
} from 'src/app/store/slices/ordersPage/allOrders/allOrdersAsyncThunks';
import { useAppDispatch } from 'src/app/store';

export interface INoteForm {
	comment: string;
}

export default function CustomerNoteForm({ onClose, id }: { onClose: () => void; id: string }) {
	const { t } = useTranslation();
	
	const dispatch = useAppDispatch();
	const noteSchema = {
		comment: z.string().min(5, { message: t('Customer note is required') }),
	};

	const handelDefaultValue = () => {
		return {
			comment: '',
		};
	};

	const handleSubmit = (values: INoteForm) => {
		dispatch(AddOrderNote({ data: values, id })).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				onClose();
				dispatch(getOrderInfo(id));
			}
		});
	};

	const { formStore, onSubmit } = useForm({
		schema: noteSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-3 p-3'>
				<div className='lg:w-[65%] w-full'>
					<FormField
						formStore={formStore}
						name='comment'
						label={t('Customer note')}
						render={(field) => <Textarea {...field} placeholder={t('Type a note')} />}
					/>
				</div>
				<div className='flex-row-global justify-end  gap-4'>
					<Button onClick={onClose} variant='secondary'>
						{t('Discard')}
					</Button>
					<Button onClick={onSubmit} variant='primary'>
						{t('Save')}
					</Button>
				</div>
			</form>
		</Form>
	);
}
