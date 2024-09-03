import { GlobalDialog } from 'src/app/components/shared';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import { useTranslation } from 'react-i18next';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { Button } from 'src/app/components/optimized';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { Input } from 'src/app/components/ui/input';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { TfiUpload } from 'react-icons/tfi';
import { AddBrandSchemaValues, addBrandFormSchema } from '../_hook/AddbrandsFormSchema';
import ImageInput from 'src/app/components/ui/form/ImageInput';
import { useEffect } from 'react';
import {
	getBrandsTable,
	PostAddBrandRequest,
	PutUpdateBrandRequest,
} from 'src/app/store/slices/productsPage/brands/brandsAsyncThunks';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { Product } from 'src/pages/ProductsPage/_comp/data';
import FormField from 'src/app/components/ui/form/field';
interface AddBrandFormProps {
	openDialog: boolean;
	handleClose: () => void;
	allProducts: Product[];
	Edit_id: string;
	setEdit_id: (e: string) => void;
}

export default function AddBrandForm({
	openDialog,
	handleClose,
	allProducts,
	Edit_id,
	setEdit_id,
}: AddBrandFormProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	//  selectors
	const { brandInfo, isLoading, isLoadingAddOrUpdate } = useAppSelector((state) => state.brands);

	const { formStore, onSubmit } = useForm({
		schema: addBrandFormSchema,
		handleSubmit: (values: AddBrandSchemaValues) => {
			const formData = new FormData();

			formData.append('name_en', values.name_en);
			formData.append('name_ar', values.name_ar);
			formData.append('description_en', values.description_en);
			formData.append('description_ar', values.description_ar);
			formData.append('slug', values.slug);

			formData.append('status', values.status.toString());
			formData.append('image[]', values.image);
			values.products
				?.map((e: { id: string; name: string }) => e?.id)
				?.map((e: string) => {
					formData.append('products[]', e);
				});
			formData.append('locale', 'all');

			if (Edit_id) {
				dispatch(
					PutUpdateBrandRequest({
						data: formData,
						path: `merchant/catalog/brands/update/${Edit_id}`,
					}),
				).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						handleClose();
						setEdit_id('');
						dispatch(getBrandsTable());
					}
				});
			} else {
				dispatch(PostAddBrandRequest(formData)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						handleClose();
						setEdit_id('');
						dispatch(getBrandsTable());
					}
				});
			}
		},
		defaultValues: {
			name_en: '',
			name_ar: '',
			description_en: '',
			description_ar: '',
			slug: '',

			image: undefined,
			status: 0,
			products: [],
		},
	});

	const style = {
		height: { md: '35.8rem', xs: '30rem' },
		width: { md: '40rem', xs: '25.8rem' },
	};

	useEffect(() => {
		formStore.setValue('status', formStore.watch('status') ? 1 : 0);
	}, [formStore.watch('status')]);

	useEffect(() => {
		if (Edit_id) {
			formStore.setValue('name_en', brandInfo?.name_en);
			formStore.setValue('name_ar', brandInfo?.name_ar);
			formStore.setValue('description_en', brandInfo?.description_en);
			formStore.setValue('description_ar', brandInfo?.description_ar);
			formStore.setValue('slug', brandInfo?.slug);

			// formStore.setValue('slug_ar', brandInfo?.slug);
			brandInfo?.status > 0 ? formStore.setValue('status', 1) : formStore.setValue('status', 0);
			brandInfo?.products?.length > 0 &&
				formStore.setValue(
					'products',
					brandInfo?.products?.map((e) => {
						return {
							id: e.id ? e.id.toString() : '',
							name: e.name ? e.name : '',
						};
					}),
				);
		}
	}, [Edit_id, brandInfo]);

	return (
		<GlobalDialog style={style} openDialog={openDialog} handleClose={handleClose}>
			{isLoading ? (
				<div>....loading</div>
			) : (
				<Form {...formStore}>
					<form onSubmit={onSubmit} className='flex-col-global'>
						<Tabs
							body={
								<>
									<TabPanel value='1'>
										<div className='flex md:flex-row items-start flex-col gap-[2rem]'>
											<ImageInput<AddBrandSchemaValues> name={'image'} formStore={formStore}>
												<TfiUpload className='text-[1.5rem]' />
												<p className='paragraph text-center'>{t('Brand logo')}</p>
											</ImageInput>
											<div className='flex-col-global md:w-[80%] w-full'>
												<TabbedFormField
													formStore={formStore}
													keys={[
														{ name: 'name_en', label: 'En' },
														{ name: 'name_ar', label: 'عربي' },
													]}
													label={t('Brand name')}
													renderer={(field) => <Input {...field} />}
												/>
												<FormField
													formStore={formStore}
													name='slug'
													label={t('Brand link (Slug)')}
													render={(field) => <Input {...field} placeholder={''} />}
												/>
												<TabbedFormField
													formStore={formStore}
													keys={[
														{ name: 'description_en', label: 'En' },
														{ name: 'description_ar', label: 'عربي' },
													]}
													label={t('Brand description')}
													renderer={(field) => <Input {...field} />}
												/>
												<div className='flex-col-global gap-2'>
													<p>{t('Availability')}</p>
													<div className='flex-row-global gap-2'>
														<FormSwitchField<AddBrandSchemaValues>
															formStore={formStore}
															name='status'
															enable
														/>
														<p>{formStore.watch('status') ? 'On' : 'Off'}</p>
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
									<TabPanel value='2'>
										<SpecificAutoCompleteInput<AddBrandSchemaValues>
											array={allProducts?.map((e) => {
												return {
													id: e.id.toString(),
													name: e.en.name,
												};
											})}
											label={t('Products')}
											name='products'
											formStore={formStore}
										/>
									</TabPanel>
								</>
							}
						>
							<Tab label={t('General Info')} value='1' />
							<Tab label={t('Products')} value='2' />
						</Tabs>
						<div className='flex justify-end items-center gap-4'>
							<Button onClick={handleClose} variant='tertiary'>
								{t('cancel')}
							</Button>
							<Button loading={isLoadingAddOrUpdate} onClick={onSubmit} variant='primary'>
								{t('Save')}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</GlobalDialog>
	);
}
