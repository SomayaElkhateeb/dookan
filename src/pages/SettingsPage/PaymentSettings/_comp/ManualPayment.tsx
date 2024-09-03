import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import DeliveryPayment from './DeliveryPayment';
import HandelWithBankAndCashButton from './HandelWithBankAndCashButton';
interface PopupState {
	delivery: boolean;
	pickup: boolean;
}
export default function ManualPayment() {
	// Initial state with both popups closed
	const [popups, setPopups] = useState<PopupState>({
		delivery: false,
		pickup: false,
	});

	// Function to toggle the state of the popups
	const togglePopup = (popupType: keyof PopupState, isOpen: boolean) => {
		setPopups((prevPopups) => ({
			...prevPopups,
			[popupType]: isOpen,
		}));
	};

	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<div className='global-cards gap-[1rem]'>
			<div className='md:max-w-[34rem] flex-col-global gap-[.7rem]'>
				<h2 className='title'>{t('Other methods')}</h2>
				<p className='paragraph'>
					{t(
						'Payments that are processed outside your online store. When a customer makes a manual payment, you need to approve their order before fulfilling.',
					)}
				</p>
			</div>
			<hr />
			<HandelWithBankAndCashButton
				title={t('Cash on delivery')}
				handelAction={() => togglePopup('delivery', true)}
			/>
			<hr />
			<HandelWithBankAndCashButton
				title={t('Bank Transfer')}
				handelAction={() => navigate('activate-bank-transfer')}
			/>
			<hr />
			<HandelWithBankAndCashButton
				title={t('Cash on pickup')}
				handelAction={() => togglePopup('pickup', true)}
			/>

			{/* //////////////////// */}
			{popups.delivery && (
				<DeliveryPayment
					title={t('Add payment method')}
					showPayment={popups.delivery}
					handleClose={() => togglePopup('delivery', false)}
				/>
			)}
			{/* ///////////////////////// */}

			{popups.pickup && (
				<DeliveryPayment
					pickup
					title={t('Cash on pickup')}
					showPayment={popups.pickup}
					handleClose={() => togglePopup('pickup', false)}
				/>
			)}
		</div>
	);
}
