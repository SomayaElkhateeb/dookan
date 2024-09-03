import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { AddBgIcon, DeleteExitIcon } from 'src/app/utils/icons';
import { Button, DatePicker, TimePicker } from 'src/app/components/optimized';

import useCampaign, { CampaignFormProps } from './_hook/useCampaign';
import SharedActiveDate from '../../Discounts/SharedActiveDate';

export default function BudgetDetails({ formStore }: CampaignFormProps) {
	const { t } = useTranslation();

	const { activeDates, endDateEnabled, setEndDateEnabled, handleDateTimeChange } = useCampaign('');

	return (
		<div className='global-cards grid grid-cols-2'>
			<h2 className='title text-lg col-span-2'>{t('Budget & Active dates')}</h2>
			<FormField
				formStore={formStore}
				name='budget'
				label={t('Budget')}
				render={(field) => <Input type='number' {...field} />}
			/>
			<SharedActiveDate
				endDateEnabled={endDateEnabled}
				setEndDateEnabled={setEndDateEnabled}
				handleDateTimeChange={handleDateTimeChange}
				activeDates={activeDates}
			/>
		</div>
	);
}
