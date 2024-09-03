import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrUpdate } from 'react-icons/gr';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoPrintOutline } from 'react-icons/io5';
import { RxDotsHorizontal } from 'react-icons/rx';
import { Button, SubHeader } from 'src/app/components/optimized';
import ContactCard from 'src/app/components/optimized/Cards/ContactCard';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import { EditIcon, LocationIcon } from 'src/app/utils/icons';

import OrderNo from './OrderNo';
import OrderItems from './OrderItems';
import CustomerNote from './CustomerNote';
import OrderHistory from './OrderHistory';

import AddressForm from './Forms/AddressForm';
import Checkout from './Checkout';
import CheckoutDetailsForm from './Forms/CheckoutDetailsForm';
import CustomerForm from './Forms/CustomerForm';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useParams } from 'react-router-dom';
import { getOrderInfo } from 'src/app/store/slices/ordersPage/allOrders/allOrdersAsyncThunks';
import { FiPhoneCall } from 'react-icons/fi';
import { TfiEmail, TfiWorld } from 'react-icons/tfi';
import AddCheckout from '../AddOrder/Comp/AddCheckOut/AddCheckout';
export default function OrderDetails() {
	const { t } = useTranslation();
	const { id } = useParams();
	const { xs } = useResponsive();
	const dispatch = useAppDispatch();
	const [state, setState] = useState({
		showCustomer: false,
		showAddress: false,
		showCheckout: false,
	});
	//  selectors
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.allOrders);
	const { ordderItem } = useAppSelector((state) => state.allOrders);

	const { showCustomer, showAddress, showCheckout } = state;

	const handleCustomerForm = () => {
		setState({ ...state, showCustomer: !showCustomer });
	};
	const handleAddressForm = () => {
		console.log(showAddress)
		setState({ ...state, showAddress: !showAddress });
	};
	const handleChckOutFormForm = () => {
		setState({ ...state, showCheckout: !showCheckout });
	};

	// data
	
	const address = [
		{ id: nanoid(), name: t('Country'), value: ordderItem.shipping_address.country_name },
		{ id: nanoid(), name: t('City'), value: ordderItem.shipping_address.city },
		{ id: nanoid(), name: t('Area'), value: ordderItem.shipping_address.state },
		{ id: nanoid(), name: t('Street'), value: ordderItem.shipping_address.street },
		{ id: nanoid(), name: t('Building No'), value: ordderItem.shipping_address.building },
		{ id: nanoid(), name: t('Landmark'), value: ordderItem.shipping_address.landmark },
	];

	const info = [
		{ id: nanoid(), name: `${t('IP Address')} `, value: '' },
		// { id: nanoid(), name: `${t('Accepts email marketing')} `, value: '' },
	];

	const SubHeaderActions = () => {
		return (
			<>
				<Button onClick={() => {}} variant='tertiary' LeftIcon={<GrUpdate />}>
					{t('Update Status')}
				</Button>
				<Button onClick={() => {}} variant='tertiary' LeftIcon={<IoPrintOutline />}>
					{t('Print Invoice')}
				</Button>
				<button onClick={() => {}}>
					<RxDotsHorizontal size='20' />
				</button>

				<div className='flex items-center '>
					<button onClick={() => {}} className='border p-2 flex items-center justify-center'>
						<IoIosArrowBack />
					</button>
					<button onClick={() => {}} className='border p-2 flex items-center justify-center'>
						<IoIosArrowForward />
					</button>
				</div>
			</>
		);
	};

	//  get order info with id params
	useEffect(() => {
		if (id) {
			dispatch(getOrderInfo(id));
		}
	}, [id, dispatch]);

	const CustomerContact = [
		{
			id: nanoid(),
			contact: `${ordderItem?.customer_first_name} ${ordderItem?.customer_last_name} `,
			icon: <TfiWorld color='#8791A8' size={15} />,
		},
		{
			id: nanoid(),
			contact: ordderItem?.customer_email,
			icon: <TfiEmail color='#8791A8' size={15} />,
		},
		{
			id: nanoid(),
			contact: ordderItem?.customer_phone,
			icon: <FiPhoneCall color='#8791A8' size={15} />,
		},
	];
	return (
		<div className='flex-col-global'>
			<SubHeader title={t('Order Details')}>
				{!xs ? <SubHeaderActions /> : <RxDotsHorizontal />}
			</SubHeader>

			<div className='custom-grid-parent custom_container'>
				<div className='flex-col-global grid-left'>
					<OrderNo />
					<OrderItems />
					<CustomerNote id={ordderItem?.id} />
					<OrderHistory />
				</div>
				<div className='flex-col-global grid-right'>
					<ContactCard
						contain={showCustomer && <CustomerForm isLoadingAddOrUpdate={isLoadingAddOrUpdate} handleCustomerForm={handleCustomerForm} />}
						form={showCustomer}
						title={t('Customer')}
						data={CustomerContact}
						contacts={true}
						children={
							<Button
								LeftIcon={EditIcon}
								variant='tertiary'
								onClick={() => setState({ ...state, showCustomer: !showCustomer })}
							>
								{t('edit')}
							</Button>
						}
					/>

					<ContactCard
						contain={showAddress && <AddressForm isLoadingAddOrUpdate={isLoadingAddOrUpdate} details handleAddressForm={handleAddressForm} />}
						form={showAddress}
						title={t('Address')}
						data={address}
						contacts={false}
						isLocation={
							<Button className='pt-3' LeftIcon={LocationIcon} variant='tertiary'>
								{t('show on map')}
							</Button>
						}
						children={
							<Button
								LeftIcon={EditIcon}
								variant='tertiary'
								onClick={() => setState({ ...state, showAddress: !showAddress })}
							>
								{t('edit')}
							</Button>
						}
					/>
					<Checkout
						contain={
							// showCheckout && <CheckoutDetailsForm handleChckOutFormForm={handleChckOutFormForm} />
							showCheckout && <AddCheckout isLoadingAddOrUpdate={isLoadingAddOrUpdate} id={ordderItem?.id} orderItem={ordderItem} handleChckOutFormForm={handleChckOutFormForm} />
						}
						form={showCheckout}
						title={t('Checkout')}
						children={
							<Button
								LeftIcon={EditIcon}
								variant='tertiary'
								onClick={() => setState({ ...state, showCheckout: !showCheckout })}
							>
								{t('edit')}
							</Button>
						}
					/>
					<ContactCard title={t('Additional Info')} data={info} contacts={false} />
				</div>
			</div>
			{xs && (
				<div className='flex space-x-3 justify-center bg-white p-5 absolute w-full bottom-0'>
					<SubHeaderActions />
				</div>
			)}
		</div>
	);
}
