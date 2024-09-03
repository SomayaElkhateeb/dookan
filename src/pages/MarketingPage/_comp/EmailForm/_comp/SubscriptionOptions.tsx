import { Button } from 'src/app/components/optimized';
import './custom-radio.css';
interface SubscriptionOption {
	value: string;
	label: string;
	price: string;
}

interface SubscriptionOptionsProps {
	currentEmails: number;
	options: SubscriptionOption[];
	selectedOption: string;
	onOptionChange: (value: string) => void;
	buttonText: string;
	click?: () => void;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({
	currentEmails,
	options,
	selectedOption,
	onOptionChange,
	buttonText,
	click,
}) => {
	return (
		<div className='bg-pri-dark p-5 rounded-md text-white'>
			<h2 className='text-lg font-semibold pb-1'>
				You have {currentEmails} emails to send this month
			</h2>
			<div className='flex-col-global'>
				<p className='text-inactive text-sm'>Choose one of our packages for more emails</p>
				<OptionRadio
					options={options}
					selectedOption={selectedOption}
					onOptionChange={onOptionChange}
				/>
				<div>
					<Button variant='primary' onClick={click}>
						{buttonText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SubscriptionOptions;

export const OptionRadio = ({
	options,
	selectedOption,
	onOptionChange,
	col,
}: {
	options: SubscriptionOption[];
	selectedOption: string;
	onOptionChange: (value: string) => void;
	col?: boolean;
}) => {
	return (
		<div className={`flex gap-4 flex-col w-[60%] lg:flex-row ${col && 'lg:flex-col lg:w-[65%]'}`}>
			{options.map((option) => (
				<label
					key={option.value}
					className={`flex items-center px-4 py-2 border rounded-md cursor-pointer ${
						selectedOption === option.value ? 'bg-success text-white' : ''
					}`}
				>
					<input
						type='radio'
						name='subscription'
						value={option.value}
						checked={selectedOption === option.value}
						onChange={() => onOptionChange(option.value)}
						className={`form-radio size-5 :checked-bg-white ${
							selectedOption === option.value ? ':checked-bg-white' : ':bg-title'
						}`}
					/>
					<div className='ml-3'>
						<p className='text-sm '>{option.label}</p>
						<span className='text-sm font-semibold'>{option.price}</span>
					</div>
				</label>
			))}
		</div>
	);
};
