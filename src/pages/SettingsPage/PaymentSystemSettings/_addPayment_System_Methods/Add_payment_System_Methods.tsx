import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import useCustomHookAddPaymentSystemSettings, {
	Add_PaymentSystem_Schema,
	AddPaymentSystemSchemaValues,
} from './_hooks/UseHandelAddPaymentSysytem';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { Textarea } from 'src/app/components/ui/textarea';
import ImageInput from 'src/app/components/ui/form/ImageInput';
import { TfiUpload } from 'react-icons/tfi';
import { createPaymentMethod } from 'src/app/store/slices/settingsPage/payment/paymentMethods/paymentMethodsAsyncThunks';
import { useEffect } from 'react';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { useNavigate } from 'react-router-dom';
import { Path } from 'react-hook-form';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

export default function Add_payment_system_methods() {
	//  hooks
	const { t } = useTranslation();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.paymentMethods);
	const { handelDefaultValue } = useCustomHookAddPaymentSystemSettings();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleSubmit = (values: AddPaymentSystemSchemaValues) => {
		dispatch(createPaymentMethod(values)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};
	const { formStore, onSubmit } = useForm({
		schema: Add_PaymentSystem_Schema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	const data: { name: Path<AddPaymentSystemSchemaValues>; label: string; enable: boolean }[] = [
		{
			name: 'status',
			label: t('STATUS'),
			enable: true,
		},
		{
			name: 'sort',
			label: t('sort'),
			enable: true,
		},
	];

	const typeOptions = [{ label: t('Gateway'), value: 'gateway' }];

	useEffect(() => {
		formStore.setValue('status', formStore.watch('status') ? 1 : 0);
	}, [formStore.watch('status')]);
	useEffect(() => {
		formStore.setValue('sort', formStore.watch('sort') ? 1 : 0);
	}, [formStore.watch('sort')]);

	return (
		<Form {...formStore}>
			<form className='flex-col-global ' onSubmit={onSubmit}>
				<SubHeader title={t('Add New Payment Method')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='custom_container custom-grid-parent gap-5'>
					<div className='grid-left'>
						<div className='global-cards'>
							<div className=' md:w-[70%] flex-col-global'>
								<div className='flex-col-global'>
									<ImageInput<AddPaymentSystemSchemaValues> name={'icon'} formStore={formStore}>
										<TfiUpload className='text-[1.5rem]' />
										<p className='paragraph text-center'>{t('Add Icon')}</p>
									</ImageInput>
								</div>
								<FormField
									formStore={formStore}
									name='method'
									label={t('Method')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='method_title'
									label={t('Method title')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='description'
									label={t('Description')}
									render={(field) => <Textarea {...field} placeholder={''} />}
								/>
			
								<SelectFormField
									name='type'
									formStore={formStore}
									label={t('Type')}
									options={typeOptions}
								/>

								<FormField
									formStore={formStore}
									name='monthly_fees_title'
									label={t('monthly fees title')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='monthly_fees'
									label={t('Monthly fees')}
									render={(field) => <Input type='number' {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='extra_fee'
									label={t('extra fees')}
									render={(field) => <Input type='number' {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='sercret_code'
									label={t('secret code')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='key_code'
									label={t('key code')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
							</div>
						</div>
					</div>
					<div className='grid-right'>
						<QuickActions<AddPaymentSystemSchemaValues>
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
