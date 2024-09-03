import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';

import { Form } from 'src/app/components/ui/form';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { Input } from 'src/app/components/ui/input';
import { Textarea } from 'src/app/components/ui/textarea';
import { useForm } from 'src/app/utils/hooks/form';
import useCustomHookCustomNotificationForm, {
	addCustomNotificationInterface,
} from './HookForCustomNotificationForm';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
export default function CustomizeNotificationForm() {
	//  hooks
	const { t } = useTranslation();

	const handleSubmit = (values: addCustomNotificationInterface) => {
		console.log(values);
		// handelclose();
	};

	// custom hook
	const { CustomNotifcationSchema, handelDefaultValue } = useCustomHookCustomNotificationForm();

	const { formStore, onSubmit } = useForm({
		schema: CustomNotifcationSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	const data = [
		{
			id: 1,
			title: t('Enabled'),
		},
	];

	// get header from localstorage

	let title = '';
	if (typeof window !== 'undefined') {
		title = localStorage.getItem('notificationTitle');
	}
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={title}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} />
				</SubHeader>
				<div className='grid gap-5 lg:grid-cols-3 custom_container'>
					<div className=' lg:col-span-2'>
						{/*  form  */}
						<div className='global-cards'>
							<h3 className='title'>{t('Main info')}</h3>
							<div className='flex-col-global md:w-[60%]'>
								<TabbedFormField
									formStore={formStore}
									keys={[
										{ name: 'emailEn', label: 'En' },
										{ name: 'emailAr', label: 'عربي' },
									]}
									label={t('Email subject')}
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
						</div>
					</div>
					<div className='col-span-1'>
						<QuickActions data={data} />
					</div>
				</div>
				<SubHeaderMobileBtns onSubmit={onSubmit} />
			</form>
		</Form>
	);
}
