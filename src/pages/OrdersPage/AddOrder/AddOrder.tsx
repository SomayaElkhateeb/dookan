import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import StepNavigator from 'src/app/components/optimized/Tabs/StepNavigator';
import useStepNavigator from 'src/app/components/optimized/Tabs/useStepNavigator';
import Customer from './Comp/OrderCustomer/Customer';
import Products from './Comp/OrderProducts/Products';
import { OrderAddress } from './Comp/AddOrderAddresse/OrderAddress';
import AddCheckout from './Comp/AddCheckOut/AddCheckout';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getAllCustomersTable,
	getCustomerInfo,
} from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';
import { useEffect } from 'react';
import { getAllProductsTable } from 'src/app/store/slices/productsPage/allProducts/allProductsAsyncThunks';
import { clearData } from 'src/app/store/slices/AddOrderPage/AddOrderSlice';
import { PostAddOrder } from 'src/app/store/slices/AddOrderPage/AddOrderAsyncThunks';
import { useNavigate } from 'react-router-dom';
import { getMerchantPaymentList } from 'src/app/store/slices/settingsPage/payment/merchantPaymentMethods/merchantPaymentAsyncThunks';
import { getShippingList } from 'src/app/store/slices/settingsPage/shipping/shippingAsyncThunks';
import { AddCheckOutFormValues } from './Comp/AddCheckOut/_hook/useAddCheckOutForm';

export default function AddOrder() {

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { Add_Order_Data } = useAppSelector((state) => state.addOrder);
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.addOrder);

	useEffect(() => {

		dispatch(getAllCustomersTable());
		dispatch(getAllProductsTable());
		dispatch(getMerchantPaymentList());
		dispatch(getShippingList());

	}, [dispatch]);

	//  get customer info with id params
	useEffect(() => {
		Add_Order_Data.customer_id && dispatch(getCustomerInfo(Add_Order_Data.customer_id));
	}, [Add_Order_Data.customer_id, dispatch]);
	const { goNext, goPrevious, activeStep, setActiveStep } = useStepNavigator();

	const handleFinish = (values?: AddCheckOutFormValues) => {

		console.log("AddOrder", values)
		const formData = new FormData();
		
		formData.append('customer_id', Add_Order_Data.customer_id);
		formData.append('address_id', Add_Order_Data.address_id);
		Add_Order_Data?.products?.map((e, i) => {
			formData.append(`items[${i}][product_id]`, e?.id);
			formData.append(`items[${i}][quantity]`, e?.quantity.toString());
		});

		for (const [key, value] of Object.entries(values)) {
			formData.append(key, value);
		}

		dispatch(PostAddOrder(formData)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
				dispatch(clearData());
			}
		});

		// Implement additional finish logic here
	};

	const tabs = [
		{
			title: t('customer'),
			content: <Customer onNext={goNext} />,
		},
		{
			title: t('products'),
			content: <Products onNext={goNext} onBack={goPrevious} />,
		},
		{
			title: t('address'),
			content: <OrderAddress onNext={goNext} onBack={goPrevious} />,
		},
		{
			title: t('checkout'),
			content: (
				<AddCheckout
					isLoadingAddOrUpdate={isLoadingAddOrUpdate}
					onFinish={handleFinish}
					onBack={goPrevious}
				/>
			),
		},
	];

	return (
		<>
			<SubHeader title={t('add new order')} />
			<div className='custom_container mx-0 py-5 lg:w-3/4 sm:px-1'>
				<StepNavigator steps={tabs} activeStep={activeStep} setActiveStep={setActiveStep} />
			</div>
		</>
	);
}
