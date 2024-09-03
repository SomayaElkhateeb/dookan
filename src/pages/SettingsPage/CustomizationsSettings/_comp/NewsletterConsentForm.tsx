import { useTranslation } from 'react-i18next';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect } from 'react';
import useCustomHookDoubleOpt, { DoubleOpt } from '../_hook/HookNewsletterConsent';
import { postCustomizationDoubleOpt } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';

export default function NewsletterConsentForm({ onSubmit }:{onSubmit: (data: DoubleOpt) => void}) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	// custom hook
	const {handelDefaultValue, DoubleOptSchema} = useCustomHookDoubleOpt();

	const handleSubmit = (values: DoubleOpt) => {
		dispatch(postCustomizationDoubleOpt(values)).then((promiseResponse) => {
			if (promiseResponse.payload.code === 200) {
				navigate(-1);
			}
		});
		onSubmit(values);
	};
	const { formStore } = useForm({
		schema: DoubleOptSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useEffect(() => {
		formStore.setValue(
			'customizations.double_opt.preselect_option_for_customers',
			formStore.watch('customizations.double_opt.preselect_option_for_customers') ? 1 : 0,
		);
	}, [formStore.watch('customizations.double_opt.preselect_option_for_customers')]);

	useEffect(() => {
		formStore.setValue(
			'customizations.double_opt.show_email_newsletter_in_footer',
			formStore.watch('customizations.double_opt.show_email_newsletter_in_footer') ? 1 : 0,
		);
	}, [formStore.watch('customizations.double_opt.show_email_newsletter_in_footer')]);
	
	return (
		<div className='global-cards grid sm:grid-cols-2 grid-cols-1'>
			<div className='col-span-2 flex-col-global  gap-[.3rem]'>
				<h2 className='title '>{t('Double opt-in')}</h2>
				<p className='paragraph'>
					{t('Ask for customers consent for receiving email or SMS newsletter')}
				</p>
			</div>

			<FormChoiceChips<DoubleOpt>
				formStore={formStore}
				name='customizations.double_opt.require_customers_confirm_subscription'
				label='Require customers to confirm their'
				options={['email_sms', 'email_only', 'sms_only']}
			/>

			<FormChoiceChips<DoubleOpt>
				formStore={formStore}
				name='customizations.double_opt.show_option_at'
				label='Show an option to subscribe at'
				options={['registration', 'checkout', 'never_show']}
			/>
			<div className='col-span-1'>
				<FormField
					formStore={formStore}
					name='customizations.double_opt.text_label'
					label={t('Text label')}
					render={(field) => (
						<Input
							required
							{...field}
							placeholder={t('Keep me up to date on news and exclusive offers')}
						/>
					)}
				/>
			</div>
			<FormSwitchField<DoubleOpt>
				formStore={formStore}
				name='customizations.double_opt.preselect_option_for_customers'
				label='Preselect the option for customers'
			/>
			<FormSwitchField<DoubleOpt>
				formStore={formStore}
				name='customizations.double_opt.show_email_newsletter_in_footer'
				label='Show email newsletter input in footer'
			/>
		</div>
	);
}
