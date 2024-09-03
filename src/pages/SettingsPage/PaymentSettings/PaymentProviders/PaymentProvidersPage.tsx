import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import PaymentTable from './PaymentTable/PaymentTable';

export default function PaymentProvidersPage() {
	const { t } = useTranslation();
	return (
		<div>
			<SubHeader title={t('Third party payment providers')} />
			<div className='custom_container'>
				<PaymentTable />
			</div>
		</div>
	);
}
