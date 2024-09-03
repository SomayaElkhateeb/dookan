import { useTranslation } from 'react-i18next';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'src/app/components/ui/card';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { Textarea } from 'src/app/components/ui/textarea';
import MetaKeywordsFormField from './_comp/MetaKeywordsFormField';
import SearchResultsPreview from './_comp/SearchResultsPreview';
import { Props } from './types';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';



export default function SeoFormFaqsSection<TFormStore>(props: Props<TFormStore>) {
	const { t } = useTranslation();

	return (
		<section className="global-cards" id={props.id}>

			<p className="title">{t('SEO (Search engine listing preview)')}</p>


			<section className='flex-col-global'>
				<SearchResultsPreview formStore={props.formStore} />
				<section className='flex-col-global md:w-[50%]'>
				<FormField
					formStore={props.formStore}
					name='page_title'
					label={t('Page Title')}
					render={(field) => <Input {...field} placeholder={t('e.g., T-Shirt')} />}
				/>
				<FormField
					formStore={props.formStore}
					name='meta_title'
					label={t('Meta Title')}
					render={(field) => <Input {...field} placeholder={t('e.g., T-Shirt')} />}
				/>
				{/* <FormField
						formStore={props.formStore}
						name='link'
						label={t('Link')}
						render={(field) => <Input {...field} placeholder={t('e.g., https://artisan.dookan.net/t-shirt')} type='url' />}
					/> */}
				{/* <MetaKeywordsFormField formStore={props.formStore} /> */}
				<TabbedFormField
					formStore={props.formStore}
					keys={[
						{ name: 'en.meta_keywords', label: 'En' },
						{ name: 'ar.meta_keywords', label: 'عربي' },
					]}
					label={t('Meta KeyWords')}
					renderer={(field) => <Input {...field} />}
				/>
				<FormField
					formStore={props.formStore}
					name='meta_description'
					label={t('Meta Description')}
					render={(field) => <Textarea {...field} placeholder={t('Short description')} />}
				/>
				</section>
			</section>
		</section>
	);
}
