import { Rating } from '@mui/material';
import Avatar from '../../../../../app/components/optimized/UiKits/Avatar';
import SlideCard from 'src/app/components/optimized/Cards/SlideCard';
import { useTranslation } from 'react-i18next';
import AverageRating from './AverageRating';

interface UserReviewInterface {
	firstName: string;
	lastName: string;
	date: string;
	rating: number;
	review: string;
}
interface ReviewData {
	averageRating: number;
	totalReviews: number;
	recentReviews: UserReviewInterface[];
}

interface AnalyticsReviewsProps {
	data: ReviewData;
}

export default function AnalyticsReviews({ data }: AnalyticsReviewsProps) {
	//  hooks
	const { t } = useTranslation();

	return (
		<div>
			<SlideCard
				items={data.recentReviews}
				title={t('Reviews')}
				itemsPerSlide={1}
				SlideComponent={UsersReview}
			>
				<AverageRating averageRating={data.averageRating} totalReviews={data.totalReviews} />
			</SlideCard>
		</div>
	);
}

function UsersReview({ firstName, lastName, date, rating, review }: UserReviewInterface) {
	const { t } = useTranslation();

	return (
		<div className='grid gap-3'>
			<h2 className='title'>{t('Recent')}</h2>
			<div className='flex gap-3 items-start'>
				<Avatar variant='user' firstName={firstName} lastName={lastName} />
				<div>
					<h2 className='title'>
						{firstName} {lastName} &nbsp; <span className='subtitle'>{date}</span>
					</h2>
					<Rating precision={0.5} value={rating} readOnly />
					<p className='paragraph text-title'>{review}</p>
				</div>
			</div>
		</div>
	);
}
