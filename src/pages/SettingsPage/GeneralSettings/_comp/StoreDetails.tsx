import { Input } from 'src/app/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';

import 'react-phone-input-2/lib/material.css';
import CustomPhoneInput from 'src/app/components/optimized/UiKits/CustomPhoneInput';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/app/components/ui/select';
import { GeneralSettingsInterface } from '../_hook/HookForGeneralForm';

const StoreDetails = ({ formStore }: { formStore: UseFormReturn<GeneralSettingsInterface> }) => {
	//  hooks
	const { t } = useTranslation();

	return (
		<section className='global-cards'>
			<div className='md:w-[70%] flex-col-global '>
				<h3 className='title'>{t('Store details')}</h3>
				<div className='flex-col-global gap-[1rem]'>
					<FormField
						formStore={formStore}
						name='general.settings.store.name'
						label={t('Store name')}
						render={(field) => <Input {...field} placeholder={'Sary'} />}
					/>
					<FormField
						formStore={formStore}
						name='general.settings.store.email'
						label={t('Store contact email')}
						render={(field) => <Input {...field} placeholder={'Sary@gmail.com'} />}
					/>
					<FormField
						formStore={formStore}
						name='general.settings.store.industry'
						label={t('Store industry')}
						render={(field) => (
							<div className='flex-col-global gap-[.2rem]'>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									required={field.required}
									name={field.name}
								>
									<SelectTrigger onBlur={field.onBlur} disabled={field.disabled} id={field.id}>
										<SelectValue placeholder='Design' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='design'>Design</SelectItem>
										<SelectItem value='theme'>Theme</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}
					/>
					<FormField
						formStore={formStore}
						name='general.settings.store.phone'
						label={t('Store contact phone')}
						render={(field) => (
							<CustomPhoneInput value={field.value} onHandleChange={field.onChange} />
						)}
					/>

					<FormField
						formStore={formStore}
						name='someke.key'
						label={t('Key')}
						render={(field) => <Input {...field} placeholder={'Value'} />}
					/>
				</div>
			</div>
		</section>
	);
};

export default StoreDetails;
