import { getImageUrl } from 'src/app/utils';
import { AnalyticsProduct } from '../../AnalyticsProducts';
import TableMobile, { TableColumn } from 'src/app/components/optimized/TableMobile/TableMobile';


const productColumns: TableColumn<AnalyticsProduct>[] = [
  { label: 'Qty', key: 'quantity' },
  { label: 'Qty sold', key: 'quantity_sold' },
  { label: 'RETURNS', key: 'returns' },
  { label: 'SEARCHES', key: 'searches' },
  { label: 'VIEWS', key: 'views' },
];

const renderProductHeader = (item: AnalyticsProduct) => (
  <section className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="overflow-hidden border rounded-lg size-[1.87rem] border-light-2">
        <img src={getImageUrl(item.imageUrl)} alt={item.product_name} className="object-cover size-full" />
      </div>
      <h2 className="title">{item.product_name}</h2>
    </div>
    <p>{item.price}</p>
  </section>
);

export default function ProductsTableMobile({ tableData }: { tableData: AnalyticsProduct[] }) {
  return <TableMobile tableData={tableData} columns={productColumns} renderHeader={renderProductHeader} />;
}
