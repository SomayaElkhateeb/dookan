import { useTranslation } from 'react-i18next';
import { CiUser } from 'react-icons/ci';
import { FiEdit, FiPhoneCall } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoIosAddCircle } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { SubHeader } from 'src/app/components/optimized';
import EditButtonMobile from 'src/app/components/optimized/Buttons/EditButtonMobile';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import CustomerData from '../CustomerData';
import { getCustomerInfo } from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import { deleteCustomerAddressAction } from 'src/app/store/slices/customersPage/AddresseCustomer/AddressesCustomersAsyncThunks';
export default function CustomerInfo() {
	// hooks
	const { id } = useParams();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();
	const dispatch = useAppDispatch();

	const { openDeleteDialog, custom_Id, handelDeleteItem, handelCloseDeleteDialog } =
		UseDeleteItem();

	//  selectors
	const { CustomerInfo } = useAppSelector((state) => state.allCustomer);

	const customerData = [
		{
			data: CustomerInfo?.name ? CustomerInfo?.name : '',
			icon: <CiUser className='text-hint' />,
		},
		{
			data: CustomerInfo?.email ? `${CustomerInfo?.email} (has active email subscribtion)` : '',
			icon: <MdOutlineEmail className='text-hint' />,
		},
		{
			data: CustomerInfo?.phone ? CustomerInfo?.phone : '',
			icon: <FiPhoneCall className='text-hint' />,
		},
	];

	const handelNavigateEdit = () => {
		navigate(`/customers/addCustomer?id=${id}`);
	};

	//  get customer info with id params
	useEffect(() => {
		if (id) {
			dispatch(getCustomerInfo(id));
		}
	}, [id, dispatch]);

	// Delete customer

	const handelDeleteCustomerAddress = () => {
		id &&
			dispatch(deleteCustomerAddressAction({ customer_id: id, address_id: custom_Id })).then(
				(promiseResponse: any) => {
					if ((promiseResponse.payload.code = 200)) {
						handelCloseDeleteDialog();
						id && dispatch(getCustomerInfo(id));
					}
				},
			);
	};

	return (
		<div>
			<div className='gap-[1.6rem] flex-col-global'>
				{/*  top section */}
				<SubHeader title={t('Customer Info')}>
					{!xs && (
						<button onClick={handelNavigateEdit}>
							<FiEdit size='20' />
						</button>
					)}
					{!xs && (
						<button onClick={() => {}}>
							<RxDotsHorizontal size='20' />
						</button>
					)}
				</SubHeader>

				{/*  customer section */}
				<div className='custom_container custom-grid-parent gap-[1.6rem] '>
					<div className='grid-left flex-col-global gap-[1.6rem] '>
						<div className='global-cards px-0  gap-[0.8rem]'>
							<p className='title px-[1.2rem]'>{t('Customer')}</p>
							<hr />
							<div className=' flex-col-global gap-[.6rem] px-[1.2rem]'>
								{customerData?.map((el, i) => (
									<CustomerData key={i} data={el.data ? el.data : ''} icon={el.icon} />
								))}
							</div>
						</div>

						{/*  addresse section */}

						<div className='global-cards px-0 gap-[0.8rem]'>
							<div className='flex-row-global justify-between  px-[1.2rem]'>
								<p className='title'>{t('Addresses')}</p>
								<div
									// onClick={() => navigate('admin/addNewAddress')}
									onClick={() => navigate('addNewAddress')}
									className='flex-row-global gap-[.4rem] cursor-pointer'
								>
									<IoIosAddCircle />
									<p className='title'>{t('Add new address')}</p>
								</div>
							</div>

							<hr />

							{CustomerInfo?.addresses?.length > 0 ? (
								CustomerInfo?.addresses?.map((e) => (
									<div key={e.id} className='w-[97%] mx-auto global-cards px-0 '>
										<div className='flex-row-global-items-start justify-between   px-[1.2rem]'>
											<p className='text-[0.7rem]'>
												{e.landmark}, {e.building} {e.street}.
												<br />
												{e.state}, {e.city} <br />
												<span className='opacity-60'>{e.country}</span>
												<br />
												{e?.phone}
											</p>
											<div className='flex-col-global items-end gap-[2rem]'>
												<div className='flex-row-global gap-[1.2rem]'>
													<RiDeleteBin6Line
														onClick={() => e?.id && handelDeleteItem(e?.id)}
														className='cursor-pointer'
													/>
													<FiEdit
														// onClick={() => navigate(`admin/addNewAddress?address_id=${e?.id}`)}
														onClick={() => navigate(`addNewAddress?address_id=${e?.id}`)}
														className='cursor-pointer'
													/>
												</div>
												<div className='flex-row-global gap-[.4rem] cursor-pointer'>
													<IoLocationOutline />
													<p className='title'>{t('Show on map')}</p>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className='flex-row-global justify-center'>{t('There are No Addresses')}</div>
							)}
						</div>

						{/*  orders section */}

						<div className='global-cards px-0 gap-[0.8rem]'>
							<div className='flex-row-global justify-between px-[1.2rem]'>
								<p className='title '>{t('Orders')}</p>
								<div className='flex-row-global gap-[.4rem] cursor-pointer'>
									<IoIosAddCircle />
									<p onClick={() => navigate('/order/addOrder')} className='title'>
										{t('Add new order')}
									</p>
								</div>
							</div>

							<hr />
							<div className='flex-col-global gap-[1rem]'>
								{CustomerInfo?.orders?.length > 0 ? (
									CustomerInfo?.orders?.map((e, i) => (
										<div className='flex-col-global gap-[1rem]' key={i}>
											<div className='flex-row-global-items-start justify-between   px-[1.2rem]'>
												<div className='flex-col-global gap-[0.5rem]'>
													<p className='text-[0.8rem]  font-semibold text-title'>
														#8965742 <span className='font-normal'>Processing</span>
													</p>
													<p className='text-[.7rem] opacity-60' dir='ltr'>
														6 Apr 2020
													</p>
												</div>
												<div className='flex-col-global items-end gap-[0.5rem]'>
													<HiOutlineDotsHorizontal />
													<p className='text-[0.8rem] '>SAR 1000</p>
												</div>
											</div>
											<hr />
										</div>
									))
								) : (
									<div className='flex-row-global justify-center'>{t('There are No Orders')}</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<EditButtonMobile onClick={handelNavigateEdit} />
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteCustomerAddress}
				/>
			)}
		</div>
	);
}
