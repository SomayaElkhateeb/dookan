
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus } from 'react-icons/fa6';
import { Button } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';

import {
	productShippingMethodCollection,
	productShippingRateCollection,
	productShippingRateMap,
	productStatesOfTheProductCollection
} from '../utils';
import { Props, Values } from '../types';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getShippingList } from 'src/app/store/slices/settingsPage/shipping/shippingAsyncThunks';


export default function AdvancedShippingOptionsManager<TFormStore>(props: Props<TFormStore>) {
	const { shippingList } = useAppSelector((state) => state.shippingSettings);
	const { t } = useTranslation();
	const [isActive, setIsActive] = useState(false);
	const dispatch = useAppDispatch()
	const isFixedRate =
		useWatch({
			control: props.formStore.control,
			name: 'shipping_rate_type',
		}) === productShippingRateMap['fixed'];


	useEffect(() => {

		dispatch(getShippingList());
	}, [dispatch]);
	if (!isActive) {
		return (
			<Button
				variant='secondary'
				textClassName='flex items-center justify-center gap-1.5 whitespace-nowrap'
				className='px-0 border-0'
				onClick={() => setIsActive(true)}
			>
				<FaCirclePlus className='size-5' />
				{t('Add more advanced shipping options')}
			</Button>
		);
	}

	return (
		<>

			<FormChoiceChips<Values>
				formStore={props.formStore}
				name='state'
				label={t('States of the product')}
				options={productStatesOfTheProductCollection}
			/>
			<FormChoiceChips<Values>

				formStore={props.formStore}
				name='shipping_rate_type'
				label={t('Shipping Rate')}
				options={productShippingRateCollection}
			/>
			{isFixedRate && (
				<FormField
					formStore={props.formStore}
					name='shipping_rate'
					render={(field) => <Input {...field} type='number' />}
					label={{ children: t('Shipping Rate') }}
					container={{ className: 'md:w-1/2' }}
				/>
			)}
			{/* <FormField
				formStore={props.formStore}
				name='shipping.method'
				label={{ children: t('Shipping Method'), className: 'font-medium text-[1.1rem]' }}
				render={(field) => {
					return (
						<div className='flex flex-wrap gap-2'>
							{productShippingMethodCollection.map((rate) => (
								<button
									type='button'
									key={rate}
									value={rate}
									className={`flex items-center gap-2 cursor-pointer rounded-full py-1.5 px-3.5 ${rate === field.value
										? 'bg-success text-white'
										: 'border border-success text-green bg-success/10'
										}`}
									onClick={() => {
										field.onChange(rate);
									}}
								>
									<span>{rate !== rate ? <FaCheck /> : <>+</>}</span>
									<span className='capitalize'>{rate}</span>
								</button>
							))}
						</div>
					);
				}}
			/> */}
			<FormChoiceChips<Values>

				formStore={props.formStore}
				name='shipping_method'
				label={t('Shipping method')}
				options={[
					shippingList.free.method,
					shippingList.flatrate.method,
					shippingList.mpdhl.method,
				]}
			/>
			<button className='text-pri-dark w-fit font-medium' onClick={() => setIsActive(false)}>
				{t('Less Advanced Options')}
			</button>
		</>
	);
}
