import { useNavigate } from 'react-router-dom';

export default function LegalPagesCard({
	img,
	header,
	path,
}: {
	header: string;
	img: string;
	path: string;
}) {
	//  hooks
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(path)}
			className=' cursor-pointer cardDetails-sharedClass  w-ful flex  items-center gap-[.7rem] p-[1rem]'
		>
			<img src={img} loading='lazy' alt='img' className='w-[2rem] h-[2rem]' />
			<p className='title text-sm'>{header}</p>
		</div>
	);
}
