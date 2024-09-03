import { AnalyticsProduct } from "../../AnalyticsProducts";

export default function AnalyticsTableSmBody({ item }: { item: AnalyticsProduct }) {
	const tableBodyItems = [
		{ label: 'Qty', value: item.quantity },
		{ label: 'Qty sold', value: item.quantity_sold },
		{ label: 'RETURNS', value: item.returns },
		{ label: 'SEARCHES', value: item.searches },
		{ label: 'VIEWS', value: item.views },
	];

	return (
		<section
			className='grid gap-x-5 gap-y-3'
			style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))' }}
		>
			{tableBodyItems.map((bodyItem, index) => (
				<div className='grid gap-1' key={index}>
					<p className='paragraph text-subtitle'>{bodyItem.label}</p>
					<p className='paragraph text-title'>{bodyItem.value}</p>
				</div>
			))}
		</section>
	);
}
