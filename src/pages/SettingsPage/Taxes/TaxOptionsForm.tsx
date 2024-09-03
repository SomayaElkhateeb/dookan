import { useTranslation } from 'react-i18next';
import { CheckBox } from 'src/app/components/optimized';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import { TaxesProps, TaxesSettingsInterface } from 'src/pages/SettingsPage/Taxes/TaxesSettings';

export default function TaxOptionsForm({ formStore }: TaxesProps) {
	const { t } = useTranslation();
	return (
		<div className='global-cards'>
			<FormChoiceChips<TaxesSettingsInterface>
				formStore={formStore}
				name='taxAppliesTo'
				label={t('Tax applies to')}
				options={['Subtotal', 'Subtotal + shipping']}
			/>
			<CheckBox
				label={t('Include tax in product prices')}
				checked={formStore.watch('includeTaxInProductPrices')}
				handleOnChange={(option) => {
					formStore.setValue('includeTaxInProductPrices', option);
				}}
			/>
			<div>
				<FormChoiceChips<TaxesSettingsInterface>
					formStore={formStore}
					name='defaultTaxClass'
					label={t('Default Tax Class')}
					options={['None', 'Taxable goods']}
				/>
				<p className='paragraph text-subtitle'>
					This tax class will be applied automatically to any new added product.
				</p>
			</div>

			<FormChoiceChips<TaxesSettingsInterface>
				formStore={formStore}
				name='taxDisplayInCheckout'
				label={t('Tax display in checkout')}
				options={['Hide tax', 'Show tax value', 'Only show “included tax” text']}
			/>

			<FormChoiceChips<TaxesSettingsInterface>
				formStore={formStore}
				name='zoneDefinedBy'
				label={t('Zone defines by')}
				options={['Shipping address', 'Payment address']}
			/>

			<FormChoiceChips<TaxesSettingsInterface>
				formStore={formStore}
				name='checkOutWith'
				label='Customer can check out with'
				options={['Email & phone', 'Email only', 'Phone only']}
			/>
		</div>
	);
}
