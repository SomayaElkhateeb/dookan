import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { Form } from 'src/app/components/ui/form';
import AccountDetailsForm from './_comp/AccountDetailsForm';
import ActivateConditions from './_comp/ActivateConditions';
import { AddPayment_MethodTypes } from './_hook/useAddMerchantPaymentMethod';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getMerchantPaymentShow,
	postMerchantPayment,
	putUpdateMerchantPayment,
} from 'src/app/store/slices/settingsPage/payment/merchantPaymentMethods/merchantPaymentAsyncThunks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'src/app/utils/hooks/form';
import useAddMerchantPaymentMethod from './_hook/useAddMerchantPaymentMethod';
import { Path } from 'react-hook-form';

export default function AddPaymentMethod() {
	//  hooks
	const { t } = useTranslation();
	// const [apply_with, setApply_with] = useState('All');
	const { AddMerchantPaymentMethodSchema, handelDefaultValue } = useAddMerchantPaymentMethod();

	// redux
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate, merchantPaymentShow } = useAppSelector(
		(state) => state.merchantPaymentSettings,
	);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	const handleSubmit = (values: AddPayment_MethodTypes) => {
		!id
			? dispatch(postMerchantPayment(values)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  })
			: dispatch(putUpdateMerchantPayment({ data: values, id })).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  });
	};
	const { formStore, onSubmit } = useForm({
		schema: AddMerchantPaymentMethodSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	const data: { name: Path<AddPayment_MethodTypes>; label: string; enable: boolean }[] = [
		{
			name: 'active',
			label: t('Activated'),
			enable: true,
		},
		{
			name: 'main_method',
			label: t('Assign as main method'),
			enable: true,
		},
		{
			name: 'show_in_footer',
			label: t('Show on footer'),
			enable: true,
		},
	];

	// useEffect(() => {
	// 	setApply_with(formStore.watch('apply_with'));
	// }, [formStore.watch('apply_with')]);

	useEffect(() => {
		formStore.setValue('active', formStore.watch('active') ? 1 : 0);
	}, [formStore.watch('active')]);
	useEffect(() => {
		formStore.setValue('main_method', formStore.watch('main_method') ? 1 : 0);
	}, [formStore.watch('main_method')]);
	useEffect(() => {
		formStore.setValue('show_in_footer', formStore.watch('show_in_footer') ? 1 : 0);
	}, [formStore.watch('show_in_footer')]);

	useMemo(() => {
		id && dispatch(getMerchantPaymentShow(id));
	}, [id]);

	//  get customer info with id params to fill inputs with it
	useMemo(() => {
		if (id) {
			formStore.setValue('payment_method_id', merchantPaymentShow.payment_method_id.toString());
			formStore.setValue('price_more_than', merchantPaymentShow.price_more_than);
			formStore.setValue('items_more_than', merchantPaymentShow.items_more_than);
			formStore.setValue('additional_data', merchantPaymentShow.additional_data);
			formStore.setValue('account_number', Number(merchantPaymentShow.account_number));
			formStore.setValue('account_name', merchantPaymentShow.account_name);
			formStore.setValue('bank_name', merchantPaymentShow.bank_name);
			formStore.setValue('iban', Number(merchantPaymentShow.iban));
			merchantPaymentShow?.active > 0
				? formStore.setValue('active', 1)
				: formStore.setValue('active', 0);
			merchantPaymentShow?.main_method > 0
				? formStore.setValue('main_method', 1)
				: formStore.setValue('main_method', 0);
			merchantPaymentShow?.show_in_footer > 0
				? formStore.setValue('show_in_footer', 1)
				: formStore.setValue('show_in_footer', 0);
		}
	}, [id, merchantPaymentShow]);
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global '>
				<SubHeader title={t('Add New Payment Method')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='grid gap-5 custom_container lg:grid-cols-3'>
					<div className='grid gap-5 lg:col-span-2 '>
						<AccountDetailsForm formStore={formStore} />
						<ActivateConditions formStore={formStore} />
					</div>
					<div className='lg:col-span-1'>
						<QuickActions<AddPayment_MethodTypes>
							formStore={formStore}
							data={data}
							title={t('Quick actions')}
						/>
					</div>
				</div>
				<SubHeaderMobileBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
			</form>
		</Form>
	);
}
