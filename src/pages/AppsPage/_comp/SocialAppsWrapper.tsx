import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { BackIcon, NextIcon } from 'src/app/utils/icons';
import { AppsWrapperProps } from './useAppStore';
import { AppsCard } from 'src/app/components/optimized';

export default function SocialAppsWrapper({
	socialApps,
	title,
	onButtonClick,
	warningMessage,
}: AppsWrapperProps) {
	const [itemsToRender, setItemsToRender] = useState(getInitialItemsToRender());

	useEffect(() => {
		const handleResize = () => {
			setItemsToRender(getInitialItemsToRender());
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	function getInitialItemsToRender() {
		const screenWidth = window.innerWidth;
		if (screenWidth <= 640) {
			return 1; // mobile
		} else if (screenWidth < 1024) {
			return 2; // tablets
		} else if (screenWidth < 1536) {
			return 3; // tablets
		} else {
			return 4; // desktops
		}
	}
	const { t } = useTranslation();
	const { language } = useLanguage();
	const IconClass = 'fill-pri-dark';
	return (
		<div className='grid gap-3'>
			<div className='flex justify-between'>
				<h2 className='text-lg font-semibold text-title'>{title}</h2>

				<div className='flex items-center gap-1'>
					<button className='text-sm font-semibold text-title ' onClick={onButtonClick}>
						{t('View All')}
					</button>
					{language === 'ar' ? (
						<BackIcon className={IconClass} />
					) : (
						<NextIcon className={IconClass} />
					)}
				</div>
			</div>
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{socialApps.length > 0 ? (
					socialApps.slice(0, itemsToRender)?.map((app) => (
						<div key={app.id} className='col-span-1'>
							<AppsCard {...app} />
						</div>
					))
				) : (
					<p className='text-error text-center col-span-4 font-medium text-lg'>{warningMessage}</p>
				)}
			</div>
		</div>
	);
}
