import useResponsive from 'src/app/utils/hooks/useResponsive';

import AllOrdersTableMobile from './_comp/AllOrdersTableMobile';
import AllOrdersTable from './_comp/AllOrdersTable';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import TopSectionOrdersPage from './_comp/TopSectionOrdersPage';
import { nanoid } from 'nanoid';
import { LiaTrashAlt } from 'react-icons/lia';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	CancelOrder,
	getAllOrdersPageTable,
	getExportOrders,
} from 'src/app/store/slices/ordersPage/allOrders/allOrdersAsyncThunks';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import { Use_Hook_ForAllOrdersPage } from './_hook/_hookforAllOrdersPage';
import ActionHandler from 'src/app/utils/ActionMethods';
import PopupImportData, { FormSchema } from 'src/app/components/optimized/Popups/PopupImportData';

//  setting menus for setting button action
const settingMenus = [
	{ id: nanoid(), text: 'Cancel Order', icon: <LiaTrashAlt size='28' className='fill-error' /> },
];

export default function AllOrders() {
	//  hooks
	const { t } = useTranslation();
	const [array, setArray] = useState<string[]>([]);
	
	const { xs } = useResponsive();
	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	//redux
	const dispatch = useAppDispatch();
	const { allOrders, isLoading } = useAppSelector((state) => state.allOrders);
	const { sortMenus, ActionsMenus, StatusMenus, OrdersArrangedData } =
		Use_Hook_ForAllOrdersPage(selectedOption);

	useEffect(() => {
		dispatch(getAllOrdersPageTable());
	}, [dispatch]);

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

	const handelCancelOrder = () => {
		dispatch(
			CancelOrder({
				id: custom_Id,
				data: {
					comment: undefined,
					customer_notified: undefined,
				},
			}),
		).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getAllOrdersPageTable());
			}
		});
	};
	useMemo(() => {
		switch (selectedOption) {
			// case 'Bulk edit':
			// 	navigate('');
			// 	break;
			case 'Cancel Order':
				handelOpenDialog();
				setSelectedOption('');
				break;

			case 'Export Orders':
				dispatch(getExportOrders()).then((response: any) => {
					ActionHandler.exportToExcelFromApi(response.payload, 'orders');
				});
				setSelectedOption('');
				break;

			
		}
	}, [selectedOption, custom_Id]);


	return (
		<div className='custom_container pt-5'>
			<div className='flex-col-global'>
				{/*  top section */}
				<TopSectionOrdersPage
					selectedOption={selectedOption}
					handelSelect={handleSelect}
					addButton={t('Add Order')}
					sortMenus={sortMenus}
					ActionsMenus={ActionsMenus}
					StatusMenus={StatusMenus}
				/>

				{/*  table section */}

				{!xs && (
					<AllOrdersTable
						handelId={handelId}
						array={array}
						setArray={setArray}
						orders={OrdersArrangedData}
						isLoading={isLoading}
					>
						<ThreeDotsButton
							sortMenus={settingMenus}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>
					</AllOrdersTable>
				)}

				{xs && (
					<div className='flex-col-global'>
						<AllOrdersTableMobile orders={OrdersArrangedData} />
						<AddButtonMobile path='/order/addOrder' />
					</div>
				)}
			</div>
			{/* openDeleteDialog */}
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Cancel Order')}
					subTitle={t('Do You Want To Cancel This Order')}
					onDelete={handelCancelOrder}
				/>
			)}
			
		</div>
	);
}
