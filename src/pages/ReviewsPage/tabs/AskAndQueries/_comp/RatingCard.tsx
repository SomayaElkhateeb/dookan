import { GoStarFill } from 'react-icons/go';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';

export const RatingCard = ({ noRating }: { noRating?: boolean }) => {
	return (
		<div className='flex items-start gap-2'>
			<div>
				<Avatar variant='user' fullName='walied sayed' />
			</div>
			<div className='flex-col-global gap-1'>
				<div className='flex-row-global gap-2'>
					<h3 className='title'>Walied Sayed</h3>
					<p className='subtitle text-sm'>5/6/2021</p>
				</div>
				{!noRating && (
					<div className='flex-row-global'>
						<GoStarFill size={14} color='gold' />
						<GoStarFill size={14} color='gold' />
						<GoStarFill size={14} color='gold' />
						<GoStarFill size={14} color='gold' />
						<GoStarFill size={14} color='gold' />
					</div>
				)}
				<p className='text-title text-sm'>Nice & Good Product</p>
			</div>
		</div>
	);
};
