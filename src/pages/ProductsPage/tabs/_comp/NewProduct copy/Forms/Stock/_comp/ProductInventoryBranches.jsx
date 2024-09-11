
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { Label } from 'src/app/components/ui/label';
import AddBranchManager from './AddBranchManager';


/**
 * @template TFormStore
 *
 * @param {import('../types').Props<TFormStore>} props
 */
export default function ProductInventoryBranches(props) {
	const { t } = useTranslation();
	const { fields, append, remove, prepend } = useFieldArray({
		control: props.formStore.control,
		name: 'branches',
	});

	return (
		<>
			<Label className='font-semibold capitalize'>{t('Inventory branches')}</Label>

			<table>
				<thead>
					<tr className='text-left rtl:text-right'>
						<th className='py-2 font-medium w-10/12'>{t('Branch Name')}</th>
						<th className='py-2 font-medium w-2/12'>{t('Quantity')}</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((field, index) => (
						<tr key={field.id} className='border-y'>
							<td className='w-10/12 py-2'>
								<FormField
									formStore={props.formStore}
									name={`branches.${index}.name`}
									render={(field) => (
										<Input
											{...field}
											value={field.value + ''}
											className='border-0'
											placeholder={t('Branch Name')}
										/>
									)}
								/>
							</td>
							<td className='w-2/12 py-2'>
								<FormField
									formStore={props.formStore}
									name={`branches.${index}.quantity`}
									render={(field) => (
										<Input
											{...field}
											value={
												typeof field.value === 'number' || typeof field.value === 'string'
													? field.value
													: 0
											}
											type='number'
										/>
									)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<AddBranchManager formStore={props.formStore} />
		</>
	);
}