import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { newDiscountInterface } from '../NewDiscount/_hook/HookForNewDiscount';

const SpecificCustomers = ({ formStore }: { formStore: UseFormReturn<newDiscountInterface> }) => {
	const { t } = useTranslation();

	return (
		<SpecificAutoCompleteInput<newDiscountInterface>
			name='specificCustomer'
			label={t('Select customers')}
			formStore={formStore}
		/>
	);
};

export default SpecificCustomers;
