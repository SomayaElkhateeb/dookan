import { Button, PopupProceed, SubHeader, ToastsNotification } from 'src/app/components/optimized';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Async from '../_comp/Async';
import { usePlatformContext } from '../PlatformContext';

const TikTokSales = () => {
	const { syncStatus, setSyncStatus } = usePlatformContext();
	const [showNotification, setShowNotification] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [_, setSearchParams] = useSearchParams();
	const { t } = useTranslation();

	const handleCloseNotification = () => {
		setShowNotification(false);
	};

	const handleSetupNowClick = () => {
		setSearchParams({ catalog_marketing: 'active' });
	};

	const handleDisableSync = () => {
		console.log('Sync button clicked');
		setIsPopupOpen(false);
		setSyncStatus(false);
	};
	return (
		<>
			<SubHeader title={t('TikTok sales')} />
			<section className='p-5 w-[90%] lg:w-[60%] mx-auto flex flex-col gap-4'>
				{showNotification && (
					<ToastsNotification
						icon={<IoMdInformationCircleOutline size={25} />}
						backgroundColor='#E7EEFF'
						action={
							<button onClick={handleCloseNotification}>
								<IoClose />
							</button>
						}
					>
						<div className='py-2'>
							<span className='text-sm text-title'>
								Your ad account is under review. This normally takes up to 24 hours.
								<Button variant='link' className='text-sm inline'>
									{t('Learn More')}
								</Button>
							</span>
						</div>
					</ToastsNotification>
				)}
				<h2 className='title text-lg pt-3'>{t('Manage your TikTok features')}</h2>

				<div className='global-cards'>
					<div className='flex gap-2 flex-col lg:flex-row lg:items-center'>
						<h2 className='title'>{t('TikTok Marketing')}</h2>
						<p
							className='py-2 px-4 rounded-full title text-sm w-fit'
							style={{ background: '#B3B3B3' }}
						>
							Pending Account Review
						</p>
					</div>

					<p className='text-title text-sm'>
						Reach milions of potential customers with paid advertising campaigns
					</p>
				</div>
				{syncStatus === false && (
					<div className='global-cards'>
						<h2 className='title'>{t('Marketing Catalog')}</h2>
						<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
							<p className='global-install-p'>
								Directly sync all of your product information to use for campaigns.
							</p>
							<div className='global-install-btn'>
								<Button variant='secondary' onClick={handleSetupNowClick}>
									{t('Set up now')}
								</Button>
							</div>
						</div>
					</div>
				)}

				{syncStatus === true && (
					<>
						<h1 className='text-lg title'>Product Status on TikTok</h1>
						<Async title={t('TikTok Marketing')} asyncBtn={() => setIsPopupOpen(true)} />
					</>
				)}
			</section>
			{isPopupOpen && (
				<PopupProceed
					title='Are you want to Disable Catalog Sync From your store?'
					subTitle='You can Recync anytime with TikTok Catalog.'
					proceedBtnText='Yes, Disable'
					cancelBtnText='Discard'
					isOpen={isPopupOpen}
					onCancel={() => setIsPopupOpen(false)}
					onProceed={handleDisableSync}
					color='#EC5151'
				/>
			)}
		</>
	);
};

export default TikTokSales;
