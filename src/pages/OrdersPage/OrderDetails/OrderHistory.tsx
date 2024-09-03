import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

const orderHistory = [
	{ id: nanoid(), status: 'processing', name: 'Mohamed Hasan', time: 'Yesterday' },
	{ id: nanoid(), status: 'pending', name: 'Mohamed Hasan', time: 'Week ago' },
];
export default function OrderHistory() {
	const { t } = useTranslation();
	return (
		<div className='cardDetails-sharedClass'>
			<h2 className='title p-3'>{t('Order History')}</h2>

			{orderHistory.map((e) => {
				return (
					<>
						<hr />
						<div key={e.id} className='p-3 flex-col-global gap-1'>
							<h4 className='text-sm text-title'>
								{t('Order is in')} {e.status}
							</h4>
							<p className='text-sm text-subtitle'>
								{e.name} | {e.time}
							</p>
						</div>
					</>
				);
			})}
		</div>
	);
}
