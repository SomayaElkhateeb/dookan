import CompareBar from 'src/app/components/optimized/UiKits/CompareBar';
import AnalyticsTableActions from '../../_comp/AnalyticsTableActions';
import { ColumnChart } from 'src/app/components/optimized';
import useAnalyticsData from '../../_hook/useAnalyticsData';
import data from '../../_comp/data.json';
import { useTranslation } from 'react-i18next';
import CustomersTable from './comp/CustomersAnalyticsTable';
import { getNumericValue, parseDate } from 'src/app/utils';
import { useEffect } from 'react';
import { getCustomersAnalyticsTable } from 'src/app/store/slices/analyticsPage/CustomerAnalytics/customersAnalyticsTableAsyncThunks';

import useResponsive from 'src/app/utils/hooks/useResponsive';

import { useAppDispatch, useAppSelector } from 'src/app/store';
import CustomersAnalyticsTableMobile from './comp/CustomersTableMobile';

export interface AnalyticsCustomer {
	day: string;
	new_customers: number;
	purchasing_customers: string;
	customer_groups: string;
}
const Customers = () => {
	const { t } = useTranslation();
	const { xs } = useResponsive();

	// redux
	const dispatch = useAppDispatch();
	const { customersAnalytics, isLoading, error } = useAppSelector(
		(state) => state.customersAnalytics || {},
	);

	useEffect(() => {
		dispatch(getCustomersAnalyticsTable());
	}, [dispatch]);

	const customersSortMenus = [
		{ text: t('Date Added') },
		{ text: t('Date (Oldest)') },
		{ text: t('New customers Descending') },
		{ text: t('New customers Ascending') },
		{ text: t('Purchasing customers Descending') },
		{ text: t('Purchasing customers Ascending') },
		{ text: t('Customer groups Descending') },
		{ text: t('Customer groups Ascending') },
	];

	const customersSortFunctions: Record<
		string,
		(a: AnalyticsCustomer, b: AnalyticsCustomer) => number
	> = {
		[t('Date Added')]: (a, b) => parseDate(b.day) - parseDate(a.day),
		[t('Date (Oldest)')]: (a, b) => parseDate(a.day) - parseDate(b.day),
		[t('New customers Descending')]: (a, b) => b.new_customers - a.new_customers,
		[t('New customers Ascending')]: (a, b) => a.new_customers - b.new_customers,
		[t('Purchasing customers Descending')]: (a, b) =>
			getNumericValue(b.purchasing_customers) - getNumericValue(a.purchasing_customers),
		[t('Purchasing customers Ascending')]: (a, b) =>
			getNumericValue(a.purchasing_customers) - getNumericValue(b.purchasing_customers),
		[t('Customer groups Descending')]: (a, b) =>
			getNumericValue(b.customer_groups) - getNumericValue(a.customer_groups),
		[t('Customer groups Ascending')]: (a, b) =>
			getNumericValue(a.customer_groups) - getNumericValue(b.customer_groups),
	};
	const { arrange, tableData, handleArrangeChange, handleSelect, selectedOption } =
		useAnalyticsData<AnalyticsCustomer>(data.customersAnalyticsTable, customersSortFunctions);

	return (
		<div className=' grid gap-5'>
			<CompareBar selectedComparisonOption={selectedOption} handleComparisonChange={handleSelect} />
			<ColumnChart percentage='5' />
			<AnalyticsTableActions
				data={tableData}
				sortMenus={customersSortMenus}
				selectedOption={arrange}
				onSelectOption={handleArrangeChange}
				documentTitle='Customer Table Data'
			/>

			<CustomersTable customersAnalytics={customersAnalytics} isLoading={isLoading} />
			{xs && <CustomersAnalyticsTableMobile tableData={tableData} />}
		</div>
	);
};

export default Customers;

