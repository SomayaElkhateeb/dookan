import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import BigAppsCard from 'src/app/components/optimized/Cards/BigAppsCard';
import { getImageUrl } from 'src/app/utils';

export default function ShippingProviders() {
	const { t } = useTranslation();
	const cards = [
		{
			id: nanoid(),
			image: getImageUrl('companies/express.svg'),
			name: 'SMSA',
			url: '/settings/shipping/setupProviders/smsa',
			status: 'free',
			country: 'saudi arabia',
			count: 120,
			title: t('cities'),
			percentage: t('discounted rates'),
			description:
				'Connect with Facebook, Instagram Shop and launch an ad campaign to show your products in front of potential customers.',
		},
		{
			id: nanoid(),
			image: getImageUrl('companies/aramexred.svg'),
			name: 'Aramex',
			url: '/',
			status: 'installed',
			country: 'saudi arabia',
			count: 120,
			title: t('cities'),
			description:
				'Connect with Facebook, Instagram Shop and launch an ad campaign to show your products in front of potential customers.',
		},
		{
			id: nanoid(),
			image: getImageUrl('companies/aymakan.svg'),
			name: 'AyMakan',
			url: '/',
			status: 'free',
			country: 'saudi arabia',
			count: 120,
			title: t('cities'),
			percentage: t('discounted rates'),
			description:
				'Connect with Facebook, Instagram Shop and launch an ad campaign to show your products in front of potential customers.',
		},
	];
	return (
		<div className='flex-col-global'>
			<SubHeader title={t('Third party shipping providers')} />
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-5'>
				{cards.map((card) => (
					<BigAppsCard key={card.id} {...card} />
				))}
			</div>
		</div>
	);
}
