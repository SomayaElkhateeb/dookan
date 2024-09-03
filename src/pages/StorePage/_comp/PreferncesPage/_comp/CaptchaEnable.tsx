import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { preferncesInterface } from '../_hook/HookForPreferncePageForm';

export default function RecaptchaEnable({
	formStore,
}: {
	formStore: UseFormReturn<preferncesInterface>;
}) {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='global-cards'>
			<div className='flex-col-global gap-[.25rem]'>
				<h3 className='title'>{t('Spam protection')}</h3>
				<p className='subtitle text-sm'>{t('Protect your store from people abusing it')}</p>
			</div>

			{/* <div className='flex md:flex-row items-center  justify-between'>
				<div className='flex-col-global gap-[.25rem]'>
					<h3 className='title'>{t('Enable Google reCAPTCHA')}</h3>
					<p className='subtitle text-sm'>{t('on login, create account and password recovery pages and other pages')}</p>
				</div>
				<FormField
					formStore={formStore}
					name='captchaEnable'
					render={(field) => (
						<div className='flex gap-2 items center'>
							<Switch checked={field.value} onCheckedChange={field.onChange} />{' '}
							<p className='text-title text-sm font-normal mt-[.1rem] '>{t('Enabled')}</p>
						</div>
					)}
				/>
			</div> */}
			<FormSwitchField<preferncesInterface>
				formStore={formStore}
				name='captchaEnable'
				label={t('Enable Google reCAPTCHA')}
				description={t('on login, create account and password recovery pages and other pages')}
			/>
		</div>
	);
}
