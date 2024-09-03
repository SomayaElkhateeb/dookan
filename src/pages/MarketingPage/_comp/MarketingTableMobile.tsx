import MoreAction from './MoreAction';

interface Item {
	name: string;
	isActive: boolean;
	amount: string;
}

export default function MarketingTableMobile({ items }: { items: Item[] }) {
	return (
		<div className='divide-y bg-white'>
			{items.map((item, index) => (
				<div key={index} className='flex items-center justify-between py-1.5'>
					<section className='grid gap-0.5'>
						<h2 className='text-lg font-semibold'>{item.name}</h2>
						<StatusBadge isActive={item.isActive} />
					</section>
					<section className='grid gap-0.5 place-items-end'>
						{/* <button>
							<MoreIcon className='fill-subtitle' />
						</button> */}
						<MoreAction onClick={() => console.log('Delete')} />
						<p className='text-sm text-subtitle'>{item.amount}</p>
					</section>
				</div>
			))}
		</div>
	);
}

function StatusBadge({ isActive }: { isActive: boolean }) {
	return (
		<span
			className={`px-2 p-[0.2rem] rounded-md w-fit text-white paragraph ${
				isActive ? 'bg-success' : 'bg-error'
			}`}
		>
			{isActive ? 'Active' : 'Ended'}
		</span>
	);
}