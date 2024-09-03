import { useState } from 'react';
import { GlobalDialog } from 'src/app/components/shared';
import { getImageUrl } from 'src/app/utils';
import { DeleteExitIcon } from 'src/app/utils/icons';

const dialogStyle = {
	width: { md: '40rem', xs: '22rem' },
};

interface UsePopupDisplayProps<T> {
	items: T[];
	limit: number;
	popupTitle: string;
	provider?: string;
	renderItem: (item: T, index: number) => JSX.Element;
}

export default function usePopupDisplay<T>({
	items,
	limit,
	popupTitle,
	provider,
	renderItem,
}: UsePopupDisplayProps<T>) {
	const [isOpen, setIsOpen] = useState(false);

	const handlePopups = () => {
		setIsOpen(!isOpen);
	};
	const displayedItems = items.slice(0, limit);
	const overflowCount = items.length > limit ? items.length - limit : 0;
	return {
		displayedItems,
		overflowCount,
		isOpen,
		handlePopups,
		renderPopup: (
			<GlobalDialog openDialog={isOpen} handleClose={handlePopups} style={dialogStyle}>
				<div className='grid gap-4'>
					<div className='flex items-center justify-between'>
						<h2 className='title'>{popupTitle}</h2>
						<button onClick={handlePopups}>
							<DeleteExitIcon className='fill-hint' />
						</button>
					</div>
					<img src={getImageUrl(`paymentProviders/${provider}.svg`)} alt='' />
					<div className='flex flex-wrap gap-2'>
						{items.map((item, index) => renderItem(item, index))}
					</div>
				</div>
			</GlobalDialog>
		),
	};
}
