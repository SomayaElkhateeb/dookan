import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { newDiscountInterface } from 'src/pages/MarketingPage/tabs/Discounts/NewDiscount/HookForNewDiscount';
import CustomerSegmentOptions from './comp/CustomerSegmentOptions';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';

const CustomerSegment = ({ formStore }: { formStore: UseFormReturn<newDiscountInterface> }) => {
	const { t } = useTranslation();

	const customerSegmentOptions = [
		'All customers',
		'Specific customer groups',
		'Specific customers',
	];

	return (
		<div className='global-cards'>
			<section>
				<FormChoiceChips<newDiscountInterface>
					formStore={formStore}
					name='customerSegment'
					label={t('Customer segment')}
					options={customerSegmentOptions}
				/>

				<CustomerSegmentOptions
					formStore={formStore}
					segmentOptions={formStore.watch('customerSegment')}
				/>
			</section>
		</div>
	);
};

export default CustomerSegment;
