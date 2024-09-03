import { useTranslation } from 'react-i18next';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import useCustomHookProductCustomize, { ProductCustomize } from '../_hook/HookProductCustomize';
import { postCustomizationProduct } from 'src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks';

export default function ProductCustomizeForm({ onSubmit }:{onSubmit: (data: ProductCustomize) => void}) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	// custom hook
	const {handelDefaultValue, productCustomizeSchema} = useCustomHookProductCustomize();

	const handleSubmit = (values: ProductCustomize) => {
		dispatch(postCustomizationProduct(values)).then((promiseResponse) => {
			if (promiseResponse.payload.code === 200) {
				navigate(-1);
			}
		});
		onSubmit(values);
	};
	const { formStore } = useForm({
		schema: productCustomizeSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useEffect(() => {
		formStore.setValue(
			'customizations.product.activate_product_comparison',
			formStore.watch('customizations.product.activate_product_comparison') ? 1 : 0,
		);
	}, [formStore.watch('customizations.product.activate_product_comparison')]);

	useEffect(() => {
		formStore.setValue(
			'customizations.product.auto_archive_order',
			formStore.watch('customizations.product.auto_archive_order') ? 1 : 0,
		);
	}, [formStore.watch('customizations.product.auto_archive_order')]);

	useEffect(() => {
		formStore.setValue(
			'customizations.product.stock_limit',
			formStore.watch('customizations.product.stock_limit') ? 1 : 0,
		);
	}, [formStore.watch('customizations.product.stock_limit')]);

	useEffect(() => {
		formStore.setValue(
			'customizations.product.show_purchases_number_in_product_page',
			formStore.watch('customizations.product.show_purchases_number_in_product_page') ? 1 : 0,
		);
	}, [formStore.watch('customizations.product.show_purchases_number_in_product_page')]);

	useEffect(() => {
		formStore.setValue(
			'customizations.product.when_purchases_number_exceeds_times',
			formStore.watch('customizations.product.when_purchases_number_exceeds_times') ? 1 : 0,
		);
	}, [formStore.watch('customizations.product.when_purchases_number_exceeds_times')]);

	useEffect(() => {
		formStore.setValue(
			'customizations.product.download_digital_product_limit',
			formStore.watch('customizations.product.download_digital_product_limit') ? 1 : 0,
		);
	}, [formStore.watch('customizations.product.download_digital_product_limit')]);

	return (
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
	);
}
