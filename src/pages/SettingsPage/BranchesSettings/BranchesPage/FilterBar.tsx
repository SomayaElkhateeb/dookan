import { useTranslation } from 'react-i18next';

interface BranchesFilterProps {
	filter: string;
	onFilterChange: (filter: string) => void;
}

export default function BranchesFilter({ filter, onFilterChange }: BranchesFilterProps) {
	const { t } = useTranslation();
	const filterOptions = [
		{ label: t('All'), value: 'all' },
		{ label: t('Commercial branch'), value: 'commercialBranch' },
		{ label: t('Warehouse'), value: 'warehouse' },
	];

	return (
		<div className='flex gap-5 bg-white px-5'>
			{filterOptions.map((option) => {
				const isActive = filter === option.value;
				return (
					<button
						key={option.value}
						className={`px-1 py-2 text-sm  border-primary ${
							isActive ? 'text-primary font-semibold border-b-2' : 'text-hint font-normal'
						}`}
						onClick={() => onFilterChange(option.value)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
