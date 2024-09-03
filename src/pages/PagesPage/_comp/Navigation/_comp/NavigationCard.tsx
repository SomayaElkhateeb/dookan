import { IoIosAddCircle, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useLanguage from 'src/app/utils/hooks/useLanguage';

export default function NavigationCard({
	title,
	sub_title1,
	sub_title2,
	id,
}: {
	title: string;
	sub_title1: string;
	sub_title2: string;
	id: string;
}) {
	//  hooks
	const navigate = useNavigate();
	const { language } = useLanguage();

	//  handel navigationAction

	const handelAction = () => {
		navigate(`?tab=navigation&&id=${id}&&title=${title.replace(/\s/g, '')}`);
	};
	return (
		<div className='bg-white p-[1rem] flex-row-global justify-between'>
			{/*  left section */}
			<div className='flex flex-col gap-1'>
				<p className='text-title font-semibold text-[.9rem]'>{title}</p>
				<p className='text-subtitle  text-[.8rem]'>
					{sub_title1},{sub_title2}
				</p>
			</div>

			{/*  right section */}
			<div className='flex-row-global juistify-end gap-2'>
				<IoIosAddCircle className='text-[1rem]' />
				{language === 'ar' ? (
					<IoIosArrowBack className='text-[1rem] cursor-pointer' onClick={() => handelAction()} />
				) : (
					<IoIosArrowForward
						className='text-[1rem] cursor-pointer'
						onClick={() => handelAction()}
					/>
				)}
			</div>
		</div>
	);
}
