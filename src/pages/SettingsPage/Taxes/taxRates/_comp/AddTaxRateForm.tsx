import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';

import { TaxRateInterface } from '../_hook/HookTaxRate';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { useQuery } from 'react-query';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { CountriesInterface } from 'src/app/interface/CountriesInterface';
import { useEffect } from 'react';

const AddTaxRateForm = ({ formStore }: { formStore: UseFormReturn<TaxRateInterface> }) => {
	const { t } = useTranslation();

	const { data } = useQuery([`countriesData`], () => CountriesApi.countries());
	const CountriesData = data?.data?.data;

	useEffect(() => {
		formStore.setValue('is_zip', formStore.watch('is_zip') ? 1 : 0);
	}, [formStore.watch('is_zip')]);

	return (
		<div className='global-cards'>
			<div className='flex gap-4'>
				<div className='w-full'>
					<FormField
						formStore={formStore}
						name='identifier'
						label={t('Identifier')}
						render={(field) => <Input {...field} placeholder={t('e.g.tax-one')} />}
					/>
				</div>
					<div className='w-full'>
						<FormField
							formStore={formStore}
							name='zip_code'
							label={t('ZIP Code')}
							render={(field) => <Input type='number' {...field} />}
						/>
					</div>
			</div>

			{CountriesData?.length > 0 && (
				<SelectFormField
					name='country'
					label={t('Country')}
					formStore={formStore}
					options={CountriesData?.map((e: CountriesInterface) => ({
						label: e?.name,
						value: e?.id?.toString(),
					}))}
					placeholder={t('Select country')}
				/>
			)}
			<div className='w-fit '>
				<FormSwitchField<TaxRateInterface>
					formStore={formStore}
					name='is_zip'
					description={t('Enable Zip Range')}
					enable
				/>
			</div>
			{formStore.watch('is_zip') === 1 && (
				<div className='flex gap-4'>
					<div className='w-full'>
						<FormField
							formStore={formStore}
							name='zip_from'
							label={t('Zip From')}
							render={(field) => <Input type='number' {...field} />}
						/>
					</div>
					<div className='w-full'>
						<FormField
							formStore={formStore}
							name='zip_to'
							label={t('Zip To')}
							render={(field) => <Input type='number' {...field} />}
						/>
					</div>
				</div>
			)}

			<FormField
				formStore={formStore}
				name='tax_rate'
				label={t('Rate')}
				render={(field) => <Input {...field} placeholder={t('Enter rate')} />}
			/>
		</div>
	);
};

export default AddTaxRateForm;
