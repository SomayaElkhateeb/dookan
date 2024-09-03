import { UseFormReturn } from 'react-hook-form';
import { newDiscountInterface } from '../../../NewDiscount/_hook/HookForNewDiscount';
import SpecificGroups from '../../../Selectors/SpecificGroups';
import SpecificCustomers from '../../../Selectors/SpecificCustomers';

const CustomerSegmentOptions = ({
	segmentOptions,
	formStore,
}: {
	segmentOptions: string;
	formStore: UseFormReturn<newDiscountInterface>;
}) => {
	return (
		<div>
			{segmentOptions === 'Specific customer groups' && <SpecificGroups formStore={formStore} />}
			{segmentOptions === 'Specific customers' && <SpecificCustomers formStore={formStore} />}
		</div>
	);
};

export default CustomerSegmentOptions;
