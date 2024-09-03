import { useTranslation } from 'react-i18next';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Button, DatePicker } from 'src/app/components/optimized';
import { DropDownFilter } from '../../../_comp/DropDownFilter';
import { FilterSideBar } from 'src/app/components/shared';

export const FilterReviews = ({
	HandelCloseDrawer,
	openDrawer,
	title,
}: {
	openDrawer: boolean;
	HandelCloseDrawer: () => void;
	title: string;
}) => {
	const { t } = useTranslation();

	return (
		<FilterSideBar handelClose={HandelCloseDrawer} sideDrawerOpen={openDrawer}>
			<div className='flex-col-global justify-between h-[94vh] '>
				{/*  top section */}
				<div>
					<div className='flex-row-global justify-between pb-3'>
						<h3 className='title text-[1.2rem]'>{title}</h3>
						<IoCloseCircleOutline
							onClick={HandelCloseDrawer}
							className='cursor-pointer text-[1.2rem]'
						/>
					</div>
					<hr />
					<div className='w-full'>
						<DropDownFilter title='Product name' />
						<DropDownFilter title='Date' children={<Date />} />
						<DropDownFilter title='Review status' />
					</div>
				</div>

				<div className='flex-row-global justify-between border-t border-constrained pt-4 '>
					<Button>{t('Show Results')}</Button>
					<Button className='bg-pri-dark'>{t('Saved Filters')}</Button>
					<Button variant='tertiary' className='text-error bg-white'>
						{t('Reset')}
					</Button>
				</div>
			</div>
		</FilterSideBar>
	);
};

function Date() {
	return (
		<div className='flex items-center gap-2'>
			<DatePicker label='From' />
			<DatePicker label='To' />
		</div>
	);
}
