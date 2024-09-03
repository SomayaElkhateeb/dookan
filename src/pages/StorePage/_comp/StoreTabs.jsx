import { useParams } from 'react-router-dom';
import ThemesPage from './ThemesPage/ThemesPage';
import DesignPage from './DesignPage/DesignPage';
import PreferencesPage from './PreferncesPage/PreferencesPage';

const StoreTabs = () => {
	//  hooks
	const { tab } = useParams();

	switch (tab) {
		case 'theme':
			return <ThemesPage />;

		case 'design':
			return <DesignPage />;
		case 'prefernces':
			return <PreferencesPage />;

		default:
			return <ThemesPage />;
	}
};

export default StoreTabs;
