import { useParams } from 'react-router-dom';
import AnalyticsOrders from '../tabs/Orders/AnalyticsOrders';
import AnalyticsProducts from '../tabs/Products/AnalyticsProducts';
import AnalyticsOverview from '../tabs/Overview/AnalyticsOverview';
import AnalyticsCustomers from '../tabs/Customers/AnalyticsCustomers';
import AnalyticsIntegrations from '../tabs/AnalyticsIntegrations/AnalyticsIntegrations';

export default function AnalyticsTabs() {
	const { tab } = useParams();

	switch (tab) {
		case 'orders':
			return <AnalyticsOrders />;
		case 'products':
			return <AnalyticsProducts />;
		case 'overview':
			return <AnalyticsOverview />;
		case 'customers':
			return <AnalyticsCustomers />;
		case 'integrations':
			return <AnalyticsIntegrations />;

		default:
			return <AnalyticsOrders />;
	}
}

// Define an object 'tabs' that maps tab names to corresponding JSX.Element components
// const tabs: { [key: string]: JSX.Element } = {
// 	orders: <Orders />,
// 	products: <Products />,
// 	overview: <Overview />,
// 	customers: <Customers />,
// 	integrations: <Integrations />,
// };
// Handle the case when 'tab' is undefined or not found in 'tabs'
// if (!tab || !tabs.hasOwnProperty(tab)) {
// Return a default component or handle the case as needed
// return <div>Invalid tab</div>;
// }
// Return the component corresponding to the current 'tab'
// return tabs[tab];
