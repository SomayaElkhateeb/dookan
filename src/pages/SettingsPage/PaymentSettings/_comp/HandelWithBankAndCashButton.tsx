import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';

export default function HandelWithBankAndCashButton({
	title,
	handelAction,
}: {
	title: string;
	handelAction: () => void;
}) {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='flex justify-between items-center'>
			<h3 className='paragraph font-semibold'>{title}</h3>
			<Button variant='secondary' text={t('Activate')} onClick={() => handelAction()} />
		</div>
	);
}
