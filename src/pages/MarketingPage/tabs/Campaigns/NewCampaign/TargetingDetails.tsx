import { useTranslation } from 'react-i18next';

import { CampaignInputsTypes, CampaignFormProps } from './_hook/useCampaign';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';

const targetingOptions = [
	'Purchased from you',
	'Visited your store',
	'liked your page',
	'having specific interests',
];

export default function TargetingDetails({ formStore }: CampaignFormProps) {
	const { t } = useTranslation();

	return (
		<div className='global-cards grid grid-cols-2'>
			<h2 className='title text-lg'>{t('Targeting')}</h2>
			<FormChoiceChips<CampaignInputsTypes>
				formStore={formStore}
				name='targetSimilarPeople'
				label='Target who is similar to people'
				options={targetingOptions}
			/>
			{formStore.watch('targetSimilarPeople') === 'having specific interests' && (
				<SpecificAutoCompleteInput<CampaignFormProps>
					name='selectedInterests'
					label={t('Specific interests')}
					formStore={formStore}
				/>
			)}
		</div>
	);
}
