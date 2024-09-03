import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { newDiscountInterface } from '../NewDiscount/_hook/HookForNewDiscount';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';

const SpecificGroups = ({ formStore }: { formStore: UseFormReturn<newDiscountInterface> }) => {
	const { t } = useTranslation();
	return (
		
			<SpecificAutoCompleteInput<newDiscountInterface>
				name='specificCustomerGroup'
				label={t('Select Customer Group')}
				formStore={formStore}
			/>
	
	);
};

export default SpecificGroups;
