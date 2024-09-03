import { useState } from 'react';
import { CheckBox } from 'src/app/components/optimized';
import { DownIcon, UpIcon } from 'src/app/utils/icons';

export default function AccordionInstall({
	title,
	children,
}: {
	title: String;
	children: React.ReactNode;
}) {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleCheckBoxChange = (isChecked: boolean) => {
		setIsChecked(isChecked);
	};
	// const [open, setOpen] = useState(false);

	return (
		<div
			className={`rounded-md p-4 border border-constrained transition-all ease-linear ${
				isChecked ? ' bg-sec-light border-secondary ' : 'bg-white'
			}`}
		>
			<div className='flex justify-between'>
				<h3 className='font-semibold text-title'>{title}</h3>
				<div className='flex items-center gap-2'>
					{!isChecked && <CheckBox checked={isChecked} handleOnChange={handleCheckBoxChange} />}
					<button
						className='transition-all duration-300 ease-linear'
						onClick={() => setIsChecked(!isChecked)}
					>
						{isChecked ? <UpIcon className='fill-hint' /> : <DownIcon className='fill-hint' />}
					</button>
				</div>
			</div>

			{isChecked && (
				<div className='pt-4 transition-all duration-500 ease-linear opacity-1 '>{children}</div>
			)}
		</div>
	);
}
