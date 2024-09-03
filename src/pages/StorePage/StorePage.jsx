import StoreLayout from './_comp/StoreLayout';
import StorePageGuard from './_comp/StorePageGuard';

const StorePage = () => {
	return (
		<StorePageGuard>
			<StoreLayout />
		</StorePageGuard>
	);
};

export default StorePage;
