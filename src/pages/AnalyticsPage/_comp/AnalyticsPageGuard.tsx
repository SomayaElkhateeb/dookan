import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AnalyticsGuardProps {
	children: ReactNode;
}

export default function AnalyticsPageGuard({ children }: AnalyticsGuardProps) {
	const { pathname } = useLocation();
	if (pathname === '/analytics') {
		return <Navigate to='/analytics/overview' />;
	}
	return children;
}
