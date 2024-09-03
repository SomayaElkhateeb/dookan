import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Textarea } from 'src/app/components/ui/textarea';
import { QueriesInterface } from './_hook/HookForQueriesSettings';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
export default function QueriesSectionForm({
	formStore,
}: {
	formStore: UseFormReturn<QueriesInterface>;
}) {
	// hooks
	const { t } = useTranslation();

	return (
		<div className='global-cards gap-[1.3rem]'>
			<div className='flex-col-global  gap-[.85rem]'>
				<div className='flex-col-global  gap-[.35rem]'>
					<h2 className='title'>{t('Targeting customer to review')}</h2>
					<p className='subtitle'>
						{t('You can send an email for customers who purchased from you to review')}
					</p>
				</div>

				<div className='flex-row-global gap-2'>
					<p>{t('Enabled')}</p>
					<FormSwitchField<QueriesInterface>
						formStore={formStore}
						name='queries.automate_replies.enabled'
						enable
					/>
				</div>
			</div>

			<FormField
				formStore={formStore}
				name='queries.automate_replies.reply_description'
				label={t('Reply description')}
				render={(field) => <Textarea {...field} placeholder={t('reply')} />}
			/>
		</div>
	);
}
