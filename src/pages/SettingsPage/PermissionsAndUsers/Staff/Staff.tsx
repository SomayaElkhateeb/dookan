import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { addStaffInterface } from './HookForAddStaff';
import { useQuery } from 'react-query';
import { RolesApi } from 'src/app/React-Query/RolesApi';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { RolesList } from 'src/app/interface/settingsInterface/rolesSettingsInterface';
import { Button } from 'src/app/components/optimized';
import { AddFillIcon } from 'src/app/utils/icons';
import useResponsive from 'src/app/utils/hooks/useResponsive';

export default function Staff({ formStore }: { formStore: UseFormReturn<addStaffInterface> }) {
	//  hooks
	const { t } = useTranslation();
	const { xs } = useResponsive();


	//  get Roles data  with api request
	const { data } = useQuery(['PermissionsData'], () =>
		RolesApi.roles(),
	);

	let PermissionsData = data?.data?.data;
	console.log('PermissionsData', PermissionsData);

	return (
		<div className='cardDetails-sharedClass p-5 '>
			<div className='flex-col-global w-full'>
			<h3 className='title'>{t('Basic Info')}</h3>

				<div className={`w-full ${xs ? 'flex-col-global' : 'flex gap-4' }`}>
					<div className='flex-grow'>

						<FormField
							formStore={formStore}
							name='name'
							label={t('Name')}
							render={(field) => <Input {...field} />}
						/>
					</div>
					<div className='flex-grow'>
						<FormField
							formStore={formStore}
							name='email'
							label={t('Email')}
							render={(field) => <Input {...field} />}
						/>
					</div>
				</div>

				<div className={`${xs ?'flex-col-global items-start' : 'flex items-end'}`}>
					<div className={`${xs ? 'w-full' : 'flex-grow'}`}>
						<SelectFormField
							name='role_id'
							label={t('Role')}
							formStore={formStore}
							options={PermissionsData?.map((role: RolesList) => ({
								label: role?.name,
								value: role?.id?.toString(),
							}))}
							placeholder={t('Select role')}
						/>
					</div>
					<Button variant="tertiary" LeftIcon={AddFillIcon}>
						{t('add role')}
					</Button>
				</div>
			</div>
		</div>
	);
}
