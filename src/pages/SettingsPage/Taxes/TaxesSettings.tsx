import TaxCategories from './taxCategories/TaxCategories';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from 'src/app/components/optimized';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import AddTaxCategories from './taxCategories/_comp/AddTaxCategories';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import TaxRates from './taxRates/TaxRates';

const TaxesSettings = () => {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [value, setValue] = useState(1);
	const [openDialog, setOpenDialog] = useState(false);
	const { xs } = useResponsive();

	return (
		//  tabs section
		<>
			<SubHeader title={t('Taxes')}>
				{xs ? (
					''
				) : (
					<Button
						variant='primary'
						LeftIcon={IoMdAddCircle}
						onClick={() => {
							if (value === 1) {
								setOpenDialog(true);
							} else {
								navigate('addTaxRatePage');
							}
						}}
					>
						{value === 1 ? t('add tax categories') : t('add tax rate')}
					</Button>
				)}

				{xs && <div />}
			</SubHeader>

			<Tabs
				body={
					<>
						<TabPanel value='1'>
							<TaxCategories setOpenDialog={() => setOpenDialog(true)} />
						</TabPanel>
						<TabPanel value='2'>
							<TaxRates />
						</TabPanel>
					</>
				}
			>
				{/*  children */}
				<Tab onClick={() => setValue(1)} label={t('tax categories')} value='1' />
				<Tab onClick={() => setValue(2)} label={t('tax rates')} value='2' />
			</Tabs>
			{openDialog && (
				<AddTaxCategories openDialog={openDialog} setOpenDialog={() => setOpenDialog(false)} />
			)}

			{xs && (
				<div className='flex-end pr-3'>
					<AddButtonMobile
						onClick={() => {
							if (value === 1) {
								setOpenDialog(true);
							} else {
								navigate('addTaxRate');
							}
						}}
					/>
				</div>
			)}
		</>
	);
};

export default TaxesSettings;
