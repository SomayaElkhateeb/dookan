import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AllCustomers from './tabs/AllCustomers/AllCustomers';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import CustomersGroups from './tabs/CustomersGroups/CustomersGroups';

const CustomersPage = () => {
	//  hooks
	const { t } = useTranslation();
	return (
		<Tabs
			body={
				<>
					<TabPanel value='1'>
						<AllCustomers />
					</TabPanel>
					<TabPanel value='2'>
						<CustomersGroups />
					</TabPanel>
				</>
			}
		>
			<Tab label={t('All Customers')} value='1' />
			<Tab label={t('Customers Groups')} value='2' />
		</Tabs>
	);
};

export default CustomersPage;
