import { Button } from 'src/app/components/optimized';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import useAddCheckOutForm, { AddCheckOutFormValues } from './_hook/useAddCheckOutForm';
import { useTranslation } from 'react-i18next';
import { Form } from 'src/app/components/ui/form';
// import { Textarea } from 'src/app/components/ui/textarea';
// import FormField from 'src/app/components/ui/form/field';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { OrderInterface } from 'src/app/interface/OrderInterface';
import { useEffect } from 'react';
import {
	getShippingList,
	getShippingMethods,
} from 'src/app/store/slices/settingsPage/shipping/shippingAsyncThunks';
import { getPaymentMethods } from 'src/app/store/slices/settingsPage/payment/paymentMethods/paymentMethodsAsyncThunks';

const branches = [
	{ value: 'completed', label: 'completed' },
	{ value: 'completed', label: 'completed' },
];

export default function AddCheckout({
	onFinish,
	onBack,
	handleChckOutFormForm,
	id,
	orderItem,
	isLoadingAddOrUpdate,
}: {
	onFinish?: (e?: AddCheckOutFormValues) => void;
	onBack?: () => void;
	handleChckOutFormForm?: () => void;
	id?: string;
	orderItem?: OrderInterface;
	isLoadingAddOrUpdate: boolean;
}) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const { formStore, onSubmit, formValues } = useAddCheckOutForm(onFinish, id);
	const { merchantPaymentList } = useAppSelector((state) => state.merchantPaymentSettings);

	const { shippingMethod } = useAppSelector((state) => state.shippingSettings);
	const { shippingList } = useAppSelector((state) => state.shippingSettings);

	useEffect(() => {
		dispatch(getShippingMethods());
		dispatch(getShippingList());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getPaymentMethods());
	}, [dispatch]);

	const { paymentList } = useAppSelector((state) => state.paymentMethods);
	const paymentMethods = paymentList.map((item) => item.method);
	const shippingMethods = shippingMethod.map((item) => item.method);
	console.log('shippingMethods', shippingMethods);
	useEffect(() => {
		orderItem?.status && formStore.setValue('status', orderItem?.status);
		orderItem?.payment_title === 'Cash On Delivery' &&
			formStore.setValue('payment_method', 'cashondelivery');
		orderItem?.shipping_method && formStore.setValue('shipping_method', orderItem?.shipping_method);
	}, [orderItem]);
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-5 cardDetails-sharedClass p-5'>
				<div className='flex-col-global gap-5'>
					{/* purchase*/}
					<FormChoiceChips<AddCheckOutFormValues>
						checkoutForm
						formStore={formStore}
						name='purchase_method'
						label={t('Purchase method')}
						options={['online', 'branch']}
					/>
					{formValues.purchase_method === 'branch' && (
						<SelectFormField
							name='branch_id'
							label={t('Branch name')}
							formStore={formStore}
							options={branches}
							placeholder={t('Select branch')}
						/>
					)}
				</div>
				{/* payment */}
				<FormChoiceChips<AddCheckOutFormValues>
					checkoutForm
					formStore={formStore}
					name='payment_method'
					label={t('Payment methods')}
					// options={merchantPaymentList?.map((e) => e.payment_method.method)}
					options={paymentMethods}
				/>

				<FormChoiceChips<AddCheckOutFormValues>
					checkoutForm
					formStore={formStore}
					name='status'
					label={t('Order status')}
					options={['pending', 'canceled', 'processing', 'approved', 'closed', 'completed']}
				/>
				{/* {formValues.payment_method === 'PapPal' && (
					<>
						<SelectFormField
							name='creditCardOption'
							label={t('Order status')}
							formStore={formStore}
							options={branches}
							placeholder={t('Select option')}
						/>
						<FormField
							formStore={formStore}
							name='creditCardNote'
							label={t('Payment method')}
							render={(field) => <Textarea {...field} placeholder={t('Type note')} />}
						/>
					</>
				)} */}
				{/* delivery */}
				<FormChoiceChips<AddCheckOutFormValues>
					checkoutForm
					formStore={formStore}
					name='delivery_method'
					label={t('Delivery method')}
					options={['delivery', 'pickup']}
				/>
				{formValues.delivery_method === 'delivery' && (
					<FormChoiceChips<AddCheckOutFormValues>
						checkoutForm
						formStore={formStore}
						name='shipping_rate'
						label={t('Shipping rate')}
						options={['Fixed rate', 'free shipping']}
					/>
				)}
				<FormChoiceChips<AddCheckOutFormValues>
					checkoutForm
					formStore={formStore}
					name='shipping_method'
					label={t('Shipping method')}
					options={shippingMethods}
					// options={[
					// 	shippingList.free.method,
					// 	shippingList.flatrate.method,
					// 	shippingList.mpdhl.method,
					// ]}
				/>
				{/* {formValues.shipping_method === 'DHLRate' && (
					<>
						<SelectFormField
							name='dhlStatus'
							label={t('Order Status')}
							formStore={formStore}
							options={branches}
							placeholder={t('Select option')}
						/>
						<FormField
							formStore={formStore}
							name='dhlNote'
							label={t('Customer note')}
							render={(field) => <Textarea {...field} placeholder={t('Type note')} />}
						/>
					</>
				)} */}
				{/* {formValues.shipping_method === 'Aramex' && (
					<>
						<SelectFormField
							name='aramexStatus'
							label={t('Order status')}
							formStore={formStore}
							options={branches}
							placeholder={t('Select option')}
						/>
						<FormField
							formStore={formStore}
							name='aramexNote'
							label={t('Customer note')}
							render={(field) => <Textarea {...field} placeholder={t('Type note')} />}
						/>
					</>
				)} */}
				<div className='flex-btn-end'>
					<Button
						variant='secondary'
						text={t('Discard')}
						onClick={() => (onBack ? onBack() : handleChckOutFormForm && handleChckOutFormForm())}
					/>
					<Button
						loading={isLoadingAddOrUpdate}
						onClick={onSubmit}
						variant='primary'
						text={t('Finish')}
					/>
				</div>
			</form>
		</Form>
	);
}
