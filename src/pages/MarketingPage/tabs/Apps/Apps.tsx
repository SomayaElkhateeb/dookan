import { socialApps } from 'src/app/utils/constants';

import MostPopularList from './_comp/MostPopularList';
import SocialAppsWrapper from './_comp/SocialAppsWrapper';

const Apps = () => {
	return (
		<div className='flex-col-global gap-8 custom_container'>
			<MostPopularList />

			<SocialAppsWrapper socialApps={socialApps} title='Recommended' linkTo='/' />

			<SocialAppsWrapper socialApps={socialApps} title='Reach more customers' linkTo='/' />
		</div>
	);
};

export default Apps;
