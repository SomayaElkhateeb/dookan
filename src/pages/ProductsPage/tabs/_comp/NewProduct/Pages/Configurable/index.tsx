import { useTranslation } from 'react-i18next';
import {
	ProductFormBasicInfoSection,
	ProductFormContainer,
	ProductFormDescriptionAndSpecificationsSection,
	ProductFormFaqsSection,
	ProductFormMediaSection,
	ProductFormOptionsAndVariationsSection,
	ProductFormPricingSection,
	ProductFormQuickActionsSection,
	ProductFormShippingSection,
	ProductFormStockSection,
	SeoFormFaqsSection,
} from '../../..';
import { ProductDefaultValues, ProductSchema } from './utils';
import { useForm } from 'src/app/utils/hooks/form';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { ProductFormValues } from './types';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect, useMemo } from 'react';
import { getInventoryTable } from 'src/app/store/slices/productsPage/inventory/inventoryAsyncThunks';
import {
	getProduct,
	PostSimpleQuickProduct,
	PostUpdateQuickProduct,
} from 'src/app/store/slices/productsPage/allProducts/allProductsAsyncThunks';
import { useNavigate } from 'react-router-dom';
import { UseGetIdParams } from 'src/app/utils/hooks/GetParamsId';
const productsSections = [
	// {
	// 	Elem: ProductFormMediaSection,
	// 	id: 'ProductFormMediaSection',
	// 	title: 'General info',
	// },
	{
		Elem: ProductFormBasicInfoSection,
		id: 'ProductFormBasicInfoSection',
		title: 'General info',
	},
	{
		Elem: ProductFormDescriptionAndSpecificationsSection,
		id: 'ProductFormDescriptionAndSpecificationsSection',
		title: 'Description',
	},
	{
		Elem: ProductFormPricingSection,
		id: 'ProductFormPricingSection',
		title: 'pricing',
	},
	{
		Elem: ProductFormStockSection,
		id: 'ProductFormStockSection',
		title: 'stock',
	},
	{
		Elem: ProductFormShippingSection,
		id: 'ProductFormShippingSection',
		title: 'shipping',
	},
	{
		Elem: ProductFormOptionsAndVariationsSection,
		id: 'ProductFormOptionsAndVariationsSection',
		title: 'options & variations',
	},
	{
		Elem: SeoFormFaqsSection,
		id: 'SeoFormFaqsSection',
		title: 'seo',
	},
	// {
	// 	Elem: ProductFormFaqsSection,
	// 	id: 'ProductFormFaqsSection',
	// 	title: '',
	// },
];

