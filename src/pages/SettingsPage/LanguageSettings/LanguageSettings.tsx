import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';

import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import useCustomHookLanguageSettings, { languageSettingsInterface } from './HookForLanguageSettings';
// import AdminOrLanguageDefaults from '../GeneralSettings/AdminOrLanguageDefaults';
import DefaultLanguageSection from './DefaultLanguage';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { postFrontDefaults } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';
import { useNavigate } from 'react-router-dom';

const LanguageSettings = () => {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	// redux
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	// custom hook
	const { languageSettingsSchema, handelDefaultValue } = useCustomHookLanguageSettings();

	const handleSubmit = (values: languageSettingsInterface) => {
		console.log(values);
		dispatch(postFrontDefaults(values)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};


	const { formStore, onSubmit } = useForm({
		schema: languageSettingsSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Languages & defaults')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate}/>
				</SubHeader>
				<div className='custom-grid-parent custom_container'>
					<div className='flex-col-global  grid-left'>
						<DefaultLanguageSection formStore={formStore} />
						{/* <AdminOrLanguageDefaults
							// language
							title={t('Store defaults (shown to cutomers)')}
							formStore={formStore}
						/> */}
						<SubHeaderMobileBtns onSubmit={onSubmit} />
					</div>
					<div className='grid-right' />
				</div>
			</form>
		</Form>
	);
};

export default LanguageSettings;
