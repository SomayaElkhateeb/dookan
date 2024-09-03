import { useParams } from 'react-router-dom';
import ShippingProviders from './OpenSetup/Providers/ShippingProviders';
import DeliverYourself from './OpenSetup/Providers/DeliverYourself';
import SelfPickup from './OpenSetup/Providers/SelfPickup';
import Free_ShippingForm from './_comp/Free_ShippingForm/Free_ShippingForm';
import MdhShippingMethod from './_comp/MdhShipping/MdhShippingMethod';

export default function ShippingConfig() {
	const { config } = useParams();

	switch (config) {
		case 'setupProviders':
			return <ShippingProviders />;
		case 'deliverYourself':
			return <DeliverYourself />;
		case 'selfPickup':
			return <SelfPickup />;
		case 'Free_ShippingForm':
			return <Free_ShippingForm />;
		case 'Dhl_ShippingForm':
			return <MdhShippingMethod />;
	}
}
