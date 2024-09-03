import { useForm } from 'src/app/utils/hooks/form';
import { useTranslation } from 'react-i18next';

import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { GlobalDialog } from 'src/app/components/shared';
import Textarea from 'src/app/components/optimized/InputsFields/Textarea';
import { Button, CheckBox } from 'src/app/components/optimized';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/app/components/ui/select';
import useOrderStatusForm, { orderStatusFormInterface } from './HookOrderStatus';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { useAppDispatch } from 'src/app/store';
import {
	ChangeOrderStatus,
	getOrderInfo,
} from 'src/app/store/slices/ordersPage/allOrders/allOrdersAsyncThunks';

export default function OrderStatus({
	onClose,
	showOrderStatus,
	id,
}: {
	onClose: () => void;
	showOrderStatus: boolean;
	id: string;
}) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const { handelDefaultValue, orderStatusSchema } = useOrderStatusForm();

	const handleSubmit = (values: orderStatusFormInterface) => {
		dispatch(ChangeOrderStatus({ data: values, id })).then((promiseResponse:any) => {
			if ((promiseResponse.payload.code = 200)) {
				onClose();
				dispatch(getOrderInfo(id));
			}
		});
	};

	const { formStore, onSubmit } = useForm({
		schema: orderStatusSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	const options = ['pending', 'canceled', 'processing', 'approved', 'closed', 'completed'];
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit}>
				<GlobalDialog
					openDialog={showOrderStatus}
					handleClose={onClose}
					style={{ width: { md: '50%', xs: '90%' } }}
				>
					<div className='flex-col-global  gap-3'>
						<h3 className='title'>{t('Update order status')}</h3>

						<div className='flex-col-global  md:w-[70%]'>
							<SelectFormField
								name='status'
								label={t('Order status')}
								formStore={formStore}
								options={options?.map((e) => {
									return {
										value: e,
										label: e,
									};
								})}
								placeholder={t('Select option')}
							/>

							<FormField
								formStore={formStore}
								name='comment'
								label={t('Comment (optional)')}
								render={(field) => <Textarea {...field} placeholder={''} />}
							/>
						</div>

						<div>
							<CheckBox
								label={t('Notify customer')}
								checked={formStore.watch('customer_notified')}
								handleOnChange={(option) => {
									formStore.setValue('customer_notified', option);
								}}
							/>
						</div>

						<div className='flex justify-end items-center gap-4'>
							<Button variant='tertiary' onClick={onClose}>
								{t('cancel')}
							</Button>
							<Button variant='primary' onClick={onSubmit}>
								{t('update')}
							</Button>
						</div>
					</div>
				</GlobalDialog>
			</form>
		</Form>
	);
}
