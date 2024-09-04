import { CartRuleInterface } from '../_hook/HookCartRuleForm';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
export default function ActionsForm({
	formStore,
}: {
	formStore: UseFormReturn<CartRuleInterface>;
}) {
	const { t } = useTranslation();

	const options = [
		{ value: 'by_percent', label: t('Percentage of Product Price') },
		{ value: 'by_fixed', label: t('Fixed Amount') },
		{ value: 'cart_fixed', label: t('Fixed Amount to Whole Cart') },
		{ value: 'buy_x_get_y', label: t('Buy X Get Y Free') },
	];

	return (
		<div className='global-cards'>
			<h3 className='title'>{t('Actions')}</h3>
			<SelectFormField
				name='action_type'
				label={t('Action Type')}
				formStore={formStore}
				options={options}
				placeholder={t('Select type')}
			/>
			<FormField
				formStore={formStore}
				name='discount_amount'
				label={t('Discount Amount')}
				render={(field) => <Input {...field} />}
			/>
			<FormField
				formStore={formStore}
				name='discount_quantity'
				label={t('Discount Quantity')}
				render={(field) => <Input {...field} />}
			/>
			<FormField
				formStore={formStore}
				name='discount_step'
				label={t('Discount Step')}
				render={(field) => <Input {...field} />}
			/>
		</div>
	);
}
