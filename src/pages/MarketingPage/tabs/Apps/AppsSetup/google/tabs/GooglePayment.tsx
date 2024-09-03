import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, MultiChoiceChips, SetupCard } from 'src/app/components/optimized';
import { GlobalDialog } from 'src/app/components/shared';
import { PagesIcon, PaymentIcon, PhoneIcon } from 'src/app/utils/icons';

interface PaymentMethod {
	title: string;
	description: string;
	buttonText: string;
}

interface GooglePaymentProps {
	data: {
		title: string;
		description: string;
		method?: PaymentMethod[];
	};
}

const GooglePayment: React.FC<GooglePaymentProps> = ({ data }) => {
	const [isConfirm, setIsConfirm] = useState(false);
	const theOptions = ['Business address', 'Email address', 'Phone number'];
	const [options, setOptions] = useState<string[]>([]);
	const { t } = useTranslation();

	const iconMap = {
		Payment: PaymentIcon,
		Contact: PhoneIcon,
		Pages: PagesIcon,
	};

	return (
		<>
			<div className='flex flex-col justify-between'>
				<p className='global-install-p'>{data.description}</p>
				<div className='flex gap-5 pt-5'>
					{data &&
						data.method?.map((item, index) => (
							<SetupCard
								key={index}
								title={item.title}
								description={item.description}
								buttonText={item.buttonText}
								Icon={iconMap[item.title]}
								onButtonClick={() => (item.title === 'Contact' ? setIsConfirm(true) : null)}
							/>
						))}
				</div>
			</div>

			{isConfirm && (
				<GlobalDialog
					openDialog={isConfirm}
					handleClose={() => setIsConfirm(false)}
					style={{ width: { md: '50%', xs: '80%' } }}
				>
					<div className='flex flex-col gap-4'>
						<h2 className='title'>{t('Contacts')}</h2>
						<p className='text-sm text-subtitle'>
							Confirm you have 2 contact methods on your online store
						</p>
						<p className='text-sm text-title'>
							Google requires your contact information to be visible on your online store, before
							the checkout, so customers can reach you.{' '}
							<span className='cursor-pointer text-primary'>View our tutorial</span> on how to do
							this
						</p>
						<p className='text-sm text-title'>Select the 2 contact methods added:</p>

						<MultiChoiceChips options={theOptions} setSelected={setOptions} selected={options} />
						<div className='flex-btn-end'>
							<button
								className='text-title font-semibold cursor-pointer'
								onClick={() => setIsConfirm(false)}
							>
								{t('Cancel')}
							</button>

							<Button>{t('Confirm')}</Button>
						</div>
					</div>
				</GlobalDialog>
			)}
		</>
	);
};

export default GooglePayment;
