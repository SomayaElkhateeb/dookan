import React from 'react';

interface FBCommerceAccountProps {
	data: {
		title: string;
		description: string;
	};
}

const FBCommerceAccount: React.FC<FBCommerceAccountProps> = ({ data }) => {
	return <p className='text-title text-sm'>{data.description}</p>;
};

export default FBCommerceAccount;
