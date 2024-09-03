import { useState, useMemo } from 'react';

import { BranchInterface } from 'src/app/interface/BranchInterface';

// export const branchesData: BranchesType[] = [
// 	{
// 		id: 1,
// 		name: 'Branch 1',
// 		address: '123 Main St',
// 		city: 'City 1',
// 		country: 'Country 1',
// 		phone: '123-456-7890',
// 		isMain: true,
// 		branchType: 'warehouse',
// 	},
// 	{
// 		id: 2,
// 		name: 'Branch 2',
// 		address: '456 Elm St',
// 		city: 'City 2',
// 		country: 'Country 2',
// 		phone: '987-654-3210',
// 		isMain: false,
// 		branchType: 'commercialBranch',
// 	},
// ];

export default function useBranch(initialData: BranchInterface[]) {
	const [filter, setFilter] = useState<string>('all');

	const handleFilterChange = (type: string) => {
		setFilter(type);
	};

	const filteredData = useMemo(() => {
		if (filter === 'all') return initialData;
		return initialData.filter((branch) => branch.type === filter);
	}, [filter, initialData]);

	return {
		filter,
		filteredData,
		handleFilterChange,
	};
}
