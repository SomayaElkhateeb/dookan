import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import useCustomHookReviewSettings, { ReviewInterface } from './_hook/HookForReviewSettings';
import ReviewSectionForm from './ReviewSection';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { postReview } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';
import { useEffect } from 'react';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { Path } from 'react-hook-form';

export default function ReviewsSetting() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	// redux
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	// custom hook
	const { reviewSchema, handelDefaultValue } = useCustomHookReviewSettings();

	const handleSubmit = (values: ReviewInterface) => {
		dispatch(postReview(values)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};

	const { formStore, onSubmit } = useForm({
		schema: reviewSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useEffect(() => {
		formStore.setValue(
			'reviews.quick_actions.enabled',
			formStore.watch('reviews.quick_actions.enabled') ? 1 : 0,
		);
	}, [formStore.watch('reviews.quick_actions.enabled')]);
	useEffect(() => {
		formStore.setValue(
			'reviews.quick_actions.auto_publish_review',
			formStore.watch('reviews.quick_actions.auto_publish_review') ? 1 : 0,
		);
	}, [formStore.watch('reviews.quick_actions.auto_publish_review')]);
	useEffect(() => {
		formStore.setValue(
			'reviews.quick_actions.notify_me_new_review',
			formStore.watch('reviews.quick_actions.notify_me_new_review') ? 1 : 0,
		);
	}, [formStore.watch('reviews.quick_actions.notify_me_new_review')]);
	useEffect(() => {
		formStore.setValue(
			'reviews.quick_actions.net_promoter_score',
			formStore.watch('reviews.quick_actions.net_promoter_score') ? 1 : 0,
		);
	}, [formStore.watch('reviews.quick_actions.net_promoter_score')]);

	const data: { name: Path<ReviewInterface>; label: string; enable: boolean }[] = [
		{
			name: 'reviews.quick_actions.enabled',
			label: t('Enabled'),
			enable: true,
		},
		{
			name: 'reviews.quick_actions.auto_publish_review',
			label: t('Auto publish reviews'),
			enable: true,
		},
		{
			name: 'reviews.quick_actions.notify_me_new_review',
			label: t('Notify me new reviews'),
			enable: true,
		},
		{
			name: 'reviews.quick_actions.net_promoter_score',
			label: t('Net promoter score'),
			enable: true,
		},
	];
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Reviews')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate} />
				</SubHeader>
				<div className='custom_container custom-grid-parent'>
					<div className=' grid-left'>
						<ReviewSectionForm formStore={formStore} />
					</div>
					{/* quick actions */}
					<QuickActions<ReviewInterface>
						formStore={formStore}
						data={data}
						title={t('Quick actions')}
					/>
				</div>
				<div className='px-5'>
					<SubHeaderMobileBtns onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
}
