import { useTranslation } from 'react-i18next';
import { PiExclamationMarkBold } from 'react-icons/pi';
import FontSizeProgress from './FontSizeProgress';
import TextStyleToggle from './TextStyleToggle';
// icons
import { PiLinkSimpleBold } from 'react-icons/pi';
import { PiTextItalicBold } from 'react-icons/pi';
import { GoBold } from 'react-icons/go';
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';

import { Menu } from 'src/app/components/optimized';
import PopoverComponent from 'src/app/components/optimized/UiKits/Popover';

const EmailOptions = () => {
	const { t } = useTranslation();
	return (
		<div className='global-cards shadow p-0 h-full'>
			<h3 className='title pt-5 text-center'>{t('Text')}</h3>
			<hr />
			<Style />
			<hr />
			<Section />
		</div>
	);
};

export default EmailOptions;

const Style = () => {
	const { t } = useTranslation();
	const { selectedOption, handleSelect } = useSelectBox();
	const sortMenus = [
		{ id: nanoid(), text: 'Roboto' },
		{ id: nanoid(), text: 'Poppins' },
		{ id: nanoid(), text: 'Open Sans' },
		{ id: nanoid(), text: 'Montserrat' },
	];

	return (
		<div className='px-5'>
			<p className='uppercase text-title text-sm pb-2'>{t('style')}</p>
			<div className='flex items-center gap-1'>
				<span>{t('Web safe font')}</span>
				<p className='size-4 rounded-full bg-grayIcon flex items-center justify-center rotate-180'>
					<PiExclamationMarkBold color={'white'} />
				</p>
			</div>
			<div className='flex-flex-col gap-4'>
				<div className='global-cards bg-light-1 rounded gap-0'>
					<p className='title'>{t('System Font')}</p>
					<span className='text-title text-sm pb-4'>{t('Regular')}</span>

					<PopoverComponent
						button={
							<>
								<button className='bg-white border w-full border-constrained py-2 text-center text-title'>
									{t('Change')}
								</button>
							</>
						}
					>
						<Menu options={sortMenus} selectedOption={selectedOption} onSelect={handleSelect} />
					</PopoverComponent>
				</div>
				<FontSizeProgress value={16} min={10} max={36} />
				<TextStyleToggle IconOne={GoBold} IconTwo={PiTextItalicBold} IconThree={PiLinkSimpleBold} />

				<div className='flex items-center gap-2'>
					<input type='color' name='textColor' className='rounded-md' />
					<span className='text-sm text-title'>{t('Text color')}</span>
				</div>

				<div className='flex items-center gap-2'>
					<input type='color' name='textColor' className='rounded-md ' />
					<span className='text-sm text-title '>{t('Link color')}</span>
				</div>
			</div>
		</div>
	);
};

const Section = () => {
	const { t } = useTranslation();
	return (
		<div className='px-5 flex flex-col gap-4'>
			<p className='uppercase text-title text-sm'>{t('section')}</p>
			<div>
				<p className=' text-title text-sm pb-2'>{t('Alignment')}</p>
				<TextStyleToggle IconOne={FaAlignLeft} IconTwo={FaAlignCenter} IconThree={FaAlignRight} />
			</div>

			<div className='flex items-center gap-2'>
				<input type='color' name='textColor' className='rounded-md' />
				<span className='text-sm text-title'>{t('Background')}</span>
			</div>
		</div>
	);
};
