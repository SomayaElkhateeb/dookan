import React from 'react';
import { getImageUrl } from 'src/app/utils';
import PartnerCard from '../../_comp/PartnerCard';

interface Company {
	name: string;
	date: string;
	id: string;
}

interface FBBusinessManagerProps {
	data: {
		description: string;
		companies: Company[];
	};
}

const FBBusinessManager: React.FC<FBBusinessManagerProps> = ({ data }) => {
	return (
		<div>
			<p className='text-title text-sm w-3/4 pb-5'>{data.description}</p>
			{data.companies.map((company) => (
				<PartnerCard
					key={company.id}
					imageUrl={getImageUrl('companies/t-terl.svg')}
					subtitle={company.date}
					name={company.name}
					id={company.id}
				/>
			))}
		</div>
	);
};

export default FBBusinessManager;
