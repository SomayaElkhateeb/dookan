
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from 'src/app/components/ui/card';
import FormField from 'src/app/components/ui/form/field';
import OtherProductShippingOptions from './_comp/OtherProductShippingOptions';
import VirtualProductShippingOptions from './_comp/VirtualProductShippingOptions';
import { productShippingTypeMap } from './utils';
import { Props } from './types';
import { CheckBox } from 'src/app/components/optimized';
import { useEffect } from 'react';
import { Input } from 'src/app/components/ui/input';
import DropDownMenu from 'src/app/components/optimized/DropDownMenu';

export default function ProductFormShippingSection<TFormStore>(props: Props<TFormStore>) {
	const { t } = useTranslation();
	// const shippingType = useWatch({
	// 	control: props.formStore.control,
	// 	name: 'shipping.type',
	// });

	useEffect(() => {
		props.formStore.watch('is_shipped') // ???
			? props.formStore.setValue('is_shipped', 1)
			: props.formStore.setValue('is_shipped', 0);
	}, [props.formStore.watch('is_shipped')]);


	return (
		<section className='global-cards' id={props.id}>

			<p className="title">{t('Shipping')}</p>

			<section className='flex flex-col gap-4'>
				{/* <FormField
					formStore={props.formStore}
					name='shipping.isShippableOrPickupable'
					container={{ className: 'gap-x-2' }}
					label={{
						children: (
							<div className='flex flex-col'>
								<p>{t('Is this product require shipping or pickup?')}</p>
								<p className='text-sm text-gray-400'>
									{t(
										"Enable this option if the product needs to be physically delivered to customers either via shipping or by self-pickup. If this product is a service or a downloadable item that doesn't require delivery, keep this option disabled.",
									)}
								</p>
							</div>
						),
						className: 'self-center mt-0.5',
					}}
					render={({ value, ...field }) => (
						<Checkbox
							{...field}
							checked={value}
							style={{ gridArea: 'input', padding: 0 }}
							className='justify-self-start'
						/>
					)}
					layout='inline-reversed'
				/> */}
				<div className='flex flex-row gap-2 items-start'>


					<FormField

						formStore={props.formStore}
						name='is_shipped'
						render={(field) => (
							<CheckBox
								checked={props.formStore.watch('is_shipped') > 0 ? true : false}
								handleOnChange={field.onChange}
							/>
						)}
					/>
					<div className='flex-col-global gap-1 '>
						<p className="title">{t("Is this product require shipping or pickup?")}</p>
						<p className="sub-title opacity-80">{t("Enable this option if the product needs to be physically delivered to customers either via shipping or by self-pickup. If this product is a service or a downloadable item that doesn’t require delivery, keep this option disabled.")}</p>
					</div>
				</div>
				<FormField
					formStore={props.formStore}
					name='downloaded_link'
					render={(field) => <Input {...field} type='url' />}
					label={`${t('Download link')} (${t('Optional')})`}
					container={{ className: 'md:w-1/2' }}
				// layout='inline-reversed'
				/>
				{/* {shippingType === productShippingTypeMap.online ? (
					<VirtualProductShippingOptions formStore={props.formStore} />
				) : shippingType === productShippingTypeMap.pickup ? (
					<OtherProductShippingOptions formStore={props.formStore} />
				) : null} */}
				{/* <DropDownMenu title={t('More Advanced Options')}> */}
					<OtherProductShippingOptions formStore={props.formStore} />
				{/* </DropDownMenu> */}
			</section>
		</section>
	);
}
