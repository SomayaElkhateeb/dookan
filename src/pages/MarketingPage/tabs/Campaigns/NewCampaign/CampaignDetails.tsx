import { useTranslation } from 'react-i18next';

import { CampaignFormProps } from './_hook/useCampaign';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { Textarea } from 'src/app/components/ui/textarea';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
export default function CampaignDetails({ formStore }: CampaignFormProps) {
	const { t } = useTranslation();

	return (
		<div className='global-cards grid grid-cols-2'>
			<h2 className='title  col-span-2'>{t('Campaign details')}</h2>
			<div className='grid gap-4 col-span-2 xl:col-span-1'>
				<FormField
					formStore={formStore}
					name='campaignName'
					label={t('Campaign name')}
					render={(field) => <Input {...field} />}
				/>
				<FormField
					formStore={formStore}
					name='activityName'
					label={t('Activity name')}
					render={(field) => <Input {...field} />}
				/>
				<div>
					<SpecificAutoCompleteInput<CampaignFormProps>
						name='products'
						label={t('Products')}
						formStore={formStore}
					/>
					<p className='paragraph text-subtitle'>{t('Select up to 5 products to promote.')}</p>
				</div>
				<FormField
					formStore={formStore}
					name='details'
					label={t('Details & instructions (optional)')}
					render={(field) => <Textarea {...field} />}
				/>
			</div>
		</div>
	);
}
