import { Outlet } from 'react-router-dom';
import { HorizontalTabsLink } from 'src/app/components/optimized';
import AnalyticsPageGuard from './_comp/AnalyticsPageGuard';

export default function AnalyticsPage() {
	const tabs = [
		{
			name: 'Overview',
			path: 'overview',
		},
		{
			name: 'Products',
			path: 'products',
		},
		{
			name: 'Orders',
			path: 'orders',
		},
		{
			name: 'Customers',
			path: 'customers',
		},
		{
			name: 'Integrations',
			path: 'integrations',
		},
	];

	return (
		<AnalyticsPageGuard>
			<div className='flex-col-global'>
				<div className='Sticky_header'>
					<HorizontalTabsLink tabs={tabs} path='/analytics' />
				</div>
				{/* AnalyticsTabs Page */}
				<main className='custom_container'>
					<Outlet />
				</main>
			</div>
		</AnalyticsPageGuard>
	);
}
