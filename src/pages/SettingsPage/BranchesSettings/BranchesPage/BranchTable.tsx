import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { BranchInterface } from 'src/app/interface/BranchInterface';

export default function BranchTable({
	data,
	handelId,
	isLoading,
	children,
}: {
	data: BranchInterface[];
	handelId: (e: string) => void;
	children: React.ReactNode;
	isLoading: boolean;
}) {
	//  hooks
	const { language } = useLanguage();
	const { t } = useTranslation();

	//  headers
	const dataHeaders = [
		{ title: t('branch name') },
		{ title: t('type') },
		{ title: t('address & phone') },
		{ title: t('actions') },
	];

	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={dataHeaders.map((h) => h)}
			rows={data?.map((e: BranchInterface, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<div className=' flex  items-center gap-[.3rem] '>
								<div className='flex-col-global gap-[.3rem]'>
									<p className='title'>{e.name}</p>
								</div>
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title text-sm'>
								{e.type === 'warehouse' ? 'Warehouse' : 'Commercial'}
							</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title text-sm'>{e.address}</p>
							<p className='text-title text-sm'>
								{e.area}, {e.city}
							</p>
							<p className='text-title text-sm'>{e.country}</p>
							<p className='text-title text-sm'>{e.phone}</p>
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
