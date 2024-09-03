import { TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { OrderInterface } from 'src/app/interface/OrderInterface';
import useLanguage from 'src/app/utils/hooks/useLanguage';

import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
// react-icons
import { FaRegEdit } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';

import { CiLocationOn } from 'react-icons/ci';
import { actionsButtonStyle } from 'src/pages/ProductsPage/tabs/AllProducts/_comp/AllProductsTable';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import { menuType } from 'src/app/components/optimized/Buttons/ActionsComp';

import ArrowTables from 'src/app/components/optimized/UiKits/ArrowTables';
import CustomTableBodyCheckbox from 'src/app/components/optimized/UiKits/CustomTableBodyCheckbox';
import CustomTableHeaderCheckbox from 'src/app/components/optimized/UiKits/CustomTableHeaderCheckbox';
export default function AllOrdersTable({
	orders,
	array,
	setArray,
	children,
	handelId,
	isLoading,
}: {
	orders: OrderInterface[];
	array: string[];
	setArray: (e: string[]) => void;
	children: React.ReactNode;
	handelId: (e: string) => void;

	isLoading: boolean;
}) {
	//  hooks
	const { language } = useLanguage();
	
	const { t } = useTranslation();
	const classData = actionsButtonStyle();
	//  custom hook for select setting item

	//  headers
	const OrdersHeaders = [
		{
			icon: (
				<CustomTableHeaderCheckbox
					array={array}
					setArray={setArray}
					mainArray={orders?.map((e) => e.id)}
				/>
			),
			title: t('No. & Date'),
		},
		{ title: t('billing') },
		{ title: t('Delivery') },
		{ title: t('Payment') },
		{ title: t('Status') },
		{ title: t('Total') },

		{ title: t('actions') },
	];

	const textClassName = 'text-subtitle text-[.8rem]';
	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={OrdersHeaders.map((h) => h)}
			rows={orders?.map((e: OrderInterface, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<div className=' flex  items-center gap-[.3rem] '>
								<CustomTableBodyCheckbox array={array} setArray={setArray} id={e.id} />

								<div className='flex-col-global gap-[.3rem]'>
									<p className='title'>{e.id}</p>
									<p className={textClassName}>{e.created_at}</p>
								</div>
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							<div className=' flex-col-global gap-[.4rem]'>
								<p className='text-title'>{e.customer_first_name}</p>
								<p className={`${textClassName} flex-row-global-items-start gap-[.2rem]`}>
									<CiLocationOn className={textClassName} /> {e.shipping_address?.state}
								</p>
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							{/* <div className='flex-col-global gap-[.4rem]'>
								<p className='text-title'>{e.delivery_status}</p> */}
							<p className={textClassName}>{e.shipping_title}</p>
							{/* </div> */}
						</GlobalTableCell>,
						<GlobalTableCell>
							{/* <div className='flex-col-global gap-[.4rem]'> */}
							<p className='text-title'>{e.payment_title}</p>
							{/* <p className={textClassName}>{e.payment_status}</p>
							</div> */}
						</GlobalTableCell>,
						<GlobalTableCell>{e.status}</GlobalTableCell>,
						<GlobalTableCell>
							{e.order_currency_code} {e.grand_total}
						</GlobalTableCell>,
						<TableCell>
							<div className={classData}>
								<FaArrowsRotate className='text-subtitle' />
								{/* <FaRegEdit
									className='text-subtitle'
									onClick={() => navigate(`/addProduct?id=${e?.id}`)}
								/> */}

								<div onClick={() => handelId(e?.id)}>{children}</div>
								<ArrowTables path={`/orders/orderDetails/${e?.id}`} />
							</div>
						</TableCell>,
					],
				};
			})}
		/>
	);
}
