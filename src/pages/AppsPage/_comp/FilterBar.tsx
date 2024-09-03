import { useTranslation } from 'react-i18next';
import CheckMenuButton from 'src/app/components/optimized/Buttons/CheckMenuButton';

interface FilterBarProps {
	selectedCategories: string[];
	selectedPrices: string[];
	setSelectedCategories: (options: string[]) => void;
	setSelectedPrices: (options: string[]) => void;
}

export default function FilterBar(props: FilterBarProps) {
	const { t } = useTranslation();
	const Categories: string[] = [
		t('Marketing'),
		t('Sales'),
		t('Support'),
		t('Chat'),
		t('Service'),
		t('Design'),
	];
	const prices: string[] = [t('Free'), t('Paid')];

	return (
		<div className='flex gap-5'>
			<CheckMenuButton
				text={t('Category')}
				options={Categories}
				selected={props.selectedCategories}
				setSelected={props.setSelectedCategories}
			/>

			<CheckMenuButton
				text={t('Price')}
				options={prices}
				selected={props.selectedPrices}
				setSelected={props.setSelectedPrices}
			/>
		</div>
	);
}
