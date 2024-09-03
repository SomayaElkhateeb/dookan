import { ArrangeButton, Button } from 'src/app/components/optimized';

import { ExportIcon, PrintIcon } from 'src/app/utils/icons';
import ActionHandler from 'src/app/utils/ActionMethods';
import { useTranslation } from 'react-i18next';

interface AnalyticsTableActionsProps {
	sortMenus: { id?: string; text: string }[];
	onSelectOption: (option: string) => void;
	selectedOption: string;
	data: any[];
	documentTitle?: string;
	noBorder?: boolean;
}

export default function AnalyticsTableActions({
	sortMenus,
	onSelectOption,
	selectedOption,
	data,
	documentTitle,
	noBorder,
}: AnalyticsTableActionsProps) {
	const { t } = useTranslation();

	const handleSelectOption = (option: string) => {
		onSelectOption(option);
	};

	//  deal with excel
	const handleExportFile = () => {
		ActionHandler.exportToExcel(data, `${documentTitle}.xlsx`);
	};

	//  deal with print action
	const handlePrint = () => {
		ActionHandler.PrintTable();
	};
	return (
		<div
			className={`flex gap-3 justify-end items-center mb-2 ${
				noBorder ? '' : 'border-b border-borders-lines'
			} `}
		>
			<ArrangeButton
				sortMenus={sortMenus}
				selectedOption={selectedOption}
				handelSelect={handleSelectOption}
			/>
			<Button
				variant='secondary'
				LeftIcon={ExportIcon}
				text={t('Export')}
				onClick={handleExportFile}
			/>
			<Button variant='secondary' LeftIcon={PrintIcon} text={t('Print')} onClick={handlePrint} />
		</div>
	);
}
