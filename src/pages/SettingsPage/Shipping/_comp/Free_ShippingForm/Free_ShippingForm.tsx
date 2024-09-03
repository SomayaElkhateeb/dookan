import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { Input } from 'src/app/components/ui/input';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { postFreeShippingMethod } from 'src/app/store/slices/settingsPage/shipping/shippingAsyncThunks';
import { InferredZodSchema, useForm } from 'src/app/utils/hooks/form';
import { UseGetIdParams } from 'src/app/utils/hooks/GetParamsId';
import { z } from 'zod';

const Free_ShippingFormSchema = {
	active: z.number(),
	default_rate: z.coerce.number().positive(),
	type: z.string().min(1),
};
export type Free_ShippingFormSchemaValues = InferredZodSchema<typeof Free_ShippingFormSchema>;
export default function Free_ShippingForm() {
	const { id } = UseGetIdParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.shippingSettings);
	const handelDefaultValue = {
		active: 0,
		default_rate: 0,
		type: '',
	};

	const handleSubmit = (values: Free_ShippingFormSchemaValues) => {
		let formData = new FormData();

		if (id === 'free_free') {
			for (const [key, value] of Object.entries(values)) {
				formData.append(`sales[carriers][free][${key}]`, value.toString());
			}
		} else {
			for (const [key, value] of Object.entries(values)) {
				formData.append(`sales[carriers][flatrate][${key}]`, value.toString());
			}
		}
		dispatch(postFreeShippingMethod(formData)).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				navigate(-1);
			}
		});
	};
	// console.log(id);

	const { formStore, onSubmit } = useForm({
		schema: Free_ShippingFormSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue,
	});

	useEffect(() => {
		formStore.setValue('active', formStore.watch('active') ? 1 : 0);
	}, [formStore.watch('active')]);
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global gap-5'>
				<SubHeader title={t('Setup Shipping Method')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='custom_container flex-col-global'>
					<div className='global-cards md:w-[70%]'>
						<FormField
							formStore={formStore}
							name='default_rate'
							label={t('Default Rate')}
							render={(field) => <Input type='number' {...field} placeholder={''} />}
						/>
						<FormChoiceChips<Free_ShippingFormSchemaValues>
							formStore={formStore}
							name='type'
							label='Type'
							options={['per_unit ', 'per_order']}
						/>
						<div className='flex-col-global gap-2'>
							<p>{t('Active?')}</p>
							<div className='flex-row-global gap-2'>
								<FormSwitchField<Free_ShippingFormSchemaValues>
									formStore={formStore}
									name='active'
									enable
								/>
								<p>{formStore.watch('active') ? 'On' : 'Off'}</p>
							</div>
						</div>
					</div>
					<SubHeaderMobileBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
}
