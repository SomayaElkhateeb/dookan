import { ChannelChart, LineChart } from 'src/app/components/optimized';
import StatsCard from 'src/app/components/optimized/Cards/StatsCard';
import AnalyticsComparison from './comp/AnalyticsComparison';
import data from '../../_comp/data.json';
import AnalyticsReports from './comp/AnalyticsReports';
// import OrdersCard from '../../../app/components/optimized/Cards/OrderCard/OrdersCard';
import ProductsAnalyticsCard from './comp/ProductsAnalyticsCard';
import AnalyticsReviews from './comp/AnalyticsReviews';
import { useTranslation } from 'react-i18next';
import OrdersCard from 'src/app/components/optimized/Cards/OrderCard/OrdersCard';
import ProductHighlights from 'src/pages/HomePage/_comp/ProductHighlights';

const AnalyticsOverview = () => {
	//  hooks
	const { t } = useTranslation();

	return (
		<div className='grid gap-5'>
			<AnalyticsComparison />
			<div className='grid grid-cols-1 gap-5'>
				{/* 1 */}

				<div className='grid grid-cols-12 gap-4 max-lg:grid-rows-2 col-span-1'>
					<div className='col-span-12 lg:col-span-7 xl:col-span-8'>
						<LineChart title={t('Sales')} percentage='4.75' />
					</div>
					<div className='col-span-12 lg:col-span-5 xl:col-span-4'>
						<AnalyticsReports />
					</div>
				</div>

				{/* 2 */}
				<div className='grid col-span-1 gap-5 grid-cols-9 max-xl:grid-cols-6 max-xl:grid-rows-2'>
					<div className='md:col-span-3 col-span-6'>
						<ChannelChart title={t('sales by channel')} percentage='50' />
					</div>
					<div className='md:col-span-3 col-span-6'>
						<ChannelChart
							title={t('sales by device')}
							percentage='36.5'
							negative
							labels={['Ios', 'Android', 'Desktop']}
							colors={['#FFCC73', '#D65036', '#F59556']}
							series={[31, 31, 41]}
						/>
					</div>
					<div className='md:col-span-3 col-span-6'>
						<ChannelChart
							title={t('sales by customer groups')}
							percentage='48'
							labels={['Group 1', 'Group 2']}
							colors={['#FFCC73', '#D65036']}
							series={[31, 69]}
						/>
					</div>
				</div>
				{/* 3 */}
				<div className='grid grid-cols-12 gap-4 max-lg:grid-rows-2 col-span-1'>
					<div className='col-span-12 lg:col-span-7 xl:col-span-8'>
						<LineChart
							title={t('returning customers')}
							percentage='17.8'
							negative
							nameA='First time'
							nameB='Returning'
							categories={['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7']}
							colors={['#446CCE', '#F59556']}
							dataA={[100, 230, 230, 500, 210, 180, 220]}
							dataB={[500, 210, 230, 700, 250, 800, 240]}
						/>
					</div>
					<div className='col-span-12 lg:col-span-5 xl:col-span-4'>
						<AnalyticsReviews data={data.customersReviews} />
					</div>
				</div>
				{/* 4 */}
				<div className='grid grid-cols-12 gap-4 max-lg:grid-rows-2 col-span-1'>
					<div className='col-span-12 lg:col-span-7 xl:col-span-8'>
						<OrdersCard latestOrders={data.latestOrders} title={t('Latest Orders')} />
					</div>
					<div className='col-span-12 lg:col-span-5 xl:col-span-4'>
						
						<ProductHighlights data={data} />
					</div>
				</div>
				{/* 5 */}
				<div className='grid grid-cols-12 col-span-1 gap-4'>
					<div className='col-span-12 lg:col-span-7 xl:col-span-8'>
						<RecentActivity />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsOverview;

const RecentActivity = () => {
	const { t } = useTranslation();

	return (
		<div className='grid gap-5 cardDetails-sharedClass p-5'>
			<h2 className='title'>{t('Recent activity')}</h2>
			<div className='flex gap-4 flex-wrap'>
				{data.statsData.slice(0, 3).map((item, index) => (
					<StatsCard key={index} {...item} />
				))}
			</div>
		</div>
	);
};
