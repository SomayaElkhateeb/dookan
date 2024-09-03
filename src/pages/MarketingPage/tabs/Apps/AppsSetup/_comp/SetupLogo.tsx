import React from 'react';
import { getImageUrl } from 'src/app/utils';
import { FaMinus } from 'react-icons/fa6';

interface SetupLogoProps {
	iconPath: string;
}

const SetupLogo: React.FC<SetupLogoProps> = ({ iconPath }) => {
	return (
		<div className='flex items-center justify-center gap-2'>
			<img src={getImageUrl('brand/cloud.svg')} className='size-16 mx-1' />
			<div className='w-full flex justify-between items-center px-2'>
				<span className='size-3 bg-constrained rounded-full'></span>
				<div className='  flex gap-2'>
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
					<FaMinus color={'#E8EBF2'} />
				</div>
				<span className='size-3 bg-constrained rounded-full'></span>
			</div>
			<img src={getImageUrl(iconPath)} className='size-16' />
		</div>
	);
};

export default SetupLogo;
