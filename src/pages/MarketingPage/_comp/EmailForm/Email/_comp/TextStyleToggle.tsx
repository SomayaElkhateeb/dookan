import { IconType } from 'react-icons';
const TextStyleToggle = ({
	IconOne,
	IconTwo,
	IconThree,
}: {
	IconOne: IconType;
	IconTwo: IconType;
	IconThree: IconType;
}) => {
	return (
		<div className='flex items-center justify-between w-full border border-gray rounded h-10'>
			<IconOne
				size={20}
				className=' w-full h-full p-2 text-center fill-grayIcon hover:bg-grayIcon hover:fill-white cursor-pointer'
			/>
			<span className='h-full w-0.5 bg-gray'></span>
			<IconTwo
				size={20}
				className=' w-full h-full p-2 text-center fill-grayIcon hover:bg-grayIcon hover:fill-white cursor-pointer'
			/>
			<span className='h-full w-0.5 bg-gray'></span>
			<IconThree
				size={20}
				className=' w-full h-full p-2 text-center fill-grayIcon hover:bg-grayIcon hover:fill-white cursor-pointer'
			/>
		</div>
	);
};

export default TextStyleToggle;
