
import AppsLayout from './_comp/AppsLayout';
import AppsPageGuard from './_comp/AppsPageGuard';

const AppsPage = () => {
	return (
		<AppsPageGuard>
			<AppsLayout />
		</AppsPageGuard>
	);
};
export default AppsPage;
