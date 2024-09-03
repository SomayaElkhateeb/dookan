import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { ClientBox } from 'src/app/components/optimized';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';

export default function Summary() {
	//  hooks
	const { t } = useTranslation();
	const { language } = useLanguage();

	const divClassname = 'flex items-center justify-between px-[1rem]';
	const paragraphClassname = 'title font-normal text-[1rem]';
	return (
		<div className='cardDetails-sharedClass flex-col-global gap-[1rem] py-[1rem]'>
			<h4 className='subtitle px-[1rem]'>{t('Summary')}</h4>

			<div className={divClassname}>
				<p className={paragraphClassname}>{t('Number of hours')}</p>
				<span className={`${paragraphClassname} text-[1.2rem]`}>5</span>
			</div>

			<div className={divClassname}>
				<p className={paragraphClassname}>{t('Hour price')}</p>
				<span className={`${paragraphClassname} text-[1.2rem]`}>
					{language === 'ar' ? `200 ${t('SAR')}` : `${t('SAR')} 200`}
				</span>
			</div>
			<hr />
			<div className={divClassname}>
				<p className={paragraphClassname}>{t('Total')}</p>
				<span className='text-lg font-semibold'>
					{language === 'ar' ? `2000 ${t('SAR')}` : `${t('SAR')} 2000`}
				</span>
			</div>
			<hr />

			<div className='flex-col-global px-[1rem] gap-[.7rem]'>
				<ClientBox
					avatar={<Avatar variant='user' firstName='Samy' size='lg' />}
					title='Samy Ryan'
					details='Identity designer'
				/>
				<p className=' title text-sm font-normal'>{t("Let's generate sales")}</p>
			</div>
		</div>
	);
}
