import data from '../../../_comp/data.json';
import CompareBar from 'src/app/components/optimized/UiKits/CompareBar';
import StatsCard from 'src/app/components/optimized/Cards/StatsCard';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';

const AnalyticsComparison = () => {
	//  custom hook for select arrang item

	const { selectedOption, handleSelect } = useSelectBox();

	return (
		<div>
			<CompareBar selectedComparisonOption={selectedOption} handleComparisonChange={handleSelect} />
			<div className='flex gap-4 flex-wrap'>
				{data.statsData.map((item, index) => (
					<StatsCard key={index} {...item} />
				))}
			</div>
		</div>
	);
};
export default AnalyticsComparison;
