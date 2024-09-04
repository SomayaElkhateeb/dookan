import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AddBgIcon, DeleteExitIcon } from 'src/app/utils/icons';
import { Button, CheckBox } from 'src/app/components/optimized';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import TimePickerMui from 'src/app/components/optimized/Pickers/TimePicker';
import FormField from 'src/app/components/ui/form/field';
import { useTranslation } from 'react-i18next';
import { BranchInfoProps, initialDayInfo, WeekSchedule } from '../_hook/useAddBranchForm';

interface FixedDay {
	day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
}

export default function BranchAppointments({ formStore }: BranchInfoProps) {
	const { t } = useTranslation();
	const [activeDay, setActiveDay] = useState<FixedDay['day']>('Sun');
	const [dailySchedule, setDailySchedule] = useState<WeekSchedule>(initialDayInfo);
	const [showAdditionalHours, setShowAdditionalHours] = useState<boolean>(false);

	useEffect(() => {
		formStore.setValue('branchTimeSchedule', dailySchedule);
		const activeDaySchedule = dailySchedule[activeDay];
		if (activeDaySchedule.close) {
			activeDaySchedule.officialHours.open = '';
			activeDaySchedule.officialHours.close = '';
			activeDaySchedule.additionalHours.open = '';
			activeDaySchedule.additionalHours.close = '';
			formStore.setValue('branchTimeSchedule', dailySchedule);
		}
	}, [dailySchedule, activeDay, formStore]);

	useEffect(() => {
		formStore.setValue('opening_days', dailySchedule);
	}, [dailySchedule, formStore]);

	const handleSetActiveDay = (day: string) => {
		setActiveDay(day as FixedDay['day']);
	};

	const handleHoursChange = (
		value: Dayjs | null,
		type: 'opening_time' | 'closed_time',
		hourType: 'officialHours' | 'additionalHours',
	) => {
		setDailySchedule((prevSchedule) => ({
			...prevSchedule,
			[activeDay]: {
				...prevSchedule[activeDay],
				[hourType]: {
					...prevSchedule[activeDay][hourType],
					[type]: value ? value.format('HH:mm') : '',
				},
			},
		}));
	};

	const handleClosedToggle = () => {
		setDailySchedule((prevSchedule) => ({
			...prevSchedule,
			[activeDay]: {
				...prevSchedule[activeDay],
				isClosed: !prevSchedule[activeDay].isClosed,
			},
		}));
	};

	return (
		<div className='grid gap-4 w-full cardDetails-sharedClass p-5'>
			<h2 className='title text-lg'>{t("Opening hours")}</h2>
			<section>
				<SingleChoiceChips
					options={Object.keys(initialDayInfo)}
					setSelected={handleSetActiveDay}
					selected={activeDay}
				/>
			</section>
			<FormField
				formStore={formStore}
				name='opening_days'
				render={() => (
					<section className='flex items-center gap-4'>
						{!dailySchedule[activeDay].isClosed && (
							<div className='grid gap-4'>
								<div className='flex gap-4 items-center'>
									<TimePickerMui
										label={t('Opens at')}
										value={
											dailySchedule[activeDay].officialHours.opening_time
												? dayjs(dailySchedule[activeDay].officialHours.opening_time, 'HH:mm')
												: null
										}
										handleOnChange={(e) => handleHoursChange(e, 'opening_time', 'officialHours')}
									/>
									<TimePickerMui
										label={t('Closes at')}
										value={
											dailySchedule[activeDay].officialHours.closed_time
												? dayjs(dailySchedule[activeDay].officialHours.closed_time, 'HH:mm')
												: null
										}
										handleOnChange={(e) => handleHoursChange(e, 'closed_time', 'officialHours')}
									/>
									<div className='mt-9'>
										<CheckBox
											checked={dailySchedule[activeDay].isClosed}
											handleOnChange={handleClosedToggle}
											label={t('Closed')}
										/>
									</div>
								</div>

								{showAdditionalHours && (
									<div className='flex gap-4'>
										<TimePickerMui
											label={t('Opens at')}
											value={
												dailySchedule[activeDay].additionalHours.opening_time
													? dayjs(dailySchedule[activeDay].additionalHours.opening_time, 'HH:mm')
													: null
											}
											handleOnChange={(e) => handleHoursChange(e, 'opening_time', 'additionalHours')}
										/>
										<TimePickerMui
											label={t('Closes at')}
											value={
												dailySchedule[activeDay].additionalHours.closed_time
													? dayjs(dailySchedule[activeDay].additionalHours.closed_time, 'HH:mm')
													: null
											}
											handleOnChange={(e) => handleHoursChange(e, 'closed_time', 'additionalHours')}
										/>
									</div>
								)}
							</div>
						)}
					</section>
				)}
			/>

			{dailySchedule[activeDay].isClosed && (
				<CheckBox
					checked={dailySchedule[activeDay].isClosed}
					handleOnChange={handleClosedToggle}
					label={t('Closed')}
				/>
			)}
			<div>
				<Button
					variant='tertiary'
					LeftIcon={showAdditionalHours ? DeleteExitIcon : AddBgIcon}
					text={showAdditionalHours ? t('Delete Hours') : t('Add More Hours')}
					onClick={() => setShowAdditionalHours(!showAdditionalHours)}
				/>
			</div>
		</div>
	);
}

