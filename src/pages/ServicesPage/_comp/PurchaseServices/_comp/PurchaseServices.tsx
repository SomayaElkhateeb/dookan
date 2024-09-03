import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import PaymentCard from 'src/app/components/optimized/Cards/PaymentCard';
import Summary from './Summary';

export default function PurchaseServices() {
	//  hooks
	const { t } = useTranslation();
	return (
		<>
			<SubHeader title={t('Purchase service')} />
			<div className='custom_container py-5'>
				<div className='custom-grid-parent'>
					<div className='grid-left'>
						<PaymentCard />
					</div>
					<div className='grid-right'>
						<Summary />
					</div>
				</div>
			</div>
		</>
	);
}
