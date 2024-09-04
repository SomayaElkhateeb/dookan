import { TableCell } from '@mui/material';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegEdit } from 'react-icons/fa';
import { LiaTrashAlt } from 'react-icons/lia';

import MenuOptions from 'src/app/components/optimized/Menu/MenuOptions';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import ArrowTables from 'src/app/components/optimized/UiKits/ArrowTables';
import { Switch } from 'src/app/components/ui/switch';
import { DiscountInterface } from 'src/app/interface/DiscountInterface';
import { useAppDispatch } from 'src/app/store';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { MoreIcon } from 'src/app/utils/icons';
import { actionsButtonStyle } from 'src/pages/ProductsPage/tabs/AllProducts/_comp/AllProductsTable';

export default function DiscountsTable({
	discounts,
	isLoading,
}: {
	discounts: DiscountInterface[];
	isLoading: boolean;
}) {
	//  hooks
	const { language } = useLanguage();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const classData = actionsButtonStyle();
	const [state, setState] = useState({
		showDeletePopup: false,
		deletingItemId: '',
	});

	const { showDeletePopup, deletingItemId } = state;
	//  headers

	const DiscountsHeaders = [
		{ title: t('discount name') },
		{ title: t('Discount') },
		{ title: t('Ends At') },
		{ title: t('Active?') },
		{ title: t('Sales') },
		{ title: t('actions') },
	];

	

	const handleDeleteItem = (id: string) => {
		console.log('Deleting item:', id);
		dispatch(deleteDiscount(id));
		setState({ ...state, showDeletePopup: false });
	};

	const handleUpdateItem = (id: string) => {
		// 	console.log(' item:', id);
		// 	navigate(`addDiscount?id=${id}`);
		// 	dispatch(updateDiscounts(id));
	};



	return (
		<>
			<BaseTable
				isLoading={isLoading}
				language={language}
				color='#55607A'
				headers={DiscountsHeaders.map((h) => h)}
				rows={discounts?.map((e: DiscountInterface, i: number) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell
								sx={{
									fontWeight: 600,
								}}
							>
								{e.name}
							</GlobalTableCell>,

							<GlobalTableCell>{e.value}</GlobalTableCell>,
							<GlobalTableCell>{e.date}</GlobalTableCell>,

							<TableCell>
								<Switch checked={e.active} />
							</TableCell>,
							<GlobalTableCell>{e.sales}</GlobalTableCell>,

							<GlobalTableCell>
								<div className={classData}>
									<FaRegEdit className='text-subtitle' onClick={() => handleUpdateItem(e?.id)} />

									<MenuOptions
										btn={<MoreIcon className='fill-subtitle' />}
										options={[
											{
												id: nanoid(),
												text: 'delete',
												icon: <LiaTrashAlt size='28' className='fill-error' />,
												click: setState({ ...state, showDeletePopup: true, deletingItemId: e?.id })

											},
										]}

									/>

									{/* {showDeletePopup && deletingItemId === e?.id && (
										<PopupDelete
											onClose={() => setState({ ...state, showDeletePopup: false })}
											onDelete={() => handleDeleteItem(e?.id)}
										/>
									)} */}

									<ArrowTables path={`admin/addDiscount?id=${e?.id}`} />
								</div>
							</GlobalTableCell>,
						],
					};
				})}
			/>
		</>
	);
}
