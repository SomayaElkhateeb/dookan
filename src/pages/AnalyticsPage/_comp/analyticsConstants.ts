import { nanoid } from 'nanoid';
import { getNumericValue, parseDate } from 'src/app/utils';

export const productsTableHeaders = [
	'product & category ',
	'quantity',
	'price',
	'searches',
	'views',
	'quantity sold',
	'returns',
];
export const ordersTableHeaders = [
	'day',
	'orders',
	'average units ordered',
	'average order value',
	'delivered',
	'returned quantity',
];
export const customersTableHeaders = [
	'day',
	'new customers',
	'purchasing customers',
	'customer groups',
];

export const productsSortMenus = [
	{ id: nanoid(), text: 'Quantity Descending' },
	{ id: nanoid(), text: 'Quantity Ascending' },
	{ id: nanoid(), text: 'Price Low in first' },
	{ id: nanoid(), text: 'Price High in first' },
	{ id: nanoid(), text: 'Searches Descending' },
	{ id: nanoid(), text: 'Searches Ascending' },
	{ id: nanoid(), text: 'Views Descending' },
	{ id: nanoid(), text: 'Views Ascending' },
	{ id: nanoid(), text: 'Quantity sold Descending' },
	{ id: nanoid(), text: 'Quantity sold Ascending' },
	{ id: nanoid(), text: 'Returns Descending' },
	{ id: nanoid(), text: 'Returns Ascending' },
];
export const ordersSortMenus = [
	{ id: nanoid(), text: 'Date Added' },
	{ id: nanoid(), text: 'Date (Oldest)' },
	{ id: nanoid(), text: 'Orders Descending' },
	{ id: nanoid(), text: 'Orders Ascending' },
	{ id: nanoid(), text: 'Average units ordered Descending' },
	{ id: nanoid(), text: 'Average units ordered Ascending' },
	{ id: nanoid(), text: 'Average order value Descending' },
	{ id: nanoid(), text: 'Average order value Ascending' },
	{ id: nanoid(), text: 'Delivered Descending' },
	{ id: nanoid(), text: 'Delivered Ascending' },
	{ id: nanoid(), text: 'Returned quantity Descending' },
	{ id: nanoid(), text: 'Returned quantity Ascending' },
];
export const customersSortMenus = [
	{ id: nanoid(), text: 'Date Added' },
	{ id: nanoid(), text: 'Date (Oldest)' },
	{ id: nanoid(), text: 'New customers Descending' },
	{ id: nanoid(), text: 'New customers Ascending' },
	{ id: nanoid(), text: 'Purchasing customers Descending' },
	{ id: nanoid(), text: 'Purchasing customers Ascending' },
	{ id: nanoid(), text: 'Customer groups Descending' },
	{ id: nanoid(), text: 'Customer groups Ascending' },
];

export const productsSortFunctions: Record<string, (a: any, b: any) => number> = {
	'Quantity Descending': (a, b) => b.quantity - a.quantity,
	'Quantity Ascending': (a, b) => a.quantity - b.quantity,
	'Price Low in first': (a, b) => parseFloat(a.price) - parseFloat(b.price),
	'Price High in first': (a, b) => parseFloat(b.price) - parseFloat(a.price),
	'Searches Descending': (a, b) => b.searches - a.searches,
	'Searches Ascending': (a, b) => a.searches - b.searches,
	'Views Descending': (a, b) => b.views - a.views,
	'Views Ascending': (a, b) => a.views - b.views,
	'Quantity sold Descending': (a, b) => b.quantity_sold - a.quantity_sold,
	'Quantity sold Ascending': (a, b) => a.quantity_sold - b.quantity_sold,
	'Returns Descending': (a, b) => b.returns - a.returns,
	'Returns Ascending': (a, b) => a.returns - b.returns,
};
export const ordersSortFunctions: Record<string, (a: any, b: any) => number> = {
	'Date Added': (a, b) => parseDate(b.day) - parseDate(a.day),
	'Date (Oldest)': (a, b) => parseDate(a.day) - parseDate(b.day),
	'Orders Descending': (a, b) => b.orders - a.orders,
	'Orders Ascending': (a, b) => a.orders - b.orders,
	'Average units ordered Descending': (a, b) => b.average_units_ordered - a.average_units_ordered,
	'Average units ordered Ascending': (a, b) => a.average_units_ordered - b.average_units_ordered,
	'Average order value Descending': (a, b) =>
		getNumericValue(b.average_order_value) - getNumericValue(a.average_order_value),
	'Average order value Ascending': (a, b) =>
		getNumericValue(a.average_order_value) - getNumericValue(b.average_order_value),
	'Delivered Descending': (a, b) => b.delivered - a.delivered,
	'Delivered Ascending': (a, b) => a.delivered - b.delivered,
	'Returned quantity Descending': (a, b) => b.returned_quantity - a.returned_quantity,
	'Returned quantity Ascending': (a, b) => a.returned_quantity - b.returned_quantity,
};

export const customersSortFunctions: Record<string, (a: any, b: any) => number> = {
	'Date Added': (a, b) => parseDate(b.day) - parseDate(a.day),
	'Date (Oldest)': (a, b) => parseDate(a.day) - parseDate(b.day),
	'New customers Descending': (a, b) => b.new_customers - a.new_customers,
	'New customers Ascending': (a, b) => a.new_customers - b.new_customers,
	'Purchasing customers Descending': (a, b) =>
		getNumericValue(b.purchasing_customers) - getNumericValue(a.purchasing_customers),
	'Purchasing customers Ascending': (a, b) =>
		getNumericValue(a.purchasing_customers) - getNumericValue(b.purchasing_customers),
	'Customer groups Descending': (a, b) => b.customer_groups - a.customer_groups,
	'Customer groups Ascending': (a, b) => a.customer_groups - b.customer_groups,
};
