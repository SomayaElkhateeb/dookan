import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { AddFillIcon } from 'src/app/utils/icons';
import AddRate from '../Comp/AddRate';

export default function AddRateButton() {
	//  hooks
	const { t } = useTranslation();
	const [showRate, setShowRate] = useState(false);
	return (
		<>
			<Button
				variant='secondary'
				LeftIcon={AddFillIcon}
				onClick={() => {
					setShowRate(true);
				}}
			>
				{t('add rate')}
			</Button>

			{showRate && (
				<AddRate
				showRate={showRate}
					saudi={false}
					
					onClose={() => {
						setShowRate(false);
					}}
				/>
			)}
		</>
	);
}
