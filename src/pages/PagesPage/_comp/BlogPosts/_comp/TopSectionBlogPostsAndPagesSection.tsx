import { IoIosAddCircle } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { Button } from 'src/app/components/optimized';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';
import useResponsive from 'src/app/utils/hooks/useResponsive';

export default function TopSectionBlogPostsAndSection({
	addButton,
	path,
}: {
	addButton: string;
	path: string;
}) {
	//  hooks
	const navigate = useNavigate();
	//  custom hook for select arrang item

	const { selectedOption, handleSelect } = useSelectBox();
	const { xs } = useResponsive();

	const sortMenus = [
		{ id: nanoid(), text: 'Name A to Z' },
		{ id: nanoid(), text: 'Name Z to A' },
		{ id: nanoid(), text: 'Sales ( High to Low )' },
		{ id: nanoid(), text: 'Sales ( Low to  High )' },
	];

	return (
		<div className='flex-col-global'>
			<div className='topTable'>
				{/*  left dropdow */}

				{!xs && (
					<Button onClick={() => navigate(path)} variant='primary' LeftIcon={IoIosAddCircle}>
						{addButton}
					</Button>
				)}

				{/*  actions  arrange,... */}
				<div className='flex-row-global  gap-[1.2rem]'>
					<ActionsComp
						sortMenus={sortMenus}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</div>
			</div>
			<hr />
		</div>
	);
}
