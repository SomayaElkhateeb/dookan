import ProductsLayout from "./_comp/ProductsLayout";
import ProductsPageGuard from "./_comp/ProductsPageGuard";


const ProductsPage = () => {
	return (
		<ProductsPageGuard>
			<ProductsLayout />
		</ProductsPageGuard>
	);
};

export default ProductsPage;
