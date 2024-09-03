import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from 'src/app/components/optimized';
import AddNavItemDialog from './AddNavItemDialog';


export default function AddNavigation() {
	//  hooks
	const [showDialog, setShowDialog] = useState(false);
	const { t } = useTranslation();

	//   style of dialog
	const style = {
		height: { md: '21.5rem', xs: '15.5rem' },

		width: { md: '35.5rem', xs: '20.8rem' },
	};
	return (
		<div>
			<SubHeader title={t('Main menu')}>
				<Button variant='primary' onClick={() => setShowDialog(true)}>
					{t("Add New Item")}
				</Button>
			</SubHeader>
			{showDialog && (
				<AddNavItemDialog
					openDialog={true}
					handelclose={() => setShowDialog(false)}
					style={style}
				/>
			)}
		</div>
	);
}
