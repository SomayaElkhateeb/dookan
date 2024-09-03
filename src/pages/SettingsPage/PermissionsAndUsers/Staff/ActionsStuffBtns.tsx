import { useTranslation } from 'react-i18next';
import { ArrangeButton, Button } from 'src/app/components/optimized';
import FilterButton from 'src/app/components/optimized/Buttons/FilterButton';
import SearchInput from 'src/app/components/ui/form/SearchInput';
import { User } from 'src/app/interface/settingsInterface/UsersSettingsInterface';
import ActionHandler from 'src/app/utils/ActionMethods';
import { ExportIcon } from 'src/app/utils/icons';

const ActionsStuffBtns = ({
	data,
	sortMenus,
	handleSelect,
	selectedOption,
	setSearchQuery
}: {
	data: User[];
	sortMenus: { id: string; text: string }[];
	handleSelect: (e: string) => void;
	selectedOption: string;
	setSearchQuery: (query: string) => void;
}) => {
	const { t } = useTranslation();

	const handleExportFile = () => {
		ActionHandler.exportToExcel(data, 'staff_data.xlsx');
	};

	return (
		<div className='md:flex-row-global flex-col-global justify-between w-full '>

			<SearchInput setSearchQuery={setSearchQuery} />

			<div className='flex-row-global gap-3'>
				{/* search */}
				<Button onClick={handleExportFile} variant='secondary' LeftIcon={ExportIcon}>
					{t('Export')}
				</Button>
				<ArrangeButton
					sortMenus={sortMenus}
					selectedOption={selectedOption}
					handelSelect={handleSelect}
				/>
				<FilterButton
					sortMenus={sortMenus}
					selectedOption={selectedOption}
					handelSelect={handleSelect}
				/>
			</div>
		</div>
	);
};
export default ActionsStuffBtns;
