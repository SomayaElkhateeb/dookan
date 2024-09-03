import data from '../data.json';

import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { useTranslation } from 'react-i18next';
import StatsCard from 'src/app/components/optimized/Cards/StatsCard';
import { ArrangeButton } from 'src/app/components/optimized';

const CampaignStatus = () => {
	//  hooks
	const { t } = useTranslation();
	//  custom hook for select arrang item

	const { selectedOption, handleSelect } = useSelectBox();

	const sortMenus = [
		{ text: t('Last week'), id: '1' },
		{ text: t('Last month'), id: '2' },
		{ text: t('last Year'), id: '3' },
	];

	return (
		<div className=' flex flex-col gap-3'>
			<div className=' flex items-center gap-2'>
				<ArrangeButton
					sortMenus={sortMenus}
					selectedOption={selectedOption}
					handelSelect={handleSelect}
				/>
				<div className='flex gap-2'>
					<p className='paragraph text-subtitle'>{t('Compared to')}:</p>
					<p className='paragraph text-title'>{selectedOption ? selectedOption : t('Last week')}</p>
				</div>
			</div>
			<div className='flex gap-4 flex-wrap'>
				{data?.statsData?.map((item, index) => (
					<StatsCard
						key={index}
						percentage={item.percentage}
						label={item.label}
						value={item.value}
						positive={item.positive}
						extensions={item.extensions}
					/>
				))}
			</div>
		</div>
	);
};
export default CampaignStatus;
