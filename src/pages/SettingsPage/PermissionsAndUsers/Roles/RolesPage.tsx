import { useEffect, useMemo, useState } from 'react';

import { ArrangeButton } from 'src/app/components/optimized';
import FilterButton from 'src/app/components/optimized/Buttons/FilterButton';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { deleteRole, getRolesList } from 'src/app/store/slices/settingsPage/roles/rolesAsyncThunks';
import RolesTable from './RolesTable';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { nanoid } from 'nanoid';
import { UseCustomTableSorting } from 'src/app/utils/hooks/UseCustomTablesorting';
import { Role } from 'src/app/interface/settingsInterface/rolesSettingsInterface';
import { EditIcon } from 'src/app/utils/icons';
import { LiaTrashAlt } from 'react-icons/lia';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import { useTranslation } from 'react-i18next';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import SearchInput from 'src/app/components/ui/form/SearchInput';

const RolesPage = () => {
	const { t } = useTranslation();
	const { xs } = useResponsive();

	// redux
	const dispatch = useAppDispatch();
	const { rolesList, isLoading } = useAppSelector((state) => state.rolesSettings);
	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		dispatch(getRolesList());
	}, [dispatch]);

	const sortMenus = [
		{ id: nanoid(), text: 'Name A to Z' },
		{ id: nanoid(), text: 'Name Z to A' },
	];

	//  handel Sorting Table
	const sortFunctions = {
		'Name A to Z': (a: Role, b: Role) => a.name.localeCompare(b.name),
		'Name Z to A': (a: Role, b: Role) => b.name.localeCompare(a.name),
	};
	const { arrangedData: RolesArrangedData } = UseCustomTableSorting<Role>(
		sortFunctions,
		rolesList,
		sortMenus?.map((e) => e.text).includes(selectedOption) ? selectedOption : '',
	);
	const filteredRoles = useMemo(() => {
		return RolesArrangedData.filter((user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, RolesArrangedData]);
	const options = [
		{
			id: '1',
			text: 'edit',
			icon: <EditIcon className='fill-title' />,
		},
		{
			id: '2',
			text: 'delete',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];
	const {
		openDeleteDialog,
		custom_Id,
		handelDeleteItem,
		handelCloseDeleteDialog,
		handelId,
		handelOpenDialog,
	} = UseDeleteItem();
	// Delete customer

	const handelDeleteRole = () => {
		dispatch(deleteRole(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getRolesList());
			}
		});
	};
	useMemo(() => {
		switch (selectedOption) {
			case 'delete':
				handelOpenDialog();
				setSelectedOption('');
				break;
			case 'edit':
				setSelectedOption('');
				break;
		}
	}, [selectedOption, custom_Id]);

	return (
		<>
			<div className='flex-col-global gap-2'>
				<RolesBtn
					selectedOption={selectedOption}
					handleSelect={handleSelect}
					sortMenus={sortMenus}
					setSearchQuery={setSearchQuery}
				/>
				<hr />
				{/* import table all roles */}
				<RolesTable handelId={handelId} rolesList={filteredRoles} isLoading={isLoading}>
					<ThreeDotsButton
						sortMenus={options}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</RolesTable>
			</div>
			{/* openDeleteDialog */}
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteRole}
				/>
			)}
		</>
	);
};

export default RolesPage;

const RolesBtn = ({
	selectedOption,
	handleSelect,
	sortMenus,
	setSearchQuery,
}: {
	selectedOption: string;
	handleSelect: (e: string) => void;
	sortMenus: { id: string; text: string }[];
	setSearchQuery: (query: string) => void;
}) => {
	return (
		<div className='md:flex-row-global flex-col-global justify-between w-full '>
			<SearchInput setSearchQuery={setSearchQuery} />
			<div className='flex-row-global gap-3'>
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
