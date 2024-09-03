import { useEffect, useState } from 'react';

import { Form } from 'react-hook-form';
import { Button } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';
import Address from '../../AddOrder/Comp/AddOrderAddresse/_comp/Address';
import useOrderAddress from '../../AddOrder/Comp/AddOrderAddresse/_hook/useOrderAddress';
import { useAppSelector } from 'src/app/store';

export default function AddressForm({
	handleAddressForm,
	details,
	isLoadingAddOrUpdate,
}: {
	handleAddressForm: () => void;
	details: boolean;
	isLoadingAddOrUpdate: boolean;
}) {
	const [sendGift, setSendGift] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Add manually');
	const { t } = useTranslation();
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	//  custom hook
	const { formStore, onSubmit } = useOrderAddress(
		sendGift,
		selectedOption,
		true,
		handleAddressForm,
	);
	useEffect(() => {
		formStore.setValue('phone', ordderItem?.shipping_address.phone);
		formStore.setValue('first_name', ordderItem?.shipping_address.first_name);
		formStore.setValue('last_name', ordderItem?.shipping_address.last_name);
		formStore.setValue('state', ordderItem?.shipping_address.state);
		formStore.setValue('country', ordderItem?.shipping_address.country.toString());
		formStore.setValue('city', ordderItem?.shipping_address.city.toString());
		formStore.setValue('street', ordderItem?.shipping_address.street);
		formStore.setValue('building', ordderItem?.shipping_address.building);
	}, [ordderItem]);
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-4'>
				<Address
					details={details}
					isName
					sendGift={sendGift}
					setSendGift={setSendGift}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					formStore={formStore}
				/>

				<div className='flex-btn-end'>
					<Button variant='secondary' onClick={handleAddressForm}>
						{t('back')}
					</Button>
					<Button type='submit' loading={isLoadingAddOrUpdate} variant='primary' onClick={onSubmit}>
						{t('Next')}
					</Button>
				</div>
			</form>
		</Form>
	);
}
