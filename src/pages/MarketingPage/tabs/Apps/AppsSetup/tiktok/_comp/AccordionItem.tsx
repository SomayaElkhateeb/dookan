import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { CheckBox } from 'src/app/components/optimized';

interface AccordionItemProps {
	title: string;
	children: React.ReactNode;
	isChecked: boolean;
	isOpen: boolean;
	toggleAccordion: () => void;
}

function AccordionItem({
	title,
	children,
	isChecked,
	isOpen,
	toggleAccordion,
}: AccordionItemProps) {
	return (
		<div
			className={`border rounded-md mb-2 w-full ${
				isOpen ? 'bg-[#FAFCFB]  border border-green-500' : ''
			}`}
		>
			<div
				className='flex justify-between items-center px-4 py-2 cursor-pointer'
				onClick={toggleAccordion}
			>
				<h3 className='text-lg font-bold'>{title}</h3>
				<div className='flex items-center'>
					<CheckBox checked={isChecked} handleOnChange={isChecked} />
					<span className='mx-1'>{isOpen ? <FaChevronDown /> : <FaChevronRight />}</span>
				</div>
			</div>
			{isOpen && (
				<div className={`px-4 py-2 ${isOpen ? 'bg-[#FAFCFB]  border-green-300' : ''}`}>
					{children}
				</div>
			)}
		</div>
	);
}

export default AccordionItem;
