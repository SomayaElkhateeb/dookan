import MarketingPageGuard from './_comp/MarketingPageGuard';
import MarketingLayout from './_comp/MarketingLayout';

const MarketingPage = () => {
	return (
		<MarketingPageGuard>
			<MarketingLayout />
		</MarketingPageGuard>
	);
};

export default MarketingPage;
