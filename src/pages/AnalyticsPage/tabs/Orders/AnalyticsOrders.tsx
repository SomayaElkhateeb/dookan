import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import CompareBar from 'src/app/components/optimized/UiKits/CompareBar';
import AnalyticsTableActions from '../../_comp/AnalyticsTableActions';
import { ColumnChart } from 'src/app/components/optimized';
import useAnalyticsData from '../../_hook/useAnalyticsData';
import data from '../../_comp/data.json';
import AnalyticsOrdersTable from './comp/AnalyticsOrdersTable';
import { getNumericValue, parseDate } from 'src/app/utils';
import { getOrderAnalyticsTable } from 'src/app/store/slices/analyticsPage/OrderAnalytics/orderAnalyticsTableAsyncThunks';
import AnalyticsOrdersTableMobile from './comp/AnalyticsOrdersTableMobile';

export interface AnalyticsOrder {
	day: string;
	orders: number;
	average_units_ordered: number;
	average_order_value: string;
	delivered: number;
	returned_quantity: number;
}
export default function AnalyticsOrders() {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();

	// redux
	const dispatch = useAppDispatch();
	const { ordersAnalytics, isLoading, error } = useAppSelector((state) => state.ordersAnalytics);

	useEffect(() => {
		dispatch(getOrderAnalyticsTable());
	}, [dispatch]);

	if (error) return <div>Error: {error}</div>;

	const ordersSortMenus = [
		{ text: t('Date Added') },
		{ text: t('Date (Oldest)') },
		{ text: t('Orders Descending') },
		{ text: t('Orders Ascending') },
		{ text: t('Average units ordered Descending') },
		{ text: t('Average units ordered Ascending') },
		{ text: t('Average order value Descending') },
		{ text: t('Average order value Ascending') },
		{ text: t('Delivered Descending') },
		{ text: t('Delivered Ascending') },
		{ text: t('Returned quantity Descending') },
		{ text: t('Returned quantity Ascending') },
	];

	const ordersSortFunctions: Record<string, (a: AnalyticsOrder, b: AnalyticsOrder) => number> = {
		[t('Date Added')]: (a, b) => parseDate(b.day) - parseDate(a.day),
		[t('Date (Oldest)')]: (a, b) => parseDate(a.day) - parseDate(b.day),
		[t('Orders Descending')]: (a, b) => b.orders - a.orders,
		[t('Orders Ascending')]: (a, b) => a.orders - b.orders,
		[t('Average units ordered Descending')]: (a, b) =>
			b.average_units_ordered - a.average_units_ordered,
		[t('Average units ordered Ascending')]: (a, b) =>
			a.average_units_ordered - b.average_units_ordered,
		[t('Average order value Descending')]: (a, b) =>
			getNumericValue(b.average_order_value) - getNumericValue(a.average_order_value),
		[t('Average order value Ascending')]: (a, b) =>
			getNumericValue(a.average_order_value) - getNumericValue(b.average_order_value),
		[t('Delivered Descending')]: (a, b) => b.delivered - a.delivered,
		[t('Delivered Ascending')]: (a, b) => a.delivered - b.delivered,
		[t('Returned quantity Descending')]: (a, b) => b.returned_quantity - a.returned_quantity,
		[t('Returned quantity Ascending')]: (a, b) => a.returned_quantity - b.returned_quantity,
	};
	const { arrange, tableData, handleArrangeChange, handleSelect, selectedOption } =
		useAnalyticsData<AnalyticsOrder>(data.ordersAnalyticsTable, ordersSortFunctions);

	return (
		<div className=' grid gap-5'>
			<CompareBar selectedComparisonOption={selectedOption} handleComparisonChange={handleSelect} />
			<ColumnChart percentage='5' />
			<AnalyticsTableActions
				data={tableData}
				sortMenus={ordersSortMenus}
				selectedOption={arrange}
				onSelectOption={handleArrangeChange}
				documentTitle='Orders Table Data'
			/>

			<AnalyticsOrdersTable ordersAnalytics={ordersAnalytics} isLoading={isLoading} />
			{xs && <AnalyticsOrdersTableMobile tableData={tableData} />}
		</div>
	);
}
