import { useParams } from 'react-router-dom';

import { NewCampaign, NewDiscount, PlatformSetup } from '.';
import CampaignElement from '../tabs/Campaigns/_comp/CampaignElement';

const MarketingConfig = () => {
	const { config } = useParams();

	const platform = config && config.slice(0, config.indexOf('-'));
	const platformKey = `${platform}-setup`;

	switch (config) {
		case 'addDiscount':
			return <NewDiscount />;
		case 'addCoupon':
			return <NewDiscount coupon />;
		case 'addCampaign':
			return <NewCampaign />;
		case platformKey:
			return <PlatformSetup platform={platform} />;
		default:
			return <CampaignElement />;
	}
};

export default MarketingConfig;
