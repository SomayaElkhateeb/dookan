import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'src/app/components/ui/input';
import Checkbox from '@mui/material/Checkbox';
import FormField from 'src/app/components/ui/form/field';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/app/components/ui/select';
import { IAddRate } from './AddRate';

export default function TextFields({
	formStore,
	saudi,
}: {
	formStore: UseFormReturn<IAddRate>;
	saudi?: boolean;
}) {
	const { t } = useTranslation();
	return (
		<div className='w-3/4 flex flex-col gap-4'>
			<TabbedFormField
				formStore={formStore}
				keys={[
					{ name: 'rateNameEn', label: 'En' },
					{ name: 'rateNameAr', label: 'عربي' },
				]}
				label={t('Rate name')}
				renderer={(field) => <Input {...field} placeholder={t('e.g., Free shipping')} />}
			/>
			<FormField
				formStore={formStore}
				name='shippingSpeed'
				label={t('Shipping speed')}
				render={(field) => (
					<div className='flex-col-global gap-[.2rem]'>
						<Select
							onValueChange={field.onChange}
							value={field.value}
							required={field.required}
							name={field.name}
						>
							<SelectTrigger onBlur={field.onBlur} disabled={field.disabled} id={field.id}>
								<SelectValue placeholder='Select option' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='design'>Design</SelectItem>
								<SelectItem value='theme'>Theme</SelectItem>
							</SelectContent>
						</Select>
					</div>
				)}
			/>

			{saudi && (
				<FormField
					formStore={formStore}
					name='supportedCities'
					label={t('Supported Cities')}
					render={(field) => (
						<div className='flex-col-global gap-[.2rem]'>
							<Select
								onValueChange={field.onChange}
								value={field.value}
								required={field.required}
								name={field.name}
							>
								<SelectTrigger onBlur={field.onBlur} disabled={field.disabled} id={field.id}>
									<SelectValue placeholder='Select option' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='design'>{t('Riyadh')}</SelectItem>
									<SelectItem value='theme'>{t('Geddah')}</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				/>
			)}
			<FormField
				formStore={formStore}
				name='shippingPrice'
				label={t('Shipping Price')}
				render={(field) => <Input {...field} placeholder={'SAR'} />}
			/>

			<div>
				<Checkbox />
				<span className='text-sm text-title'>{t('Add conditions')}</span>
			</div>
		</div>
	);
}
