import { LiaSyncAltSolid } from 'react-icons/lia';

export default function Async({ title, asyncBtn }: { title: string; asyncBtn: () => void }) {
	return (
		<div className='global-cards overflow-hidden p-0'>
			<div className='p-5'>
				<div className='flex justify-end'>
					<button type='button' className='text-error text-sm' onClick={asyncBtn}>
						Disable Catalog Sync
					</button>
				</div>

				<div className='flex flex-col gap-4 items-center'>
					<LiaSyncAltSolid size={90} color={'#8791A8'} />
					<h2 className='title'>{title}</h2>
					<p className='text-title text-sm'>
						Reach millions of potential customers with paid advertising campaigns
					</p>
				</div>
			</div>
			<div className='bg-constrained p-5'>
				<p className='text-hint text-sm'>
					Snapchat review products in 3-5 days. Product statuses listed here are from your default
					country or region.
				</p>
			</div>
		</div>
	);
}
