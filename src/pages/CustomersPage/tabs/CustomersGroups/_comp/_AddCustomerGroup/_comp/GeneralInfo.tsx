import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { Textarea } from 'src/app/components/ui/textarea';
import { AddCustomerGroupPageSchemaValues } from '../_schema/AddCustomerGroupSchema';
import { useEffect } from 'react';

export default function GeneralInfoCustomerGroupInfo({
	formStore,
}: {
	formStore: UseFormReturn<AddCustomerGroupPageSchemaValues>;
}) {
	//  hooks
	const { t } = useTranslation();

	useEffect(() => {
		formStore.watch('status') ? formStore.setValue('status', 1) : formStore.setValue('status', 0);
	}, [formStore.watch('status')]);
	return (
		<div className='global-cards gap-[1.2rem]'>
			<h2 className='title'>{t('General Info')}</h2>
			<div className='flex-col-global gap-[1rem]'>
				<FormField
					formStore={formStore}
					name='name'
					label={t('Group Name')}
					render={(field) => <Input {...field} placeholder={''} />}
				/>
				<FormField
					formStore={formStore}
					name='description'
					label={t('Description')}
					render={(field) => <Textarea {...field} placeholder={''} />}
				/>

				<div className='flex gap-[.2rem] items-end'>
					<FormSwitchField<AddCustomerGroupPageSchemaValues>
						formStore={formStore}
						name='status'
						fieldLabel={t('Active?')}
						enable
					/>
					<p className='text-title text-sm font-normal  '>
						{formStore.watch('status') ? 'on' : 'off'}
					</p>
				</div>
			</div>
		</div>
	);
}
