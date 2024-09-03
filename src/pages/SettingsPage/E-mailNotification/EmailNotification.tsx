import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SubHeader } from 'src/app/components/optimized';

import Customization from '../CustomizationsSettings/Customization';
import CustomerOrderNotifcation from './CustomOrderNotification';
import CustomizeNotificationForm from './CustomizeNotificationForm';

export default function EmailNotification() {
	//  hooks
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();

	const id = searchParams.get('id');
	return id ? (
		<CustomizeNotificationForm />
	) : (
		<div className='flex-col-global '>
			<SubHeader title={t('Notifications')} />
			<div className='custom-grid-parent custom_container'>
				<div className='grid-left flex-col-global gap-5'>
					<CustomerOrderNotifcation />
					<Customization />
				</div>
			</div>
		</div>
	);
}
