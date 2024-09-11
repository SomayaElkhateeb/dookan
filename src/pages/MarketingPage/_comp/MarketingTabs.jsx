import { useParams } from 'react-router-dom';
import { Apps, Campaigns, Coupons } from '.';
import Discounts from '../tabs/Discounts/Discounts';
import CartRulePage from '../tabs/CartRule/CartRulePage';
import CatalogRulePage from '../tabs/CatalogRule/CatalogRulePage';

const MarketingTabs = () => {
	//  hooks
	const { tab } = useParams();

	switch (tab) {
		// case 'apps':
		// 	return <Apps />;
		case 'discounts':
			return <Discounts />;
		case 'coupons':
			return <Coupons />;
		// case 'campaigns':
		// 	return <Campaigns />;
		case 'cartRule':
			return <CartRulePage />;
		case 'catalogRule':
			return <CatalogRulePage />;

		default:
			return <Discounts />;
	}
};

export default MarketingTabs;
