import { Navigate, useSearchParams } from 'react-router-dom';
import useMarketingSetup from './_hook/useMarketingSetup';
import TikTokSales from './tiktok/TikTokSales';
import TikTokCatalog from './tiktok/TikTokCatalog';
import SnapchatCatalog from './snapchat/SnapchatCatalog';
import SnapchatSales from './snapchat/SnapchatSales';
import { PlatformProvider } from './PlatformContext';
import { SubHeader } from 'src/app/components/optimized';

interface PlatformSetupProps {
	platform: 'tikTok' | 'snapchat' | 'facebook' | 'sendGrid' | 'mailchimp' | 'google'; // Include 'facebook' in the platform type
}

const PlatformSetup: React.FC<PlatformSetupProps> = ({ platform }) => {
	const { title, renderSetupOrTabs } = useMarketingSetup(platform);
	const [searchParams] = useSearchParams();
	const featuresManage = searchParams.get('features_manage') === 'active';
	const catalogMarketing = searchParams.get('catalog_marketing') === 'active';

	// Render setup or tabs component based on conditions
	const renderSetupOrTabsComponent = () => (
		<>
			<SubHeader title={title} />
			<div className=' p-4'>{renderSetupOrTabs()}</div>
		</>
	);

	// Switch case to determine which component to render
	const renderSales = () => {
		switch (platform) {
			case 'tikTok':
				return featuresManage ? <TikTokSales /> : null;
			case 'snapchat':
				return featuresManage ? <SnapchatSales /> : null;
			case 'facebook':
				return <Navigate to='/apps/app_store/facebook' replace={true} />;
			case 'google':
				return <Navigate to='/apps/app_store/google' replace={true} />;
			case 'sendGrid':
				return <Navigate to='/apps/app_store/sendGrid' replace={true} />;
			case 'mailchimp':
				return <Navigate to='/apps/app_store/mailchimp' replace={true} />;
			default:
				return null; // Default to null if platform is not recognized
		}
	};

	const renderCatalog = () => {
		switch (platform) {
			case 'tikTok':
				return catalogMarketing ? <TikTokCatalog /> : null;
			case 'snapchat':
				return catalogMarketing ? <SnapchatCatalog /> : null;
			case 'facebook':
				return <Navigate to='/apps/app_store/facebook' replace={true} />;
			case 'google':
				return <Navigate to='/apps/app_store/google' replace={true} />;
			case 'sendGrid':
				return <Navigate to='/apps/app_store/sendGrid' replace={true} />;
			case 'mailchimp':
				return <Navigate to='/apps/app_store/mailchimp' replace={true} />;
			default:
				return null; // Default to null if platform is not recognized
		}
	};

	return (
		<section>
			{!featuresManage && !catalogMarketing && renderSetupOrTabsComponent()}
			{featuresManage && <section>{renderSales()}</section>}
			{catalogMarketing && <section>{renderCatalog()}</section>}
		</section>
	);
};

const PlatformSetupWithContext: React.FC<PlatformSetupProps> = (props) => {
	return (
		<PlatformProvider>
			<PlatformSetup {...props} />
		</PlatformProvider>
	);
};

export default PlatformSetupWithContext;
