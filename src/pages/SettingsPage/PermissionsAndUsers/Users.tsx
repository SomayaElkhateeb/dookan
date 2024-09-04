import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { SubHeader, Button } from 'src/app/components/optimized';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import StaffPage from './Staff/StaffPage';
import RolesPage from './Roles/RolesPage';
import AddRole from './Roles/AddRole';

const Users = () => {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [value, setValue] = useState(1);
	const [openDialog, setOpenDialog] = useState(false);
	const { xs } = useResponsive();

	return (
		//  tabs section
		<>
			<SubHeader title={value === 1 ? t('Users & Permissions') : t('Roles')}>
				{xs ? (
					''
				) : (
					<Button
						variant='primary'
						LeftIcon={IoMdAddCircle}
						onClick={() => {
							if (value === 1) {
								navigate('addStuff');
							} else {
								setOpenDialog(true);
							}
						}}
					>
						{value === 1 ? t('add staff') : t('add Roles')}
					</Button>
				)}

				{xs && <div />}
			</SubHeader>

			<Tabs
				body={
					<>
						<TabPanel value='1'>
							<StaffPage />
						</TabPanel>
						<TabPanel value='2'>
							<RolesPage />
						</TabPanel>
					</>
				}
			>
				{/*  children */}
				<Tab onClick={() => setValue(1)} label={t('Staff')} value='1' />
				<Tab onClick={() => setValue(2)} label={t('roles')} value='2' />
			</Tabs>
			{openDialog && <AddRole openDialog={openDialog} setOpenDialog={setOpenDialog} />}
			{xs && (
				<div className='flex-end pr-3'>
					<AddButtonMobile
						onClick={() => {
							if (value === 1) {
								navigate('addStuff');
							} else {
								setOpenDialog(true);
							}
						}}
					/>
				</div>
			)}
		</>
	);
};
export default Users;
