import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';

import useLanguage from 'src/app/utils/hooks/useLanguage';

import { InventoryInterface } from 'src/app/interface/InventoryInterface';
import { Switch } from 'src/app/components/ui/switch';
import {
	getInventoryTable,
	PutUpdateInventoryRequest,
} from 'src/app/store/slices/productsPage/inventory/inventoryAsyncThunks';
import { useAppDispatch } from 'src/app/store';

export default function InventoryTable({
	inventory,
	isLoading,
	children,
	handelId,
}: {
	inventory: InventoryInterface[];
	isLoading: boolean;
	children: React.ReactNode;
	handelId: (e: string) => void;
}) {
	//  hooks
	const dispatch = useAppDispatch();
	const { language } = useLanguage();
	const { t } = useTranslation();

	//  headers

	const inventoryHeaders = [
		{
			title: t('INVENTORY NAME'),
		},
		{ title: t('SKU') },
		{ title: t('Location') },
		{ title: t('Branch name') },
		{ title: t('Status') },
		{ title: t('PRIORITY') },
		{ title: t('actions') },
	];

	const handelUpdateStatus = (e: InventoryInterface) => {
		dispatch(
			PutUpdateInventoryRequest({
				data: {
					status: e.status > 0 ? 0 : 1,
					city: e.city,
					code: e.code,
					contact_email: e.contact_email,
					contact_name:e.contact_name,
					contact_number:e.contact_number.toString(),
					country:e.country,
					name:e.name,
					postcode:e.postcode,
					state:e.state,
					street:e.street
				},
				id: e?.id,
			}),
		).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				dispatch(getInventoryTable());
			}
		});
	};

	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={inventoryHeaders.map((h) => h)}
			rows={inventory?.map((e: InventoryInterface, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<p className='title text-sm'>{e.name}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title'>{e.code}</p>
						</GlobalTableCell>,

						<GlobalTableCell>
							<p>{e?.country}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p>{e.branch_id.name}</p>
						</GlobalTableCell>,

						<GlobalTableCell>
							<div onClick={() => handelUpdateStatus(e)}>
								<Switch checked={e.status > 0 ? true : false} />
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p>{e.priority}</p>
						</GlobalTableCell>,

						<GlobalTableCell>
							<div onClick={() => handelId(e?.id)}>{children}</div>
						</GlobalTableCell>,
					],
				};
			})}
		/>
	);
}
