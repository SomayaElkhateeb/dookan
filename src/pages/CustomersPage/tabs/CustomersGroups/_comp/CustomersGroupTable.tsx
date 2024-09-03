import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegEdit } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { Switch } from 'src/app/components/ui/switch';
import { CustomerGroupInterface } from 'src/app/interface/CustomerGroupInterface';

import BaseTable, {
	GlobalTableCell,
} from '../../../../../app/components/optimized/TableLayoutGlobal/base.table';
import CustomTableBodyCheckbox from '../../../../../app/components/optimized/UiKits/CustomTableBodyCheckbox';
import CustomTableHeaderCheckbox from '../../../../../app/components/optimized/UiKits/CustomTableHeaderCheckbox';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import ArrowTables from 'src/app/components/optimized/UiKits/ArrowTables';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import {
	getCustomersGroupTable,
	PutUpdateCustomerGroupRequest,
} from 'src/app/store/slices/customersPage/CustomersGroup/customersGroupTableAsyncThunks';
import { actionsButtonStyle } from 'src/pages/ProductsPage/tabs/AllProducts/_comp/AllProductsTable';

export default function CustomersGroupTable({
	children,
	CustomersGroupArrangedData,
	handelId,
}: {
	CustomersGroupArrangedData: CustomerGroupInterface[];
	children: React.ReactNode;
	handelId: (e: string) => void;
}) {
	//  hooks
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { language } = useLanguage();
	const [array, setArray] = useState<string[]>([]);
	const dispatch = useAppDispatch();
	// selectors

	const { isLoading, customersGroup } = useAppSelector((state) => state.customersGroup);

	//  headers
	const customersHeaders = [
		{
			icon: (
				<CustomTableHeaderCheckbox
					array={array}
					setArray={setArray}
					mainArray={customersGroup?.map((e) => e.id)}
				/>
			),
			title: t('Group Name'),
		},
		{ title: t('Customers No.') },
		{ title: t('Active?') },
		{ title: t('Actions') },
	];

	//  update customer group status
	const handelUpdateStatus = (e: CustomerGroupInterface) => {
		dispatch(
			PutUpdateCustomerGroupRequest({
				data: {
					status: e.status > 0 ? 0 : 1,
					id: e?.id,
					name: e.name,
					code: `${e.name}1`,
					customers: e.customers,
					description: e.description,
				},
				id: e?.id,
			}),
		).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				dispatch(getCustomersGroupTable());
			}
		});
	};
	return (
		<>
			<BaseTable
				isLoading={isLoading}
				color='#55607A'
				headers={customersHeaders}
				rows={CustomersGroupArrangedData?.map((e: CustomerGroupInterface, i: number) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell>
								<div className=' flex-row-global gap-[.2rem]'>
									<CustomTableBodyCheckbox array={array} setArray={setArray} id={e.id} />
									<div className='flex-col-global gap-2'>
										<p>{e.name}</p>
										<p className='text-subtitle text-[.8rem]'>{e.description?.slice(0, 50)}...</p>
									</div>
								</div>
							</GlobalTableCell>,
							<GlobalTableCell>{e.customers_count}</GlobalTableCell>,

							<GlobalTableCell>
								<Switch
									onClick={() => {
										handelUpdateStatus(e);
									}}
									checked={e.status > 0 ? true : false}
								/>
							</GlobalTableCell>,
							<GlobalTableCell>
								<div className={actionsButtonStyle()}>
									<FaRegEdit
										className='text-subtitle'
										onClick={() => navigate(`/customers/addGroupCustomer?id=${e?.id}`)}
									/>
									<div onClick={() => handelId(e?.id)}>{children}</div>
									<ArrowTables path={`/customers/addGroupCustomer?id=${e?.id}`} />
								</div>
							</GlobalTableCell>,
						],
					};
				})}
			/>
		</>
	);
}
