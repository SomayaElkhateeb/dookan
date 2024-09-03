import { nanoid } from 'nanoid';
import { Button } from 'src/app/components/optimized';
import { useReactToPrint } from 'react-to-print';

import { AddBgIcon } from 'src/app/utils/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionsButtonsCampains from './ActionsButtonsCampains';
import { RefObject } from 'react';
import ActionHandler from 'src/app/utils/ActionMethods';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import useResponsive from 'src/app/utils/hooks/useResponsive';

interface CampaignBtnsInterface {
	selectedOption: string;
	onSelectOption: (e: string) => void;
	data: any;
	campaignTableRef: RefObject<HTMLElement | undefined>;
	activity?: boolean;
}
const CampaignBtns = ({
	data,
	campaignTableRef,
	selectedOption,
	onSelectOption,
	activity,
}: CampaignBtnsInterface) => {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();

	const sortMenus = [
		{ id: nanoid(), text: 'Campaign (A-Z)' },
		{ id: nanoid(), text: 'Campaign (Z-A)' },
		{ id: nanoid(), text: 'Status (A-Z)' },
		{ id: nanoid(), text: 'Status (Z-A)' },
		{ id: nanoid(), text: 'Sales Descending' },
		{ id: nanoid(), text: 'Sales Ascending' },
		{ id: nanoid(), text: 'Expenses Descending' },
		{ id: nanoid(), text: 'Expenses Ascending' },
		{ id: nanoid(), text: 'Net Profit Descending' },
		{ id: nanoid(), text: 'Net Profit Ascending' },
	];

	//  deal with excel

	const handleExportFile = () => {
		ActionHandler.exportToExcel(data, 'campaigns_data.xlsx');
	};

	//  deal with print action

	const handlePrint = () => {
		ActionHandler.PrintTable();
	};

	return (
		<div className='flex-col-global'>
			<div className='topTable'>
				{!xs && (
					<Button
						onClick={() => {
							navigate('/marketing/campaigns/addCampaign');
						}}
						variant='primary'
						LeftIcon={AddBgIcon}
					>
						{!activity ? t('Add Campaign') : t('Add Activity')}
					</Button>
				)}
				{xs && <AddButtonMobile path='/marketing/campaigns/addCampaign' />}

				<ActionsButtonsCampains
					sortMenus={sortMenus}
					selectedOption={selectedOption}
					handleExportFile={handleExportFile}
					handlePrint={handlePrint}
					onSelectOption={onSelectOption}
				/>
			</div>

			<hr />
		</div>
	);
};
export default CampaignBtns;
