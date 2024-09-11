import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from 'src/app/components/ui/card';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';

import HorizontalBox from 'src/app/components/ui/horizontal-box';
import ProfitField from './_comp/ProfitField';
import BulkPricesManager from './_comp/BulkPricesManager';
import { CheckBox } from 'src/app/components/optimized';
import { useEffect } from 'react';
import { Props } from './types';

export default function ProductFormPricingSection<TFormStore>(props: Props<TFormStore>) {
	const { t } = useTranslation();
	useEffect(() => {
		props.formStore.watch('taxable') // ???
			? props.formStore.setValue('taxable', 1)
			: props.formStore.setValue('taxable', 0);
	}, [props.formStore.watch('taxable')]);
	
	return (
		<section className='global-cards' id={props.id}>
			<p className='title'>{t('Pricing')}</p>

			{/* <CardContent className='flex-col gap-4'> */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
				<FormField
					formStore={props.formStore}
					name='price'
					label={t('Price')}
					render={(field) => (
						<HorizontalBox start='SAR' startSeparator>
							<Input {...field} type='number' className='border-0 rounded-none' />
						</HorizontalBox>
					)}
				/>
				<FormField
					formStore={props.formStore}
					name='discount'
					label={`${t('Discount price')} (${t('Optional')})`}
					render={(field) => (
						<HorizontalBox start='SAR' startSeparator>
							<Input {...field} type='number' className='border-0 rounded-none' />
						</HorizontalBox>
					)}
				/>
				<FormField
					formStore={props.formStore}
					name='cost'
					label={`${t('Cost price')} (${t('Optional')})`}
					render={(field) => (
						<HorizontalBox start='SAR'>
							<Input {...field} type='number' className='border-0 rounded-none' />
						</HorizontalBox>
					)}
				/>
				<ProfitField formStore={props.formStore} />
				<div className='flex-col-global'>
					<FormField
						formStore={props.formStore}
						name='taxable'
						render={(field) => (
							<CheckBox
								label={t('Taxable product')}
								checked={props.formStore.watch('taxable') > 0 ? true : false}
								handleOnChange={field.onChange}
							/>
						)}
					/>
					
				</div>
			</div>
			{/* <BulkPricesManager formStore={props.formStore} /> */}
			{/* </CardContent> */}
		</section>
	);
}
