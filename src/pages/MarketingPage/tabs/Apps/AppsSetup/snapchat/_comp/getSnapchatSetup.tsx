import React from 'react';
import platforms from '../../_comp/data.json';
import SnapBusinessAccount from '../tabs/SnapBusinessAccount';
import SnapCreateAccount from '../tabs/SnapCreateAccount';
import SnapDataSharing from '../tabs/SnapDataSharing';

export interface SnapchatTab {
	title: string;
	content: React.ReactNode;
}

export interface SnapchatSetupData {
	title: string;
	mega_title: string;
	settings: {
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
	};
	tabs: SnapchatTab[];
}

export const getSnapchatSetup = (platform: string): SnapchatSetupData | null => {
	const platformData = platforms[platform];

	if (!platformData) return null;

	const { title, mega_title, settings } = platformData;
	const { create_account, business_account, data_sharing } = settings;

	const tabs: SnapchatTab[] = [
		{
			title: create_account.title,
			content: <SnapCreateAccount data={create_account} />,
		},
		{
			title: business_account.title,
			content: <SnapBusinessAccount data={business_account} />,
		},
		{
			title: data_sharing.title,
			content: <SnapDataSharing data={data_sharing} />,
		},
	];

	return { title, mega_title, settings, tabs };
};
