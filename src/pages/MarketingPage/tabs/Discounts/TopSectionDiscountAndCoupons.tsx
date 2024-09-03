import { nanoid } from 'nanoid';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';
import ActionsComp from 'src/app/components/optimized/Buttons/ActionsComp';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { useOpenFilterDrawer } from 'src/app/utils/hooks/CustomHookOpenDrawer';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import FilterOrdersComponent from 'src/pages/OrdersPage/FilterOrder/FilterOrdersComponent';


export default function TopSectionDiscountAndCoupons({
	addButton,
	path,
}: {
	addButton: string;
	path: string;
}) {
	//  hooks
	const { xs } = useResponsive();

	const navigate = useNavigate();
	//  custom hook
	const { HandelopenDrawer, openDrawer, HandelCloseDrawer } = useOpenFilterDrawer();
	const { selectedOption, handleSelect } = useSelectBox();

	const sortMenus = [
		{ id: nanoid(), text: 'Name A to Z' },
		{ id: nanoid(), text: 'Name Z to A' },
		{ id: nanoid(), text: 'Sales ( High to Low )' },
		{ id: nanoid(), text: 'Sales ( Low to  High )' },
	];

	return (
		<>
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
							HandelopenDrawer={HandelopenDrawer}
							filter
							sortMenus={sortMenus}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
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
