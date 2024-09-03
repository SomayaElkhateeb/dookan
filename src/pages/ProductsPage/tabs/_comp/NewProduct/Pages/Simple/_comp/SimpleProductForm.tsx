import { useEffect, useMemo, useState } from 'react';
import { Button } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { InferredZodSchema, useForm } from 'src/app/utils/hooks/form';
import { z } from 'zod';
import { FaCirclePlus } from 'react-icons/fa6';
import { TfiUpload } from 'react-icons/tfi';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import ImageInput from 'src/app/components/ui/form/ImageInput';

import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getAllProductsTable,
	PostSimpleQuickProduct,
	PostUpdateQuickProduct,
} from 'src/app/store/slices/productsPage/allProducts/allProductsAsyncThunks';
import { CategoryInterface } from 'src/app/interface/CategoriesInterface';
import AddCategoryForm from 'src/pages/ProductsPage/tabs/Categories/_comp/AddCategoryForm';
import { getInventoryTable } from 'src/app/store/slices/productsPage/inventory/inventoryAsyncThunks';
import { InventoryInterface } from 'src/app/interface/InventoryInterface';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { Product } from 'src/pages/ProductsPage/_comp/data';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import HorizontalBox from 'src/app/components/ui/horizontal-box';

interface simpleProductInterface {
	name: string;
	price: number;
	quy: number;
	sku: string;
	category: string;
	images: File;
}
const simpleProductSchema = {
	nameEn: z.string().min(1, 'Product name is required'),
	nameAr: z.string().min(1, 'Product name is required'),
	price: z.coerce.number().min(1).positive(),
	quy: z.coerce.number().optional(),
	sku: z.string().min(1, 'SKU code is required'),
	category: z.string().min(1, 'Category is required'),
	inventories: z.string().min(1, 'inventories is required'),
	images: z.instanceof(File),
	type: z.optional(z.string()).or(z.literal('')),
	status: z.number(),
};
export type AddsimpleProductSchemaSchemaValues = InferredZodSchema<typeof simpleProductSchema>;

