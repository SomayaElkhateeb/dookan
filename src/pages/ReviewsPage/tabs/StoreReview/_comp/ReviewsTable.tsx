import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { GoStarFill } from 'react-icons/go';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import useLanguage from 'src/app/utils/hooks/useLanguage';

export const ReviewsTable = () => {
	//  hooks
	const { language } = useLanguage();
	const { t } = useTranslation();
	//  headers

	const headers = [
		{ title: t('day') },
		{ title: t('Ratings No.') },
		{ title: t('Average') },
		{ title: t('Top customer group') },
		{ title: t('Orders') },
		{ title: t('Returns') },
	];

	// body
	const data = [
		{
			id: 1,
			day: '24 Apr 2020',
			ratings: 520,
			average: 4.1,
			customerGroup: 'Niche group',
			Orders: 420,
			Returns: 420,
		},
		{
			id: 2,
			day: '24 Apr 2020',
			ratings: 520,
			average: 4.1,
			customerGroup: 'Niche group',
			Orders: 420,
			Returns: 420,
		},
	];

	return (
		<Box className='print-only'>
			<BaseTable
				language={language}
				color='#55607A'
				headers={headers.map((h) => h)}
				rows={data?.map((e, i) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell
								sx={{
									fontWeight: 600,
								}}
							>
								{e.day}
							</GlobalTableCell>,

							<GlobalTableCell>{e.ratings}</GlobalTableCell>,
							<GlobalTableCell>
								<div className='flex items-center gap-1'>
									<GoStarFill size={14} color='gold' />
									{e.average}
								</div>
							</GlobalTableCell>,

							<GlobalTableCell>{e.customerGroup}</GlobalTableCell>,
							<GlobalTableCell>{e.Orders}</GlobalTableCell>,
							<GlobalTableCell>{e.Returns}</GlobalTableCell>,
						],
					};
				})}
			/>
		</Box>
	);
};
