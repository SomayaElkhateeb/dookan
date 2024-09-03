import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';

const CampaignInfoCard = ({ logoSrc, platformName, data }) => {
	return (
		<div className='p-3 rounded-lg flex gap-4 items-center bg-white mb-3 border border-borders-lines'>
			<div className='flex gap-4 items-center pr-4 border-r border-borders-lines'>
				<div className='border border-borders-lines rounded-lg size-10 flex items-center justify-center'>
					<img src={getImageUrl(logoSrc)} alt='Platform Logo' className='w-6 h-6' />
				</div>

				<div>
					<h2 className='title'>{platformName}</h2>
					<Button variant='link'>UTM Parameters</Button>
				</div>
			</div>
			<div className='grid grid-cols-4 flex-grow'>
				{data.map((item, index) => (
					<div key={index} className='col-span-1'>
						<div className='paragraph'>{item.label}</div>
						<div className='paragraph text-title'>{item.value}</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default CampaignInfoCard;
CampaignInfoCard.defaultProps = {
	logoSrc: 'social/facebook.svg',
	platformName: 'Facebook',
	data: [
		{ label: 'Created at', value: '24 Nov 2020' },
		{ label: 'Ends at', value: '24 Nov 2021' },
		{ label: 'Daily Budget', value: 'SAR 100.00' },
		{ label: 'Ad Impressions', value: 'SAR 2000.00' },
	],
};
