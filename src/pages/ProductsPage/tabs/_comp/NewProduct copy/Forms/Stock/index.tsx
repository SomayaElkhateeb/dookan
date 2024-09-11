import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from 'src/app/components/ui/card';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import ProductInventoryBranches from './_comp/ProductInventoryBranches';
import { useEffect, useMemo } from 'react';
import { CheckBox } from 'src/app/components/optimized';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getInventoryTable } from 'src/app/store/slices/productsPage/inventory/inventoryAsyncThunks';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { Values } from './types';

export default function ProductFormStockSection<TFormStore>(props: Props<TFormStore>) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const { inventory } = useAppSelector((state) => state.inventory);

	
	useEffect(() => {
		props.formStore.watch('continue_selling') // ???
			? props.formStore.setValue('continue_selling', 1)
			: props.formStore.setValue('continue_selling', 0);
	}, [props.formStore.watch('continue_selling')]);
	return (
		<section className='global-cards' id={props.id}>
			{/* <CardHeader> */}
			<p className='title'>{t('Stock')}</p>
			{/* </CardHeader> */}
			<div className='md:w-[70%] flex-col-global gap-6'>
				<FormField
					formStore={props.formStore}
					name='quy'
					label={t('Quantity')}
					render={(field) => <Input {...field} type='number' />}
				/>

				<FormField
					formStore={props.formStore}
					name='continue_selling'
					render={(field) => (
						<CheckBox
							label={t('Can continue selling when out of stock')}
							checked={props.formStore.watch('continue_selling') > 0 ? true : false}
							handleOnChange={field.onChange}
						/>
					)}
				/>

				<SpecificAutoCompleteInput<Values>
					array={inventory?.map((e) => {
						return {
							id: e.id.toString(),
							name: e.name,
						};
					})}
					label={t('Inventory branches')}
					name='inventories'
					formStore={props.formStore}
				/>
			</div>
			{/* ??? */}
			{/* TODO: to be implemented */}
			{/* <ProductInventoryBranches formStore={props.formStore} /> */}
		</section>
	);
}
