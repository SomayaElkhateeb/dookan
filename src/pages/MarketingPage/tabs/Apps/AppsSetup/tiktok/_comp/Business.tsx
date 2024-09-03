import { Button, PopupProceed } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';
import { PiUserCircleThin } from 'react-icons/pi';
import { useState } from 'react';
import AccordionInstall from './AccordionInstall';

export default function Business({ setBusinessCenterChecked }) {
	const { t } = useTranslation();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isBusinessCenterOpen, setIsBusinessCenterOpen] = useState(true);

	const handleBusinessCenter = () => {
		setIsPopupOpen(true);
	};
	const handleBusinessCenterProceed = () => {
		setIsBusinessCenterOpen(false);
		setIsPopupOpen(false);
		setBusinessCenterChecked(true);
		console.log('Proceeding...');
	};

	return (
		<AccordionInstall title={t('TikTok Business Center Account')}>
			<>
				<p className='text-subtitle pb-6 text-sm w-[80%]'>
					{t(
						'Allow Dookan Create a TikTok Business Center account to access Your store manager, business page, and product catalog all in our place.',
					)}
				</p>
				<div className='border-secondary rounded-md m-5 px-3 py-1 border flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
					<div className='flex items-center gap-2'>
						<PiUserCircleThin size={60} />
						<span className='text-subtitle text-sm'>{t('Allow Dookan to create account')}</span>
					</div>
					<div>
						<Button onClick={handleBusinessCenter}>{t('Create')}</Button>
					</div>
				</div>
				{isPopupOpen && (
					<PopupProceed
						title={t('Approve access to your TikTok Ads Manager account')}
						subTitle={t(
							"In order to connect to this Business Center account, you'll need to approve admin access to the connected TikTok Ads Manager account.",
						)}
						proceedBtnText={t('Proceed')}
						cancelBtnText={t('Cancel')}
						isOpen={isPopupOpen}
						onCancel={() => setIsPopupOpen(false)}
						onProceed={handleBusinessCenterProceed}
					/>
				)}
			</>
		</AccordionInstall>
	);
}
