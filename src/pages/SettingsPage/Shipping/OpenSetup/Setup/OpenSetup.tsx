import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader, TabX } from 'src/app/components/optimized';
import SetupInfo from '../SetupInfo';
import SmsaAccount from '../Smsa/SmsaAccount';

export default function OpenSetup() {
	const { t } = useTranslation();

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
	};

	const tabs = [
		{
			title: t('Basic setup'),
			content: <SmsaAccount />,
		},
		{
			title: t('Services setup'),
			content: <SetupInfo gap={false} rates={true} />,
		},
	];

	return (
		<div>
			<SubHeader title={t('Install SMSA')} />
			<div className='custom_container py-5 custom-grid-parent'>
				<div className='grid-left'>
					<TabX
						tabs={tabs}
						currentTab={currentTab}
						handleNext={handleNext}
						handlePrev={handlePrev}
						handleFinish={handleFinish}
						handleTabClick={handleTabClick}
					/>
				</div>
				<div className='grid-right' />
			</div>
		</div>
	);
}
