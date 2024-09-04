import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch } from 'src/app/store';
import {
	OrderCustomize,
	useOrderForm,
	defaultValues,
	OrderCustomizeSchema,
} from '../_hook/HookOrderInvoiceCustomize';
import { postCustomizationOrderInvoice } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';
import { useImperativeHandle, forwardRef } from 'react';
import { Form } from 'src/app/components/ui/form';

const OrderInvoiceCustomizeForm = forwardRef((_, ref) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const handleSubmit = (values: OrderCustomize) => {
		dispatch(postCustomizationOrderInvoice(values));
	};
	const { formStore, onSubmit } = useForm({
		schema: OrderCustomizeSchema,
		handleSubmit: handleSubmit,
		defaultValues,
	});

	useOrderForm(formStore);
	useImperativeHandle(ref, () => ({
		submit: () => onSubmit(),
	}));

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit}>
				<div className='global-cards grid sm:grid-cols-2 grid-cols-1'>
					<div className='col-span-2'>
						<h2 className='title  mb-2'>{t('Order invoice')}</h2>
						<p className='paragraph'>{t('Customize invoice sent to customers')}</p>
					</div>
					<FormSwitchField<OrderCustomize>
						formStore={formStore}
						name='customizations.order_invoice.show_tax_number'
						label='Show tax number'
					/>
					<div className='col-span-1'>
						<FormField
							required
							formStore={formStore}
							name='customizations.order_invoice.tax_number'
							label={t('Tax number')}
							render={(field) => <Input type='number' {...field} />}
						/>
					</div>
					<FormSwitchField<OrderCustomize>
						formStore={formStore}
						name='customizations.order_invoice.hide_product_images'
						label='Hide product images'
					/>
					<FormSwitchField<OrderCustomize>
						formStore={formStore}
						name='customizations.order_invoice.show_products_description'
						label='Show products description'
					/>
					<FormSwitchField<OrderCustomize>
						formStore={formStore}
						name='customizations.order_invoice.show_sku'
						label='Show SKU'
					/>
					<FormSwitchField<OrderCustomize>
						formStore={formStore}
						name='customizations.order_invoice.show_contacts'
						label='Show contacts'
					/>
				</div>
			</form>
		</Form>
	);
});
export default OrderInvoiceCustomizeForm;
