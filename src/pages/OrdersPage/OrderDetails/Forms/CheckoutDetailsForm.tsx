import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'src/app/utils/hooks/form';
import { Form } from 'src/app/components/ui/form';
import { Button } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import useCustomCheckOutForm, { checkOutDetailsInterface } from './HookCheckoutDetailsForm';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from 'src/app/components/ui/select';

export default function CheckoutDetailsForm({
	handleChckOutFormForm,
}: {
	handleChckOutFormForm: () => void;
}) {
	const { t } = useTranslation();
	const [purchase, setPurchase] = useState('branch');
	// custom hook
	const { handelDefaultValue, checkOutSchema } = useCustomCheckOutForm(purchase);

	const handleSubmit = (values: checkOutDetailsInterface) => {
		console.log(values);
	};

	const { formStore, onSubmit } = useForm({
		schema: checkOutSchema(),
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useEffect(() => {
		setPurchase(formStore.watch('purchase'));
	}, [formStore.watch('purchase')]);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-5'>
				<div className='flex-col-global gap-5'>
					<FormChoiceChips<checkOutDetailsInterface>
						checkoutForm
						formStore={formStore}
						name='purchase'
						label={t('Purchase method')}
						options={['branch', 'onLine']}
					/>
					{purchase === 'branch' && (
						<FormField
							formStore={formStore}
							name='branch'
							render={(field) => (
								<Select
									onValueChange={field.onChange}
									value={field.value}
									required={field.required}
									name={field.name}
								>
									<SelectTrigger onBlur={field.onBlur} disabled={field.disabled} id={field.id}>
										<SelectValue placeholder={t('Select branch')} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Saudi Arabia'>Saudi Arabia</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					)}
				</div>

				<FormChoiceChips<checkOutDetailsInterface>
					checkoutForm
					formStore={formStore}
					name='payment'
					label={t('Payment methods')}
					options={['Cash']}
				/>
				<FormChoiceChips<checkOutDetailsInterface>
					checkoutForm
					formStore={formStore}
					name='delivery'
					label={t('Delivery method')}
					options={['Shipping']}
				/>
				<FormChoiceChips<checkOutDetailsInterface>
					checkoutForm
					formStore={formStore}
					name='shipping'
					label={t('Shipping method')}
					options={['DHL (main)']}
				/>

				<div className='flex-btn-end'>
					<Button onClick={handleChckOutFormForm} variant='secondary'>
						{t('Discard')}
					</Button>
					<Button onClick={onSubmit} variant='primary'>
						{t('Save')}
					</Button>
				</div>
			</form>
		</Form>
	);
}