export default function ConfigurableProductPage() {
	const { t } = useTranslation();
	const { id } = UseGetIdParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoadingAddOrUpdate, product } = useAppSelector((state) => state.allProducts);
	const { formStore, onSubmit } = useForm({
		schema: ProductSchema,
		handleSubmit: (values) => {
			//  handel inventory of product
			let handelInventory = values.inventories?.map((el: any, i) => {
				return {
					[`${el.id}`]: values?.quy?.toString(),
				};
			});
			//  convert array inventory to object
			const obj = handelInventory.reduce((acc: any, item: any) => {
				const key = Object.keys(item)[0];
				acc[key] = item[key];
				return acc;
			}, {});

			let variants = values.variants?.map((e: any) => {
				//  handel inventory of variants
				let handelInventoryVariants = e?.inventories?.map((el: any, i) => {
					return {
						[`${el.id}`]: e?.quantity,
					};
				});
				//  convert array inventory of variants to object
				const InventoryVariantsObj = handelInventoryVariants.reduce((acc: any, item: any) => {
					const key = Object.keys(item)[0];
					acc[key] = item[key];
					return acc;
				}, {});
				return {
					...e,
					[e.code]: e.attributeValues,
					inventories: InventoryVariantsObj,
				};
			});

			const variantsData = variants.reduce((acc: any, variant: any, index: number) => {
				acc[`variant_${index}`] = variant;
				return acc;
			}, {});

			const {
				category,
				descriptionAr,
				descriptionEn,
				nameEn,
				nameAr,
				inventories,
				...updatedData
			} = values;
			updatedData.en.name = nameEn;
			updatedData.en.description = descriptionEn;
			updatedData.ar.description = descriptionAr;
			updatedData.ar.name = nameAr;
			updatedData.categories = [category];

			let refactorData = {
				...updatedData,
				inventories: obj,
				type: 'configurable',

				variants: JSON.stringify(variantsData),
			};

			!id
				? dispatch(PostSimpleQuickProduct(refactorData)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
				})
				: dispatch(PostUpdateQuickProduct({ data: refactorData, id })).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
				});
		},
		defaultValues: ProductDefaultValues,
	});

	const actionData = [
		{
			name: 'status',
			label: t('Available on store'),
			enable: true,
		},
	];
	useEffect(() => {
		formStore.setValue('status', formStore.watch('status') ? 1 : 0);
	}, [formStore.watch('status')]);

	useMemo(() => {
		dispatch(getInventoryTable());
	}, [dispatch]);

	useEffect(() => {
		id && dispatch(getProduct(id));
	}, [id]);
	useEffect(() => {
		if (id) {
			formStore.setValue('nameEn', product?.en?.name);
			formStore.setValue('nameAr', product?.ar?.name);
			formStore.setValue('descriptionEn', product?.en?.description);
			formStore.setValue('descriptionAr', product?.ar?.description);
			formStore.setValue('sku', product?.sku);
			formStore.setValue('brand_id', product?.brand_id?.toString());
			product?.categories?.length > 0 &&
				formStore.setValue('category', product?.categories[0]?.toString());
			formStore.setValue('price', product?.price);
			product?.cost && formStore.setValue('price', product?.cost);
			formStore.setValue('taxable', product?.taxable > 0 ? 1 : 0);
			formStore.setValue('status', product?.status > 0 ? 1 : 0);
			formStore.setValue('page_title', product?.page_title);
			formStore.setValue('meta_title', product?.meta_title);
			formStore.setValue('meta_title', product?.meta_title);
			formStore.setValue('meta_description', product?.meta_description);
			formStore.setValue('en.meta_keywords', product?.meta_keywords);
			formStore.setValue('ar.meta_keywords', product?.meta_keywords);
			formStore.setValue('quy', product?.base_qty);
			formStore.setValue('continue_selling', product?.continue_selling > 0 ? 1 : 0);
			product &&
				product?.inventory_sources?.length > 0 &&
				formStore.setValue(
					'inventories',
					product?.inventory_sources?.map((e) => {
						return {
							id: e.id ? e.id.toString() : '',
							name: e?.name ? e?.name : '',
						};
					}),
				);
			formStore.setValue('downloaded_link', product?.downloaded_link);
			formStore.setValue('is_shipped', product?.is_shipped > 0 ? 1 : 0);
			formStore.setValue('is_shipped', product?.is_shipped > 0 ? 1 : 0);
			formStore.setValue('weight', product?.weight);
			product?.weight_unit && formStore.setValue('weight_unit', product?.weight_unit);
			formStore.setValue('height', product?.height);
			formStore.setValue('width', product?.width);
			formStore.setValue('length', product?.length);
			product?.dimension_unit && formStore.setValue('dimension_unit', product?.dimension_unit);
			formStore.setValue('state', product?.state);
			formStore.setValue('shipping_method', product?.shipping_method);
			formStore.setValue('shipping_rate', product?.shipping_rate);
			formStore.setValue('shipping_rate_type', product?.shipping_rate_type);
			formStore.setValue('discount', product?.discount);
			product?.variants?.length > 0 &&
				formStore.setValue(
					'variants',
					product?.variants?.map((e) => {
						return {
							...e,
							quantity: e.qty,
							inventories: e?.inventory_sources?.map((el) => {
								return {
									id: el.id ? el.id.toString() : '',
									name: e?.name ? e?.name : '',
								};
							}),
						};
					}),
				);
		}
	}, [product, id]);

	return (
		<ProductFormContainer
			isLoadingAddOrUpdate={isLoadingAddOrUpdate}
			formStore={formStore}
			onSubmit={onSubmit}
			sections={productsSections}
		>
			<section onSubmit={onSubmit} className='flex-grow flex flex-col gap-4 relative'>
				<div className='custom-grid-parent gap-5  custom_container'>
					<div className='flex-col-global grid-left gap-4'>
						{productsSections.map(({ Elem, id }) => (
							// @ts-ignore
							<Elem key={id} formStore={formStore} id={id} />
						))}
					</div>
					<div className='grid-right'>
						<QuickActions<ProductFormValues>
							formStore={formStore}
							data={actionData}
							title={t('Quick actions')}
						/>
					</div>
				</div>
			</section>
		</ProductFormContainer>
	);
}
