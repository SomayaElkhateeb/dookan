import platforms from '../_comp/data.json';
import GoConnectAccount from './tabs/GoConnectAccount';
import GooglePayment from './tabs/GooglePayment';
import React from 'react';

interface GoogleTab {
	title: string;
	content: React.ReactNode;
}

interface GoogleSetupData {
	title: string;
	settings: {
		connect_account: {
			title: string;
			description: string;
		};
		payment_method: {
			title: string;
			description: string;
			method: {
				title: string;
				description: string;
				buttonText: string;
			}[];
		};
	};
	tabs: GoogleTab[];
}

export const getGoogleSetup = (platform: string): GoogleSetupData | null => {
	const platformData = platforms[platform];
	// console.log(platformData);

	if (!platformData) return null;

	const { settings, title } = platformData;
	const { connect_account, payment_method } = settings;

	const tabs: GoogleTab[] = [
		{
			title: connect_account.title,
			content: <GoConnectAccount data={connect_account} />,
		},
		{
			title: payment_method.title,
			content: <GooglePayment data={payment_method} />,
		},
	];

	return { title, settings, tabs };
};
