import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';

import StoreDetails from './_comp/StoreDetails';
import GeneralSettingsMedia from './_comp/GeneralSettingsMedia';
import SocialContacts from './_comp/SocialContacts';
import LegalDetails from './_comp/LegalDetails';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useNavigate } from 'react-router-dom';
import { postGeneralSettingsStore } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';
import useCustomHookGeneralForm, { GeneralSettingsInterface } from './_hook/HookForGeneralForm';
import { useForm } from 'src/app/utils/hooks/form';

const GeneralSettings = () => {
	// hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	// custom hook
	const { generalSettingsSchema, handelDefaultValue } = useCustomHookGeneralForm();

	// redux
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	const handleSubmit = (values: GeneralSettingsInterface) => {
		dispatch(postGeneralSettingsStore(values)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};
	const { formStore, onSubmit } = useForm({
		schema: generalSettingsSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global '>
				<SubHeader title={t('General settings')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate} />
				</SubHeader>

				<div className='custom-grid-parent custom_container'>
					<div className='grid-left'>
						<div className='flex-col-global '>
							<StoreDetails formStore={formStore} />
							<GeneralSettingsMedia formStore={formStore} />
							<SocialContacts formStore={formStore} />
							<LegalDetails formStore={formStore} />

							<SubHeaderMobileBtns onSubmit={onSubmit} />
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default GeneralSettings;
