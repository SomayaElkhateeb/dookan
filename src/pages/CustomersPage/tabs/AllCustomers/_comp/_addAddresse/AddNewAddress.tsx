import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';

import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';

import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getCustomerAddresseInfo,
	PostAddCustomerAddressRequest,
	PutUpdateCustomerAddressRequest,
} from 'src/app/store/slices/customersPage/AddresseCustomer/AddressesCustomersAsyncThunks';
import { UseGetIdParams } from 'src/app/utils/hooks/GetParamsId';
import Address from 'src/pages/OrdersPage/AddOrder/Comp/AddOrderAddresse/_comp/Address';
import {
	AddAddressInterface,
	createAddressSchema,
	getDefaultValues,
} from 'src/pages/OrdersPage/AddOrder/Comp/AddOrderAddresse/_hook/useOrderAddress';
import { getCustomerInfo } from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';

export default function AddNewAddressCustomer({
	customer_id,
	handelClose,
}: {
	customer_id?: string;
	handelClose?: () => void;
}) {
	//  hooks
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = useState('Add manually');
	const [sendGift, setSendGift] = useState(false);
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { address_id } = UseGetIdParams();
console.log("address_id", address_id)
	// ////////////////
	//  selectors
	const { isLoadingAddOrUpdate, addreseCustomerInfo } = useAppSelector(
		(state) => state.AddressesCustomer,
	);
	// ////////////////
	console.log('addreseCustomerInfo', addreseCustomerInfo)
	const handleSubmit = (values: AddAddressInterface) => {
		const sendingData: AddAddressInterface = {
			...values,
			customer_id: id ?? customer_id,
			address_id: address_id ? address_id : '',
		};
		address_id
			? dispatch(PutUpdateCustomerAddressRequest(sendingData)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  })
			: dispatch(PostAddCustomerAddressRequest(sendingData)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						if (customer_id && handelClose) {
							dispatch(getCustomerInfo(customer_id));
							handelClose();
						} else {
							navigate(-1);
						}
					}
			  });
	};

	const schema = { ...createAddressSchema(sendGift, selectedOption, false, true) };
	//  custom hook

	const { formStore, onSubmit } = useForm({
		schema: schema,
		handleSubmit: handleSubmit,
		defaultValues: getDefaultValues(),
	});

	useMemo(() => {
		if (id && address_id) {
			dispatch(getCustomerAddresseInfo({ customer_id: id, address_id }));
			addreseCustomerInfo?.phone && formStore.setValue('phone', addreseCustomerInfo?.phone);
			addreseCustomerInfo?.building &&
				formStore.setValue('building', addreseCustomerInfo?.building);
			addreseCustomerInfo?.phone &&
				formStore.setValue('gift_receiver_name', addreseCustomerInfo?.gift_receiver_name);
			addreseCustomerInfo?.state && formStore.setValue('state', addreseCustomerInfo?.state);
			addreseCustomerInfo?.street && formStore.setValue('street', addreseCustomerInfo?.street);

			addreseCustomerInfo?.landmark &&
				formStore.setValue('landmark', addreseCustomerInfo?.landmark);

			addreseCustomerInfo?.country &&
				formStore.setValue('country', addreseCustomerInfo?.country.toString());
			addreseCustomerInfo?.city && formStore.setValue('city', addreseCustomerInfo?.city.toString());
		}
	}, [id, address_id]);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Add new address')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='custom_container '>
					<div className='global-cards md:w-[75%]'>
						<Address<AddAddressInterface>
							giftOption
							useMapPicker
							formStore={formStore}
							sendGift={sendGift}
							setSendGift={setSendGift}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
					</div>

					<SubHeaderMobileBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
}
