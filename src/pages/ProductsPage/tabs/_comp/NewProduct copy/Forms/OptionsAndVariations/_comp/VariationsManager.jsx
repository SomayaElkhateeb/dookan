import { TrashIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Accordion } from 'src/app/components/ui/accordion';
import CustomAccordionItem from 'src/app/components/ui/accordion/custom-item';
import FormField from 'src/app/components/ui/form/field';
import HorizontalBox from 'src/app/components/ui/horizontal-box';
import { Input } from 'src/app/components/ui/input';
/**
 * @template TFormStore
 *
 * @param {import('../types').Props<TFormStore>} props
 */
export default function VariationsManager(props) {
	const { t } = useTranslation();
	const { fields, remove } = useFieldArray({
		control: props.formStore.control,
		name: 'variations',
	});

	return (
		<div className='flex flex-col gap-4 bg-sky-300'>
			<Accordion type='multiple' className='flex flex-col gap-4'>
				{fields.map((option, index) => {
					const key = option.forOptionValuesTempIds.join('|');

					return (
						<CustomAccordionItem
							start={{ trigger: option.forOptionValuesNames }}
							end={{
								before: (
									<button type='button' onClick={() => remove(index)}>
										<TrashIcon />
									</button>
								),
							}}
							key={key}
							value={key}
						>
							<div className='flex flex-col gap-4'>
								<div className='flex flex-col gap-1'>
									<strong>{t('Stock')}</strong>
								</div>
								<div className='flex flex-col overflow-x-auto'>
									<div className='grid grid-cols-4 grid-col-4 items-end gap-8 pb-4'>
										<p>{t('Price')}</p>
										<p>
											{t('Discount price')} ({t('Optional')})
										</p>
										<p>{t('SKU')}</p>
										<p>{t('Quantity')}</p>
									</div>
									<div className='grid grid-cols-4 grid-col-4 items-end gap-8 pb-4'>
										<FormField
											formStore={props.formStore}
											container={{ className: 'flex-grow' }}
											name={`variations.${index}.price`}
											render={(field) => (
												<Input {...field} value={field.value ?? 0} type='number' />
											)}
										/>
										<FormField
											formStore={props.formStore}
											container={{ className: 'flex-grow' }}
											name={`variations.${index}.discountPrice`}
											render={(field) => (
												<Input {...field} value={field.value ?? 0} type='number' />
											)}
										/>
										<FormField
											formStore={props.formStore}
											container={{ className: 'flex-grow' }}
											name={`variations.${index}.sku`}
											render={(field) => <Input {...field} />}
										/>
										<FormField
											formStore={props.formStore}
											container={{ className: 'flex-grow' }}
											name={`variations.${index}.quantity`}
											render={(field) => (
												<HorizontalBox end={<>&infin;</>}>
													<Input {...field} />
												</HorizontalBox>
											)}
										/>
									</div>
								</div>
							</div>
						</CustomAccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
}