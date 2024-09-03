import { useTranslation } from 'react-i18next';
import { Button, ClientBox } from 'src/app/components/optimized';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';

import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from 'src/app/store/slices/settingsPage/users/usersAsyncThunks';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect, useState, useMemo } from 'react';
import { User } from 'src/app/interface/settingsInterface/UsersSettingsInterface';
import ActionsStuffBtns from './ActionsStuffBtns';
import { UseCustomTableSorting } from 'src/app/utils/hooks/UseCustomTablesorting';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { nanoid } from 'nanoid';
import { EditIcon } from 'src/app/utils/icons';
import { LiaTrashAlt } from 'react-icons/lia';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import StuffTable from './StaffTable';
import StaffSmallTable from './StaffSmallTable';

const StaffPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();
	const dispatch = useAppDispatch();
	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	const { users, isLoading } = useAppSelector((state) => state.usersSettings);

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const sortMenus = [
		{ id: nanoid(), text: 'Name A to Z' },
		{ id: nanoid(), text: 'Name Z to A' },
	];

	const sortFunctions = {
		'Name A to Z': (a: User, b: User) => a.name.localeCompare(b.name),
		'Name Z to A': (a: User, b: User) => b.name.localeCompare(a.name),
	};
	
	const { arrangedData: UserArrangedData } = UseCustomTableSorting<User>(
		sortFunctions,
		users,
		sortMenus?.map((e) => e.text).includes(selectedOption) ? selectedOption : '',
	);

	const filteredUsers = useMemo(() => {
		return UserArrangedData.filter(user =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [searchQuery, UserArrangedData]);

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

	const handelDeleteStuff = () => {
		dispatch(deleteUser(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getUsers());
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
				custom_Id && navigate(`addStuff?id=${custom_Id}`);
				break;
		}
	}, [selectedOption, custom_Id]);

	return (
		<div className='flex-col-global gap-8'>
			{/* control header row */}
			<div className='flex-col-global gap-0'>
				<ActionsStuffBtns
					selectedOption={selectedOption}
					handleSelect={handleSelect}
					sortMenus={sortMenus}
					data={users}
					setSearchQuery={setSearchQuery}
				/>
				<hr />
			</div>
			<div className='flex-col-global'>
				<div className='global-cards bg-light-2'>
					{users?.length > 0 && (
						<div key={users[users.length - 1].id} className='flex-col-global'>
							<div>
								<h3 className='title'>{t('Owner')}</h3>
								<p className='text-subtitle text-sm py-2'>
									{t('Add users and define what they can see or do in your store.')}
								</p>
							</div>
							<div className='flexResponsive'>
								<ClientBox
									title={users[users.length - 1].name}
									details={users[users.length - 1].role.name}
									avatar={<Avatar variant='user' fullName={users[users.length - 1].name} />}
								/>
								<div>
									<Button variant='tertiary' onClick={() => navigate('transferOwnership')}>
										{t('Transfer Ownership')}
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>

				{!xs && <div>
					<h3 className='title'>{t('Staff')}</h3>
					<p className='text-subtitle text-sm py-2'>
						{t('Add users and define what they can see or do in your store.')}
					</p>
				</div>}

				{/* import table all stuff */}
				{!xs && (
					<StuffTable handelId={handelId} data={filteredUsers} isLoading={isLoading}>
						<ThreeDotsButton
							sortMenus={options}
							selectedOption={selectedOption}
							handelSelect={handleSelect}
						/>
					</StuffTable>
				)}

				{xs && (<StaffSmallTable handelId={handelId} data={filteredUsers} isLoading={isLoading}>
					<ThreeDotsButton
						sortMenus={options}
						selectedOption={selectedOption}
						handelSelect={handleSelect}
					/>
				</StaffSmallTable>)}
			</div>
			{/* openDeleteDialog */}
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteStuff}
				/>
			)}
		</div>
	);
};
export default StaffPage;

