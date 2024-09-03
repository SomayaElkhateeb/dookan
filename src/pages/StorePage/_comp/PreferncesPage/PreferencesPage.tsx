import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, SubHeader } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import RecaptchaEnable from './_comp/CaptchaEnable';
import useCustomHookPreferncePage, { preferncesInterface } from './_hook/HookForPreferncePageForm';
import MaintainanceSection from './_comp/MaintainanceSection';
import PasswordSection from './_comp/PasswordSection';
import SeoSearchSection from './_comp/SeoSearchSection';
import SocialSharingSection from './_comp/SocialSharingSection';

export default function PreferencesPage() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleSubmit = (values: preferncesInterface) => {
		console.log(values);
		// handelclose();
	};

	const { PrefernceSchema, handelDefaultValue } = useCustomHookPreferncePage();

	const { formStore, onSubmit } = useForm({
		schema: PrefernceSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form className='flex-col-global gap-[2rem]' onSubmit={onSubmit}>
				<SubHeader title={t('Store preferences')}>
					<Button variant='secondary' onClick={() => navigate(-1)}>
						{t('Discard')}
					</Button>
					<Button variant='primary' onClick={onSubmit}>
						{t('Save Changes')}
					</Button>
				</SubHeader>
				<div className='custom_container  grid gap-5 grid-cols-1'>
					<div className='flex-col-global lg:w-[75%] '>
						<SeoSearchSection formStore={formStore} />
						<SocialSharingSection formStore={formStore} />
						<RecaptchaEnable formStore={formStore} />
						<PasswordSection formStore={formStore} />
						<MaintainanceSection formStore={formStore} />
					</div>
				</div>
			</form>
		</Form>
	);
}
