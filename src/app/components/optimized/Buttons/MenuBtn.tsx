import PopoverComponenet from '../../optimized/UiKits/Popover';
import { Button, Menu } from '../../optimized';
import { DownIcon } from 'src/app/utils/icons';

const MenuBtn = ({
	sortMenus,
	selectedOption,
	handelSelect,
}: {
	sortMenus: { id: string; text: string }[];
	selectedOption: string;
	handelSelect: (e: string) => void;
}) => {
	return (
		<PopoverComponenet
			button={
				<>
					<Button variant='link' RightIcon={DownIcon}>
						{selectedOption}
					</Button>
				</>
			}
		>
			<Menu options={sortMenus} selectedOption={selectedOption} onSelect={handelSelect} />
		</PopoverComponenet>
	);
};

export default MenuBtn;
