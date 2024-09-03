import platforms from '../_comp/data.json';
import {
	FBBusinessManager,
	FBCommerceAccount,
	FBConnectAccount,
	FBDataSharing,
	FBDomainVerification,
	FacebookPage,
	FBTerms,
} from './tabs';

interface FacebookTab {
	title: string;
	content: React.ReactNode;
}
interface FacebookSetupData {
	title: string;
	settings: {
		connect_account: {
			title: string;
			description: string;
		};
		business_manager: {
			title: string;
			description: string;
			companies: {
				name: string;
				date: string;
				id: string;
				logo: string;
			}[];
		};
		domain_verification: {
			title: string;
			description: string;
		};
		facebook_page: {
			title: string;
			description: string;
			companies: {
				name: string;
				industry: string;
				likes: number;
			}[];
		};
		data_sharing: {
			title: string;
			description: string;
		};
		commerce_account: {
			title: string;
			description: string;
		};
		terms_and_conditions: {
			title: string;
			description: string;
		};
	};
	facebook_tabs: FacebookTab[];
}

export const getFacebookSetup = (platform: string): FacebookSetupData | null => {
	const { settings, title } = platforms[platform];
	if (!settings) return null;

	const {
		connect_account,
		business_manager,
		domain_verification,
		facebook_page,
		data_sharing,
		commerce_account,
		terms_and_conditions,
	} = settings;

	const tabs = [
		{ title: connect_account.title, content: <FBConnectAccount data={connect_account} /> },
		{ title: business_manager.title, content: <FBBusinessManager data={business_manager} /> },
		{
			title: domain_verification.title,
			content: <FBDomainVerification data={domain_verification} />,
		},
		{ title: facebook_page.title, content: <FacebookPage data={facebook_page} /> },
		{ title: data_sharing.title, content: <FBDataSharing data={data_sharing} /> },
		{ title: commerce_account.title, content: <FBCommerceAccount data={commerce_account} /> },
		{ title: terms_and_conditions.title, content: <FBTerms data={terms_and_conditions} /> },
	];

	return { title, tabs };
};
