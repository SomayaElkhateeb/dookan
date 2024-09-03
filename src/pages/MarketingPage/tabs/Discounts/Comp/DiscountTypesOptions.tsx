import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { newDiscountInterface } from 'src/pages/MarketingPage/tabs/Discounts/NewDiscount/HookForNewDiscount';

const DiscountTypesOptions = ({
	discountType,
	formStore,
}: {
	formStore: UseFormReturn<newDiscountInterface>;
	discountType: string;
}) => {
	//  hooks
	const { t } = useTranslation();
	return (
		<div>
			{discountType === 'Percentage' && (
				<div className='md:w-[24rem]'>
					<FormField
						formStore={formStore}
						name='discountPercentage'
						label={t('Percentage')}
						render={(field) => <Input type='number' {...field} />}
					/>
				</div>
			)}
			{discountType === 'Fixed amount' && (
				<div className='md:w-[24rem]'>
					<FormField
						formStore={formStore}
						name='discountValue'
						label={t('discount')}
						render={(field) => <Input placeholder='SAR' type='number' {...field} />}
					/>
				</div>
			)}
		</div>
	);
};

export default DiscountTypesOptions;
