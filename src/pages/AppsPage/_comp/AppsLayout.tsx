import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { HorizontalTabsLink } from 'src/app/components/optimized';

export default function AppsLayout() {
	const { t } = useTranslation();
	const tabs = [
		{
			name: t('App store'),
			path: 'app_store',
		},
		{
			name: t('Installed apps'),
			path: 'installed_apps',
		},
	];

	return (
		<div className='flex-col-global gap-0'>
			<div className='sticky top-[70px] z-10 '>
				<HorizontalTabsLink tabs={tabs} path='/apps' />
			</div>
			<div className='custom_container'>
				<Outlet />
			</div>
		</div>
	);
}
