import { getImageUrl } from "src/app/utils";

export default function AnalyticsTableSmHeader({
	img,
	name,
	price,
}: {
	img: string;
	name: string;
	price: number;
}) {
	return (
		<section className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<div className='overflow-hidden border rounded-lg size-[1.87rem] border-light-2'>
					<img src={getImageUrl(img)} alt={name} className='object-cover size-full' />
				</div>
				<h2 className='title'>{name}</h2>
			</div>
			<p>{price}</p>
		</section>
	);
}
