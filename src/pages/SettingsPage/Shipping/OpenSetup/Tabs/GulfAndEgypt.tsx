import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';
import { Switch } from 'src/app/components/ui/switch';
import RowItem from '../Comp/RowItem';
import AddRateButton from './AddRateButton';
import SetupButton from './SetubButton';
export default function GulfAndEgypt({ addStyle }: { addStyle: boolean }) {
	//  hooks

	const { t } = useTranslation();

	return (
		<>
			<div className='flex justify-between items-center pb-4'>
				<div className='flex gap-2 items-center'>
					<Switch /> <span>{t('Enabled')}</span>
				</div>

				<AddRateButton />
			</div>

			<RowItem type={t('Free')} order={t('SAR 0 to SAR 30')} period={t('2 to 4 business days')} />
			<hr />
			<RowItem type={t('SAR 20')} order={t('SAR 30 and up')} period={t('2 to 4 business days')} />

			<SetupButton addStyle={addStyle} />
		</>
	);
}
