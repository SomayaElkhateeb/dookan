import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';

import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';

import Avatar from 'src/app/components/optimized/UiKits/Avatar';

import { User } from 'src/app/interface/settingsInterface/UsersSettingsInterface';
import CustomTableHeaderCheckbox from 'src/app/components/optimized/UiKits/CustomTableHeaderCheckbox';
import CustomTableBodyCheckbox from 'src/app/components/optimized/UiKits/CustomTableBodyCheckbox';
import { useState } from 'react';

export default function StuffTable({
	data,
	handelId,
	isLoading,
	children,
}: {
	data: User[];
	handelId: (e: string) => void;
	children: React.ReactNode;
	isLoading: boolean;
}) {
	const [array, setArray] = useState<string[]>([]);

	//  hooks
	const { language } = useLanguage();
	const { t } = useTranslation();

	//  headers
	const dataHeaders = [
		{
			icon: (
				<CustomTableHeaderCheckbox
					array={array}
					setArray={setArray}
					mainArray={data?.map((e) => e.id)}
				/>
			), title: t('staff name')
		},
		{ title: t('email') },
		{ title: t('Role') },
		{ title: t('Status') },
		{ title: t('actions') },
	];

	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={dataHeaders.map((h) => h)}
			rows={data?.map((e: User, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<div className=' flex  items-center gap-[.3rem] '>
								<CustomTableBodyCheckbox array={array} setArray={setArray} id={e.id} />

								<Avatar fullName={e.name} />
								<div className='flex-col-global gap-[.3rem]'>
									<p className='title'>{e.name}</p>
								</div>
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-primary underline text-sm'>{e.email}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title text-sm'>{e.role.name}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title text-sm'>{e.status === 1 ? 'Active' : 'not Active'}</p>
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