const SimpleProductForm = ({
	categoriesTable,
	handleClose,
	edit_product,
}: {
	categoriesTable: CategoryInterface[];
	handleClose: () => void;
	edit_product: Product;
}) => {
	//  hooks
	const dispatch = useAppDispatch();
	const { allProducts, isLoadingAddOrUpdate } = useAppSelector((state) => state.allProducts);
	const { inventory } = useAppSelector((state) => state.inventory);
	//  custom hook
	const { formStore, onSubmit } = useForm({
		schema: simpleProductSchema,
		handleSubmit: (values) => {
			const formData = new FormData();

			formData.append('en[name]', values.nameEn);
			formData.append('ar[name]', values.nameAr);
			values.price && formData.append('price', values.price.toString());
			values.quy && formData.append('quy', values.quy.toString());
			formData.append('sku', values.sku);
			formData.append('categories[]', values.category);
			formData.append('images[files][]', values.images);
			formData.append('type', 'simple');
			formData.append('status', values.status.toString());
			values.quy && formData.append(`inventories[${values.inventories}]`, values.quy.toString());

			if (edit_product?.price) {
				dispatch(PostUpdateQuickProduct({ data: formData, id: edit_product?.id })).then(
					(promiseResponse) => {
						if ((promiseResponse.payload.code = 200)) {
							dispatch(getAllProductsTable());
							handleClose();
						}
					},
				);
			} else {
				dispatch(PostSimpleQuickProduct(formData)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						dispatch(getAllProductsTable());
						handleClose();
					}
				});
			}
		},
		defaultValues: {
			nameEn: '',
			nameAr: '',
			price: 0,
			quy: 0,
			sku: '',
			images: undefined,
			category: '',
			inventories: '',
			status: 0,
		},
	});

	const [openDialog, setOpenDialog] = useState(false);
	const { t } = useTranslation();

	useMemo(() => {
		dispatch(getAllProductsTable());
		dispatch(getInventoryTable());
	}, [dispatch]);

	useEffect(() => {
		if (Object.values(edit_product).length > 0) {
			formStore.setValue('nameEn', edit_product?.en?.name);
			formStore.setValue('nameAr', edit_product?.ar?.name);
			formStore.setValue('price', Number(edit_product?.price));
			formStore.setValue('sku', edit_product?.sku);
			formStore.setValue('quy', Number(edit_product?.qty));
			edit_product.status > 0 ? formStore.setValue('status', 1) : formStore.setValue('status', 0);
			edit_product?.inventory_sources?.length > 0 &&
				edit_product?.inventory_sources[0] &&
				formStore.setValue(
					'inventories',
					edit_product?.inventory_sources[0]?.inventory_source_id.toString(),
				);
			edit_product?.categories?.length > 0 &&
				edit_product?.categories[0] &&
				formStore.setValue('category', edit_product?.categories[0]?.toString());
		}
	}, [edit_product]);

	useEffect(() => {
		formStore.setValue('status', formStore.watch('status') ? 1 : 0);
	}, [formStore.watch('status')]);

	return (
		<div className='flex-col-global gap-6'>
			<h3 className='title md:font-bold'>{t('Add a quick Product')}</h3>
			<Form {...formStore}>
				<form className='bg-white rounded  flex-col-global gap-5  w-full' onSubmit={onSubmit}>
					<div className=' flex-col-global   gap-[1.2rem]'>
						<div>
							<ImageInput<simpleProductInterface> name={'images'} formStore={formStore}>
								<TfiUpload className='text-[1.5rem]' />
								<p className='paragraph text-center'>{t('Upload Image')}</p>
							</ImageInput>
						</div>
						<TabbedFormField
							formStore={formStore}
							keys={[
								{ name: 'nameEn', label: 'En' },
								{ name: 'nameAr', label: 'عربي' },
							]}
							renderer={(field) => (
								<Input
									placeholder={`${t('Product Name')} (${t('Required')})`}
									type='text'
									{...field}
								/>
							)}
						/>
						<FormField
							formStore={formStore}
							name='price'
							render={(field) => (
								<HorizontalBox start='SAR' startSeparator>
									<Input
										{...field}
										id='price'
										type='number'
										placeholder={`${t('Price')} (${t('Required')})`}
									/>
								</HorizontalBox>
							)}
						/>
						<FormField
							formStore={formStore}
							name='quy'
							render={(field) => (
								<HorizontalBox start={t('Quantity')} startSeparator>
									<Input {...field} id='quy' type='number' placeholder={t('Quantity')} />
								</HorizontalBox>
							)}
						/>
						<FormField
							formStore={formStore}
							name='sku'
							render={(field) => (
								<Input {...field} id='sku' type='text' placeholder={t('SKU Code')} />
							)}
						/>

						{categoriesTable?.length > 0 && (
							<SelectFormField
								name='category'
								setOpenDialog={setOpenDialog}
								add_button
								formStore={formStore}
								options={categoriesTable?.map((e: CategoryInterface) => {
									return {
										label: e?.name,
										value: e?.id?.toString(),
									};
								})}
								placeholder={t('Select Category')}
							/>
						)}

						{inventory?.length > 0 && (
							<SelectFormField
								name='inventories'
								formStore={formStore}
								options={inventory?.map((e: InventoryInterface) => {
									return {
										label: e?.name,
										value: e?.id?.toString(),
									};
								})}
								placeholder={t('Select Inventory')}
							/>
						)}

						<div className='flex-col-global gap-2'>
							<p>{t('STATUS')}</p>
							<div className='flex-row-global gap-2'>
								<FormSwitchField<AddsimpleProductSchemaSchemaValues>
									formStore={formStore}
									name='status'
									enable
								/>
								<p>{formStore.watch('status') ? 'On' : 'Off'}</p>
							</div>
						</div>
					</div>

					{openDialog && (
						<AddCategoryForm
							openDialog={openDialog}
							handleClose={() => setOpenDialog(false)}
							allProducts={allProducts}
							Edit_id={''}
							setEdit_id={function (e: string): void {
								throw new Error('Function not implemented.');
							}}
						/>
					)}
					<div className='flex  space-x-4 lg:justify-end justify-center'>
						<Button loading={isLoadingAddOrUpdate} variant='primary' onClick={onSubmit}>
							{t('Save Changes')}
						</Button>
						<Link to='/products/new/configurable'>
							<Button variant='secondary' RightIcon={IoIosArrowForward}>
								{t('Add More Info')}
							</Button>
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default SimpleProductForm;
