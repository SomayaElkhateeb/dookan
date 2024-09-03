import { UseFormReturn } from 'react-hook-form';
import { addOwnerInterface } from './TransferOwnership';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { AddUserSchemaValues } from 'src/app/schema/settings/AddUserSchema';
//The selected role id is invalid.

export default function NewOwner({ formStore }: { formStore: UseFormReturn<addOwnerInterface> }) {
	const { t } = useTranslation();
	return (
		<div className='cardDetails-sharedClass p-5'>
			<div className='flex-col-global gap-4 md:w-[75%]'>
				<div>
					<h3 className='text-title font-semibold'>{t('New Owner')}</h3>
					<p className='text-subtitle text-sm pt-2'>{t("You'll lose your privleges")}</p>
				</div>

				<FormField
					formStore={formStore}
					name='name'
					label={t('Full name')}
					render={(field) => <Input {...field} />}
				/>

				<FormField
					formStore={formStore}
					name='email'
					label={t('Email address')}
					render={(field) => <Input {...field} />}
				/>

				<FormField
					formStore={formStore}
					name='password'
					label={t('Your password (for security)')}
					render={(field) => <Input {...field} />}
				/>

				<FormField
					formStore={formStore}
					name='password_confirmation'
					label={t('Password confirmation')}
					render={(field) => <Input {...field} />}
				/>

				<FormField
					formStore={formStore}
					name='role_id'
					label={t('Role id')}
					render={(field) => <Input {...field} />}
				/>
				<div className='flex-col-global gap-2'>
					<p>{t('Status')}</p>
					<div className='flex-row-global gap-2'>
						<FormSwitchField<AddUserSchemaValues>
							formStore={formStore}
							name='status'
							enable
						/>
						<p>{formStore.watch('status') ? 'On' : 'Off'}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
