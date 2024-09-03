import PopoverComponent from 'src/app/components/optimized/UiKits/Popover';
import { MoreIcon, RemoveIcon } from 'src/app/utils/icons';

export default function MoreAction({ onClick }: { onClick: () => void }) {
	return (
		<PopoverComponent button={<MoreIcon className='fill-subtitle' />}>
			<button className='flex items-center gap-1 p-1.5' onClick={() => onClick()}>
				<RemoveIcon className=' fill-pri-dark' />
				<p className='paragraph text-pri-dark'>Delete permanently</p>
			</button>
		</PopoverComponent>
	);
}
