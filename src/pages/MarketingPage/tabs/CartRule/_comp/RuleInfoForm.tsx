import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CartRuleInterface } from '../_hook/HookCartRuleForm';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { Textarea } from 'src/app/components/ui/textarea';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

export default function RuleInfoForm({
	formStore,
}: {
	formStore: UseFormReturn<CartRuleInterface>;
}) {
	const { t } = useTranslation();

	const customerGroupsOptions = [
		{ value: '100', label: t('Guest') },
		{ value: '101', label: t('General') },
		{ value: '102', label: t('Wholesale') },
	];

	return (
		<div className='global-cards'>
			<h3 className='title'>{t('Rule Info')}</h3>
			<FormField
				formStore={formStore}
				name='name'
				label={t('Group Name')}
				render={(field) => <Input {...field} />}
			/>
			<FormField
				formStore={formStore}
				name='description'
				label={t('Description')}
				render={(field) => <Textarea {...field} />}
			/>
			<FormSwitchField<CartRuleInterface>
				formStore={formStore}
				label={t('Status')}
				name='status'
				enable
			/>
			<SelectFormField
				name='customer_groups'
				label={t('Customer Group')}
				formStore={formStore}
				options={customerGroupsOptions}
			/>
		</div>
	);
}
