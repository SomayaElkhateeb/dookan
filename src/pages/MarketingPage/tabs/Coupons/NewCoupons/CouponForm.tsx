import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useAppDispatch } from 'src/app/store';
import { postCoupon } from 'src/app/store/slices/marketingPage/coupon/couponAsyncThunks';
import { Button } from 'src/app/components/optimized';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useForm } from 'src/app/utils/hooks/form';
import { Form } from 'src/app/components/ui/form';

export const couponFormSchema = {
	coupon_qty: z.coerce.number().min(1),
	code_length: z.coerce.number().min(10),
	code_format: z.enum(['alphanumeric', 'alphabetical', 'numeric']),
	code_prefix: z.string().min(1).max(10),
	code_suffix: z.string().min(1).max(10),
};
export interface CouponFormData {
	coupon_qty: number;
	code_length: number;
	code_format: string;
	code_prefix: string;
	code_suffix: string;
}

export const defaultValues: CouponFormData = {
	coupon_qty: 0,
	code_length: 0,
	code_format: 'alphanumeric',
	code_prefix: '',
	code_suffix: '',
};

export default function CouponForm() {
	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const couponTypeOptions = [
		{ value: 'alphanumeric', label: t('Alphanumeric') },
		{ value: 'alphabetical', label: t('Alphabetical') },
		{ value: 'numeric', label: t('Numeric') },
	];

	const handleSubmit = (data: CouponFormData) => {
		console.log(data);
		dispatch(postCoupon({ data, id: 38 }));
	};

	const { formStore, onSubmit } = useForm<CouponFormData>({
		schema: couponFormSchema,
		handleSubmit: handleSubmit,
		defaultValues,
	});

	return (
		<div className='flex-col-global'>
			<Form {...formStore}>
				<form onSubmit={onSubmit} className='global-cards'>
					<h3 className='title'>{t('Coupon Details')}</h3>
					<FormField
						formStore={formStore}
						name='coupon_qty'
						label={t('Coupon Quantity')}
						render={(field) => <Input {...field} type='number' />}
					/>
					<FormField
						formStore={formStore}
						name='code_length'
						label={t('Code Length')}
						render={(field) => <Input {...field} type='number' />}
					/>
					<SelectFormField
						name='code_format'
						label={t('Code Format')}
						formStore={formStore}
						options={couponTypeOptions}
					/>
					<FormField
						formStore={formStore}
						name='code_prefix'
						label={t('Code Prefix')}
						render={(field) => <Input {...field} />}
					/>
					<FormField
						formStore={formStore}
						name='code_suffix'
						label={t('Code Suffix')}
						render={(field) => <Input {...field} />}
					/>
					<Button type='submit' variant='primary'>
						Generate Coupons
					</Button>
				</form>
			</Form>
		</div>
	);
}
