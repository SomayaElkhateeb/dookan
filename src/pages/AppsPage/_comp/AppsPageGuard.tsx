import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AppsPageGuard = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation();
	if (pathname === '/apps') {
		return <Navigate to='/apps/app_store' />;
	}
	return children;
};
export default AppsPageGuard;
