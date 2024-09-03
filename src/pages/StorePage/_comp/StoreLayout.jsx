import { Outlet, useLocation } from 'react-router-dom';
import { HorizontalTabsLink } from 'src/app/components/optimized';

const StoreLayout = () => {
	const { pathname } = useLocation();

	const tabs = [
		{
			name: 'Themes',
			path: 'themes',
		},
		{
			name: 'Design',
			path: 'design',
		},
		{
			name: 'Prefernces',
			path: 'prefernces',
		},
	];

	return (
		<div className={pathname !== '/store/prefernces' ? 'flex-col-global' : ''}>
			<div className='Sticky_header'>
				<HorizontalTabsLink tabs={tabs} path='/store' />
			</div>
			<Outlet />
		</div>
	);
};

export default StoreLayout;
