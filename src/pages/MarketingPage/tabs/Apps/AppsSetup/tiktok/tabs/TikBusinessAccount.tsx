import React from 'react';
import { getImageUrl } from 'src/app/utils';
import BusinessAccountCard from '../../_comp/BusinessAccountCard';
import { Button } from 'src/app/components/optimized';
import { LinkIcon } from 'src/app/utils/icons';
import { useTranslation } from 'react-i18next';

interface Partner {
	id: string;
	name: string;
	is_connected: boolean;
}

interface TikBusinessAccountProps {
	data: {
		description: string;
		partners: Partner[];
	};
}

const TikBusinessAccount: React.FC<TikBusinessAccountProps> = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div>
			<p className='global-install-p pb-5'>{data.description}</p>
			<div>
				{data.partners.map((partner) => (
					<BusinessAccountCard
						key={partner.id}
						partnerName={partner.name}
						partnerImage={getImageUrl('companies/t-terl.svg')}
						status={partner.is_connected}
						userId={partner.id}
					/>
				))}
			</div>

			<Button variant='link' RightIcon={LinkIcon} className='text-sm pl-5'>
				{t('TikTok Ads Manager Account')}
			</Button>

			{/* <TikTokBusiness /> */}
		</div>
	);
};

export default TikBusinessAccount;
