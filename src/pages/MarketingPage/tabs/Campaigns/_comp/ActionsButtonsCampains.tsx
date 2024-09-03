import { useTranslation } from 'react-i18next';
import { ArrangeButton, Button } from 'src/app/components/optimized';

import { ExportIcon, PrintIcon } from 'src/app/utils/icons';
interface ActionsButtonsCampainsInterface {
	sortMenus: { id: string; text: string }[];
	selectedOption: string;
	onSelectOption: (e: string) => void;
	handleExportFile: () => void;
	handlePrint: () => void;
}
export default function ActionsButtonsCampains({
	sortMenus,
	selectedOption,
	onSelectOption,
	handleExportFile,
	handlePrint,
}: ActionsButtonsCampainsInterface) {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='flex gap-3 h-[42px]'>
			<ArrangeButton
				sortMenus={sortMenus}
				selectedOption={selectedOption}
				handelSelect={onSelectOption}
			/>

			<Button onClick={handleExportFile} variant='secondary' LeftIcon={ExportIcon}>
				{t('Export')}
			</Button>

			<Button onClick={handlePrint} variant='secondary' LeftIcon={PrintIcon}>
				{t('Print')}
			</Button>
		</div>
	);
}