// import { useEffect, useState } from 'react';
// import { FieldValues } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import dayjs, { Dayjs } from 'dayjs';
// import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';
// import FormCheckbox from 'src/app/components/ui/form/FormCheckbox';
// import FormField from 'src/app/components/ui/form/field';
// import { BranchInfoProps } from './_hook/useAddBranchForm';
// import TimePickerMui from 'src/app/components/optimized/Pickers/TimePicker';



// const BranchAppointments = ({ formStore }: BranchInfoProps) => {
// 	const { t } = useTranslation();
// 	const [dailySchedule, setDailySchedule] = useState<any>({
// 		day: 'sunday',
// 		is_open: 0,
// 		times: {
// 			opening_time: '',
// 			closed_time: '',
// 		},
// 	});

// 	const handleClosedToggle = () => {
// 		setDailySchedule((prevSchedule: any) => ({
// 			...prevSchedule,
// 			is_open: !prevSchedule.is_open,
// 		}));
// 	};

// 	const handleHoursChange = (
// 		value: Dayjs | null,
// 		type: 'opening_time' | 'closed_time',
// 	) => {
// 		setDailySchedule((prevSchedule: any) => ({
// 			...prevSchedule,
// 			[type]: value ? value.format('HH:mm') : '',
// 		}));
// 	};

// 	useEffect(() => {
// 		formStore.setValue(
// 			'dailySchedule.is_open',
// 			formStore.watch('dailySchedule.is_open') ? 1 : 0,
// 		);
// 	}, [formStore.watch('dailySchedule.is_open')]);

// 	return (
// 		<div className='grid gap-4 w-full cardDetails-sharedClass p-5'>
// 			<h2 className='title text-lg'>{t("Opening hours")}</h2>
// 			<FormChoiceChips<FieldValues>
// 				formStore={formStore}
// 				name='opening_days.day'
// 				options={['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}
// 			/>

// 			<FormField
// 				formStore={formStore}
// 				name='opening_days'
// 				render={() => (
// 					<section className='flex items-center gap-4'>
// 						<div className='grid gap-4'>
// 							<div className='flex gap-4 items-center'>
// 								{dailySchedule.is_open === 0 && <>

// 									<TimePickerMui
// 										label={t('Opens at')}
// 										value={dailySchedule.times.opening_time ? dayjs(dailySchedule.times.opening_time, 'HH:mm') : null}
// 										handleOnChange={(e) => handleHoursChange(e, 'opening_time')}
// 									/>
// 									<TimePickerMui
// 										label={t('Closes at')}
// 										value={dailySchedule.times.closed_time ? dayjs(dailySchedule.times.closed_time, 'HH:mm') : null}
// 										handleOnChange={(e) => handleHoursChange(e, 'closed_time')}
// 									/>
// 								</>}
// 								<div className='mt-9'>
// 									<FormCheckbox
// 										formStore={formStore}
// 										name={`opening_days.${dailySchedule.day}.is_open`}
// 										label={t('Closed')}
// 										handleOnChange={handleClosedToggle}
// 										checked={dailySchedule.is_open}
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					</section>
// 				)}
// 			/>
// 		</div>
// 	);
// };

// export default BranchAppointments;
