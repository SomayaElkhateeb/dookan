import { useTranslation } from 'react-i18next';

import PaymentCard from 'src/app/components/optimized/Cards/PaymentCard';
import PackageSelector from './PackageSelector';
import '../../_comp/custom-radio.css';
import { SubHeader } from 'src/app/components/optimized';

export default function PackageSubscribe() {
	const { t } = useTranslation();

	return (
		<>
			<SubHeader title={t('Subscribe to package')} />
			<div className='custom_container custom-grid-parent py-5'>
				<div className='grid-left'>
					<PaymentCard removeHours={true} />
				</div>
				<div className='grid-right'>
					<PackageSelector />
				</div>
			</div>
		</>
	);
}
