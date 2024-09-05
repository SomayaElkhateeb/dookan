import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'src/app/components/ui/input';
import { Button, CheckBox } from 'src/app/components/optimized';
import { GlobalDialog } from 'src/app/components/shared';

import { DownIcon } from 'src/app/utils/icons';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';

import { useAppSelector } from 'src/app/store';
import { Product } from 'src/pages/ProductsPage/_comp/data';
import useLanguage from 'src/app/utils/hooks/useLanguage';

interface SelectProductsDialogProps {
	onClose: () => void;
	open: boolean;
	onSelectProduct: (product: Product[]) => void;
	selectedProducts: Product[];
}
export default function SelectProductsDialog({
	onClose,
	open,
	onSelectProduct,
	selectedProducts: initialSelectedProducts,
}: SelectProductsDialogProps) {
	const { t } = useTranslation();

	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	const { allProducts } = useAppSelector((state) => state.allProducts);


	console.log('allProducts', allProducts);

	
	useEffect(() => {
		// Simulate fetching data from API
		setProducts(allProducts);
		setSelectedProducts(initialSelectedProducts);
	}, [initialSelectedProducts, allProducts]);

	const handleSelectProduct = (updatedProduct: Product) => {
		setSelectedProducts((prev) => {
			const existingProductIndex = prev.findIndex((p) => p.id === updatedProduct.id);
			if (existingProductIndex !== -1) {
				const updatedProducts = [...prev];
				if (Object.keys(updatedProduct?.selectedOptions || {}).length === 0) {
					updatedProducts.splice(existingProductIndex, 1);
				} else {
					updatedProducts[existingProductIndex] = updatedProduct;
				}
				return updatedProducts;
			}
			return [...prev, { ...updatedProduct, quantity: 1 }];
		});
	};

	const filteredProducts = products.filter((product) =>
		product?.en.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
	);

	// const handleAddClick = () => {
	// 	const formattedProducts = selectedProducts.map(({ options, ...rest }) => rest);
	// 	// onSelectProduct(formattedProducts);
	// 	onClose();
	// };
	const handleAddClick = () => {
		onSelectProduct(selectedProducts);
		onClose();
	};

	return (
		<GlobalDialog
			openDialog={open}
			handleClose={onClose}
			style={{ width: { md: '50%', xs: '80%' }, p: 0 }}
		>
			<div className='grid'>
				<div className='grid gap-4 p-5'>
					<h2 className='text-title font-semibold'>{t('Select Products')}</h2>
					<Input
						value={searchTerm}
						placeholder={t('Search')}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='divide-y'>
					{filteredProducts.map((product) => (
						<ProductAccordion
							key={product.id}
							product={product}
							onSelect={handleSelectProduct}
							isSelected={!!selectedProducts.find((p) => p.id === product.id)}
						/>
					))}
				</div>
				<div className='flex items-center justify-end gap-4 p-5'>
					<Button variant='tertiary' text={t('Cancel')} onClick={() => onClose()} />
					<Button
						variant='primary'
						text={`${t('Add')} (${selectedProducts.length})`}
						onClick={handleAddClick}
						className='w-fit'
					/>
				</div>
			</div>
		</GlobalDialog>
	);
}

interface ProductAccordionProps {
	product: Product;
	onSelect: (product: Product) => void;
	isSelected: boolean;
}
function ProductAccordion({ product, onSelect, isSelected }: ProductAccordionProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
	const { language } = useLanguage();
	useEffect(() => {
		// Set the initial selected options to the first available option for each type
		const initialOptions: { [key: string]: string } = {};
		product?.options?.length > 0 &&
			product?.options?.forEach((option) => {
				if (option.options.length > 0) {
					initialOptions[option?.type] = option?.options[0];
				}
			});
		setSelectedOptions(initialOptions);
	}, [product]);

	const handleOptionChange = (type: string, option: string) => {
		const newSelectedOptions = { ...selectedOptions, [type]: option };
		setSelectedOptions(newSelectedOptions);
		if (isSelected) {
			onSelect({ ...product, selectedOptions: newSelectedOptions });
		}
	};

	const handleSelectProduct = (checked: boolean) => {
		if (checked) {
			onSelect({ ...product, selectedOptions });
		} else {
			onSelect({ ...product, selectedOptions: {} });
		}
	};

	return (
		<div className={`grid gap-3 py-3 px-5 ${isOpen ? 'bg-sec-light' : ''} `}>
			<div className='flex justify-between items-center '>
				<div className='flex gap-2 items-center'>
					<CheckBox checked={isSelected} handleOnChange={handleSelectProduct} />
					<div className='size-11 rounded-md overflow-hidden flex-shrink-0'>
						{product?.images?.length > 0 && product?.images[0]?.original_image_url && (
							<img
								src={product?.images[0]?.original_image_url}
								alt={product.name}
								className='size-full object-cover'
							/>
						)}
					</div>
					<div className='grid place-content-between'>
						<h2 className='title text-sm'>
							{language === 'ar' ? product.ar.name : product.en.name}
						</h2>
						{product?.category && <p className='paragraph text-subtitle'>{product.category}</p>}
					</div>
				</div>
				{product?.options?.length > 0 && (
					<button
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					>
						<DownIcon className={`fill-pri-dark transition-all ${isOpen ? '-rotate-180 ' : ''}`} />
					</button>
				)}
			</div>
			{isOpen && (
				<div className='grid gap-3 px-7'>
					{product?.options?.length > 0 &&
						product?.options?.map((option) => (
							<div key={option.type}>
								<p className='title text-sm capitalize mb-1.5'>{option.type}</p>
								<SingleChoiceChips
									options={option.options}
									setSelected={(selectedOption) => handleOptionChange(option.type, selectedOption)}
									selected={selectedOptions[option.type] || ''}
								/>
							</div>
						))}
				</div>
			)}
		</div>
	);
}
