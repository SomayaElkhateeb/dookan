import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';

interface data {
	id: string;
	title: string;
	description: string;
}
export default function CustomerOrderNotifcation() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const fixedData: data[] = [
		{
			id: '1',
			title: t('Order confirmation'),
			description: t('Sent to the customers after they place their order.'),
		},
		{
			id: '1',
			title: t('Order status changed'),
			description: t(
				"Sent on the order's status change to inform the customer about the progress in order.",
			),
		},
		{
			id: '1',
			title: t('Order shipped'),
			description: t('Sent to to notify the customer that the purchased items are on their way.'),
		},
		{
			id: '1',
			title: t('Order is ready for pickup'),
			description: t('Sent to notify the customer that purchased items are ready for pickup.'),
		},
	];

	const handelClick = (el: data) => {
		localStorage.setItem('notificationTitle', el?.title);
		navigate(`?id=${el?.id}`);
	};
	return (
		<div className='global-cards lg:col-span-2'>
			<div className='flex-col-global  gap-0'>
				<h2 className='title'>{t('Customer order notifications')}</h2>
				<p className='subtitle'>
					{t(
						'These email notifications are sent to customers to confirm their orders and keep them informed about the order progress',
					)}
				</p>
			</div>
			<div className='flex-col-global'>
				{fixedData?.map((el, i) => (
					<div className='flex-col-global' key={el.id}>
						<div className='flexResponsive'>
							<div>
								<h3 className='title text-sm'>{el.title}</h3>
								<p className='subtitle text-[.7rem]'>{el.description}</p>
							</div>
							<div>
								<Button
									variant='secondary'
									onClick={() => {
										handelClick(el);
									}}
								>
									{t('Activate')}
								</Button>
							</div>
						</div>
						{i !== fixedData.length - 1 ? <hr /> : ''}
					</div>
				))}
			</div>
		</div>
	);
}
