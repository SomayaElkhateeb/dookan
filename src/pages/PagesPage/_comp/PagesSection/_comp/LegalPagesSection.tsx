import { getImageUrl } from 'src/app/utils';
import LegalPagesCard from './LegalPagesCard';
import LegalPageParentCard from './LegalPageParentCard';
import { useTranslation } from 'react-i18next';

export default function LegalPagesSection() {
	//  hooks
	const { t } = useTranslation();
	const data = [
		{
			title: t('Return policy'),
			img: getImageUrl('pagesPage/returnPolicy.svg'),
			path: 'return_policy',
		},
		{
			title: t('Privacy policy'),
			img: getImageUrl('pagesPage/privacypolicy.svg'),
			path: 'return_policy',
		},
		{
			title: t('Terms of service'),
			img: getImageUrl('pagesPage/terms.svg'),
			path: 'return_policy',
		},
		{
			title: t('Shipping policy'),
			img: getImageUrl('pagesPage/shipping.svg'),
			path: 'return_policy',
		},
	];
	return (
		<LegalPageParentCard title={t('Legal pages')}>
			<div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4'>
				{data?.map((el, i) => (
					<LegalPagesCard key={i} header={el.title} path={el.path} img={el.img} />
				))}
			</div>
		</LegalPageParentCard>
	);
}
