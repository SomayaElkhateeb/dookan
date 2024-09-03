import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import { BlogPostInterface } from 'src/app/interface/BlogPostInterface';
import { getPagesTable } from 'src/app/store/slices/pagesPage/pages/pagesTableAsyncThunks';
import { getImageUrl } from 'src/app/utils';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import TopSectionBlogPostsAndSection from '../BlogPosts/_comp/TopSectionBlogPostsAndPagesSection';
import LegalPagesSection from './_comp/LegalPagesSection';
import PagesTableMobile from './_comp/PagesTableMobile';
import PagesPagesTable from './_comp/PagesPagesSectionTable';
import { useAppDispatch, useAppSelector } from 'src/app/store';

export default function PagesPagesSection() {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();

	// redux
	const dispatch = useAppDispatch();
	const { pages, isLoading, error } = useAppSelector((state) => state.pages || {});

	useEffect(() => {
		dispatch(getPagesTable());
	}, [dispatch]);

	const data: BlogPostInterface[] = [
		{
			id: '1',
			visibility: false,
			img: getImageUrl('images/product.png'),
			title: 'mohamed Mostafa',
			describtion: '01064545565',
		},
		{
			id: '1',
			visibility: false,
			img: getImageUrl('images/product.png'),
			title: 'mohamed Mostafa',
			describtion: '01064545565',
		},
	];
	return (
		<div className='flex-col-global gap-4'>
			<div className='flex-col-global gap-[1rem]'>
				<TopSectionBlogPostsAndSection addButton={t('Add Page')} path='AddPage' />
			
				<LegalPagesSection />
			</div>

			<PagesPagesTable isLoading={isLoading} pages={pages} />

			{xs && (
				<div className='flex-col-global'>
					<PagesTableMobile data={data} />
					<AddButtonMobile path='AddPage' />
				</div>
			)}
		</div>
	);
}
