import { useTranslation } from 'react-i18next';

import { ReviewsTable } from './_comp/ReviewsTable';
import AnalyticsTableActions from 'src/pages/AnalyticsPage/_comp/AnalyticsTableActions';
import { useState } from 'react';
import { getImageUrl } from 'src/app/utils';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import DonutGraph, { ChartData } from 'src/app/components/optimized/Charts/DonutChart/DonutGraph';
import RecentReview from './_comp/RecentReview';
import { DonutCard } from 'src/app/components/optimized';
import CompareButton from 'src/app/components/optimized/UiKits/CompareButton';

export const StoreReviews = () => {
	const { selectedOption, handleSelect } = useSelectBox();
	const [arrange, setArrange] = useState('');
	const [tableData, setTableData] = useState([]);

	const handleArrangeChange = () => {
		console.log('table');
	};
	const { t } = useTranslation();

	const comparisonMenus = [
		{ id: '1', text: t('Today') },
		{ id: '2', text: t('Last week') },
		{ id: '3', text: t('Last month') },
	];
	const productsSortMenus = [
		{ text: t('Quantity Descending') },
		{ text: t('Quantity Ascending') },
		{ text: t('Price Low in first') },
		{ text: t('Price High in first') },
		{ text: t('Searches Descending') },
		{ text: t('Searches Ascending') },
	];

	const chartData: ChartData[] = [
		{
			label: 'Detractors',
			value: 31,
			color: '#e74c3c',
		},
		{
			label: 'Passives',
			value: 31,
			color: '#F97316',
		},
		{
			label: 'Promoters',
			value: 41,
			color: '#2ecc71',
		},
	];

	return (
		<div className=' grid grid-cols-1 gap-5'>
			{/* header */}
			<div className='flex flex-col gap-2 md:flex-row-global md:justify-between'>
				<div className='flex-row-global gap-1'>
					<div>
						<CompareButton
							sortMenus={comparisonMenus}
							selectedOption={selectedOption}
							handleSelect={handleSelect}
							variant='secondary'
						/>
					</div>
					<p className='subtitle text-sm'>Compared to:</p>
					<p className='title text-sm'>{selectedOption ? selectedOption : 'Today'}</p>
				</div>
				<div className='bg-success text-white text-sm flex items-center gap-2 p-2 rounded-md w-fit'>
					<img src={getImageUrl('good.svg')} />
					<span>Looks good!</span>
				</div>
			</div>

			<div className=' grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<RecentReview />
				<DonutCard
					title='Net Promoter Score'
					score={4.75}
					graph={<DonutGraph chartData={chartData} />}
					legends={chartData}
				/>
			</div>
			{/* table */}
			<div>
				<AnalyticsTableActions
					data={tableData}
					sortMenus={productsSortMenus}
					selectedOption={arrange}
					onSelectOption={handleArrangeChange}
					noBorder={true}
				/>
				<ReviewsTable />
			</div>
		</div>
	);
};
