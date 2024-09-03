import React from 'react';
import platforms from '../../_comp/data.json';
import MailchimpAudienceSelect from '../tabs/MailchimpAudienceSelect';
import MailchimpBeforeInstalling from '../tabs/MailchimpBeforeInstalling';
import MailchimpCreateAccount from '../tabs/MailchimpCreateAccount';
import { BeforeInstallingNote } from '../../sendgrid/_comp/getSendgridSetup';

interface MailchimpTab {
	title: string;
	content: React.ReactNode;
}

interface MailchimpSetupData {
	title: string;
	mega_title: string;
	settings: {
		settings_title: string;
		mailchimp_intro: {
			title: string;
			linkURL: string;
			linkText: string;
		}[];
		before_installing: {
			title: string;
			note_1: BeforeInstallingNote;
			note_2: BeforeInstallingNote;
			note_3: BeforeInstallingNote;
			note_4: BeforeInstallingNote;
			note_5: BeforeInstallingNote;
		};
		create_account: {
			title: string;
			description: string;
		};
		audience_select: {
			title: string;
			description: string;
			store_list: {
				name: string;
				url: string;
			}[];
		};
	};
	tabs: MailchimpTab[];
}

export const getMailchimpSetup = (platform: string): MailchimpSetupData | null => {
	const platformData = platforms[platform];

	if (!platformData) return null;

	const { title, mega_title, settings } = platformData;
	const { create_account, before_installing, audience_select } = settings;

	const tabs: MailchimpTab[] = [
		{
			title: before_installing.title,
			content: <MailchimpBeforeInstalling data={before_installing} />,
		},
		{
			title: create_account.title,
			content: <MailchimpCreateAccount data={create_account} />,
		},
		{
			title: audience_select.title,
			content: <MailchimpAudienceSelect data={audience_select} />,
		},
	];

	return { title, mega_title, settings, tabs };
};
