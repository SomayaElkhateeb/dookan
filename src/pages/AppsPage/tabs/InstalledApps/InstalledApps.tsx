import { useTranslation } from 'react-i18next';
import InstallCard from '../AppStore/comp/InstallCard';
import data from '../../_comp/data.json';

export default function InstalledApps() {
	return (
		<div className='py-5'>
			<InstalledAppsContainer />
		</div>
	);
}

function InstalledAppsContainer() {
	const installedApps = data.appsStore.filter((app) => app.status === 'installed');
	const { t } = useTranslation();

	return (
		<div className='grid gap-5 global-cards sm:w-3/4'>
			<h2 className='title'>
				{t('Installed')} ({15})
			</h2>
			{installedApps.map((app, index) => (
				<InstallCard {...app} key={index} installed={true} />
			))}
		</div>
	);
}
