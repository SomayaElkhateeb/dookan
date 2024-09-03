// import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useLanguage from 'src/app/utils/hooks/useLanguage';
import { NextIcon } from 'src/app/utils/icons';
import { AppsWrapperProps } from './useAppStore';

export default function AppsWrapper({
	socialApps,
	title,
	onButtonClick,
	warningMessage,
	ChildrenComponent,
	cards,
}: AppsWrapperProps) {
	const { t } = useTranslation();
	const { language } = useLanguage();

	// const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		setScreenWidth(window.innerWidth);
	// 	};
	// 	window.addEventListener('resize', handleResize);
	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, []);

	// const calculateItemsToRender = useCallback(() => {
	// 	return screenWidth < 1024 ? 2 : screenWidth < 1536 ? 3 : 4;
	// }, [screenWidth]);
	// const itemsToRender = useMemo(calculateItemsToRender, [calculateItemsToRender]);

	const renderItems =
		socialApps.length > 0 ? (
			socialApps.map((app) => (
				<div key={app.id} className='col-span-1'>
					<ChildrenComponent {...app} />
				</div>
			))
		) : (
			<p className='text-error text-center col-span-4 text-lg'>{warningMessage}</p>
		);

	return (
		<div className='grid gap-3'>
			<div className='flex justify-between'>
				<h2 className='title'>{title}</h2>
				<div className='flex items-center gap-1'>
					<button className='text-sm title' onClick={onButtonClick}>
						{t('View All')}
					</button>
					<NextIcon className={`fill-pri-dark ${language === 'ar' ? 'rotate-180' : ''}`} />
				</div>
			</div>
			<div
				className={`${
					cards
						? 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
						: 'grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'
				}`}
			>
				{renderItems}
			</div>
		</div>
	);
}
