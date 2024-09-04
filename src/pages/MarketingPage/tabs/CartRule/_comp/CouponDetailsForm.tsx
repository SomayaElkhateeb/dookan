import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { CartRuleInterface } from '../_hook/HookCartRuleForm';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'src/app/components/optimized';

export default function CouponDetailsForm({
	formStore,
}: {
	formStore: UseFormReturn<CartRuleInterface>;
}) {
	const { t } = useTranslation();
	const useAutoGeneration = formStore.watch('use_auto_generation');
	const couponType = formStore.watch('coupon_type');
	console.log('useAutoGeneration', useAutoGeneration);

	const couponTypeOptions = [
		{ value: '0', label: t('No Coupon') },
		{ value: '1', label: t('Specific Coupon') },
	];

	console.log('useAutoGeneration ffffffff', useAutoGeneration);
	const handleDateChange = (field: keyof CartRuleInterface) => (date: Dayjs | null) => {
		const formattedDate = date ? date.format('YYYY-MM-DD HH:mm:ss') : null;
		formStore.setValue(field, formattedDate, { shouldValidate: true });
	};
	return (
		<div className='global-cards'>
			<h3 className='title'>{t('Coupon Details')}</h3>
			<SelectFormField
				name='coupon_type'
				label={t('Coupon Type')}
				formStore={formStore}
				options={couponTypeOptions}
			/>
			{couponType === '1' && (
				<FormSwitchField<CartRuleInterface>
					formStore={formStore}
					label={t('Use Auto Generation')}
					name='use_auto_generation'
					enable
				/>
			)}
			{couponType === '1' && useAutoGeneration === false && (
				<FormField
					formStore={formStore}
					name='coupon_code'
					label={t('Coupon Code')}
					render={(field) => <Input {...field} />}
				/>
			)}

			<FormField
				formStore={formStore}
				name='uses_per_coupon'
				label={t('Uses Per Coupon')}
				render={(field) => <Input {...field} type='number' />}
			/>
			<FormField
				formStore={formStore}
				name='usage_per_customer'
				label={t('Uses Per Customer')}
				description={t('Will be used for logged in customers only.')}
				render={(field) => <Input {...field} type='number' />}
			/>
			<DatePicker
				value={formStore.watch('starts_from') ? dayjs(formStore.watch('starts_from')) : null}
				label={t('Start Date')}
				handleOnChange={handleDateChange('starts_from')}
			/>
			<DatePicker
				value={formStore.watch('ends_till') ? dayjs(formStore.watch('ends_till')) : null}
				label={t('End Date')}
				handleOnChange={handleDateChange('ends_till')}
			/>
		</div>
	);
}
