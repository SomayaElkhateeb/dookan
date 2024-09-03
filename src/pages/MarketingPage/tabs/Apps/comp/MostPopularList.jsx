import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getImageUrl } from 'src/app/utils';

import { mostPopularApps } from 'src/app/utils/constants';

const MostPopularList = () => {
	//  hooks
	const { t } = useTranslation();
	return (
		<>
			<div className='mb-5'>
				<h2 className='text-lg title'>{t('Most popular')}</h2>
				<p className='paragraph text-subtitle'>
					{t('For more information about setup guide')}{' '}
					<Link className='text-primary' to=''>
						{t('Learn more')}
					</Link>
				</p>
			</div>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{mostPopularApps.map((app) => (
					<BigAppsCard key={app.id} {...app} />
				))}
			</div>
		</>
	);
};

export default MostPopularList;

const BigAppsCard = ({ image, name, description, url, status }) => {
	//  hooks
	const { t } = useTranslation();
	//  handel card status
	const statusbadge = status === 'available' ? 'free' : 'installed';
	return (
		<Link to={url} rel='noopener noreferrer'>
			<div className='cursor-pointer border border-borders-lines p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white min-h-[379px]'>
				<div className='flex flex-col items-start'>
					<div className='border border-borders-lines w-full h-[213px] grid place-content-center  rounded-lg'>
						<img src={image} alt={name} className='h-[180px]' />
					</div>
					<h2 className='mt-4 title text-[16px]'>{t(name)}</h2>
					<p className='mt-2 paragraph'>{t(description)}</p>
					<img src={getImageUrl(`badges/${statusbadge}.svg`)} alt='status' className='mt-3 h-7' />
				</div>
			</div>
		</Link>
	);
};

// lines
// bg 2
