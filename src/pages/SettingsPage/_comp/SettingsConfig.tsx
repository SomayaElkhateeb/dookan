import { useParams } from 'react-router-dom';
import BranchesSettings from '../BranchesSettings/BranchesSettings';
import PaymentSettings from '../PaymentSettings/PaymentSettings';
import GeneralSettings from '../GeneralSettings/GeneralSettings';
import LanguageSettings from '../LanguageSettings/LanguageSettings';
import ReviewsSetting from '../ReviewsSettings/ReviewsSettings';
import QueriesSetting from '../QueriesSettings/QueriesSettings';
import CustomizationsSettings from '../CustomizationsSettings/CustomizationsSettings';

import EmailNotification from '../E-mailNotification/EmailNotification';
import TaxesSettings from '../Taxes/TaxesSettings';
import Users from '../PermissionsAndUsers/Users';
import Shipping from '../Shipping/Shipping';
import PaymentSystem_Methods from '../PaymentSystemSettings/PaymentSystem_Methods';

const SettingsConfig = () => {
	const { config } = useParams();
	switch (config) {
		case 'general':
			return <GeneralSettings />;
		case 'branches':
			return <BranchesSettings />;
		case 'users':
			return <Users />;
		case 'shipping':
			return <Shipping />;
		case 'payment':
			return <PaymentSettings />;
		case 'language':
			return <LanguageSettings />;
		case 'reviews':
			return <ReviewsSetting />;
		case 'queries':
			return <QueriesSetting />;
		case 'customizations':
			return <CustomizationsSettings />;
		case 'taxes':
			return <TaxesSettings />;
		case 'notification':
			return <EmailNotification />;
			case 'system_payment':
			return <PaymentSystem_Methods />;
	}
};

export default SettingsConfig;
