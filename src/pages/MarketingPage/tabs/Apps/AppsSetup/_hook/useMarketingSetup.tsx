import { getFacebookSetup } from '../facebook/getFacebookSetup';
import { getGoogleSetup } from '../google/getGoogleSetup';
import MailchimpSetup from '../mailchimp/MailchimpSetup';
import { getMailchimpSetup } from '../mailchimp/_comp/getMailchimpSetup';
import SendgridSetup from '../sendgrid/SendgridSetup';
import { getSendgridSetup } from '../sendgrid/_comp/getSendgridSetup';
import SnapchatSetup from '../snapchat/SnapchatSetup';
import { getSnapchatSetup } from '../snapchat/_comp/getSnapchatSetup';
import TikTokSetup from '../tiktok/TikTokSetup';
import { getTikTokSetup } from '../tiktok/_comp/getTikTokSetup';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { TabX } from 'src/app/components/optimized';

const useMarketingSetup = (platform: string | null) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const hasConfirmed = searchParams.get('add_channel') === 'true';

	const [currentTab, setCurrentTab] = useState(0);
	const [_, setFinish] = useState(false);

	const handleTabClick = (index: number) => {
		setCurrentTab(index);
	};

	const handleNext = () => {
		if (currentTab < tabs.length - 1) {
			setCurrentTab(currentTab + 1);
		}
	};

	const handlePrev = () => {
		if (currentTab > 0) {
			setCurrentTab(currentTab - 1);
		}
	};

	const handleFinish = (value: boolean) => {
		setFinish(value);
		setSearchParams({ features_manage: 'active' });
	};

	let title: string;
	let tabs: [];

	switch (platform) {
		case 'facebook':
			({ title, tabs } = getFacebookSetup(platform));
			break;
		case 'google':
			({ title, tabs } = getGoogleSetup(platform));
			break;
		case 'tikTok':
			({ title, tabs } = getTikTokSetup(platform));
			break;
		case 'snapchat':
			({ title, tabs } = getSnapchatSetup(platform));
			break;
		case 'mailchimp':
			({ title, tabs } = getMailchimpSetup(platform));
			break;
		case 'sendGrid':
			({ title, tabs } = getSendgridSetup(platform));
			break;
		default:
			title = 'All';
			tabs = [];
			break;
	}

	const renderSetupOrTabs = () => {
		const Tabs = (
			<TabX
				tabs={tabs}
				currentTab={currentTab}
				handleNext={handleNext}
				handlePrev={handlePrev}
				handleFinish={handleFinish}
				handleTabClick={handleTabClick}
			/>
		);
		if (!hasConfirmed) {
			switch (platform) {
				case 'tikTok':
					return <TikTokSetup platform={platform} />;
				case 'snapchat':
					return <SnapchatSetup platform={platform} />;
				case 'mailchimp':
					return <MailchimpSetup platform={platform} />;
				case 'sendGrid':
					return <SendgridSetup platform={platform} />;
				default:
					return Tabs;
			}
		} else {
			return Tabs;
		}
	};

	return { title, tabs, renderSetupOrTabs };
};

export default useMarketingSetup;
