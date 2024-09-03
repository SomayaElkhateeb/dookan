import CampaignStatus from './_comp/CampaignStatus';

import CampaignBtns from './_comp/CampaignBtns';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { RefObject, useRef } from 'react';

import useResponsive from 'src/app/utils/hooks/useResponsive';
import CampaignsTableMobile from './_comp/CampaignsTableMobile';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import CampaignTable from './_comp/CampaignTable';
const campaignsData = [
	{
		id: '1',
		name: 'Summer campaign',
		status: 'running',
	},
	{
		id: '2',
		name: 'Summer campaign',
		status: 'ended',
	},
	{
		id: '3',
		name: 'Summer campaign',
		status: 'in review',
	},
	{
		id: '4',
		name: 'Summer campaign',
		status: 'refused',
	},
];

const Campaigns = () => {
	// Print ref to handle table print.
	const campaignTableRef: RefObject<HTMLElement | undefined> = useRef();

	const { selectedOption, handleSelect } = useSelectBox();
	const { xs } = useResponsive();
	return (
		<>
			<div className='flex-col-global custom_container gap-4 '>
				<CampaignStatus />

				<CampaignBtns
					onSelectOption={handleSelect}
					selectedOption={selectedOption}
					data={campaindata}
					campaignTableRef={campaignTableRef}
				/>
				<CampaignTable sortBy={selectedOption} ref={campaignTableRef} />
				{xs && (
					<div className='flex-col-global'>
						<CampaignsTableMobile campaigns={campaignsData} actions={true} />
						<AddButtonMobile path='addCampaign' />
					</div>
				)}
			</div>
		</>
	);
};

export default Campaigns;

export const campaindata = [
	{
		id: '1',
		name: 'Summer campaign',
		status: 'running',
		sales: '1000.00',
		expenses: '7000.00',
		netProfit: '5000.00',
		activities: [
			{
				id: '1',
				name: 'Facebook summer ad',
				status: 'in review',
				sessions: 28,
				sales: '10000.00',
				expenses: '10000.00',
				netProfit: '10000.00',
			},
			{
				id: '2',
				name: 'Google AdWords campaign',
				status: 'running',
				sessions: 35,
				sales: '15000.00',
				expenses: '8000.00',
				netProfit: '7000.00',
			},
			{
				id: '3',
				name: 'Instagram sponsored post',
				status: 'refused',
				sessions: 20,
				sales: '12000.00',
				expenses: '10000.00',
				netProfit: '2000.00',
			},
		],
	},
];
