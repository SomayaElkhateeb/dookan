import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Textarea } from 'src/app/components/ui/textarea';

import { Input } from 'src/app/components/ui/input';
import { preferncesInterface } from '../_hook/HookForPreferncePageForm';

export default function SeoSearchSection({
	formStore,
}: {
	formStore: UseFormReturn<preferncesInterface>;
}) {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='global-cards'>
			<div className='flex-col-global gap-[.25rem]'>
				<h3 className='title'>{t('SEO (Search engine listing preview)')}</h3>
				<p className='subtitle text-sm'>
					{t('Customize the way you want your customers to view your website in search engines')}
				</p>
			</div>
			<div className='flex-col-global'>
				<div className='global-cards gap-0 shadow-md'>
					<p className='text-blue'>Shop now with fan eltaalouq</p>
					<p className='text-xs text-green'>https://artisan.dookan.net/t-shirt</p>
					<p className='text-xs text-gray'>meta description tags</p>
				</div>
				<div className='flex-col-global lg:w-[60%]'>
					<FormField
						formStore={formStore}
						name='pageTitle'
						label={t('Page Title')}
						render={(field) => <Input {...field} />}
					/>

					<FormField
						formStore={formStore}
						name='metaDescription'
						label={t('Meta description tag')}
						render={(field) => <Textarea {...field} />}
					/>
				</div>
			</div>
		</div>
	);
}
