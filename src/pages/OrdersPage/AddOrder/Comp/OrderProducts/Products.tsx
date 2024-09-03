//Products.tsx
//================================================
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'src/app/utils/hooks/form';
import { Button } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import SelectedProductsTable from './_comp/SelectedProductsTable';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import SelectProductsDialog from './_comp/SelectProductsDialog';

import { Product } from 'src/pages/ProductsPage/_comp/data';
import { useAppDispatch } from 'src/app/store';
import { setAdd_Order_Data_Products } from 'src/app/store/slices/AddOrderPage/AddOrderSlice';

export interface IQuantity {
	quantity?: number;
}

const quantitySchema = {
	quantity: z.coerce.number().optional(),
};
const handelDefaultValue = {
	quantity: 0,
};
export interface ProductOption {
	type: string;
	options: string[];
}

export default function Products({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
	const { t } = useTranslation();
	const { language } = useLanguage();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const dispatch = useAppDispatch();
	const handleSelectProducts = (newProducts: Product[]) => {
		setSelectedProducts((prev) => {
			const updatedProducts = [...prev];
			newProducts.forEach((newProduct) => {
				const existingProductIndex = updatedProducts.findIndex((p) => p?.id === newProduct?.id);
				if (existingProductIndex !== -1) {
					updatedProducts[existingProductIndex] = newProduct;
				} else {
					updatedProducts.push(newProduct);
				}
			});
			return updatedProducts;
		});
	};

	const handleDeleteProduct = (productId: string) => {
		setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
	};
	const handleQuantityChange = (productId: string, quantity: number) => {
		setSelectedProducts((prev) =>
			prev.map((product) => (product.id === productId ? { ...product, quantity } : product)),
		);
	};

	const handleSubmit = (values: IQuantity) => {
		// console.log(values);
		dispatch(setAdd_Order_Data_Products(selectedProducts));
		onNext();
	};

	const { formStore, onSubmit } = useForm({
		schema: quantitySchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue,
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='cardDetails-sharedClass p-5 flex-col-global'>
				<Button
					variant='secondary'
					text={t('select products')}
					RightIcon={language === 'ar' ? FaChevronLeft : FaChevronRight}
					onClick={() => setDialogOpen(true)}
					className='w-fit'
				/>
				<SelectedProductsTable
					formStore={formStore}
					products={selectedProducts}
					onDelete={handleDeleteProduct}
					onQuantityChange={handleQuantityChange}
				/>
				<div className='flex-btn-end'>
					<Button variant='tertiary' text={t('back')} onClick={onBack} />
					<Button variant='primary' text={t('Next')} onClick={onSubmit} />
				</div>
				<SelectProductsDialog
					onClose={() => setDialogOpen(false)}
					open={dialogOpen}
					onSelectProduct={handleSelectProducts}
					selectedProducts={selectedProducts}
				/>
			</form>
		</Form>
	);
}
