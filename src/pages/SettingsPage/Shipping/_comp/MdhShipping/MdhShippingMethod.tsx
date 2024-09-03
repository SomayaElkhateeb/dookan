import { useEffect } from 'react';
import UseCustomMdhShipping, {
	Mdh_Shipping_FormSchema,
	MdhShippingFormSchemaValues,
} from './_hook/UseCustomMdhShipping';
import { useForm } from 'src/app/utils/hooks/form';
import { Form } from 'src/app/components/ui/form';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { Path } from 'react-hook-form';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useQuery } from 'react-query';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { postDhlShippingMethod } from 'src/app/store/slices/settingsPage/shipping/shippingAsyncThunks';
import { useNavigate } from 'react-router-dom';

export default function MdhShippingMethod() {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.shippingSettings);
	const { handelDefaultValue } = UseCustomMdhShipping();

	const handleSubmit = (values: MdhShippingFormSchemaValues) => {
		values.allowed_methods = values.allowed_methods?.map((e) => e?.id);
		values.allowed_country = values.allowed_country?.map((e) => e?.id);

		const formData = new FormData();
		for (const [key, value] of Object.entries(values)) {
			if (Array.isArray(value)) {
				value?.map((e) => {
					formData.append(`sales[carriers][mpdhl][${key}][]`, e);
				});
			} else {
				formData.append(`sales[carriers][mpdhl][${key}]`, value.toString());
			}
		}
		dispatch(postDhlShippingMethod(formData)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};
	const { formStore, onSubmit } = useForm({
		schema: Mdh_Shipping_FormSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useEffect(() => {
		formStore.setValue('active', formStore.watch('active') ? 1 : 0);
	}, [formStore.watch('active')]);
	useEffect(() => {
		formStore.setValue('sandbox_mode', formStore.watch('sandbox_mode') ? 1 : 0);
	}, [formStore.watch('sandbox_mode')]);

	const data: { name: Path<MdhShippingFormSchemaValues>; label: string; enable: boolean }[] = [
		{
			name: 'active',
			label: t('Active?'),
			enable: true,
		},
		{
			name: 'sandbox_mode',
			label: t('sandbox_mode'),
			enable: true,
		},
	];

	//  get CountriesData  with api request
	const { data: countrydata } = useQuery([`countriesData`], () => CountriesApi.countries());

	let CountriesData = countrydata?.data?.data;

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-5'>
				<SubHeader title={t('Setup Shipping Method')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='custom-grid-parent custom_container'>
					<div className='grid-left'>
						<div className='global-cards'>
							<div className='flex-col-global gap-5 md:w-[70%]'>
								<FormField
									formStore={formStore}
									name='access_id'
									label={t('access id')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormChoiceChips<MdhShippingFormSchemaValues>
									formStore={formStore}
									name='type'
									label='Type'
									options={['per_unit', 'per_order']}
								/>
								<FormField
									formStore={formStore}
									name='account_number'
									label={t('Account number')}
									render={(field) => <Input type='number' {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='weight_unit'
									label={t('weight unit')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='dimension_unit'
									label={t('Dimension unit')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								{/* ///////////////// */}
								<FormField
									formStore={formStore}
									name='ready_time'
									label={t('ready time')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='price_exchange_api'
									label={t('price exchange')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='error_message'
									label={t('error message')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='allow_seller'
									label={t('allow seller')}
									render={(field) => <Input type='number' {...field} placeholder={''} />}
								/>
								<FormField
									formStore={formStore}
									name='password'
									label={t('password')}
									render={(field) => <Input {...field} placeholder={''} />}
								/>
								<FormChoiceChips<MdhShippingFormSchemaValues>
									formStore={formStore}
									name='content_type'
									label='content type'
									options={['documents', 'non documents']}
								/>

								<SpecificAutoCompleteInput<MdhShippingFormSchemaValues>
									array={CountriesData?.map((e) => {
										return {
											id: e.code,
											name: e.name,
										};
									})}
									name='allowed_country'
									label={t('allowed country')}
									formStore={formStore}
								/>
								<SpecificAutoCompleteInput<MdhShippingFormSchemaValues>
									array={CountriesData?.map((e) => {
										return {
											id: e.code,
											name: e.name,
										};
									})}
									name='allowed_methods'
									label={t('allowed methods')}
									formStore={formStore}
								/>
							</div>
						</div>
					</div>
					<div className='grid-right'>
						{/* quick actions */}
						<QuickActions<MdhShippingFormSchemaValues>
							formStore={formStore}
							data={data}
							title={t('Quick actions')}
						/>
					</div>
					<SubHeaderMobileBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
}
