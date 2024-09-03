import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppsCard } from 'src/app/components/optimized';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useLanguage from 'src/app/utils/hooks/useLanguage';

interface SocialApp {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
	status: 'free' | 'installed';
	url: string;
}
interface SocialAppsWrapperProps {
	socialApps: SocialApp;
	title: string;
}

const SocialAppsWrapper = ({ socialApps, title }: SocialAppsWrapperProps) => {
	const [showAll, setShowAll] = useState(false);
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

	const handleViewAll = () => {
		setShowAll(!showAll);
	};

	const buttonText = showAll ? 'View Less' : 'View All';

	const { t } = useTranslation();
	const { language } = useLanguage();

	const displayedApps = showAll ? socialApps : socialApps.slice(0, itemsToRender);

	return (
		<div>
			<div className='flex justify-between mb-5'>
				<h2 className='text-lg font-semibold text-title'>{title}</h2>

				<div className='flex items-center'>
					<button className='text-sm font-semibold text-title mx-1' onClick={handleViewAll}>
						{t(buttonText)}
					</button>
					{language === 'ar' ? <FaChevronLeft /> : <FaChevronRight />}
				</div>
			</div>
			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{displayedApps?.map((app) => (
					<div key={app.id} className='col-span-1'>
						<AppsCard {...app} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SocialAppsWrapper;
