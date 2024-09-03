import { useParams } from 'react-router-dom';
import { Apps, Campaigns, Coupons } from '.';
import Discounts from '../tabs/Discounts/Discounts';

const MarketingTabs = () => {
	//  hooks
	const { tab } = useParams();

	switch (tab) {
		case 'apps':
			return <Apps />;
		case 'discounts':
			return <Discounts />;
		case 'coupons':
			return <Coupons />;
		case 'campaigns':
			return <Campaigns />;

		default:
			return <Apps />;
	}
};

export default MarketingTabs;
