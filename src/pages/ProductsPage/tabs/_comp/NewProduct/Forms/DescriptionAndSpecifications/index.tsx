import { Card, CardContent } from 'src/app/components/ui/card';
import TabsBuilder from 'src/app/components/shared/builders/Tabs.jsx';
import { useTranslation } from 'react-i18next';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { Textarea } from 'src/app/components/ui/textarea';
import AddSpecificationManager from './_comp/AddSpecificationManager';
import SpecificationsList from './_comp/SpecificationsList';
import { Props } from './types';

// /**
//  * @template TFormStore
//  *
//  * @type {import('src/app/components/shared/builders/Tabs.jsx').TabsBuilderItem<import('./types.ts').Props<TFormStore>>[]}
//  */
// const tabsItems = [
// 	{
// 		title: 'Description',
// 		Elem: (props) => {
// 			const { t } = useTranslation();
// 			return (
// 				<TabbedFormField
// 					formStore={props.formStore}
// 					keys={[
// 						// @ts-ignore
// 						{ name: 'descriptionEn', label: 'En' },
// 						{ name: 'descriptionAr', label: 'عربي' },
// 					]}
// 					label={t('Description')}
// 					renderer={(field) => <Textarea {...field} />}
// 				/>
// 			);
// 		},
// 	},
// 	{
// 		title: 'Specifications',
// 		Elem: (props) => {
// 			return (
// 				<div className='flex flex-col gap-4'>
// 					<SpecificationsList formStore={props.formStore} />
// 					<AddSpecificationManager
// 						handleSubmit={(values) => {
// 							props.formStore.setValue('specifications', [
// 								...props.formStore.getValues('specifications'),
// 								values.specification,
// 							]);
// 						}}
// 					/>
// 				</div>
// 			);
// 		},
// 		isInProgress: true,
// 	},
// ];

// /**
//  * @template TFormStore
//  *
//  * @param {import('./types.ts').Props<TFormStore>} props
//  */
export default function ProductFormDescriptionAndSpecificationsSection<TFormStore>(
	props: Props<TFormStore>,
) {
	const { t } = useTranslation();
	return (
		<section id={props.id} className='global-cards'>
			<p className='title'>{t('Description')}</p>
			<TabbedFormField
			label={t('Description')}
				formStore={props.formStore}
				keys={[
					{ name: 'descriptionEn', label: 'En' },
					{ name: 'descriptionAr', label: 'عربي' },
				]}
				renderer={(field) => <Textarea {...field} />}
			/>
		</section>
	);
}
{
	/* <TabsBuilder items={tabsItems} sharedProps={{ formStore: props.formStore }} /> */
}
