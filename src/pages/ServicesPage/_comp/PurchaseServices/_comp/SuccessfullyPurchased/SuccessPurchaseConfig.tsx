import { useParams } from 'react-router-dom';
import SuccessfullyPurchased from './SuccessfullyPurchased';

export default function SuccessPurchaseConfig() {
	const { config } = useParams();

	switch (config) {
		case 'successfullyPurchased':
			return <SuccessfullyPurchased />;
	}
}
