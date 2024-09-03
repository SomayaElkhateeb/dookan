import { useTranslation } from 'react-i18next';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import MarketingTableMobile from '../../_comp/MarketingTableMobile';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect } from 'react';
import DiscountsTable from './Table/DiscountsTable';
import TopSectionDiscountAndCoupons from './TopSectionDiscountAndCoupons';

const discounts = [
	{
		discountName: 'Ramadan campaign',
		isActive: true,
		amount: '- SAR 20.00',
	},
	{
		discountName: 'Summer campaign',
		isActive: false,
		amount: '- SAR 15.00',
	},
];
const formattedDiscounts = discounts.map(({ discountName, ...rest }) => ({
	name: discountName,
	...rest,
}));
const Discounts = () => {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();
	// const dispatch = useAppDispatch();
	// const { discounts, isLoading, error } = useAppSelector((state) => state.discount);

	// useEffect(() => {
	// 	dispatch(getDiscounts());
	// }, [dispatch]);

	return (
		<div className='custom_container  relative'>
			<div className='flex-col-global'>
				<TopSectionDiscountAndCoupons addButton={t('add new discount')} path='addDiscount' />
				{/* <DiscountsTable discounts={discounts} isLoading={isLoading} />
				{xs && (
					<div className='flex-col-global'>
						
						<MarketingTableMobile items={formattedDiscounts} />
						<AddButtonMobile path='addDiscount' />
					</div>
				)} */}
			</div>
		</div>
	);
};

export default Discounts;
