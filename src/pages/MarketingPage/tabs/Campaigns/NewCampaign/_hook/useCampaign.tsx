import { z } from 'zod';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';

import { useForm } from 'src/app/utils/hooks/form';
import { selectItemsInterface } from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/GeneralInfoCustomerForm';

export interface CampaignFormProps {
	formStore: UseFormReturn<CampaignInputsTypes>;
}
export interface ActiveDates {
	startActivation: { startDate: Date; startTime: string };
	endActivation: { endDate: Date; endTime: string };
}
export interface CampaignInputsTypes {
	targetSimilarPeople: string;
	campaignName: string;
	activityName: string;
	activeDates: ActiveDates;
	details?: string;
	budget: number;
	selectedInterests?: selectItemsInterface[];
	products: selectItemsInterface[];
}
export type DateTimeType = 'startDate' | 'startTime' | 'endDate' | 'endTime';
export const ActiveDatesValues = {
	startActivation: { startDate: new Date(), startTime: '00:00' },
	endActivation: { endDate: new Date(), endTime: '00:00' },
};

export const activeDatesSchema = z.object({
	startActivation: z.object({
		startDate: z.date({ required_error: 'Start date is required' }),
		startTime: z
			.string()
			.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid start time format' }),
	}),
	endActivation: z.object({
		endDate: z.date({ required_error: 'End date is required' }),
		endTime: z
			.string()
			.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid end time format' }),
	}),
});

export default function useCampaign(target?: string) {
	const { t } = useTranslation();

	const newCampaignSchema = {
		budget: z.coerce.number().positive().min(1),
		campaignName: z.string().min(1, { message: 'Campaign name is required' }),
		activityName: z.string().min(1, { message: 'Activity name is required' }),
		targetSimilarPeople: z
			.string()
			.min(1, { message: 'Target similar people selection is required' }),
		activeDates: activeDatesSchema,
		details: z.optional(z.string().min(1, { message: 'Ad text is required' })).or(z.literal('')),
		selectedInterests:
			target === 'having specific interests'
				? z.array(
						z.object({
							id: z.string().min(1),
							name: z.string().min(1),
						}),
				  )
				: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.or(z.literal('')),

		products: z
			.array(
				z.object({
					id: z.string().min(1),
					name: z.string().min(1),
				}),
			)
			.min(1),
	};

	const handleDefaultValue = () => {
		return {
			targetSimilarPeople: 'having specific interests',
			selectedInterests: [],
			campaignName: '',
			activityName: '',
			adText: '',
			products: [],
			details: '',
			budget: 0,
			activeDates: ActiveDatesValues,
		};
	};
	const [activeDates, setActiveDates] = useState<ActiveDates>(ActiveDatesValues);
	const [endDateEnabled, setEndDateEnabled] = useState(false);

	const handleSubmit = (values: CampaignInputsTypes) => {
		console.log(values);
	};
	const { formStore, onSubmit } = useForm({
		schema: newCampaignSchema,
		handleSubmit: handleSubmit,
		defaultValues: handleDefaultValue(),
	});

	const updatedDates = { ...activeDates };
	const handleDateTimeChange = (type: DateTimeType, value: Dayjs | null) => {
		if (value) {
			if (type === 'startDate') {
				updatedDates.startActivation.startDate = value.toDate();
			} else if (type === 'startTime') {
				updatedDates.startActivation.startTime = value.format('HH:mm');
			} else if (type === 'endDate') {
				updatedDates.endActivation.endDate = value.toDate();
			} else if (type === 'endTime') {
				updatedDates.endActivation.endTime = value.format('HH:mm');
			}
			setActiveDates(updatedDates);
		}
	};
	return {
		formStore,
		onSubmit,
		updatedDates,
		activeDates,
		endDateEnabled,
		setEndDateEnabled,
		handleDateTimeChange,
	};
}
