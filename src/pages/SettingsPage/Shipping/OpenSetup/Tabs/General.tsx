import { useTranslation } from 'react-i18next';
import RowItem from '../Comp/RowItem';
import AddRateButton from './AddRateButton';
export default function General() {
	//  hooks
	const { t } = useTranslation();

	return (
		<>
			<AddRateButton />
			<RowItem type={t('Free')} order={t('SAR 0 to SAR 30')} period={t('2 to 4 business days')} />
			<hr />
			<RowItem type={t('SAR 20')} order={t('SAR 30 and up')} period={t('2 to 4 business days')} />
		</>
	);
}
