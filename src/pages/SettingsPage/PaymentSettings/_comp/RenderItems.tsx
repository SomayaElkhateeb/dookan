import { type FC } from 'react';

import { Button } from 'src/app/components/optimized';
import usePopupDisplay from './usePopupDisplay';
import { useTranslation } from 'react-i18next';

interface RenderItemsProps<T> {
	items: T[];
	RenderItem: FC<{ item: T }>;
	title?: string;
	popupTitle?: string;
	provider?: string;
	limit: number;
}

export default function RenderItems<T>({
	items,
	RenderItem,
	popupTitle,
	title,
	provider,
	limit,
}: RenderItemsProps<T>) {
	const { t } = useTranslation();
	const { displayedItems, overflowCount, handlePopups, renderPopup } = usePopupDisplay({
		items,
		popupTitle: t(popupTitle),
		limit,
		provider,
		renderItem: (item, index) => <RenderItem item={item} key={index} />,
	});

	return (
		<div className='grid place-items-start gap-2 max-w-72'>
			{title && <h3 className='subtitle'>{t(title)}</h3>}
			<div className='flex flex-wrap gap-2'>
				{displayedItems.map((item, index) => (
					<RenderItem item={item} key={index} />
				))}
			</div>
			{overflowCount > 0 && (
				<Button variant='link' onClick={handlePopups}>
					{overflowCount} + {t('More')}
				</Button>
			)}
			{renderPopup}
		</div>
	);
}
