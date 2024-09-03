import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import BasicInfo from './BasicInfo/BasicInfo';
import useCustomHookNewDiscount,{newDiscountInterface} from './_hook/HookForNewDiscount';
import Limits from '../Comp/Limits';
import MinimumRequirements, { initialState } from '../Comp/MinimumRequirements';
import ActiveDates from '../Comp/ActiveDates';
import CustomerSegment from '../Comp/CustomerSegment/CustomerSegment';


const NewDiscount = ({ coupon }: { coupon?: boolean }) => {
	// hook
	const { t } = useTranslation();
	const [discountType, setDiscountType] = useState('Free shipping');
	const [applyToType, setApplyToType] = useState('All products');
	const [productXtoYType, setProductXtoYType] = useState<string | undefined>('Free');
	const [customerSegment, setCustomerSegment] = useState('All customers');
	const [updateState, setUpdateState] = useState<State>(initialState);
	const [isCheck, setIsCheck] = useState<boolean>(false);

	const { selectedMinimumRequirements } = updateState;

	// custom hook
	const { onSubmit, formStore, updatedDates } = useCustomHookNewDiscount(
		discountType,
		applyToType,
		productXtoYType,
		customerSegment,
		selectedMinimumRequirements,
		isCheck,
	);

	useMemo(() => {
		setDiscountType(formStore.watch('discountType'));
		setApplyToType(formStore.watch('applyToType'));
		setProductXtoYType(formStore?.watch('ProductXToProductYType'));
		setCustomerSegment(formStore?.watch('customerSegment'));
	}, [
		formStore.watch('discountType'),
		formStore.watch('applyToType'),
		formStore.watch('ProductXToProductYType'),
		formStore.watch('customerSegment'),
	]);

	//  handel active date
	useMemo(() => {
		formStore.setValue('activeDates', updatedDates);
	}, [
		updatedDates.startActivation.startDate,
		updatedDates.startActivation.startTime,
		updatedDates.endActivation.endDate,
		updatedDates.endActivation.endTime,
	]);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={coupon ? t('Add Coupon') : t('Add Discount')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} />
				</SubHeader>
				<div className='grid gap-5 lg:grid-cols-3 custom_container'>
					<div className='flex-col-global lg:col-span-2'>
						<BasicInfo coupon={coupon} formStore={formStore} />
						<CustomerSegment formStore={formStore} />
						<MinimumRequirements
							updateState={updateState}
							setUpdateState={setUpdateState}
							formStore={formStore}
						/>
						{coupon && <Limits isCheck={isCheck} setIsCheck={setIsCheck} formStore={formStore} />}
						<ActiveDates />
					</div>
					<div className='col-span-1'>
						<div className='global-cards flex-col-global'>
							<h3 className='title'>{t('Quick actions')}</h3>
							<div className='flex gap-[.2rem] items-end'>
								<FormSwitchField<newDiscountInterface> formStore={formStore} name='active' enable />
								<p className='text-title text-sm font-normal '>
									{formStore.watch('active') ? 'on' : 'off'}
								</p>
							</div>
						</div>
					</div>
				</div>
				<SubHeaderMobileBtns onSubmit={onSubmit} />
			</form>
		</Form>
	);
};
export default NewDiscount;
