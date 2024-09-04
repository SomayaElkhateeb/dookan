import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch } from 'src/app/store';
import {
	ProductCustomize,
	productCustomizeSchema,
	defaultValues,
	useProductForm,
} from '../_hook/HookProductCustomize';
import { postCustomizationProduct } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';
import { useImperativeHandle, forwardRef } from 'react';
import { Form } from 'src/app/components/ui/form';

const ProductCustomizeForm = forwardRef((_, ref) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const handleSubmit = (values: ProductCustomize) => {
		dispatch(postCustomizationProduct(values));
	};
	const { formStore, onSubmit } = useForm({
		schema: productCustomizeSchema,
		handleSubmit: handleSubmit,
		defaultValues,
	});

	useProductForm(formStore);

	useImperativeHandle(ref, () => ({
		submit: () => onSubmit(),
	}));

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit}>
				<div className='global-cards grid space-1 sm:grid-cols-2 grid-cols-1'>
					<div className='col-span-2'>
						<h2 className='title  flex-col-global  gap-[.3rem]'>{t('Product')}</h2>
						<p className='paragraph'>{t('Customize product listing')}</p>
					</div>
					<FormSwitchField<ProductCustomize>
						formStore={formStore}
						name='customizations.product.activate_product_comparison'
						label='Activate product comparison'
					/>
					<FormSwitchField<ProductCustomize>
						formStore={formStore}
						name='customizations.product.auto_archive_order'
						label='Automatically archive the order'
						description='Delivered orders will be automatically assigned as closed.'
					/>
					<FormSwitchField<ProductCustomize>
						formStore={formStore}
						name='customizations.product.stock_limit'
						label='Show product stock in product page'
						description='Show when product stock reach defined limit'
					/>
					<FormSwitchField<ProductCustomize>
						formStore={formStore}
						name='customizations.product.show_purchases_number_in_product_page'
						label='Show purchases number in product page'
						description='Show when product purchases reach defined limit'
					/>
					<FormSwitchField<ProductCustomize>
						formStore={formStore}
						name='customizations.product.when_purchases_number_exceeds_times'
						label='Show purchases number in exceeds'
					/>
					<FormSwitchField<ProductCustomize>
						formStore={formStore}
						name='customizations.product.download_digital_product_limit'
						label='Limit number of download attempts for digital products'
					/>
				</div>
			</form>
		</Form>
	);
});
export default ProductCustomizeForm;
