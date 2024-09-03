import React from 'react';
import { Button } from 'src/app/components/optimized';

interface Props {
	data: {
		description: string;
	};
}

const MailchimpCreateAccount: React.FC<Props> = ({ data }) => {
	const handleCreateAccount = () => {
		// console.log('Create new account clicked');
	};

	const handleConnectAccount = () => {
		// console.log('Connect Account clicked');
	};

	return (
		<div className='flex items-center justify-between'>
			<div className='flex'>
				<Button className='mx-1' variant='link' onClick={handleCreateAccount}>
					Create new account
				</Button>
				<p>{data.description}</p>
			</div>
			<Button onClick={handleConnectAccount}>Connect Account</Button>
		</div>
	);
};

export default MailchimpCreateAccount;
