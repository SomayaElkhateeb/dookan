import CategoryButton from 'src/app/components/optimized/Buttons/CategoryButton';
import TopCustomizeSection from './TopCustomizesection';
import PriceButton from 'src/app/components/optimized/Buttons/PriceButton';
import { nanoid } from 'nanoid';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import ThemesCard from './ThemesCard';

export default function ThemesPage() {
	const array = [...Array(4)];
	//  Menus
	const Menus = [
		{ id: nanoid(), text: 'Today' },
		{ id: nanoid(), text: 'Last week' },
		{ id: nanoid(), text: 'Last month' },
		{ id: nanoid(), text: 'Specify date' },
	];
	//  custom hook for select arrang item

	const { selectedOption, handleSelect } = useSelectBox();
	return (
		<div className='flex-col-global custom_container'>
			<TopCustomizeSection />

			{/*  actions buttons */}
			<div className='flex  items-center gap-[1rem]'>
				<CategoryButton
					selectedOption={selectedOption}
					handelSelect={handleSelect}
					sortMenus={Menus}
				/>
				<PriceButton
					selectedOption={selectedOption}
					handelSelect={handleSelect}
					sortMenus={Menus}
				/>
			</div>
			<hr />

			<div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-4'>
				{array.map((e, i) => (
					<ThemesCard key={i} />
				))}
			</div>
		</div>
	);
}
