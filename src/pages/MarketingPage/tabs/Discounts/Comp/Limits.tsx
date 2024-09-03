import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CheckBox } from 'src/app/components/optimized';
import { Input } from 'src/app/components/ui/input';

import FormField from 'src/app/components/ui/form/field';
import { newDiscountInterface } from 'src/pages/MarketingPage/tabs/Discounts/NewDiscount/HookForNewDiscount';

const Limits = ({
	formStore,
	isCheck,
	setIsCheck,
}: {
	isCheck: boolean;
	setIsCheck: (e: boolean) => void;
	formStore: UseFormReturn<newDiscountInterface>;
}) => {
	//  hooks
	const { t } = useTranslation();

	return (
		<section className='global-cards'>
			<h3 className='title'>{t('Limits')}</h3>
			<CheckBox
				label={t('Limit number of times this coupon can be used in total')}
				checked={isCheck}
				handleOnChange={() => {
					setIsCheck(!isCheck);
				}}
			/>
			{isCheck && (
				<div className='md:w-[24rem]'>
					<FormField
						formStore={formStore}
						name='UsageNumber'
						label={t('Usage number')}
						render={(field) => <Input type='number' {...field} />}
					/>
				</div>
			)}
			<CheckBox
				label={t('Limit to one use per customer')}
				checked={formStore.watch('limitOneCustomer')}
				handleOnChange={(option) => {
					formStore.setValue('limitOneCustomer', option);
				}}
			/>
		</section>
	);
};

export default Limits;
