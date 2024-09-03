import React, { useState } from 'react';
import { Button } from 'src/app/components/optimized';
import { LinkIcon } from 'src/app/utils/icons';

interface Partner {
	userId: string;
	partnerName: string;
	partnerImage: string;
	partnerStatus: boolean;
}
const BusinessAccountCard: React.FC<Partner> = ({
	partnerImage,
	partnerName,
	partnerStatus,
	userId,
}) => {
	const [status, setStatus] = useState<boolean>(partnerStatus);

	const toggleStatus = () => {
		setStatus(!status);
	};

	return (
		<div className='flex flex-col items-start py-4 md:flex-row gap-5 md:items-center md:justify-between border-t'>
			<div className='flex items-center gap-4'>
				<img className='object-cover size-12' src={partnerImage} alt='Partner picture' />
				<div className='flex flex-col'>
					<span className='text-primary text-sm'>
						{partnerName} <LinkIcon className='fill-primary p-0.5 inline' />
					</span>
					<div>
						{/* <span className='text-xs text-gray-500'>{status ? 'Connected' : 'Disconnected'}</span> */}

						<span className='text-xs text-subtitle'>User ID </span>
						<span className='text-xs text-title font-semibold'>#{userId}</span>
					</div>
				</div>
			</div>

			<Button onClick={toggleStatus} variant='secondary'>
				{status ? 'Disconnect' : 'Connect'}
			</Button>
		</div>
	);
};

export default BusinessAccountCard;
