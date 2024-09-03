import { useParams } from 'react-router-dom';
import Setup from './Setup';

export default function SetupConfig() {
	const { config } = useParams();

	switch (config) {
		case 'Setup':
			return <Setup />;
	}
}
