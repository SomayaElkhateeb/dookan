import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from '../../../../app/components/optimized';
import { getImageUrl } from 'src/app/utils';
import ServiceDetailsSales from './ServiceDetailssales';
import ServiceProviderSection from './ServiceProviderSection';
import { useNavigate } from 'react-router-dom';
import RecentReview from 'src/pages/ReviewsPage/tabs/StoreReview/_comp/RecentReview';

export default function ServiceDetails() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className='flex-col-global'>
			{/*  top section */}
			<div className='flex flex-col'>
				<SubHeader title={t('Service details')}>
					<Button onClick={() => navigate('purchaseServicesPage')} variant='primary'>
						{t('Purchase service')}
					</Button>
				</SubHeader>

				<img loading='lazy' alt='img' src={getImageUrl('Services/poster.svg')} />
			</div>
			<div className='custom_container'>
				<div className='flex-col-global '>
					{/*  middle section */}
					<div className='custom-grid-parent'>
						<div className='grid-left flex flex-col gap-4'>
							<ServiceDetailsSales />
							<RecentReview />
						</div>
						<div className='grid-right'>
							<ServiceProviderSection />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