// import CompareBar from 'src/app/components/optimized/UiKits/CompareBar';
// import AnalyticsTableActions from '../../_comp/AnalyticsTableActions';
// import { ColumnChart } from 'src/app/components/optimized';
// import useAnalyticsData from '../../_comp/useAnalyticsData';
// import data from '../../_comp/data.json';
// import { useTranslation } from 'react-i18next';
// import CustomersTable from './comp/CustomersTable';
// import { getNumericValue, parseDate } from 'src/app/utils';
// import { useEffect } from 'react';
// import { getCustomersAnalyticsTable } from 'src/app/store/slices/analyticsPage/CustomerAnalytics/customersAnalyticsTableAsyncThunks';

// import useResponsive from 'src/app/utils/hooks/useResponsive';
// import CustomersAnalyticsTableMobile from './comp/CustomersAnalyticsTableMobile';
// import { useAppDispatch, useAppSelector } from 'src/app/store';

// export interface AnalyticsCustomer {
// 	day: string;
// 	new_customers: number;
// 	purchasing_customers: string;
// 	customer_groups: string;
// }

// const Customers = () => {
// 	const { t } = useTranslation();
// 	const { xs } = useResponsive();

// 	// redux
// 	const dispatch = useAppDispatch();
// 	const { customersAnalytics, isLoading, error } = useAppSelector(
// 		(state) => state.customersAnalytics || {},
// 	);

// 	useEffect(() => {
// 		dispatch(getCustomersAnalyticsTable());
// 	}, [dispatch]);

// 	if (error) return <div>Error: {error}</div>;

// 	const customersSortMenus = [
// 		{ text: t('Date Added') },
// 		{ text: t('Date (Oldest)') },
// 		{ text: t('New customers Descending') },
// 		{ text: t('New customers Ascending') },
// 		{ text: t('Purchasing customers Descending') },
// 		{ text: t('Purchasing customers Ascending') },
// 		{ text: t('Customer groups Descending') },
// 		{ text: t('Customer groups Ascending') },
// 	];

// 	const customersSortFunctions: Record<
// 		string,
// 		(a: AnalyticsCustomer, b: AnalyticsCustomer) => number
// 	> = {
// 		[t('Date Added')]: (a, b) => parseDate(b.day) - parseDate(a.day),
// 		[t('Date (Oldest)')]: (a, b) => parseDate(a.day) - parseDate(b.day),
// 		[t('New customers Descending')]: (a, b) => b.new_customers - a.new_customers,
// 		[t('New customers Ascending')]: (a, b) => a.new_customers - b.new_customers,
// 		[t('Purchasing customers Descending')]: (a, b) =>
// 			getNumericValue(b.purchasing_customers) - getNumericValue(a.purchasing_customers),
// 		[t('Purchasing customers Ascending')]: (a, b) =>
// 			getNumericValue(a.purchasing_customers) - getNumericValue(b.purchasing_customers),
// 		[t('Customer groups Descending')]: (a, b) =>
// 			getNumericValue(b.customer_groups) - getNumericValue(a.customer_groups),
// 		[t('Customer groups Ascending')]: (a, b) =>
// 			getNumericValue(a.customer_groups) - getNumericValue(b.customer_groups),
// 	};

// 	const { arrange, tableData, handleArrangeChange, handleSelect, selectedOption } =
// 		useAnalyticsData<AnalyticsCustomer>(data.customersAnalyticsTable, customersSortFunctions);

// 	return (
// 		<div className='grid gap-5'>
// 			<CompareBar selectedComparisonOption={selectedOption} handleComparisonChange={handleSelect} />
// 			<ColumnChart percentage='5' />
// 			<AnalyticsTableActions
// 				data={tableData}
// 				sortMenus={customersSortMenus}
// 				selectedOption={arrange}
// 				onSelectOption={handleArrangeChange}
// 				documentTitle='Customer Table Data'
// 			/>

// 			<CustomersTable customersAnalytics={customersAnalytics} isLoading={isLoading} />
// 			{xs && <CustomersAnalyticsTableMobile tableData={tableData} />}
// 		</div>
// 	);
// };

// export default Customers;
