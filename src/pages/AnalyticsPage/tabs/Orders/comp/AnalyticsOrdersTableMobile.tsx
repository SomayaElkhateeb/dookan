import { AnalyticsOrder } from '../AnalyticsOrders';
import TableMobile, { TableColumn } from 'src/app/components/optimized/TableMobile/TableMobile';

const orderColumns: TableColumn<AnalyticsOrder>[] = [
	{ label: 'Orders', key: 'orders' },
	{ label: 'Delivered', key: 'delivered' },
	{ label: 'Returned', key: 'returned_quantity' },
	{ label: 'Average units ordered', key: 'average_units_ordered' },
	{ label: 'Average order value', key: 'average_order_value' },
];

export default function AnalyticsOrdersTableMobile({ tableData }: { tableData: AnalyticsOrder[] }) {
	return <TableMobile tableData={tableData} columns={orderColumns} />;
}
