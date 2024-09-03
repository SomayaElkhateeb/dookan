
import React, {  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Switch } from 'src/app/components/ui/switch';
import { CustomerInterface } from 'src/app/interface/CustomerInterface';
import {
	getAllCustomersTable,
	PutUpdateCustomerRequest,
} from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import BaseTable, {
	GlobalTableCell,
} from '../../../../../app/components/optimized/TableLayoutGlobal/base.table';
import CustomTableBodyCheckbox from '../../../../../app/components/optimized/UiKits/CustomTableBodyCheckbox';
import CustomTableHeaderCheckbox from '../../../../../app/components/optimized/UiKits/CustomTableHeaderCheckbox';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import ArrowTables from 'src/app/components/optimized/UiKits/ArrowTables';
import { actionsButtonStyle } from 'src/pages/ProductsPage/tabs/AllProducts/_comp/AllProductsTable';

export interface settingMenus {
	id: string;
	text: string;
	icon: React.ReactNode;
}
export default function CustomersTable({
	CustomersArrangedData,
	children,
	handelId,
}: {
	CustomersArrangedData: CustomerInterface[];
	children: React.ReactNode;
	handelId: (e: string) => void;
}) {
	//  hooks
	const classData = actionsButtonStyle();
	const { language } = useLanguage();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [array, setArray] = useState<string[]>([]);
	// redux
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.allCustomer);

	//  headers
	const customersHeaders = [
		{
			icon: (
				<CustomTableHeaderCheckbox
					array={array}
					setArray={setArray}
					mainArray={CustomersArrangedData?.map((e) => e.id)}
				/>
			),
			title: t('Customer Name'),
		},
		{ title: t('Mobile') },
		{ title: t('City') },
		{ title: t('Orders') },
		{ title: t('E-Subscription') },
		{ title: t('actions') },
	];

	//  update customer status
	const handelUpdateStatus = (e: CustomerInterface) => {
		dispatch(
			PutUpdateCustomerRequest({
				data: {
					subscribed_to_news_letter: e.subscribed_to_news_letter > 0 ? 0 : 1,

					phone: e.phone,
					gender: e.gender,
					first_name: e.first_name,
					last_name: e.last_name,
					email: e.email,
					street: '',
					building: '',
					landmark: '',
					area: '',
					customer_group_id: e.customer_group_id,
					fullNameAddress: '',
					countryName: '',
					cityName: '',
					AddressPhoneNumber: '',
				},
				id: e?.id,
			}),
		).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				dispatch(getAllCustomersTable());
			}
		});
	};

	return (
		
			<BaseTable
				isLoading={isLoading}
				language={language}
				color='#55607A'
				headers={customersHeaders.map((h) => h)}
				rows={CustomersArrangedData?.map((e: CustomerInterface, i: number) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell>
								<div className=' flex  items-center gap-[.2rem]'>
									<CustomTableBodyCheckbox array={array} setArray={setArray} id={e.id} />
									<div className='flex flex-col gap-2'>
										<p>{e.name}</p>
										<p className='text-subtitle text-[.8rem]'>{e.email}</p>
									</div>
								</div>
							</GlobalTableCell>,
							<GlobalTableCell>{e.phone}</GlobalTableCell>,
							<GlobalTableCell>{e.city}</GlobalTableCell>,
							<GlobalTableCell>{e.Orders}</GlobalTableCell>,

							<GlobalTableCell>
								<Switch
									onClick={() => {
										handelUpdateStatus(e);
									}}
									checked={e.subscribed_to_news_letter > 0 ? true : false}
								/>
							</GlobalTableCell>,
							<GlobalTableCell>
								<div className={classData}>
									<FaRegEdit
										className='text-subtitle'
										onClick={() => navigate(`addCustomer?id=${e?.id}`)}
									/>
									<div onClick={() => handelId(e?.id)}>{children}</div>

									<ArrowTables path={`/customers/${e?.id}`} />
								</div>
							</GlobalTableCell>,
						],
					};
				})}
			/>
		
	);
}
