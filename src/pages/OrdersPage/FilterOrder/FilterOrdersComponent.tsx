import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Button } from 'src/app/components/optimized';
import { FilterSideBar } from 'src/app/components/shared';
import AccessoriesStatusFilter from './AccessoriesStatusFilter';
import BrandStatusFilter from './BrandStatusFilter';
import CategoryStatusFilter from './CategoryStatusFilter';
import FilterPrice from './FilterPrice';
import FilterQuantity from './FilterQuantity';
import ProductStatusFilter from './ProductStatusFilter';
import ProductTypeStatusFilter from './ProductTypeStatusFilter';
import SalesStatusFilter from './SalesStatusFilter';
import { Switch } from 'src/app/components/ui/switch';

export default function FilterOrdersComponent({
	HandelCloseDrawer,
	openDrawer,
}: {
	openDrawer: boolean;
	HandelCloseDrawer: () => void;
}) {
	//  hooks
	const { t } = useTranslation();
	const [checked, setChecked] = useState(false);
	const divClass = 'flex-row-global justify-between';
	const titleClass = 'text-title font-normal text-[.8rem]';
	return (
		<FilterSideBar handelClose={HandelCloseDrawer} sideDrawerOpen={openDrawer}>
			<div className='flex-col-global '>
				{/*  top section */}
				<div className={divClass}>
					<h3 className='title text-[1.2rem]'>{t('Products Filters')}</h3>
					<IoCloseCircleOutline
						onClick={HandelCloseDrawer}
						className='cursor-pointer text-[1.2rem]'
					/>
				</div>

				<div className={divClass}>
					<h3 className={titleClass}>{t('Show favorites')}</h3>
					<Switch checked={checked} onCheckedChange={() => setChecked(!checked)} />
				</div>
				<div className='w-full'>
					<ProductStatusFilter />
					<CategoryStatusFilter />
					<AccessoriesStatusFilter />
					<BrandStatusFilter />
					<SalesStatusFilter />
					<ProductTypeStatusFilter />

					<FilterPrice />
					<FilterQuantity />
				</div>

				<div className='flex-row-global justify-between'>
					<Button>{t('Show Results')}</Button>
					<Button className='bg-pri-dark'>{t('Saved Filters')}</Button>
					<Button variant='tertiary' className='text-[red] bg-white'>
						{t('Reset')}
					</Button>
				</div>
			</div>
		</FilterSideBar>
	);
}
