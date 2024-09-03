import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import QueriesSectionForm from './QueriesSection';
import useCustomHookQueriesSettings, { QueriesInterface } from './_hook/HookForQueriesSettings';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useNavigate } from 'react-router-dom';
import { postQueries } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';
import { useEffect } from 'react';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { Path } from 'react-hook-form';
export default function QueriesSetting() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	//  custom hook
	const { queriesSchema, handelDefaultValue } = useCustomHookQueriesSettings();

	// redux
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	const handleSubmit = (values: QueriesInterface) => {
		console.log(values)
		dispatch(postQueries(values)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};

	const { formStore, onSubmit } = useForm({
		schema: queriesSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useEffect(() => {
		formStore.setValue('queries.automate_replies.enabled', formStore.watch('queries.automate_replies.enabled') ? 1 : 0);
	}, [formStore.watch('queries.automate_replies.enabled')]);

	useEffect(() => {
		formStore.setValue('queries.quick_actions.enabled', formStore.watch('queries.quick_actions.enabled') ? 1 : 0);
	}, [formStore.watch('queries.quick_actions.enabled')]);

	useEffect(() => {
		formStore.setValue('queries.quick_actions.notify_me_new_query', formStore.watch('queries.quick_actions.notify_me_new_query') ? 1 : 0);
	}, [formStore.watch('queries.quick_actions.notify_me_new_query')]);

	const data: { name: Path<QueriesInterface>; label: string; enable: boolean } = [
		{
			name: 'queries.quick_actions.enabled',
			label: t('Enabled'),
			enable: true,
		},
		{
			name: 'queries.quick_actions.notify_me_new_query',
			label: t('Notify me new queries'),
			enable: true,
		},
	];

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Queries')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate} />
				</SubHeader>
				<div className='custom_container custom-grid-parent'>
					<div className=' grid-left'>
						<QueriesSectionForm formStore={formStore} />
					</div>

					<div className='grid-right'>
						<QuickActions<QueriesInterface>
							formStore={formStore}
							data={data}
							title={t('Quick actions')}
						/>

					</div>
					<div className='px-5'>
						<SubHeaderMobileBtns onSubmit={onSubmit} />
					</div>
				</div>
			</form>
		</Form>
	);
}



