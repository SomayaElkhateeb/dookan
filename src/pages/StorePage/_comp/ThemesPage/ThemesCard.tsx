import { useNavigate } from 'react-router-dom';

import Badge from 'src/app/components/optimized/UiKits/Badge';
import { getImageUrl } from 'src/app/utils';

export default function ThemesCard() {
	// hooks
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate('id=1')}
			className='w-[100%] border-constrained rounded-[.45rem] cursor-pointer'
		>
			<div className='w-[95%] mx-auto flex flex-col gap-[.5rem]'>
				<img
					src={getImageUrl('images/ThemesPage/smallwebsiteimg.png')}
					loading='lazy'
					alt='smallwebsiteimg'
				/>
				<p className='text-[.8rem] font-semibold'>Purfumika</p>
				<p className='text-[.8rem] text-subtitle'>Perfumes, cosmetics</p>

				<Badge status={'installed'} />
			</div>
		</div>
	);
}
