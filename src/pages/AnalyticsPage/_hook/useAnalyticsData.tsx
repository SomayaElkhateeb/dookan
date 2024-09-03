import { useState } from 'react';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
// Import your custom hook if it's defined in a separate file

interface SortFunctions<T> {
	[key: string]: (a: T, b: T) => number;
}

export default function useAnalyticsData<T>(initialData: T[], sortFunctions: SortFunctions<T>) {
	const [arrange, setArrange] = useState('');
	const [tableData, setTableData] = useState<T[]>(initialData);

	// Custom hook for select arrange item
	const { selectedOption, handleSelect } = useSelectBox();

	const handleArrangeChange = (option: string) => {
		setArrange(option);
		if (option && sortFunctions[option]) {
			const sortedData = [...tableData].sort(sortFunctions[option]);
			setTableData(sortedData);
		}
	};

	return {
		arrange,
		tableData,
		handleArrangeChange,
		selectedOption,
		handleSelect,
	};
}
