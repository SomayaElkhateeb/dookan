import { useTranslation } from 'react-i18next';
import { SubHeader, Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';

export default function ThemesDetails() {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='custom_container'>
			<div className='flex-col-global'>
				<SubHeader title={t('mmm')}>
					<Button variant='primary' onClick={() => {}}>
						{t('Apply template')}
					</Button>
				</SubHeader>

				<img
					src={getImageUrl('images/ThemesPage/largewebsiteimg.png')}
					loading='lazy'
					alt='smallwebsiteimg'
				/>
			</div>
		</div>
	);
}
