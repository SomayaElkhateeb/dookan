import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { Button } from 'src/app/components/optimized';
import { FaCirclePlus } from 'react-icons/fa6';
import { AddFillIcon } from 'src/app/utils/icons';
import { useTranslation } from 'react-i18next';

interface TikTokPaymentProps {
	data: {
		description: string;
	};
}
const TikTokPayment: React.FC<TikTokPaymentProps> = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div className='global-cards p-0 overflow-hidden'>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b p-5'>
				<p className='text-title text-sm lg:w-[70%]'>{data.description}</p>
				<span>
					<MdErrorOutline color='#EC5151' size={23} />
				</span>
			</div>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b px-5 pb-3'>
				<p className='text-title text-sm lg:w-[60%]'>
					{t('Has the payment method been set')}? <span className='text-primary'>Just refresh</span>
				</p>
				<Button LeftIcon={AddFillIcon} variant='secondary'>
					{t('Add Payment Method')}
				</Button>
			</div>

			<div className='bg-constrained border-t p-5'>
				<p className='text-title text-sm'>
					Go to{' '}
					<span className='text-primary underline decoration-1 cursor-pointer'>
						TikTok Ads Manager
					</span>{' '}
					and manage your payment method or view more payment details.
				</p>
			</div>
		</div>
	);
};

export default TikTokPayment;
