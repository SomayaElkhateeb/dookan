import { getImageUrl } from 'src/app/utils';
import { MoreIcon } from 'src/app/utils/icons';

interface Campaign {
	name: string;
	status: string;
	imageUrl?: string;
}

interface CampaignsTableProps {
	campaigns: Campaign[];
	actions?: boolean;
}
interface CampaignItemProps {
	campaign: Campaign;
	actions?: boolean;
}

export default function CampaignsTableMobile({ campaigns, actions = false }: CampaignsTableProps) {
	return (
		<div className='divide-y bg-white'>
			{campaigns.map((campaign, index) => (
				<CampaignItem key={index} campaign={campaign} actions={actions} />
			))}
		</div>
	);
}

function CampaignItem({ campaign, actions }: CampaignItemProps) {
	return (
		<div className='flex items-center justify-between p-1.5'>
			<section className='flex gap-1'>
				{campaign.imageUrl && (
					<div className='border border-borders-lines rounded-lg size-10 grid place-content-center'>
						<img src={getImageUrl(campaign.imageUrl)} alt={campaign.name} className='size-6' />
					</div>
				)}
				<div className='grid gap-0.5'>
					<h2 className='text-lg font-semibold'>{campaign.name}</h2>
					<StatusBadge status={campaign.status} />
				</div>
			</section>
			{actions && (
				<button>
					<MoreIcon className='fill-subtitle' />
				</button>
			)}
		</div>
	);
}

function StatusBadge({ status }: { status: string }) {
	const getStatusClasses = (status: string) => {
		switch (status) {
			case 'ended':
			case 'refused':
				return 'bg-error';
			case 'running':
				return 'bg-success';
			case 'in review':
				return 'bg-warning';
			default:
				return '';
		}
	};

	return (
		<span
			className={`px-2 p-[0.2rem] rounded-md w-fit text-white paragraph ${getStatusClasses(
				status,
			)}`}
		>
			{status}
		</span>
	);
}
