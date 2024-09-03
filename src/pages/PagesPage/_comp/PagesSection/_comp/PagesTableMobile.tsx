import { BlogPostInterface } from 'src/app/interface/BlogPostInterface';
import { MoreIcon } from 'src/app/utils/icons';

export default function PagesTableMobile({ data }: { data: BlogPostInterface[] }) {
	return (
		<div className='grid gap-2 my-2'>
			{data.map((item) => (
				<div className='flex justify-between bg-white p-2'>
					<div className='grid gap-1' >
						<h2 className='title'>{item.title}</h2>
						<p className='paragraph text-subtitle'>{item.describtion}</p>
					</div>
					<button>
						<MoreIcon className='fill-subtitle' />
					</button>
				</div>
			))}
		</div>
	);
}
