import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import AppliesBasedOptions from './AppliesBasedOptions';
import { IAddRate } from '../Comp/AddRate';

export default function AppliesBasedOn({ formStore }: { formStore: UseFormReturn<IAddRate> }) {
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = useState<string>('');
	const options = [t('Order Weight'), t('Order price')];
	return (
		<section>
			<h5 className='text-sm text-pri-dark font-semibold pb-2'>{t('Applies to')}</h5>
			<SingleChoiceChips
				options={options}
				selected={selectedOption}
				setSelected={(option: string) => setSelectedOption(option)}
			/>
			<AppliesBasedOptions applyTo={selectedOption} formStore={formStore} />
		</section>
	);
}
