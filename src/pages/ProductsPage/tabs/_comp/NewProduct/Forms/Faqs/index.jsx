import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/app/components/ui/card';
import QuestionList from './_comp/QuestionList';
import AddQuestionManager from './_comp/AddQuestionManager';

/**
 * @template TFormStore
 *
 * @param {import('./types').Props<TFormStore>} props
 */
function ProductFormFaqsSection(props) {
	const { t } = useTranslation();

	return (
		<Card id={props.id}>
			<CardHeader>
				<CardTitle>{t('FAQs')}</CardTitle>
				<CardDescription className='text-gray-400'>
					{t('Answer questions people frequently ask about your product')}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<QuestionList formStore={props.formStore} />
				<AddQuestionManager
					handleSubmit={(values) => {
						props.formStore.setValue('faqs', [...props.formStore.getValues('faqs'), values.faq]);
					}}
				/>
			</CardContent>
		</Card>
	);
}


export default ProductFormFaqsSection;
