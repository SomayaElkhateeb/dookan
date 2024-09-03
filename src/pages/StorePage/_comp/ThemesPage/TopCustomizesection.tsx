import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';

export default function TopCustomizeSection() {
	//  hooks
	const { t } = useTranslation();

	const paragraphClass = 'title text-white text-[.8rem] opacity-70';
	return (
		<div className='bg-pri-dark rounded-[.4rem] pt-[1rem] text-white'>
			<div className='w-[95%] mx-auto flex flex-row sm:items-start items-center gap-[1rem]'>
				{/*  img */}
				<img
					src={getImageUrl('images/product.png')}
					loading='lazy'
					alt='img'
					className='w-[10rem] sm:h-full h-[7rem]'
				/>
				<div className='flex-col-global sm:gap-[1.5rem] gap-[.8rem] pb-[.6rem]'>
					<div className='flex-col-global gap-[.2rem]'>
						<p className={paragraphClass}>{t('CURRENT THEME')}</p>
						<p className='title  text-white'>Purfumika</p>
						<p className={paragraphClass}>
							{t('This is the theme customers see when they visit your store.')}
						</p>
					</div>
					<div className='flex md:flex-row flex-col md:items-center items-start sm:gap-[1rem] gap-[.6rem]'>
						<Button className='title'>{t('Customize design')}</Button>

						<Button className='title' variant='LearnButton'>
							{t('Learn more')}
						</Button>
					</div>
				</div>
				{/*  describtion */}
			</div>
		</div>
	);
}
