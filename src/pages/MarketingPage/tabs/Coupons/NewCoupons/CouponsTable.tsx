import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BaseTable, {
	GlobalTableCell,
} from '../../../../../app/components/optimized/TableLayoutGlobal/base.table';
import { Coupon } from 'src/app/interface/CouponInterface';
import { LiaTrashAlt } from 'react-icons/lia';

import { nanoid } from 'nanoid';
import { FaRegEdit } from 'react-icons/fa';

import { Switch } from '../../../../../app/components/ui/switch';
import MenuOptions from '../../../../../app/components/optimized/Menu/MenuOptions';
import { MoreIcon } from 'src/app/utils/icons';
import PopupDelete from '../../../../../app/components/optimized/Popups/PopupDelete';
import { useState } from 'react';

import ArrowTables from '../../../../../app/components/optimized/UiKits/ArrowTables';
import { useAppDispatch } from 'src/app/store';
import { actionsButtonStyle } from 'src/pages/ProductsPage/tabs/AllProducts/_comp/AllProductsTable';

export default function CouponsTable({
	coupons,
	isLoading,
}: {
	coupons: Coupon[];
	isLoading: boolean;
}) {
	//  hooks
	const { language } = useLanguage();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const classData = actionsButtonStyle();
	const [state, setState] = useState({
		showDeletePopup: false,
		deletingItemId: '',
	});
	//  headers

	const CouponsHeaders = [
		{ title: t('coupon name') },
		{ title: t('Discount') },
		{ title: t('Ends At') },
		{ title: t('Active?') },
		{ title: t('Sales') },
		{ title: t('Used') },
		{ title: t('actions') },
	];

	

	const handleDeleteItem = (id: string) => {
		// console.log('Deleting item:', id);
		dispatch(deleteCoupons(id));
		setState({ ...state, showDeletePopup: false });
	};


	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={CouponsHeaders.map((h) => h)}
			rows={coupons?.map((e: Coupon, i: number) => {
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

						<GlobalTableCell>
							<Switch checked={e.active} />
						</GlobalTableCell>,
						<GlobalTableCell>{e.sales}</GlobalTableCell>,
						<GlobalTableCell>{e.used}</GlobalTableCell>,

						<GlobalTableCell>
							<div className={classData}>
								<FaRegEdit
									className='text-subtitle'
									onClick={() => navigate(`addCoupon?id=${e?.id}`)}
								/>

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


								{state.showDeletePopup && state.deletingItemId === e?.id && (
									<PopupDelete
										onClose={() => setState({ ...state, showDeletePopup: false })}
										onDelete={() => handleDeleteItem(e?.id)}
									/>
								)}
								<ArrowTables path={`addCoupon?id=${e?.id}`} />
							</div>
						</GlobalTableCell>,
					],
				};
			})}
		/>
	);
}
