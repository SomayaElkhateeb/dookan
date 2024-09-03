import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BigAppsCard from 'src/app/components/optimized/Cards/BigAppsCard';

import { mostPopularApps } from 'src/app/utils/constants';

const MostPopularList: React.FC = () => {
	const { t } = useTranslation();
	return (
		<div className='flex-col-global gap-[.5rem]'>
			<div className='flex-col-global gap-[.25rem]'>
				<h2 className='title'>{t('Most popular')}</h2>
				<p className='paragraph text-subtitle'>
					{t('For more information about setup guide')}{' '}
					<Link className='text-primary' to=''>
						{t('Learn more')}
					</Link>
				</p>
			</div>
			<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
				{mostPopularApps.map((app) => (
					<BigAppsCard key={app.id} {...app} />
				))}
			</div>
		</div>
	);
};

export default MostPopularList;
