import { UseFormReturn } from 'react-hook-form';
import { Input } from 'src/app/components/ui/input';
import { useTranslation } from 'react-i18next';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { BranchesType } from './_hook/useAddBranchForm';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import AddressBranch from './AddressBranch';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import { useQuery } from 'react-query';
import FormField from 'src/app/components/ui/form/field';
import CustomPhoneInput from 'src/app/components/optimized/UiKits/CustomPhoneInput';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { CountriesInterface } from 'src/app/interface/CountriesInterface';
import GoogleMapComponent from 'src/app/components/ui/GoogleMapComponent';
import { useState } from 'react';

export default function BranchInfo({ formStore }: { formStore: UseFormReturn<BranchesType> }) {
	//  hooks
	const { t, i18n } = useTranslation();
	const currentLocale = i18n.language;
	const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
	const [isDisablePickButton, setDisablePickButton] = useState<boolean>(false);

    //  get CountriesData  with api request
    const { data: countriesData } = useQuery(['countriesData'], () => CountriesApi.countries());
	
    const CountryId = formStore.getValues('en.country') || '';
    const { data: citiesData } = useQuery(['city', CountryId], () => {
        if (CountryId) {
            return CountriesApi.cities(CountryId);
        }
        return Promise.resolve(null);
    }, {
        enabled: !!CountryId 
    });

    const countries = countriesData?.data?.data || [];
    const cities = citiesData?.data?.data || [];

    console.log('Cities', cities); // []

	return (
		<div className='cardDetails-sharedClass p-5'>
			<section className='flex flex-col gap-4 lg:w-2/3 '>
				<FormChoiceChips<BranchesType>
					formStore={formStore}
					name='type'
					label={t('Branch Type')}
					options={['commercialBranch', 'warehouse']}
				/>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.name', label: 'En' },
						{ name: 'ar.name', label: 'عربي' },
					]}
					label={t('Branch name')}
					renderer={(field) => <Input {...field} placeholder={t('name')} />}
				/>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.address', label: 'En' },
						{ name: 'ar.address', label: 'عربي' },
					]}
					label={t('Address')}
					renderer={(field) => <Input {...field} placeholder={t('address')} />}
				/>

				<div className='col-span-2'>
					{/* latitude &  longitude */}
					<GoogleMapComponent
						setLocationEnabled={setLocationEnabled}
						setDisablePickButton={setDisablePickButton}
						height='300px'
					/>
				</div>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.building', label: 'En' },
						{ name: 'ar.building', label: 'عربي' },
					]}
					label={t('Building')}
					renderer={(field) => <Input {...field} placeholder={t('Building')} />}
				/>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.landmark', label: 'En' },
						{ name: 'ar.landmark', label: 'عربي' },
					]}
					label={t('Landmark')}
					renderer={(field) => <Input {...field} placeholder={t('Landmark')} />}
				/>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.state', label: 'En' },
						{ name: 'ar.state', label: 'عربي' },
					]}
					label={t('State')}
					renderer={(field) => <Input {...field} placeholder={t('State')} />}
				/>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.area', label: 'En' },
						{ name: 'ar.area', label: 'عربي' },
					]}
					label={t('Area / District')}
					renderer={(field) => <Input {...field} placeholder={t('Area')} />}
				/>

				<TabbedFormField
					formStore={formStore}
					keys={[
						{ name: 'en.street', label: 'En' },
						{ name: 'ar.street', label: 'عربي' },
					]}
					label={t('Street')}
					renderer={(field) => <Input {...field} placeholder={t('Street')} />}
				/>

				{/* //////////////////////////////////////////// */}
				<FormField
					formStore={formStore}
					label={t('Code')}
					name='code'
					render={(field) =>  <Input {...field} placeholder={t('code')} />}
				/>

				{countries?.length > 0 && (
					<SelectFormField
						name='en.country'
						label={t('Country')}
						formStore={formStore}
						options={countries.map((e: CountriesInterface) => ({
							label: e.name,
							value: e.id.toString(),
						}))}
						placeholder={t('Select country')}
					/>
				)}

				{cities?.length > 0 && ( //???
					<SelectFormField
						name='en.city'
						label={t('City')}
						formStore={formStore}
						options={cities.map((e: CountriesInterface) => ({
							label: e.name,
							value: e.id.toString(),
						}))}
						placeholder={t('Select city')}
					/>
				)}
				<FormField
					formStore={formStore}
					label={t('Phone number')}
					name='phone'
					render={(field) => (
						<CustomPhoneInput value={field.value} onHandleChange={field.onChange} />
					)}
				/>

			</section>
		</div>
	);
}


{/* <AddressBranch<BranchesType>
					formStore={formStore}
				/> */}
