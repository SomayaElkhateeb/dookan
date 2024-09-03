import { useTranslation } from 'react-i18next';
import useAnalyticsData from '../../_hook/useAnalyticsData';
import { ColumnChart } from 'src/app/components/optimized';
import CompareBar from 'src/app/components/optimized/UiKits/CompareBar';
import AnalyticsTableActions from '../../_comp/AnalyticsTableActions';
import data from '../../_comp/data.json';
import { useEffect } from 'react';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import AnalyticsProductsTableMobile from './comp/AnalyticsProductTableMobile/AnalyticsProductsTableMobile';
import { getProductsAnalyticsTable } from 'src/app/store/slices/analyticsPage/ProductsAnalytics/productsAnalyticsTableAsyncThunks';
import AnalyticsProductsTable from 'src/pages/AnalyticsPage/tabs/Products/comp/AnalyticsProductTableMobile/AnalyticsProductsTable';
import { useAppDispatch, useAppSelector } from 'src/app/store';
export interface AnalyticsProduct {
	id: string;
	product_name: string;
	category: string;
	quantity: number;
	price: number;
	searches: number;
	views: number;
	quantity_sold: number;
	returns: number;
	imageUrl: string;
}
const AnalyticsProducts = () => {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();
	// redux
	const dispatch = useAppDispatch();
	const { productsAnalytics, isLoading, error } = useAppSelector(
		(state) => state.productsAnalytics || {},
	);

	useEffect(() => {
		dispatch(getProductsAnalyticsTable());
	}, [dispatch]);

	const productsSortMenus = [
		{ text: t('Quantity Descending') },
		{ text: t('Quantity Ascending') },
		{ text: t('Price Low in first') },
		{ text: t('Price High in first') },
		{ text: t('Searches Descending') },
		{ text: t('Searches Ascending') },
		{ text: t('Views Descending') },
		{ text: t('Views Ascending') },
		{ text: t('Quantity sold Descending') },
		{ text: t('Quantity sold Ascending') },
		{ text: t('Returns Descending') },
		{ text: t('Returns Ascending') },
	];
	const productsSortFunctions: Record<
		string,
		(a: AnalyticsProduct, b: AnalyticsProduct) => number
	> = {
		[t('Quantity Descending')]: (a, b) => b.quantity - a.quantity,
		[t('Quantity Ascending')]: (a, b) => a.quantity - b.quantity,
		[t('Price Low in first')]: (a, b) => a.price - b.price,
		[t('Price High in first')]: (a, b) => b.price - a.price,
		[t('Searches Descending')]: (a, b) => b.searches - a.searches,
		[t('Searches Ascending')]: (a, b) => a.searches - b.searches,
		[t('Views Descending')]: (a, b) => b.views - a.views,
		[t('Views Ascending')]: (a, b) => a.views - b.views,
		[t('Quantity sold Descending')]: (a, b) => b.quantity_sold - a.quantity_sold,
		[t('Quantity sold Ascending')]: (a, b) => a.quantity_sold - b.quantity_sold,
		[t('Returns Descending')]: (a, b) => b.returns - a.returns,
		[t('Returns Ascending')]: (a, b) => a.returns - b.returns,
	};
	const { arrange, tableData, handleArrangeChange, handleSelect, selectedOption } =
		useAnalyticsData<AnalyticsProduct>(data.productsAnalyticsTable, productsSortFunctions); // ????

	return (
		<div className=' grid gap-5'>
			<CompareBar selectedComparisonOption={selectedOption} handleComparisonChange={handleSelect} />
			<ColumnChart percentage='5' />
			<AnalyticsTableActions
				data={tableData}
				sortMenus={productsSortMenus}
				selectedOption={arrange}
				onSelectOption={handleArrangeChange}
				documentTitle='Products Table Data'
			/>
			<AnalyticsProductsTable isLoading={isLoading} data={productsAnalytics} />
			{xs && <AnalyticsProductsTableMobile tableData={tableData} />}
		</div>
	);
};

export default AnalyticsProducts;
