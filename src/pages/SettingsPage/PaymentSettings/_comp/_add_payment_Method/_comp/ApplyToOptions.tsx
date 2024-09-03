import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { AddPayment_MethodTypes } from '../_hook/useAddMerchantPaymentMethod';

interface ApplyToOptions {
	applyTo: string;
	formStore: UseFormReturn<AddPayment_MethodTypes>;
}
export default function ApplyToOptionsBankTransfer({ applyTo, formStore }: ApplyToOptions) {
	const { t } = useTranslation();

	const handelRenderingComponentWithApplyTo = () => {
		switch (applyTo) {
			case 'All':
				return '';
			case 'Specific products':
				return (
					<SpecificAutoCompleteInput<AddPayment_MethodTypes>
						name='specificProducts'
						label={t('select products')}
						formStore={formStore}
					/>
				);
			case 'Specific customers':
				return (
					<SpecificAutoCompleteInput<AddPayment_MethodTypes>
						name='specificCustomers'
						label={t('Specific customers')}
						formStore={formStore}
					/>
				);
		}
	};

	return handelRenderingComponentWithApplyTo();
}
