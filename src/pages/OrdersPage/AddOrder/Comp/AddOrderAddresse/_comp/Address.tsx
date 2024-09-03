import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import { CheckBox } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import { ValidFormStoreByValues } from 'src/utils/types';

import CustomPhoneInput from 'src/app/components/optimized/UiKits/CustomPhoneInput';

import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import GoogleMapComponent from 'src/app/components/ui/GoogleMapComponent';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import { useQuery } from 'react-query';
import { CountriesInterface } from 'src/app/interface/CountriesInterface';
import { AddAddressInterface } from '../_hook/useOrderAddress';
interface AddressProps<TFormStore> {
	formStore: ValidFormStoreByValues<TFormStore, AddAddressInterface>;
	isName?: boolean;
	giftOption?: boolean;
	useMapPicker?: boolean;
	sendGift: boolean;
	setSendGift: (value: boolean) => void;
	selectedOption: string;
	setSelectedOption: (option: string) => void;
	details?:boolean
}

export default function Address<TFormStore>(props: AddressProps<TFormStore>) {
	const {
		formStore,
		isName,
		giftOption,
		useMapPicker,
		sendGift,
		setSendGift,
		selectedOption,
		setSelectedOption,
		details
	} = props;
	const { t } = useTranslation();

	const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
	const [isDisablePickButton, setDisablePickButton] = useState<boolean>(false);

	const handleGiftOptionChange = useCallback(() => setSendGift(!sendGift), [sendGift]);
	const handleOptionChange = useCallback(
		(option: string) => setSelectedOption(option),
		[setSelectedOption],
	);
	useEffect(() => {
		sendGift ? formStore.setValue('gift', 1) : formStore.setValue('gift', 0);
	}, [sendGift]);

	return (
		<Form {...formStore}>
			<div className='lg:col-span-2 grid grid-cols-2 gap-4'>
				<div className='grid gap-4 col-span-2'>
					{useMapPicker && (
						<SingleChoiceChips
							options={[t('Add manually'), t('Use a map')]}
							setSelected={handleOptionChange}
							selected={selectedOption}
						/>
					)}
					{giftOption && (
						<CheckBox
							checked={sendGift}
							handleOnChange={handleGiftOptionChange}
							label={t('Send as a gift')}
						/>
					)}
				</div>
				{sendGift && (
					<div className='col-span-2 xl:col-span-1'>
						<FormField
							formStore={formStore}
							name='gift_receiver_name'
							label={t('Gift receiver name')}
							render={(field) => <Input {...field} />}
						/>
					</div>
				)}
				{selectedOption === 'Add manually' ? (
					<div className='col-span-2'>
						<ManualAddressForm details={details} formStore={formStore} isName={isName} />
					</div>
				) : (
					<div className='col-span-2'>
						<GoogleMapComponent
							setLocationEnabled={setLocationEnabled}
							setDisablePickButton={setDisablePickButton}
							height='300px'
						/>
					</div>
				)}
				<div className={`grid gap-4 col-span-2 xl:${details?'col-span-2':'col-span-1'}`}>
					<FormField
						formStore={formStore}
						name='building'
						label={t('Building')}
						render={(field) => <Input {...field} placeholder={t('Building')} />}
					/>
					<FormField
						formStore={formStore}
						name='landmark'
						label={t('Landmark')}
						render={(field) => <Input {...field} placeholder={t('Landmark')} />}
					/>
					<FormField
						formStore={formStore}
						label={t('Phone number')}
						name='phone'
						render={(field) => (
							<CustomPhoneInput value={field.value} onHandleChange={field.onChange} />
						)}
					/>
				</div>
			</div>
		</Form>
	);
}

function ManualAddressForm<TFormStore>({
	formStore,
	isName,
	details
}: {
	formStore: ValidFormStoreByValues<TFormStore, AddAddressInterface>;
	isName?: boolean;
	details?:boolean
}) {
	const { t } = useTranslation();

	//  get CountriesData  with api request
	const { data } = useQuery([`countriesData`], () => CountriesApi.countries());
	let CountryId = formStore.getValues('country') ? formStore.getValues('country') : '';
	const { data: CitiesData } = useQuery([`citiesData`, CountryId], () =>
		CountriesApi.cities(CountryId ? CountryId : ''),
	);
	let CountriesData = data?.data?.data;
	let cities = CitiesData?.data?.data;
	return (
		<section className='grid grid-cols-2 lg:col-span-2'>
			<div className={`grid col-span-2 xl:${details?'col-span-2':'col-span-1'} gap-4`}>
				{/* {isName && (
					<FormField
						formStore={formStore}
						name='name'
						label={t('Full Name')}
						render={(field) => <Input {...field} placeholder={t('Full Name')} />}
					/>
				)} */}
				{isName && (
					<FormField
						formStore={formStore}
						name='first_name'
						label={t('First name')}
						render={(field) => <Input {...field} placeholder={t('First name')} />}
					/>
				)}
				{isName && (
					<FormField
						formStore={formStore}
						name='last_name'
						label={t('Last name')}
						render={(field) => <Input {...field} placeholder={t('Last name')} />}
					/>
				)}
				{CountriesData?.length > 0 && (
					<SelectFormField
						name='country'
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
						name='city'
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
					name='state'
					label={t('Area / District')}
					render={(field) => <Input {...field} placeholder={t('Area')} />}
				/>
				<FormField
					formStore={formStore}
					name='street'
					label={t('Street')}
					render={(field) => <Input {...field} placeholder={t('Street')} />}
				/>
			</div>
		</section>
	);
}
