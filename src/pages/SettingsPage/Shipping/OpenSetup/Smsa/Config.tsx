import { useParams } from 'react-router-dom';
import Smsa from './Smsa';

export default function Config() {
	const { config } = useParams();

	switch (config) {
		case 'smsa':
			return <Smsa />;
	}
}
