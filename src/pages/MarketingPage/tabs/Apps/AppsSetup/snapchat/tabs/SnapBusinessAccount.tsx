import React from 'react';
import BusinessAccountCard from '../../_comp/BusinessAccountCard';
import { getImageUrl } from 'src/app/utils';
import { Button } from 'src/app/components/optimized';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import { useTranslation } from 'react-i18next';
import { LinkIcon } from 'src/app/utils/icons';

interface Partner {
	name: string;
	id: string;
	logo: string;
	is_connected: boolean;
}

interface Props {
	data: {
		description: string;
		partners: Partner[];
	};
}
const SnapBusinessAccount: React.FC<Props> = ({ data }) => {
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
				{t('Snapchat Ads Manager Account')}
			</Button>
		</div>
	);
};

export default SnapBusinessAccount;
