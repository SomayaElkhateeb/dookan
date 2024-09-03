import { useParams } from 'react-router-dom';
import OpenSetup from './Setup/OpenSetup';

export default function SetupOpenConfig() {
	const { setup } = useParams();

	switch (setup) {
		case 'openSetup':
			return <OpenSetup />;
	}
}
