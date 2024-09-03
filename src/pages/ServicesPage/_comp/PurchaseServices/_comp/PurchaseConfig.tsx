import { useParams } from 'react-router-dom';
import PurchaseServices from './PurchaseServices';


export default function PurchaseConfig() {
	const { config } = useParams();

	switch (config) {
		case 'purchaseServicesPage':
			return <PurchaseServices />;
	}
}
