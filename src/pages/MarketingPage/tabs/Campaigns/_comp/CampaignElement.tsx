import { RefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { StackedColumnChart, SubHeader } from 'src/app/components/optimized';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import CampaignInfoCard from './CampaignInfoCard';
import CampaignStatus from './CampaignStatus';
import CampaignBtns from './CampaignBtns';
import CampaignElementTable from './CampaignElementTable';
import CampaignsTableMobile from './CampaignsTableMobile';
import { campaindata } from '../Campaigns';
const campaignsData = [
	{
		id: '1',
		name: 'Summer campaign 1',
		status: 'running',
		imageUrl: 'social/facebook.svg',
	},
	{
		id: '2',
		name: 'Summer campaign 2',
		status: 'ended',
		imageUrl: 'social/facebook.svg',
	},
	{
		id: '3',
		name: 'Summer campaign 3',
		status: 'in review',
		imageUrl: 'social/facebook.svg',
	},
];

export default function CampaignElement() {
	//  hooks
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const activity = searchParams.get('activityId');
	const { xs } = useResponsive();
	// Print ref to handle table print.
	const campaignTableRef: RefObject<HTMLElement | undefined> = useRef();

	const { selectedOption, handleSelect } = useSelectBox();

	//  get campaignName from localstorage
	let campainName: null | string = '';
	if (typeof window !== 'undefined') {
		campainName = localStorage.getItem('campainName');
	}
	return (
		<div className='p-4 flex flex-col gap-4'>
			<SubHeader title={!activity ? campainName : 'Facebook'} />

			{activity && <CampaignInfoCard />}
			<CampaignStatus />

			{!activity && (
				<CampaignBtns
					activity
					onSelectOption={handleSelect}
					selectedOption={selectedOption}
					data={campaindata[0]?.activities}
					campaignTableRef={campaignTableRef}
				/>
			)}

			{!activity && (
				<>
					<CampaignElementTable sortBy={selectedOption} ref={campaignTableRef} />
					{xs && <CampaignsTableMobile campaigns={campaignsData} searchParams={'activityId'} />}
				</>
			)}

			{activity && (
				<StackedColumnChart
					title={t('Sales')}
					percentage='4.75'
					colors={['rgba(236, 81, 81, 1)', 'rgba(255, 204, 115, 1)']}
				/>
			)}
		</div>
	);
}
