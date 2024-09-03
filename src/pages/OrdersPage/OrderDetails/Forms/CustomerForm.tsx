import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import CustomPhoneInput from 'src/app/components/optimized/UiKits/CustomPhoneInput';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useForm } from 'src/app/utils/hooks/form';
import useOrderCustomerForm, { OrdercustomerFormInterface } from './HookCustomerForm';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect } from 'react';
import {
	getOrderInfo,
	updateOrderCustomer,
} from 'src/app/store/slices/ordersPage/allOrders/allOrdersAsyncThunks';

export default function CustomerForm({ handleCustomerForm,isLoadingAddOrUpdate }: { handleCustomerForm: () => void,isLoadingAddOrUpdate:boolean }) {
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	// custom hook
	const { handelDefaultValue, orderCustomerSchema } = useOrderCustomerForm();

	const handleSubmit = (values: OrdercustomerFormInterface) => {
		dispatch(updateOrderCustomer({ data: values, id: ordderItem.id })).then(
			(promiseResponse: any) => {
				if ((promiseResponse.payload.code = 200)) {
					handleCustomerForm();
					dispatch(getOrderInfo(ordderItem?.id));
				}
			},
		);
	};

	const { formStore, onSubmit } = useForm({
		schema: orderCustomerSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	const handleSubmitBtn = () => {
		onSubmit();
		// handleCustomerForm();
	};
	useEffect(() => {
		formStore.setValue('customer_first_name', ordderItem.customer_first_name);
		formStore.setValue('customer_last_name', ordderItem.customer_last_name);
		formStore.setValue('customer_email', ordderItem.customer_email);
		formStore.setValue('customer_phone', ordderItem.customer_phone);
	}, [ordderItem]);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-4 '>
				<div className='flex-col-global gap-4'>
					<FormField
						formStore={formStore}
						label={t('First name')}
						name='customer_first_name'
						render={(field) => <Input {...field} placeholder={''} />}
					/>
					<FormField
						formStore={formStore}
						label={t('Last name')}
						name='customer_last_name'
						render={(field) => <Input {...field} placeholder={''} />}
					/>

					<FormField
						formStore={formStore}
						label={t('Email')}
						name='customer_email'
						render={(field) => <Input {...field} placeholder={''} />}
					/>

					<FormField
						formStore={formStore}
						label={t('Phone')}
						name='customer_phone'
						render={(field) => (
							<CustomPhoneInput value={field.value} onHandleChange={field.onChange} />
						)}
					/>
				</div>
				{/* btns */}
				<div className='flex justify-end items-center gap-4'>
					<Button onClick={handleCustomerForm} variant='secondary'>
						{t('Discard')}
					</Button>
					<Button loading={isLoadingAddOrUpdate} onClick={handleSubmitBtn} variant='primary'>
						{t('Save')}
					</Button>
				</div>
			</form>
		</Form>
	);
}
