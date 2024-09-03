import { Navigate, useLocation } from 'react-router-dom';

const StorePageGuard = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useLocation();
	if (pathname === '/store') {
		return <Navigate to='/store/themes' />;
	}
	return children;
};
export default StorePageGuard;
