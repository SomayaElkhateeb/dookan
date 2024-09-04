import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { CartRuleInterface, cartRuleSchema, defaultValues } from '../_hook/HookCartRuleForm';
import {
	postCartRule,
	// 	putCartRule,
} from 'src/app/store/slices/marketingPage/cartRule/cartRuleAsyncThunks';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import RuleInfoForm from './RuleInfoForm';
import CouponDetailsForm from './CouponDetailsForm';
import ActionsForm from './ActionsForm';
import ConditionsForm from './ConditionsForm';
// import { useEffect } from 'react';
// import { useEffect, useMemo, useState } from 'react';
import { Path } from 'react-hook-form';
const CartRuleForm = () => {
	// const [conditions, setConditions] = useState({});

	const { t } = useTranslation();
	const navigate = useNavigate();
	// const [searchParams] = useSearchParams();

	// const id = searchParams.get('id');

	// redux
	const dispatch = useAppDispatch();

	const { isLoadingAddOrUpdate, cartRuleShow } = useAppSelector((state) => state.cartRule);
	console.log(cartRuleShow);

	const handleSubmit = (values: CartRuleInterface) => {
		console.log(values);
		// id
		// 	? dispatch(putCartRule({ data: values, id })).then((promiseResponse) => {
		// 			if ((promiseResponse.payload.code = 200)) {
		// 				navigate(-1);
		// 			}
		// 	  })
		// 	:

		const convertedData = {
			...values,
			use_auto_generation: values.use_auto_generation ? 1 : 0,
			customer_groups: [Number(values.customer_groups)],
			condition_type: Number(values.condition_type),
		};
		console.log('n Done', convertedData);
		dispatch(postCartRule(convertedData)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};

	// useMemo(() => {
	// 	if (id) {
	// 		formStore.setValue('name', cartRuleShow?.name);
	// 		formStore.setValue('description', cartRuleShow?.description);
	// 		formStore.setValue('customer_groups', cartRuleShow?.customer_groups);
	// 		formStore.setValue('coupon_code', cartRuleShow?.coupon_code);
	// 		formStore.setValue('usage_per_customer', cartRuleShow?.usage_per_customer);
	// 		formStore.setValue('starts_from', cartRuleShow?.starts_from);
	// 		formStore.setValue('ends_till', cartRuleShow?.ends_till);
	// 		formStore.setValue('action_type', cartRuleShow?.action_type);

	// 		if (cartRuleShow?.conditions) {
	// 			const updatedCondition = cartRuleShow.conditions.reduce((acc, opt, index) => {
	// 				acc[`${index}`] = {
	// 					attribute: opt.attribute,
	// 					operator: opt.operator,
	// 					attribute_type: opt.attribute_type,
	// 					value: opt.value,
	// 				};
	// 				return acc;
	// 			}, {});
	// 			setConditions(updatedCondition);
	// 		}

	// 		formStore.setValue('status', cartRuleShow?.status > 0 ? 1 : 0);
	// 		formStore.setValue('coupon_type', cartRuleShow?.coupon_type > 0 ? 1 : 0);
	// 		formStore.setValue('use_auto_generation', cartRuleShow?.use_auto_generation > 0 ? 1 : 0);
	// 		formStore.setValue('sort_order', cartRuleShow?.sort_order > 0 ? 1 : 0);
	// 		formStore.setValue('condition_type', cartRuleShow?.condition_type > 0 ? 1 : 0);
	// 		formStore.setValue('apply_to_shipping', cartRuleShow?.apply_to_shipping > 0 ? 1 : 0);
	// 		formStore.setValue('free_shipping', cartRuleShow?.free_shipping > 0 ? 1 : 0);
	// 		formStore.setValue('end_other_rules', cartRuleShow?.end_other_rules > 0 ? 1 : 0);
	// 	}
	// }, [id, cartRuleShow]);

	interface QuickAction {
		name: Path<CartRuleInterface>;
		label: string;
		enable: boolean;
	}
	const quickActionsData: QuickAction[] = [
		{ name: 'apply_to_shipping', label: t('Apply to Shipping'), enable: true },
		{ name: 'free_shipping', label: t('Free shipping'), enable: true },
		{ name: 'end_other_rules', label: t('End Other Rules'), enable: true },
		{ name: 'sort_order', label: t('Sort Order'), enable: true },
	];
	const { formStore, onSubmit } = useForm({
		schema: cartRuleSchema,
		handleSubmit: handleSubmit,
		defaultValues,
	});

	// log Error
	console.log('error', formStore.formState.errors);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('add cart rule')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate} />
				</SubHeader>

				<div className='custom_container custom-grid-parent'>
					<div className='flex-col-global grid-left'>
						<RuleInfoForm formStore={formStore} />
						<CouponDetailsForm formStore={formStore} />
						<ConditionsForm formStore={formStore} />
						<ActionsForm formStore={formStore} />
					</div>
					<div className='grid-right'>
						<QuickActions<CartRuleInterface>
							formStore={formStore}
							data={quickActionsData}
							title={t('Quick actions')}
						/>
					</div>
				</div>

				<div className='flex-btn-end px-5'>
					<SubHeaderMobileBtns onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
};

export default CartRuleForm;
