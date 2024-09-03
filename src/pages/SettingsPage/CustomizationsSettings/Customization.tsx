import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TfiUpload } from 'react-icons/tfi';
import { Button } from 'src/app/components/optimized';
import FileInput, { getDefaultFileInputOptions } from 'src/app/components/ui/file-input';
import FormField from 'src/app/components/ui/form/field';
import { Switch } from 'src/app/components/ui/switch';
import { useForm } from 'src/app/utils/hooks/form';
import { EditIcon } from 'src/app/utils/icons';

import { Input } from 'src/app/components/ui/input';
import { Form } from 'src/app/components/ui/form';
import { fileClassName } from '../GeneralSettings/_comp/GeneralSettingsMedia';
import useCustomCustomizeForm, { customizationInterface } from '../Customizations/HookCustomization';

export default function Customization() {
	//  hooks
	const { t } = useTranslation();
	// custom hook
	const { handelDefaultValue, customizationSchema } = useCustomCustomizeForm();
	const handleSubmit = (values: customizationInterface) => {
		console.log(values);
	};

	const { formStore, onSubmit } = useForm({
		schema: customizationSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='global-cards lg:col-span-2'>
				<div className='flex-col-global gap-0'>
					<h2 className='title'>{t('Customization')}</h2>
					<p className='subtitle'>{t("Customize what's shown in the email")}</p>
				</div>
				<div className='flex-col-global '>
					<div className='flexResponsive'>
						<p>{t('Attach invoice in email')}</p>
						<div className='flex items-center gap-2'>
							<Switch />
							<span className='text-title text-sm'>Disabled</span>
						</div>
					</div>

					<RowCustomize
						submit={onSubmit}
						title={t("Sender's name")}
						subtitle={`${t('Email shown by default')}: Notifications@dookan.net`}
					>
						<FormField
							formStore={formStore}
							label={t('Email')}
							name='email'
							render={(field) => <Input {...field} placeholder='' />}
						/>
					</RowCustomize>

					<RowCustomize
						submit={onSubmit}
						title={t('Email logo')}
						subtitle={t('Logo shown by default is the store logo')}
					>
						<FormField
							formStore={formStore}
							name='image'
							render={({ onChange, value, ...field }) => (
								<FileInput
									className={fileClassName}
									{...field}
									options={{
										accept: { 'image/*': [] },
										setError: (error) => {
											formStore.setError('image', { message: error.message });
										},
										onFileLoad: (params) => {
											onChange(params.file);
										},
									}}
								>
									<TfiUpload className='text-[1.5rem]' />
									<p>{t('Upload Image')}</p>
								</FileInput>
							)}
						/>
					</RowCustomize>
				</div>
			</form>
		</Form>
	);
}

function RowCustomize({
	children,
	title,
	subtitle,
	submit,
}: {
	children: JSX.Element;
	title: string;
	subtitle: string;
}) {
	const { t } = useTranslation();
	const [isEdit, setIsEdit] = useState(false);
	return (
		<div className='flex-col-global'>
			<hr />
			<div className='flexResponsive'>
				<div>
					<h3 className='title text-sm'>{title}</h3>
					<p className='subtitle text-[.7rem]'>{subtitle}</p>
				</div>

				{isEdit ? (
					''
				) : (
					<div>
						<Button LeftIcon={EditIcon} variant='tertiary' onClick={() => setIsEdit(true)}>
							{t('edit')}
						</Button>
					</div>
				)}
			</div>

			{isEdit && children}
			{isEdit && (
				<div className='flex items-center gap-4'>
					<Button variant='primary' onClick={submit}>
						{t('Save')}
					</Button>
					<Button variant='tertiary' onClick={() => setIsEdit(false)}>
						{t('Discard')}
					</Button>
				</div>
			)}
		</div>
	);
}
