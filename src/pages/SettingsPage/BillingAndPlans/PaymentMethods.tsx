import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';
import { AddFillIcon, MoreIcon } from 'src/app/utils/icons';
import AddPayment from './AddPayment';

export default function PaymentMethods() {
	//  hooks
	const [showPayment, setShowPayment] = useState(false);
	const { t } = useTranslation();

	const handleClose = () => {
		setShowPayment(false);
	};
	return (
		<section className='global-cards gap-4'>
			<div>
				<h2 className='title'>{t('Payment methods')}</h2>
				<p className='text-subtitle text-sm pt-1'>{t('For bills and purchases')}</p>
			</div>

			<div className='flexResponsive'>
				<div className='flex items-center gap-2'>
					<img src={getImageUrl('companies/visa.svg')} />
					<p className='text-title font-semibold text-sm'>{t('Visa card')}</p>
					<span className='text-subtitle bg-constrained rounded text-xs py-1 px-2'>
						{t('Main')}
					</span>
				</div>

				<MoreIcon className='cursor-pointer' />
			</div>
			<hr />
			<div className='flexResponsive'>
				<div className='flex items-center gap-2'>
					<img src={getImageUrl('companies/mada.svg')} />
					<p className='text-title font-semibold text-sm'>{t('Mada')}</p>
				</div>

				<MoreIcon className='cursor-pointer' />
			</div>

			<div>
				<Button variant='secondary' LeftIcon={AddFillIcon} onClick={() => setShowPayment(true)}>
					{t('Add Payment method')}
				</Button>
			</div>

			{showPayment && <AddPayment showPayment={showPayment} handleClose={handleClose} />}
		</section>
	);
}
