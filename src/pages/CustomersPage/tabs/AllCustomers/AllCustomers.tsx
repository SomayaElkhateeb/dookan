import { useTranslation } from 'react-i18next';

import { IoIosAddCircle } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { useOpenFilterDrawer } from 'src/app/utils/hooks/CustomHookOpenDrawer';
import useResponsive from 'src/app/utils/hooks/useResponsive';

import CustomersTable from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/CustomersTable';
import CustomersComponenet from 'src/pages/CustomersPage/_comp/ResponsiveSmallMedia/CustomersComponent';
import { useAppDispatch } from 'src/app/store';
import { useEffect, useMemo, useState } from 'react';
import {
	deleteAllCustomersAction,
	deleteCustomerAction,
	getAllCustomersTable,
	getExportCustomers,
	PostImportCustomers,
} from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';

import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import ActionHandler from 'src/app/utils/ActionMethods';

import PopupImportData, { FormSchema } from 'src/app/components/optimized/Popups/PopupImportData';

import FilterOrdersComponent from 'src/pages/OrdersPage/FilterOrder/FilterOrdersComponent';
import { Use_Hook_ForAllCustomersPage } from './_hook/_hookforAllCustomersPage';
import toast from 'react-hot-toast';

//  componenet will be used in customers page
export default function AllCustomers() {
	//  hooks
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { xs } = useResponsive();
	const dispatch = useAppDispatch();
	const [openExportDialog, setOpenExportDialog] = useState<boolean>(false);
	//  custom hook

	const { HandelopenDrawer, openDrawer, HandelCloseDrawer } = useOpenFilterDrawer();
	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	const { sortMenus, ActionsMenus, settingMenus, CustomersArrangedData, allCustomersIds } =
		Use_Hook_ForAllCustomersPage(selectedOption);

	// //////////////////////////
	// ////////////////////////////
	useEffect(() => {
		dispatch(getAllCustomersTable());
	}, [dispatch]);
	// ///////////////////////////////
	// ////////////////////////////

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

	const handelDeleteCustomer = () => {
		dispatch(deleteCustomerAction(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getAllCustomersTable());
			}
		});
	};
	// ////////////////////////////
	///////////////////////////////

	useMemo(() => {
		switch (selectedOption) {
			case 'Bulk edit':
				navigate(''); 
				break;
			case 'Delete customer':
				handelOpenDialog();
				setSelectedOption('');
				break;
			case 'Customer report':
				setSelectedOption('');
				custom_Id && navigate(`/customers/${custom_Id}`);
				break;
			case 'Export customers':
				dispatch(getExportCustomers()).then((response: any) => {
					ActionHandler.exportToExcelFromApi(response.payload, 'customers');
				});
				setSelectedOption('');
				break;
			case 'delete customers':
				setSelectedOption('');
				CustomersArrangedData?.length > 0
					? dispatch(deleteAllCustomersAction({ indexes: allCustomersIds })).then(
							(response: any) => {
								if (response.payload.code === 200) {
									dispatch(getAllCustomersTable());
								}
							},
					  )
					: toast.error('there are no customers');
				break;
			case 'Import customers':
				setOpenExportDialog(true);
				setSelectedOption('');
				break;
		}
	}, [selectedOption, custom_Id]);

	// ///////////////////////////////
	/////////////////////////////////
	const handelCloseExportdialog = () => {
		setOpenExportDialog(false);
	};
	// //////////////////
	// ///////////////
	const ImportData = (values: FormSchema) => {
		dispatch(PostImportCustomers(values)).then((res) => {
			dispatch(getAllCustomersTable());
			handelCloseExportdialog();
		});
	};

	return (
		<>
			<div className='flex-col-global'>
				{/* top section */}
				<div className='topTable'>
					{/* add customers button */}
					{!xs && (
						<Button
							variant='primary'
							LeftIcon={IoIosAddCircle}
							onClick={() => {
								navigate('/customers/addCustomer');
							}}
						>
							{t('Add New Customer')}
						</Button>
					)}

					{/*  actions filter arrange,... */}
					<ActionsComp
						HandelopenDrawer={HandelopenDrawer}
						filter
						sortMenus={sortMenus}
						ActionsMenus={ActionsMenus}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</div>
				<hr />

				{/*  customers table case of not small media */}
				{!xs && (
					<CustomersTable handelId={handelId} CustomersArrangedData={CustomersArrangedData}>
						<ThreeDotsButton
							sortMenus={settingMenus}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>
					</CustomersTable>
				)}
				{/*  case of small media */}
				{xs && (
					<div className='responsive_pages'>
						{CustomersArrangedData?.length > 0 &&
							CustomersArrangedData?.map((e, i: number) => (
								<CustomersComponenet
									handelId={handelId}
									id={e.id}
									path='customers'
									key={i}
									firstName={e.first_name}
									lastName={e.last_name}
									email={e.email}
								>
									<ThreeDotsButton
										sortMenus={settingMenus}
										selectedOption={selectedOption}
										handelSelect={handleSelect}
									/>
								</CustomersComponenet>
							))}
						<AddButtonMobile path='/customers/addCustomer' />
					</div>
				)}
			</div>

			{/* open filter drawer */}
			{openDrawer && (
				<FilterOrdersComponent openDrawer={openDrawer} HandelCloseDrawer={HandelCloseDrawer} />
			)}
			{/* openDeleteDialog */}
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteCustomer}
				/>
			)}
			{/*  open export data dialog */}
			{openExportDialog && (
				<PopupImportData
					open={openExportDialog}
					onClose={handelCloseExportdialog}
					handelSubmit={(values) => ImportData(values)}
				/>
			)}
		</>
	);
}
