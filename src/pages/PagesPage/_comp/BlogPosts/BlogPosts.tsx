import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import TopSectionBlogPostsAndSection from './_comp/TopSectionBlogPostsAndPagesSection';
import BlogPostsTable from './_comp/BlogPostsTable';
import { getBlogTable } from 'src/app/store/slices/pagesPage/blog/blogTableAsyncThunks';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';

export default function BlogPosts() {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();

	// redux
	const dispatch = useAppDispatch();
	const { blog, isLoading, error } = useAppSelector((state) => state.blog);

	useEffect(() => {
		dispatch(getBlogTable());
	}, [dispatch]);

	if (error) return <div>Error: {error}</div>;

	return (
		<div className='flex-col-global'>
			<TopSectionBlogPostsAndSection addButton={t('Add post')} path='AddBlog' />

			<BlogPostsTable blog={blog} isLoading={isLoading} />

			{xs && <AddButtonMobile path='AddBlog' />}
		</div>
	);
}
