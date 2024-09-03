import TableMobile, { TableColumn } from 'src/app/components/optimized/TableMobile/TableMobile';
import { AnalyticsCustomer } from '../AnalyticsCustomers';

const customerColumns: TableColumn<AnalyticsCustomer>[] = [
  { label: 'New customers', key: 'new_customers' },
  { label: 'Purchasing Customers', key: 'purchasing_customers' },
  { label: 'Customer groups', key: 'customer_groups' },
];

export default function CustomersAnalyticsTableMobile({ tableData }: { tableData: AnalyticsCustomer[] }) {
  return <TableMobile tableData={tableData} columns={customerColumns} />;
}    