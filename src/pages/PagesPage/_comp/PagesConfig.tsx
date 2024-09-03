import { useParams } from 'react-router-dom';
import AddPage from './PagesSection/_comp/AddPage/AddPage';
import AddNavigation from './Navigation/_comp/AddNavigation';
import AddBlog from './BlogPosts/AddBlog';
import AddReturnPloicy from './BlogPosts/_comp/AddReturnPolicy';

export default function PagesConfig() {
	const { config } = useParams();

	switch (config) {
		case 'AddPage':
			return <AddPage />;
		case 'AddNavigation':
			return <AddNavigation />;
		case 'AddBlog':
			return <AddBlog />;
		case 'return_policy':
			return <AddReturnPloicy />;
	}
}
