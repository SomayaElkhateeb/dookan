import { Outlet, useLocation } from 'react-router-dom';
import { HorizontalTabsLink } from 'src/app/components/optimized';

const MarketingLayout = () => {
	//  hooks
	const { pathname } = useLocation();
	const tabs = [
		// {
		// 	name: 'Apps',
		// 	path: 'apps',
		// },
		{
			name: 'Discounts',
			path: 'discounts',
		},
		{
			name: 'Coupons',
			path: 'coupons',
		},
		// {
		// 	name: 'Campaigns',
		// 	path: 'campaigns',
		// },
		{
			name: 'Catalog Rule',
			path: 'catalogRule',
		},
		{
			name: 'Cart Rule',
			path: 'cartRule',
		},
		
	];

	const isEmailForm = pathname.includes('email-form');
	const isAddDiscountOrAddCoupon =
		pathname.includes('addDiscount') ||
		pathname.includes('addCoupon') ||
		pathname.includes('addCampaign');
	return (
		<div className='grid gap-4'>
			{!isAddDiscountOrAddCoupon && !isEmailForm && (
				<div className='Sticky_header'>
					<HorizontalTabsLink tabs={tabs} path='/marketing' />
				</div>
			)}
			<Outlet />
		</div>
	);
};

export default MarketingLayout;
