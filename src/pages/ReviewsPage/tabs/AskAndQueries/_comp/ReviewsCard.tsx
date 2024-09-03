import { getImageUrl } from 'src/app/utils';
import { RatingCard } from './RatingCard';


export const ReviewsCard = ({
	header,
	body,
	children,
	publish,
	reply,
	submitReply,
	noRating,
}: {
	header: React.ReactNode;
	body: React.ReactNode;
	children: React.ReactNode;
	publish: React.ReactNode;
	reply: boolean;
	submitReply: boolean;
	noRating?: boolean;
}) => {
	return (
		<div>
			{/* header */}
			<div className='topTable p-5'>
				<div className='flex items-center gap-2'>
					<div className='size-10 rounded overflow-hidden'>
						<img src={getImageUrl('product/product.png')} />
					</div>

					<div className='flex flex-col'>
						<h3 className='title text-sm'>DJI Mavic Pro 2</h3>
					</div>
				</div>

				{/* children header*/}
				{header}
			</div>
			{reply ? ' ' : <hr />}

			{/* body */}
			<div className='topTable p-5 '>
				{noRating ? <RatingCard noRating /> : <RatingCard />}

				{reply ? '' : body}
			</div>
			{reply && children}

			{submitReply && !reply ? publish : ''}
		</div>
	);
};
