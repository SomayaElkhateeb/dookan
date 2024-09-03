import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import PagesPagesSection from './_comp/PagesSection/PagesPagesScetion';
import BlogPosts from './_comp/BlogPosts/BlogPosts';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import NavItemPage from './_comp/Navigation/NavItemPage';
import NavigationSection from './_comp/Navigation/NavigationSection';


const PagesPage = () => {
	//  hooks
	const { t } = useTranslation();

	const [searchParams] = useSearchParams();

	const id = searchParams.get('id');
	const tab = searchParams.get('tab');

	const handelPageWithSeacrhParams = () => {
		if (id && tab === 'navigation') {
			return <NavItemPage />;
		} else {
			return (
				<Tabs
					body={
						<>
							<TabPanel value={'1'}>
								<PagesPagesSection />
							</TabPanel>
							<TabPanel value={'2'}>
								<NavigationSection />
							</TabPanel>
							<TabPanel value={'3'}>
								<BlogPosts />
							</TabPanel>
						</>
					}
				>
					{/*  children */}
					<Tab label={t('Pages')} value={'1'} />
					<Tab label={t('Navigation')} value={'2'} />
					<Tab label={t('Blog posts')} value={'3'} />
				</Tabs>
			);
		}
	};
	return <>{handelPageWithSeacrhParams()}</>;
};

export default PagesPage;
