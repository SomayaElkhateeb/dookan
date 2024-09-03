import { useTranslation } from 'react-i18next';

export default function ServiceDetailsSales() {
	//  hooks
	const { t } = useTranslation();

	const parentDivClassName = 'flex-col-global gap-[.3rem]';
	const headerClassName = 'text-[.9rem]  text-title font-bold';
	const describtionClassName = 'text-[.65rem]  text-title ';
	return (
		<div className='global-cards py-[1rem]'>
			<div className='flex-col-global gap-[1rem]'>
				<div className='flex-col-global gap-[.5rem]'>
					<div className='flex-col-global gap-[.3rem] px-[1rem]'>
						<p className='text-[1.2rem] font-semibold text-title'>Let\'s generate sales</p>
						<p className='text-[.9rem]  text-title'>SAR 200/ hour</p>
					</div>
					<hr />

					<div className='flex-col-global gap-[.7rem] px-[1rem]'>
						<p className='text-[.9rem]  text-title'>{t('Description')}</p>
						<div className='flex-col-global gap-[1.5rem]'>
							<div className={parentDivClassName}>
								<p className={headerClassName}>Easy checkout</p>
								<p className={describtionClassName}>
									With Facebook Shop, your customers will be able to easily browse products on
									mobile and checkout on any device.
								</p>
							</div>
							<div className={parentDivClassName}>
								<p className={headerClassName}>Increase your revenue</p>
								<p className={describtionClassName}>
									Merchants see an average increase of 15% in revenue when selling on Facebook.
								</p>
							</div>

							<div className={parentDivClassName}>
								<p className={headerClassName}>Grow your reach</p>
								<p className={describtionClassName}>
									Advertise and sell your products directly through your Facebook page and reach
									billions of potential customers.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
