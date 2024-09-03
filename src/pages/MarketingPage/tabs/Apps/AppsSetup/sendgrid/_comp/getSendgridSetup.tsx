import React from 'react';
import platforms from '../../_comp/data.json';
import SendgridBeforeInstalling from '../tabs/SendgridBeforeInstalling';
import SendgridAudienceSelect from '../tabs/SendgridAudienceSelect';
import SendgridConnectAPI from '../tabs/SendgridConnectAPI';

interface SendgridTab {
	title: string;
	content: React.ReactNode;
}

interface SendgridNote {
	title: string;
	linkURL: string;
	linkText: string;
}

export interface BeforeInstallingNote {
	text_1: string;
	text_2: string;
	linkText: string;
	linkURL: string;
}
interface SendgridSetting {
	title: string;
	description: string;
}

interface SendgridStore {
	name: string;
	url: string;
}

interface SendgridSetupData {
	title: string;
	mega_title: string;
	settings: {
		settings_title: string;
		sendgrid_intro: SendgridNote[];
		privacy_notice: SendgridNote;
		agreement_terms: SendgridNote;
		before_installing: {
			title: string;
			note_1: BeforeInstallingNote;
			note_2: BeforeInstallingNote;
			note_3: BeforeInstallingNote;
			note_4: BeforeInstallingNote;
			note_5: BeforeInstallingNote;
		};
		create_account: SendgridSetting;
		audience_select: {
			title: string;
			description: string;
			store_list: SendgridStore[];
		};
	};
	tabs: SendgridTab[];
}

export const getSendgridSetup = (platform: string): SendgridSetupData | null => {
	const platformData = platforms[platform];

	if (!platformData) return null;

	const { title, mega_title, settings } = platformData;

	const { connect_API, before_installing, audience_select } = settings;

	const tabs: SendgridTab[] = [
		{
			title: before_installing.title,
			content: <SendgridBeforeInstalling data={before_installing} />,
		},
		{
			title: connect_API.title,
			content: <SendgridConnectAPI />,
		},
		{
			title: audience_select.title,
			content: <SendgridAudienceSelect data={audience_select} />,
		},
	];

	return { title, mega_title, settings, tabs };
};
