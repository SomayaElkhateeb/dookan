import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import CardHeader from 'src/app/components/optimized/UiKits/CardHeader';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectItem,
} from 'src/app/components/ui/select';
import { Input } from 'src/app/components/ui/input';
import { PaymentFormProps } from '../_hook/useAddMerchantPaymentMethod';
import { CountriesApi } from 'src/app/React-Query/CountriesApi';
import { Payment_MethodsApi } from 'src/app/React-Query/Payment_System_method';
import { useQuery } from 'react-query';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { Payment_Method_System } from 'src/app/interface/settingsInterface/MerchantPaymentMethodsSettingsInterface';


export default function AccountDetailsForm({ formStore }: PaymentFormProps) {
	//  hooks
	const { t } = useTranslation();
	const banks = ['Riyadh', 'Al Ahly', 'Al-Rajhi', 'Al Enmaa', 'El Belad', 'SAB', 'ANB', 'QNB'];
	//  get payment method Data  with api request
	const { data } = useQuery([`paymentData`], () => Payment_MethodsApi.System());

	let Payment_System_Method_data = data?.data?.data;

	return (
		<div className='global-cards grid grid-cols-2'>
			<CardHeader
				title='Account details'
				className='col-span-2'
				description='Fill in your account details, for customers to pay through'
			/>
			<div className='grid gap-4 col-span-2 xl:col-span-1'>
				{Payment_System_Method_data?.length > 0 && (
					<SelectFormField
						name='payment_method_id'
						label={'System Payment Method'}
						formStore={formStore}
						options={Payment_System_Method_data?.map((e: Payment_Method_System) => {
							return {
								label: e?.method_title,
								value: e?.id?.toString(),
							};
						})}
						placeholder={t('Select payment method')}
					/>
				)}
				<FormField
					formStore={formStore}
					name='account_number'
					label={`${t('Account number')} (${t('Optional')}) `}
					render={(field) => <Input type='number' {...field} />}
				/>
				<FormField
					formStore={formStore}
					name='account_name'
					label={`${t('Account name')} (${t('Optional')})`}
					render={(field) => <Input {...field} placeholder={'Sary'} />}
				/>
				<FormField
					formStore={formStore}
					name='bank_name'
					label={`${t('Bank name')} (${t('Optional')})`}
					render={(field) => (
						<Select
							onValueChange={field.onChange}
							value={field.value}
							required={field.required}
							name={field.name}
						>
							<SelectTrigger onBlur={field.onBlur} disabled={field.disabled} id={field.id}>
								<SelectValue placeholder={t('Select option')} />
							</SelectTrigger>
							<SelectContent>
								{banks.map((bank, index) => (
									<SelectItem key={index} value={bank}>
										{bank}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				<FormField
					formStore={formStore}
					name='iban'
					label={`${t('IBAN')}  (${t('Optional')})`}
					render={(field) => <Input {...field} />}
				/>
				<FormField
					formStore={formStore}
					name='additional_data'
					label={t('Additional details & instructions')}
					render={(field) => <Input {...field} />}
				/>
			</div>
		</div>
	);
}
