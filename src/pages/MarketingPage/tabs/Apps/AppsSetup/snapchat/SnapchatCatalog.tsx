import { SubHeader } from 'src/app/components/optimized';
import SnapchatMarketingCatalog from './_comp/SnapchatMarketingCatalog';
import { useTranslation } from 'react-i18next';

const SnapchatCatalog = () => {
	const { t } = useTranslation();
	return (
		<>
			<SubHeader title={t('Setup Marketing Catalog')} />
			<section className='p-5 w-[90%] lg:w-[60%] mx-auto flex flex-col gap-4'>
				<h2 className='title text-lg'>{t('Set Up Business Marketing Catalog')} </h2>

				<SnapchatMarketingCatalog />
			</section>
		</>
	);
};

export default SnapchatCatalog;
