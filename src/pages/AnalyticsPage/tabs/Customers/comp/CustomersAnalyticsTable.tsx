import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { AnalyticsCustomer } from '../AnalyticsCustomers';

export default function CustomersAnalyticsTable({
	customersAnalytics,
	isLoading,
}: {
	customersAnalytics: AnalyticsCustomer[];
	isLoading: boolean;
}) {
	const { language } = useLanguage();

	const { t } = useTranslation();

	const customersTableHeaders = [
		{ title: t('day') },
		{ title: t('new customers') },
		{ title: t('purchasing customers') },
		{ title: t('customer groups') },
	];

	return (
		<div className='print-only'>
			<BaseTable
				// isLoading={isLoading}
				language={language}
				color='#55607A'
				headers={customersTableHeaders.map((h) => h)}
				rows={customersAnalytics?.map((e) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell>{e.day}</GlobalTableCell>,
							<GlobalTableCell>{e.new_customers}</GlobalTableCell>,
							<GlobalTableCell>{e.purchasing_customers}</GlobalTableCell>,
							<GlobalTableCell>{e.customer_groups}</GlobalTableCell>,
						],
					};
				})}
			/>
		</div>
	);
}
