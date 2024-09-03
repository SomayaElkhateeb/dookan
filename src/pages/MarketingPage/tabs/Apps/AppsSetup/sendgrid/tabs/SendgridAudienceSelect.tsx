import React, { useState } from 'react';
import { Button, SelectBoxRow } from 'src/app/components/optimized';

interface Props {
	data: {
		description: string;
		store_list: { name: string; url: string }[];
	};
}

interface Option {
	value: string;
	label: string;
}

const SendgridAudienceSelect: React.FC<Props> = ({ data }) => {
	const [selectedOption, setSelectedOption] = useState('Select a Store');

	const handleSelectChange = (value: string) => {
		setSelectedOption(value);
	};

	const handleConfirm = () => {
		console.log(`Selected store: ${selectedOption}`);
	};

	const handleLearnMore = () => {
		console.log('Learn more about syncing clicked');
	};

	const options: Option[] =
		data?.store_list.map((store) => ({
			value: store.url,
			label: store.name,
		})) || [];

	return (
		<div>
			<div className='border-b pb-5 w-[60%]'>
				<span>{data.description}</span>
				<Button className='inline mx-1' variant='link' onClick={handleLearnMore}>
					Learn more about syncing
				</Button>
			</div>
			<div className='flex items-center justify-between my-5'>
				<div className='w-[300px]'>
					<SelectBoxRow
						options={options}
						selectedValue={selectedOption}
						defaultValue={'Select a Store'}
						handleOnChange={handleSelectChange}
					/>
				</div>
				<Button onClick={handleConfirm} disabled={selectedOption === 'Select a Store'}>
					Confirm
				</Button>
			</div>
		</div>
	);
};

export default SendgridAudienceSelect;
