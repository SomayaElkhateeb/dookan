import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TfiUpload } from 'react-icons/tfi';
import FileInput, { getDefaultFileInputOptions } from 'src/app/components/ui/file-input';
import FormField from 'src/app/components/ui/form/field';
import { generalSettingsInterface } from './HookForGeneralForm';
export const fileClassName =
	'flex flex-col items-center justify-center gap-2 size-32 cursor-pointer';
const Media = ({ formStore }: { formStore: UseFormReturn<generalSettingsInterface> }) => {
	const { t } = useTranslation();

	return (
		<section className='global-cards md:w-[70%] '>
			<h3 className='title'>{t('Media')}</h3>
			<div className='flex-col-global gap-[1rem]'>
				<FormField
					label={t('Logo')}
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

				<FormField
					label={t('Icon')}
					formStore={formStore}
					name='icon'
					render={({ onChange, value, ...field }) => (
						<FileInput
							className={fileClassName}
							{...field}
							options={getDefaultFileInputOptions({
								accept: { 'image/*': [] },
								setError: (error) => {
									// console.log('error', error);
									formStore.setError('icon', { message: error.message });
								},
								onFileLoad: (params) => {
									// console.log('params', params);
									onChange(params.file);
								},
							})}
						>
							<TfiUpload className='text-[1.5rem]' />
							<p>{t('Upload Icon')}</p>
						</FileInput>
					)}
				/>
			</div>
		</section>
	);
};

export default Media;
