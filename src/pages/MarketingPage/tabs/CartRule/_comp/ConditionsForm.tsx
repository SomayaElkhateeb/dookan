import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { CartRuleInterface } from '../_hook/HookCartRuleForm';
import { UseFormReturn } from 'react-hook-form';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { Button } from 'src/app/components/optimized';
import { LiaTrashAlt } from 'react-icons/lia';
export default function ConditionsForm({
	formStore,
}: {
	formStore: UseFormReturn<CartRuleInterface>;
}) {
	const { t } = useTranslation();

	const comparisonTypes = [
		{ label: t('Is equal to'), value: '==' },
		{ label: t('Is not equal to'), value: '!=' },
		{ label: t('Equals or greater than'), value: '>=' },
		{ label: t('Equals or less than'), value: '<=' },
		{ label: t('Greater than'), value: '>' },
		{ label: t('Less than'), value: '<' },
	];

	const options = [
		{ value: '0', label: t('All Conditions are True') },
		{ value: '1', label: t('Any Condition is True') },
	];

	const conditionTypes = [
		{ label: t('Cart'), value: '0' },
		{ label: t('Base Subtotal'), value: '1' },
	];

	const attributeTypeOptions = [
		{ label: t('Price'), value: '0' },
		{ label: t('Free'), value: '1' },
	];
	const { fields, append, remove } = useFieldArray({
		control: formStore.control,
		name: 'conditions',
	});

	return (
		<div className='global-cards '>
			<h3 className='title'>{t('Conditions')}</h3>
			<SelectFormField
				name='condition_type'
				label={t('Condition Type')}
				formStore={formStore}
				options={options}
				placeholder={t('Select type')}
			/>
			{fields.map((field, index) => (
				<div key={field.id} className='flex gap-5 items-center'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3 flex-1'>
						<SelectFormField
							name={`conditions.${index}.attribute`}
							formStore={formStore}
							options={conditionTypes}
						/>
						{formStore.watch(`conditions.${index}.attribute`) !== '' && (
							<>
								<SelectFormField
									name={`conditions.${index}.operator`}
									formStore={formStore}
									options={comparisonTypes}
								/>
								<SelectFormField
									name={`conditions.${index}.attribute_type`}
									formStore={formStore}
									options={attributeTypeOptions}
								/>
								<FormField
									formStore={formStore}
									name={`conditions.${index}.value`}
									render={(field) => <Input type='number' {...field} />}
								/>
							</>
						)}
					</div>
					<button type='button' onClick={() => remove(index)}>
						<LiaTrashAlt size='28' className='fill-error' />
					</button>
				</div>
			))}
			<Button
				type='button'
				variant='primary'
				text={t('Add Condition')}
				onClick={() => append({ attribute: '', attribute_type: '', operator: '', value: 0 })}
				className='w-fit'
			/>
		</div>
	);
}
