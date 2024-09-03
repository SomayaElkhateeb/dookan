import { IoIosAddCircle } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';

import useResponsive from 'src/app/utils/hooks/useResponsive';
import FilterOrdersComponent from '../FilterOrder/FilterOrdersComponent';
import { useOpenFilterDrawer } from 'src/app/utils/hooks/CustomHookOpenDrawer';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';
import { menuType } from 'src/app/components/optimized/Buttons/ActionsComp';
export default function TopSectionOrdersPage({
	addButton,
	selectedOption,
	handelSelect,
	sortMenus,
	ActionsMenus,
	StatusMenus,
}: {
	addButton: string;

	selectedOption: string;
	handelSelect: (e: string) => void;
	sortMenus: menuType[];
	ActionsMenus: menuType[];
	StatusMenus: menuType[];
}) {
	//  hooks

	const navigate = useNavigate();

	//  custom hook
	const { HandelopenDrawer, openDrawer, HandelCloseDrawer } = useOpenFilterDrawer();

	const { xs } = useResponsive();

	return (
		<>
			<div className='flex-col-global'>
				<div className='topTable'>
					{/*  left dropdow */}

					{!xs && (
						<Button
							onClick={() => navigate('/order/addOrder')}
							variant='primary'
							LeftIcon={IoIosAddCircle}
						>
							{addButton}
						</Button>
					)}
					{/*  actions filter arrange,... */}
					<div className='flex-row-global  gap-[1.2rem]'>
						<ActionsComp
							HandelopenDrawer={HandelopenDrawer}
							filter
							sortMenus={sortMenus}
							ActionsMenus={ActionsMenus}
							StatusMenus={StatusMenus}
							selectedOption={selectedOption}
							handelSelect={handelSelect}
						/>
					</div>
				</div>
				<hr />
			</div>

			{/* open filter drawer */}
			{openDrawer && (
				<FilterOrdersComponent openDrawer={openDrawer} HandelCloseDrawer={HandelCloseDrawer} />
			)}
		</>
	);
}
