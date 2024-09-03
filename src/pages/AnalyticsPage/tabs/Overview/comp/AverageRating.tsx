import { Rating } from '@mui/material';

interface AverageRating {
	averageRating: number;
	totalReviews: number;
}
export default function AverageRating({ averageRating, totalReviews }: AverageRating) {
	return (
		<div className='grid gap-3 mb-5'>
			<div className='flex items-end'>
				<h2 className='text-3xl text-title'>{averageRating}</h2>
				<span className='subtitle text-lg'>&nbsp; ({totalReviews})</span>
			</div>
			<Rating precision={0.5} value={averageRating} readOnly />
		</div>
	);
}
