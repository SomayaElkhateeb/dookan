import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { Role } from 'src/app/interface/settingsInterface/rolesSettingsInterface';

const RolesTable = ({
	rolesList,
	isLoading,
	handelId,
	children,
}: {
	rolesList: Role[];
	isLoading: boolean;
	handelId: (e: string) => void;
	children: React.ReactNode;
}) => {
	//  hooks
	const { language } = useLanguage();
	const { t } = useTranslation();

	//  headers
	const dataHeaders = [
		{ title: t('id') },
		{ title: t('role name') },
		{ title: t('permission type') },
		{ title: t('actions') },
	];

	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={dataHeaders.map((h) => h)}
			rows={rolesList?.map((e: Role, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<div className='flex items-center'>
								<p className='text-title text-sm'>{i + 1}</p>
							</div>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='title'>{e.name}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title text-sm'>{e.permission_type}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<div onClick={() => handelId(e?.id)}>{children}</div>
						</GlobalTableCell>,
					],
				};
			})}
		/>
	);
};

export default RolesTable;
