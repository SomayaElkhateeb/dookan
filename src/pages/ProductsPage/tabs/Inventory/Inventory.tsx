import { useEffect, useMemo } from 'react';

import InventoryTable from 'src/pages/ProductsPage/tabs/Inventory/_comp/InventoryTable';
import TopSectionInventoryTable from 'src/pages/ProductsPage/tabs/Inventory/_comp/TopSectionInventoryTable';
import {
	deleteInventoryAction,
	getInventoryTable,
} from 'src/app/store/slices/productsPage/inventory/inventoryAsyncThunks';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'src/app/store';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';

import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import { useNavigate } from 'react-router-dom';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import { Use_Hook_ForInventoryPage } from './_hook/_hookforInventoryPage';
export default function Inventory() {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	const {
		sortMenus,

		InventoriesArrangedData,

		isLoading,

		InventoryMenu,
		ActionsMenus,
	} = Use_Hook_ForInventoryPage(selectedOption);

	useEffect(() => {
		dispatch(getInventoryTable());
	}, [dispatch]);

	//  handel delete Item
	const { openDeleteDialog, custom_Id, handelCloseDeleteDialog, handelId, handelOpenDialog } =
		UseDeleteItem();
	const handelDeleteInventory = () => {
		dispatch(deleteInventoryAction(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getInventoryTable());
			}
		});
	};
	useMemo(() => {
		switch (selectedOption) {
			case t('Delete Inventory'):
				handelOpenDialog();
				setSelectedOption('');
				break;
			case t('Edit Inventory'):
				navigate(`addInventory?id=${custom_Id}`);
				setSelectedOption('');
				break;
		}
	}, [selectedOption, custom_Id]);

	return (
		<div className='custom_container'>
			<div className='flex-col-global '>
				{/*  top section */}
				<TopSectionInventoryTable
					ActionsMenus={ActionsMenus}
					selectedOption={selectedOption}
					handleSelect={handleSelect}
					sortMenus={sortMenus}
				/>

				{/*  table */}

				<InventoryTable
					handelId={handelId}
					inventory={InventoriesArrangedData}
					isLoading={isLoading}
				>
					<ThreeDotsButton
						sortMenus={InventoryMenu}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</InventoryTable>

				{xs && <AddButtonMobile onClick={() => navigate('addInventory')} />}
			</div>
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteInventory}
				/>
			)}
		</div>
	);
}
