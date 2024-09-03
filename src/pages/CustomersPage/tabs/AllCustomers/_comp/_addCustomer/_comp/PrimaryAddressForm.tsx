import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';

import CustomPhoneInput from 'src/app/components/optimized/UiKits/CustomPhoneInput';

import { AddCustomerPageSchemaValues } from '../_hook/HookForAddCustomerForm';
import { useQuery } from 'react-query';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import { CountriesInterface } from 'src/app/interface/CountriesInterface';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

export default function PrimaryAddressForm({
	formStore,
}: {
	formStore: UseFormReturn<AddCustomerPageSchemaValues>;
}) {
	//  hooks
	const { t } = useTranslation();

	//  get CountriesData  with api request
	const { isLoading, data, isError, error, refetch } = useQuery([`countriesData`], () =>
		CountriesApi.countries(),
	);
	let CountryId = formStore.getValues('default_address.country')
		? formStore.getValues('default_address.country')
		: '';
	const { data: CitiesData, refetch: refetchCities } = useQuery([`citiesData`, CountryId], () =>
		CountriesApi.cities(CountryId ? CountryId : ''),
	);
	let CountriesData = data?.data?.data;
	let cities = CitiesData?.data?.data;

	return (
		<div className='global-cards gap-[1.3rem]'>
			<h2 className='title'>{t('Add primary address')}</h2>
			<div className='flex-col-global md:w-[65%]'>
				<FormField
					formStore={formStore}
					name='default_address.first_name'
					label={t('First name')}
					render={(field) => <Input {...field} placeholder={''} />}
				/>
				<FormField
					formStore={formStore}
					name='default_address.last_name'
					label={t('Last name')}
					render={(field) => <Input {...field} placeholder={''} />}
				/>

				{CountriesData?.length > 0 && (
					<SelectFormField
						name='default_address.country'
						label={t('Country')}
						formStore={formStore}
						options={CountriesData?.map((e: CountriesInterface) => {
							return {
								label: e?.name,
								value: e?.id?.toString(),
							};
						})}
						placeholder={t('Select country')}
					/>
				)}
				{cities?.length > 0 && (
					<SelectFormField
						name='default_address.city'
						label={t('City')}
						formStore={formStore}
						options={
							cities?.length > 0 &&
							cities?.map((e: CountriesInterface) => {
								return {
									label: e?.name,
									value: e?.id?.toString(),
								};
							})
						}
						placeholder={t('Select city')}
					/>
				)}

				<FormField
					formStore={formStore}
					name='default_address.state'
					label={t('Area / District')}
					render={(field) => <Input {...field} placeholder={'area'} />}
				/>
				<FormField
					formStore={formStore}
					name='default_address.street'
					label={t('Street')}
					render={(field) => <Input {...field} placeholder={'street'} />}
				/>

				<FormField
					formStore={formStore}
					name='default_address.building'
					label={t('Building')}
					render={(field) => <Input {...field} placeholder={'building'} />}
				/>
				<FormField
					formStore={formStore}
					name='default_address.landmark'
					label={t('Landmark')}
					render={(field) => <Input {...field} placeholder={'landmark'} />}
				/>
				<FormField
					formStore={formStore}
					name='default_address.phone'
					label={t('Phone Number')}
					render={(field) => (
						<CustomPhoneInput
							value={field.value}
							onHandleChange={field.onChange}

							// isLoading={isLoading}
						/>
					)}
				/>
			</div>
		</div>
	);
}
