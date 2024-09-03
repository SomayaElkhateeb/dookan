import { useState } from 'react';
import { Button, InputRow } from 'src/app/components/optimized';

const SendgridConnectAPI = () => {
	const [value, setValue] = useState('');

	const handleInputChange = (value: string) => {
		setValue(value);
	};
	const handleConnect = () => {
		// For example, you can make an API call or perform any other action
		console.log('Connect button clicked');
	};
	return (
		<div className='flex justify-between items-center'>
			<div className='w-1/3'>
				<InputRow label='API' value={value} handleOnChange={handleInputChange} />
			</div>
			<Button onClick={handleConnect}>Connect</Button>
		</div>
	);
};

export default SendgridConnectAPI;
