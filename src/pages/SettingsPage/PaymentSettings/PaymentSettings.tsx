import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from 'src/app/components/optimized';
import DookanPay from './_comp/DookanPay';
import ManualPayment from './_comp/ManualPayment';
import PaymentProvidersCard from './_comp/PaymentProvidersCard';
import PaymentTable from './PaymentProviders/PaymentTable/PaymentTable';
import { IoIosAddCircle } from 'react-icons/io';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import PaymentMerchantTable from './_comp/_Payment_Table/PaymentMerchantTable';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	deleteMerchantPayment,
	DeleteMerchantPaymentMass,
	getMerchantPaymentList,
} from 'src/app/store/slices/settingsPage/payment/merchantPaymentMethods/merchantPaymentAsyncThunks';
import { useEffect, useMemo } from 'react';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import { LiaTrashAlt } from 'react-icons/lia';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';

export default function PaymentSettings() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();
	const dispatch = useAppDispatch();

	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	//  selectors
	const { merchantPaymentList } = useAppSelector((state) => state.merchantPaymentSettings);
	const settingMenus = [
		{
			id: nanoid(),
			text: 'Delete payment',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];
	const ActionsMenus = [
		{
			id: nanoid(),
			text: 'Delete payments',
		},
	];

	//  handel deleteItem
	const {
		openDeleteDialog,
		custom_Id,
		handelDeleteItem,
		handelCloseDeleteDialog,
		handelId,
		handelOpenDialog,
	} = UseDeleteItem();
	// Delete customer

	const handelDeletePaymentMerchant = () => {
		dispatch(deleteMerchantPayment(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getMerchantPaymentList());
			}
		});
	};

	useEffect(() => {
		dispatch(getMerchantPaymentList());
	}, [dispatch]);
	let paymentsIds = merchantPaymentList?.map((e) => e?.id.toString()).join(',');
	useMemo(() => {
		switch (selectedOption) {
			case 'Delete payment':
				handelOpenDialog();
				setSelectedOption('');
				break;

			case 'Delete payments':
				setSelectedOption('');
				merchantPaymentList?.length > 0
					? dispatch(DeleteMerchantPaymentMass({ indexes: paymentsIds })).then((response: any) => {
							if (response.payload.code === 200) {
								dispatch(getMerchantPaymentList());
							}
					  })
					: toast.error('there are no customers');
				break;
		}
	}, [selectedOption, custom_Id]);
	return (
		<div className='flex-col-global gap-5'>
			<SubHeader title={t('Merchant Payment Methods')} />
			<div className='custom_container flex-col-global gap-5'>
				<div className='topTable '>
					{/* add customers button */}
					{!xs && (
						<Button
							variant='primary'
							LeftIcon={IoIosAddCircle}
							onClick={() => {
								navigate('add-Payment-Method');
							}}
						>
							{t('Add New Payment Method')}
						</Button>
					)}
					{/*  actions filter arrange,... */}
					<ActionsComp
						ActionsMenus={ActionsMenus}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</div>
				<hr />
				{/* <DookanPay /> */}
				{/* <div className='col-span-2 lg:col-span-1'>
				
				</div>
				<div className='col-span-2 lg:col-span-1'>
					
				</div>
				<div className='col-span-2'>
					{/* <ManualPayment /> */}
				{/* </div>  */}
				{/* <SubHeader title={t('Third party payment providers')} /> */}

				{!xs && (
					<PaymentMerchantTable handelId={handelId}>
						<ThreeDotsButton
							sortMenus={settingMenus}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>
					</PaymentMerchantTable>
				)}
				{xs && <AddButtonMobile path='add-Payment-Method' />}

				{/* openDeleteDialog */}
				{openDeleteDialog && (
					<PopupDelete
						open={openDeleteDialog}
						onClose={handelCloseDeleteDialog}
						title={t('Delete Item')}
						subTitle={t('Do You Want To Delete This Item')}
						onDelete={handelDeletePaymentMerchant}
					/>
				)}
			</div>
		</div>
	);
}
