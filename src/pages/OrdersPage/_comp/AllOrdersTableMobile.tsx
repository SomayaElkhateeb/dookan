import OrderItem from 'src/app/components/optimized/Cards/OrderCard/OrderItem';
import { OrderInterface } from 'src/app/interface/OrderInterface';

export default function AllOrdersTableMobile({ orders }: { orders: OrderInterface[] }) {
	const transformedOrders = orders.map((order: OrderInterface) => ({
		id: order.id,
		fullName: order.customer_first_name,
		orderStatus: order.status,
		orderNumber: order.id,
		price: order.grand_total,
		currency: order.order_currency_code,
		date: order.created_at,
	}));
	return (
		<section className='grid space-y-3 '>
			{transformedOrders.map((order) => (
				<OrderItem key={order.id} order={order} />
			))}
		</section>
	);
}
