import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BranchesFilter from './BranchesPage/FilterBar';
import useBranch from './BranchesPage/useBranch';
import { SubHeader, Button } from 'src/app/components/optimized';
import { BranchesApi } from 'src/app/React-Query/BranchesApi';
import { useQuery } from 'react-query';
import { EditIcon, ViewIcon } from 'src/app/utils/icons';
import BranchTable from './BranchesPage/BranchTable';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import { LiaTrashAlt } from 'react-icons/lia';
import ControlBranch from './BranchesPage/ControlBranch';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { useState, useMemo, useEffect } from 'react';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import { useAppDispatch } from 'src/app/store';
import { deleteBranch } from 'src/app/store/slices/settingsPage/branches/branchesAsyncThunks';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';

export default function BranchesSettings() {
	// hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	const [searchQuery, setSearchQuery] = useState('');

	// data query
	const { data, isLoading, refetch } = useQuery(['branchesData'], () => BranchesApi.branches());
	let branchesData = data?.data?.data;
	console.log('branchesData', branchesData);
	const { filter, filteredData, handleFilterChange } = useBranch(branchesData);

	const filteredBranch = useMemo(() => {
		if (!filteredData) return [];
		return filteredData.filter((branch) =>
			branch.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, filteredData]);

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

	console.log('id', custom_Id);
	const handleDeleteBranch = () => {
		dispatch(deleteBranch(custom_Id)).then((promiseResponse: any) => {
			if (promiseResponse.payload.code === 200) {
				handelCloseDeleteDialog();
				refetch();
			}
		});
	};

	useEffect(() => {
		switch (selectedOption) {
			case 'delete':
				handelOpenDialog();
				setSelectedOption('');
				break;
			case 'edit':
				setSelectedOption('');
				custom_Id && navigate(`add-branch?id=${custom_Id}`);
				break;
		}
	}, [selectedOption, custom_Id, handelOpenDialog, navigate, setSelectedOption]);

	return (
		<div className='flex-col-global'>
			<div>
				<SubHeader title={t('Branches')}>
					<Button variant='primary' text={t('Add Branch')} onClick={() => navigate('add-branch')} />
				</SubHeader>
				<BranchesFilter onFilterChange={handleFilterChange} filter={filter} />
				<ControlBranch filteredBranch={filteredBranch} setSearchQuery={setSearchQuery} />
			</div>
			<div className='custom_container py-2'>
				<BranchTable handelId={handelId} data={filteredBranch} isLoading={isLoading}>
					<div className='flex'>
						<Button variant='tertiary' text={t('View Inventory')} LeftIcon={ViewIcon} />
						<ThreeDotsButton
							sortMenus={options}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>
					</div>
				</BranchTable>
			</div>
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handleDeleteBranch}
				/>
			)}
		</div>
	);
}
