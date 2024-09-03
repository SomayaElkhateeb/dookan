import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, TimePicker } from 'src/app/components/optimized';
import { AddBgIcon, DeleteExitIcon } from 'src/app/utils/icons';
import {
	ActiveDates,
	DateTimeType,
} from 'src/pages/MarketingPage/tabs/Campaigns/NewCampaign/_hook/useCampaign';

export default function SharedActiveDate({
	activeDates,
	handleDateTimeChange,
	endDateEnabled,
	setEndDateEnabled,
}: {
	activeDates: ActiveDates;
	handleDateTimeChange: (e: DateTimeType, el: Dayjs | null) => void;
	endDateEnabled: boolean;
	setEndDateEnabled: (e: boolean) => void;
}) {
	//  hooks
	const { t } = useTranslation();
	return (
		<>
			<div className='flex col-span-2 gap-4'>
				<DatePicker
					value={dayjs(activeDates.startActivation.startDate)}
					label={t('Start Date')}
					handleOnChange={(date) => handleDateTimeChange('startDate', date)}
				/>
				<TimePicker
					value={dayjs(activeDates.startActivation.startTime, 'HH:mm')}
					label={t('Start Time')}
					handleOnChange={(time) => handleDateTimeChange('startTime', time)}
				/>
			</div>
			{endDateEnabled && (
				<div className='flex col-span-2 gap-4'>
					<DatePicker
						value={dayjs(activeDates.endActivation.endDate)}
						label={t('End Date')}
						handleOnChange={(date) => handleDateTimeChange('endDate', date)}
					/>
					<TimePicker
						value={dayjs(activeDates.endActivation.endTime, 'HH:mm')}
						label={t('End Time')}
						handleOnChange={(time) => handleDateTimeChange('endTime', time)}
					/>
				</div>
			)}
			<Button
				variant='tertiary'
				LeftIcon={endDateEnabled ? DeleteExitIcon : AddBgIcon}
				onClick={() => setEndDateEnabled(!endDateEnabled)}
				className='col-span-2'
			>
				{endDateEnabled ? t('Remove End Date') : t('Add End Date')}
			</Button>
		</>
	);
}
