import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';

export default function PaymentProvidersCard() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const providers = [
		'checkout',
		'payTabs',
		'moyasar',
		'amazonServices',
		'tap',
		'hyperPay',
		'myFatoorah',
	];
	return (
		<div className='flex-col-global justify-between items-start p-5 gap-5 cardDetails-sharedClass h-full'>
			<div className='grid  gap-5'>
				<h2 className='title'>{t('Third party payment providers')}</h2>
				<p className='paragraph'>
					{t(
						'Providers that enable you to accept payment methods at a rate set by the third-party. An additional fee will apply to new orders once you select a plan.',
					)}
				</p>
				<section className='flex flex-wrap gap-3'>
					{providers.map((item, index) => (
						<img
							key={index}
							src={getImageUrl(`paymentProviders/${item}.svg`)}
							alt='PaymentProvider'
						/>
					))}
				</section>
				<p className='paragraph text-subtitle'>
					{t(
						'Compare over 8 different payment gateway providers and pick the one that suits your needs.',
					)}
				</p>
			</div>
			<Button
				variant='primary'
				text={t('Setup providers')}
				onClick={() => navigate('payment-providers')}
			/>
		</div>
	);
}
