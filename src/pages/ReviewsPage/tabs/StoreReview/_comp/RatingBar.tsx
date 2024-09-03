import React from 'react';

export interface Rating {
	maxValue: number;
	value: number;
	id: number;
}

interface RatingBarProps {
	ratings: Rating[];
	maxRating?: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ ratings }) => {
	const usedClassName = 'text-subtitle text-[.8rem]';
	const progressclassName = 'bg-light-2 h-[.7rem] w-[75%] rounded-full';
	return (
		<div className='w-full flex-col-global'>
			{ratings.map((rating, index) => (
				<div className='flex-row-global justify-between' key={rating.id}>
					<p className={usedClassName}>{rating.value} stars</p>
					{rating.value > 0 ? (
						<div className={progressclassName}>
							<div
								className={`bg-neutral-1 h-[.7rem] rounded-full`}
								style={{
									width: `${(rating.value / rating.maxValue) * 100}%`,
								}}
							></div>
						</div>
					) : (
						<div className={progressclassName}></div>
					)}
					<p className={usedClassName}>({rating.maxValue})</p>
				</div>
			))}
		</div>
	);
};

export default RatingBar;
