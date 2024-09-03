import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TfiUpload } from 'react-icons/tfi';
import FileInput, { getDefaultFileInputOptions } from 'src/app/components/ui/file-input';
import FormField from 'src/app/components/ui/form/field';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { Input } from 'src/app/components/ui/input';
import { Textarea } from 'src/app/components/ui/textarea';
import { addPageInterface } from '../../../../BlogPosts/_hook/HookForAddBlogOrPageForm';
import { fileClassName } from 'src/pages/SettingsPage/GeneralSettings/_comp/GeneralSettingsMedia';

export default function MainInfoPage({
	formStore,
	addblog,
}: {
	formStore: UseFormReturn<addPageInterface>;
	addblog?: boolean;
}) {
	const { t } = useTranslation();

	return (
		<div className='global-cards'>
			<h3 className='title'>{t('Main info')}</h3>
			{addblog && (
				<FormField
					label={t('Blog image')}
					formStore={formStore}
					name='image'
					render={({ onChange, value, ...field }) => (
						<FileInput
							className={fileClassName}
							{...field}
							options={getDefaultFileInputOptions({
								accept: { 'image/*': [] },
								setError: (error) => {
									// console.log('error', error);
									formStore.setError('image', { message: error.message });
								},
								onFileLoad: (params) => {
									// console.log('params', params);
									onChange(params.file);
								},
							})}
						>
							<TfiUpload className='text-[1.5rem]' />
							<p>{t('UploadImage')}</p>
						</FileInput>
					)}
				/>
			)}
			<TabbedFormField
				formStore={formStore}
				keys={[
					{ name: 'titleEn', label: 'En' },
					{ name: 'titleAr', label: 'عربي' },
				]}
				label={t('Name')}
				renderer={(field) => <Input {...field} />}
			/>

			<TabbedFormField
				formStore={formStore}
				keys={[
					{ name: 'descriptionEn', label: 'En' },
					{ name: 'descriptionAr', label: 'عربي' },
				]}
				label={t('Description')}
				renderer={(field) => <Textarea {...field} />}
			/>
		</div>
	);
}
