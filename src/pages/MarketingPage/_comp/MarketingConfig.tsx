import { useParams } from 'react-router-dom';

import { NewCampaign, NewDiscount, PlatformSetup, CouponForm } from '.';
import CampaignElement from '../tabs/Campaigns/_comp/CampaignElement';
import CartRuleForm from '../tabs/CartRule/_comp/CartRuleForm';
import CatalogRuleForm from '../tabs/CatalogRule/_comp/CatalogRuleForm';

const MarketingConfig = () => {
	const { config } = useParams();

	const platform = config && config.slice(0, config.indexOf('-'));
	const platformKey = `${platform}-setup`;

	switch (config) {
		case 'addDiscount':
			return <NewDiscount />;
		case 'addCoupon':
			return <CouponForm />;
		// return <NewDiscount coupon />;
		case 'addCampaign':
			return <NewCampaign />;
		case 'add-cartRule':
			return <CartRuleForm />;
		case 'add-catalogRule':
			return <CatalogRuleForm />;
		case platformKey:
			return <PlatformSetup platform={platform} />;
		default:
			return <CampaignElement />;
	}
};

export default MarketingConfig;