import platforms from '../../_comp/data.json';
import TikBusinessAccount from '../tabs/TikBusinessAccount';
import TikCreateAccount from '../tabs/TikCreateAccount';
import TikDataSharing from '../tabs/TikDataSharing';
import TikTargetLocation from '../tabs/TikTargetLocation';
import TikTokPayment from '../tabs/TikTokPayment';

export interface TikTokTab {
	title: string;
	content: React.ReactNode;
}
interface TikTokData {
	title: string;
	mega_title: string;
	settings: {
		settings_title: string;
		tikTok_intro: {
			title: string;
			linkURL: string;
			linkText: string;
		}[];
		privacy_notice: {
			text: string;
			linkText: string;
			linkURL: string;
		};
		agreement_terms: {
			text: string;
			linkText: string;
			linkURL: string;
		};
		create_account: {
			title: string;
			description: string;
		};
		business_account: {
			title: string;
			description: string;
			partners: {
				name: string;
				id: string;
				logo: string;
				is_connected: boolean;
			}[];
		};
		data_sharing: {
			title: string;
			description: string;
		};
		payment_method: {
			title: string;
			description: string;
		};
		target_location: {
			title: string;
			description: string;
			location: string[];
		};
	};

	tabs: TikTokTab[];
}

export const getTikTokSetup = (platform: string): TikTokData | null => {
	const platformData = platforms[platform];

	if (!platformData) return null;

	const { title, mega_title, settings } = platformData;
	const { create_account, business_account, data_sharing, payment_method, target_location } =
		settings;

	const tabs = [
		{
			title: create_account.title,
			content: <TikCreateAccount data={create_account} />,
		},
		{
			title: business_account.title,
			content: <TikBusinessAccount data={business_account} />,
		},
		{
			title: data_sharing.title,
			content: <TikDataSharing data={data_sharing} />,
		},
		{
			title: payment_method.title,
			content: <TikTokPayment data={payment_method} />,
		},
		{
			title: target_location.title,
			content: <TikTargetLocation data={target_location} />,
		},
	];

	return { title, mega_title, settings, tabs };
};
