import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CouponsTable from 'src/pages/MarketingPage/tabs/Coupons/NewCoupons/CouponsTable';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import MarketingTableMobile from '../../_comp/MarketingTableMobile';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import TopSectionDiscountAndCoupons from '../Discounts/TopSectionDiscountAndCoupons';
import { getCoupons } from 'src/app/store/slices/marketingPage/coupon/couponAsyncThunks';

const couponsData = [
	{
		customerName: 'Sam25',
		isActive: true,
		amount: '- SAR 20.00',
	},
	{
		customerName: 'Nem##',
		isActive: false,
		amount: '- SAR 15.00',
	},
];
// const formattedCoupons = couponsData.map(({ customerName, ...rest }) => ({
// 	name: customerName,
// 	...rest,
// }));
const Coupons = () => {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();
	// const dispatch = useAppDispatch();
	// const { coupons, isLoading } = useAppSelector((state) => state.couponPage);

	// useEffect(() => {
	// 	dispatch(getCoupons());
	// }, [dispatch]);

	return (
		<div className='custom_container '>
			<div className='flex-col-global  '>
				{/*  top section */}
				<TopSectionDiscountAndCoupons addButton={t('add new coupon')} path='addCoupon' />
				{/* {xs && (
					<div className='flex-col-global '>
						<MarketingTableMobile items={formattedCoupons} />
						<AddButtonMobile path='addCoupon' />
					</div>
				)} */}
				{/*  table section */}
				{/* <CouponsTable coupons={coupons} isLoading={isLoading} /> */}
			</div>
		</div>
	);
};

export default Coupons;
