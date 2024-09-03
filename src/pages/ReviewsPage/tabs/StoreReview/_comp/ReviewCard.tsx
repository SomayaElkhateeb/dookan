import { Rating } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InitialsAvatar } from 'src/app/components/optimized';

interface ReviewCardProps {
	reviewer: {
		firstName: string;
		lastName: string;
	};
	repliedDate: string;
	rating: number;
	randomColor: string;
	content: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
	reviewer,
	repliedDate,
	rating,
	randomColor,
	content,
}) => {
	// hooks
	const { t } = useTranslation();
	return (
		<div className='flex-col-global gap-[.65rem]'>
			<h3 className='font-semibold text-title text-[.95rem]'>{t('Recent')}</h3>

			<div className='bg-white  overflow-hidden flex p-2 items-center'>
				<div>
					<InitialsAvatar
						firstName={reviewer.firstName}
						lastName={reviewer.lastName}
						size={50}
						randomColor={randomColor}
					/>
				</div>
				<div className='flex-col-global gap-[.3rem] w-full mx-3'>
					<div className='flex-row-global-items-start gap-[.55rem]'>
						<h3 className='text-[.8rem] text-title font-semibold'>
							{reviewer.firstName} {reviewer.lastName}
						</h3>
						<p className='text-[.75rem] text-subtitle'>{repliedDate}</p>
					</div>
					{/* <Rating rating={rating} size={20} /> Adjust size as needed */}
					<Rating precision={0.5} value={rating} readOnly />
					<p className='text-[.75rem] text-subtitle'>{content}</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
