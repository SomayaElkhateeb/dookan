import { useTranslation } from 'react-i18next';
import { Accordion } from 'src/app/components/ui/accordion';
import CustomAccordionItem from 'src/app/components/ui/accordion/custom-item';
import { useFieldArray } from 'react-hook-form';
import { TrashIcon } from 'lucide-react';
import { Input } from 'src/app/components/ui/input';
import Textarea from 'src/app/components/optimized/InputsFields/Textarea';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';

/**
 * @template TFormStore
 *
 * @param {import('../types').Props<TFormStore>} props
 */
function QuestionList(props) {
	const { t } = useTranslation();
	const { fields, remove } = useFieldArray({
		control: props.formStore.control,
		name: 'faqs',
	});

	return (
		<Accordion type='multiple' defaultValue={[fields[0]?.tempId]} className='flex flex-col gap-4'>
			{fields.map((item, index) => (
				<CustomAccordionItem
					start={{ trigger: item.questionEn }}
					end={{
						before: (
							<button
								type='button'
								onClick={() => {
									remove(index);
								}}
							>
								<TrashIcon />
							</button>
						),
					}}
					key={item.tempId}
					value={item.tempId}
				>
					<div className='flex flex-col gap-4 md:w-1/2'>
						<TabbedFormField
							formStore={props.formStore}
							container={{ className: 'flex-grow' }}
							keys={[
								{ name: `faqs.${index}.questionEn`, label: 'En' },
								{ name: `faqs.${index}.questionAr`, label: 'عربي' },
							]}
							label={t('Question')}
							renderer={(field) => <Input {...field} />}
						/>
						<TabbedFormField
							formStore={props.formStore}
							container={{ className: 'flex-grow' }}
							keys={[
								{ name: `faqs.${index}.answerEn`, label: 'En' },
								{ name: `faqs.${index}.answerAr`, label: 'عربي' },
							]}
							label={t('Answer')}
							renderer={(field) => <Textarea {...field} />}
						/>
					</div>
				</CustomAccordionItem>
			))}
		</Accordion>
	);
}
export default QuestionList;
