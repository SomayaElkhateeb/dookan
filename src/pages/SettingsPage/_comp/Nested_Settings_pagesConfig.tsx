import { useParams } from 'react-router-dom';
import AddBranch from 'src/pages/SettingsPage/BranchesSettings/AddBranch/AddBranch';
import PaymentProvidersPage from 'src/pages/SettingsPage/PaymentSettings/PaymentProviders/PaymentProvidersPage';

import AddStuff from '../PermissionsAndUsers/Staff/AddStaff';
import TransferOwnership from '../PermissionsAndUsers/Owner/TransferOwnership';
import AddPaymentMethod from '../PaymentSettings/_comp/_add_payment_Method/Add_PaymentMethod';
import Add_payment_system_methods from '../PaymentSystemSettings/_addPayment_System_Methods/Add_payment_System_Methods';
import AddTaxRatePage from '../Taxes/taxRates/_comp/AddTaxRatePage';

export default function Nested_pages_SettingsConfig() {
	const { nested_page } = useParams();

	switch (nested_page) {
		case 'addStuff':
			return <AddStuff />;
		case 'transferOwnership':
			return <TransferOwnership />;
		case 'add-branch':
			return <AddBranch />;
		case 'addTaxRatePage':
			return <AddTaxRatePage />;
		case 'payment-providers':
			return <PaymentProvidersPage />;
		case 'add-Payment-Method':
			return <AddPaymentMethod />;
		case 'add-Payment-system-Method':
			return <Add_payment_system_methods />;
	}
}
