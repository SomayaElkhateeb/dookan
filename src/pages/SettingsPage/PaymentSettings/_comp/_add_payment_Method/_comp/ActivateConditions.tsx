import { useTranslation } from 'react-i18next';
import CardHeader from 'src/app/components/optimized/UiKits/CardHeader';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import ApplyToOptionsBankTransfer from '../../../BankTransfer/ApplyToOptions';
import { AddPayment_MethodTypes, PaymentFormProps } from '../_hook/useAddMerchantPaymentMethod';

export default function ActivateConditions({ formStore }: PaymentFormProps) {
	//  hooks
	const { t } = useTranslation();
	return (
		<div className='global-cards grid lg:grid-cols-2 '>
			<CardHeader
				title='Activate if'
				className='col-span-2'
				description="you'll need this If you want this method to activate with certain conditions, otherwise keep defaults"
			/>
			<div className='  flex-col-global '>
				<FormField
					formStore={formStore}
					name='price_more_than'
					label={t('Price is more than')}
					render={(field) => <Input type='number' {...field} />}
				/>
				<FormField
					formStore={formStore}
					name='items_more_than'
					label={t('Order items are more than')}
					render={(field) => <Input type='number' {...field} />}
				/>

				{/* <FormChoiceChips<AddPayment_MethodTypes>
					formStore={formStore}
					name='main_method'
					label='Apply with'
					options={['All', 'Specific products', 'Specific customers']}
				/> */}

				{/* <ApplyToOptionsBankTransfer formStore={formStore} applyTo={formStore.watch('main_method')} /> */}
			</div>
		</div>
	);
}
