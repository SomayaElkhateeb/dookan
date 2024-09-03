import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { AnalyticsOrder } from '../AnalyticsOrders';

export default function AnalyticsOrdersTable({
	ordersAnalytics,
	isLoading,
}: {
	ordersAnalytics: AnalyticsOrder[];
	isLoading: boolean;
}) {
	const { language } = useLanguage();

	const { t } = useTranslation();

	const ordersTableHeaders = [
		{ title: t('day') },
		{ title: t('orders') },
		{ title: t('average units ordered') },
		{ title: t('average order value') },
		{ title: t('delivered') },
		{ title: t('returned quantity') },
	];

	return (
		<div className='print-only'>
			<BaseTable
				isLoading={isLoading}
				language={language}
				color='#55607A'
				headers={ordersTableHeaders.map((h) => h)}
				rows={ordersAnalytics?.map((e) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell>{e.day}</GlobalTableCell>,
							<GlobalTableCell>{e.orders}</GlobalTableCell>,
							<GlobalTableCell>{e.average_units_ordered}</GlobalTableCell>,
							<GlobalTableCell>{e.average_order_value}</GlobalTableCell>,
							<GlobalTableCell>{e.delivered}</GlobalTableCell>,
							<GlobalTableCell>{e.returned_quantity}</GlobalTableCell>,
						],
					};
				})}
			/>
		</div>
	);
}
