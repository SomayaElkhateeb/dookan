import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { Textarea } from 'src/app/components/ui/textarea';
import { preferncesInterface } from '../_hook/HookForPreferncePageForm';

export default function MaintainanceSection({
	formStore,
}: {
	formStore: UseFormReturn<preferncesInterface>;
}) {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='global-cards flex-col-global'>
			<div className='flex-col-global gap-[.25rem]'>
				<h3 className='title'>{t('Maintenance Mode Status')}</h3>
				<p className='subtitle text-sm'>
					{t(
						'Prevents customers from browsing your store. They will see a maintenance message. If logged in as admin, you will see the store as normal.',
					)}
				</p>
			</div>

			<FormSwitchField<preferncesInterface> formStore={formStore} name='maintainanceEnable' />
			<TabbedFormField
				formStore={formStore}
				keys={[
					{ name: 'maintainanceMessageEn', label: 'En' },
					{ name: 'maintainanceMessageAr', label: 'عربي' },
				]}
				label={t('Message')}
				renderer={(field) => <Textarea {...field} placeholder={'message'} />}
			/>
		</div>
	);
}
