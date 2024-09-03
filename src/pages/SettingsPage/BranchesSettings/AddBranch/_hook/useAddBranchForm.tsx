
const createEmptyDayInfo = (): DailyHours => ({
	officialHours: { opening_time: '', closed_time: '' },
	additionalHours: { opening_time: '', closed_time: '' },
	is_open: false,
});

export const initialDayInfo: WeekSchedule = {
	Mon: createEmptyDayInfo(),
	Tue: createEmptyDayInfo(),
	Wed: createEmptyDayInfo(),
	Thu: createEmptyDayInfo(),
	Fri: createEmptyDayInfo(),
	Sat: createEmptyDayInfo(),
	Sun: createEmptyDayInfo(),

};

export interface TimeRange {
	opening_time: string;
	closed_time: string;
	is_open: boolean;

}

export interface DailyHours {
	officialHours: TimeRange;
	additionalHours?: TimeRange;

}

export interface WeekSchedule {
	Mon: DailyHours;
	Tue: DailyHours;
	Wed: DailyHours;
	Thu: DailyHours;
	Fri: DailyHours;
	Sat: DailyHours;
	Sun: DailyHours;

}

// {"day":"sunday","is_open":1,"times":[{"opening_time":"10:15","closed_time":"12:20"},{"opening_time":"15:30","closed_time":"22:20"}]}

import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

// export type OpeningDaysType = OpeningDay[];

export interface BranchesType {
	en: {
		name: string;
		address: string;
		street: string;
		area?: string;
		city?: string;
		state?: string;
		country?: string;
		building?: string;
		landmark?: string;
	};
	ar: {
		name: string;
		address: string;
		street: string;
		area?: string;
		city?: string;
		state?: string;
		country?: string;
		building?: string;
		landmark?: string;
	};
	main_branch?: number;
	type?: string;
	code?: string;
	pick_up?: number;
	phone?: string;
	latitude?: number;
	longitude?: number;
	work_time: string;
	show_in_footer?: number;
	opening_days?: {
		day: string;
		is_open: number;
		times: {
			opening_time: string;
			closed_time: string;
		};
	};
}

export interface BranchInfoProps {
	formStore: UseFormReturn<BranchesType>;
}

export default function useAddBranchForm() {
	const zodString = z.string().min(1).optional();
	const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

	const TimeSlotSchema = z.object({
		opening_time: z.string().regex(timePattern),
		closed_time: z.string().regex(timePattern),
	});

	const OpeningDaySchema = z.object({
		day: z.string(),
		is_open: z.number().min(0).max(1),
		times: z.array(TimeSlotSchema),
	});

	const branchSettingsSchema = {
		en: z.object({
			name: z.string().min(1),
			address: z.string().min(1),
			street: z.string().min(1),
			area: zodString,
			city: zodString,
			state: zodString,
			country: zodString,
			building: zodString,
			landmark: zodString,
		}),
		ar: z.object({
			name: z.string().min(1),
			address: z.string().min(1),
			street: z.string().min(1),
			area: zodString,
			city: zodString,
			state: zodString,
			country: zodString,
			building: zodString,
			landmark: zodString,
		}),
		main_branch: z.coerce.number().min(0).max(1).optional(),
		type: z.string(),
		code: zodString,
		pick_up: z.coerce.number().min(0).max(1).optional(),
		phone: zodString,
		latitude: z.number().optional(),
		longitude: z.number().optional(),
		work_time: z.string().regex(timePattern),
		show_in_footer: z.coerce.number().min(0).max(1).optional(),
		opening_days: z.array(OpeningDaySchema).optional(),
	};

	const handleDefaultValue = (): BranchesType => {
		return {
			en: {
				name: '',
				address: '',
				street: '',
				area: '',
				city: '',
				state: '',
				country: '',
				building: '',
				landmark: '',
			},
			ar: {
				name: '',
				address: '',
				street: '',
				area: '',
				city: '',
				state: '',
				country: '',
				building: '',
				landmark: '',
			},
			main_branch: 0,
			type: 'warehouse',
			code: '',
			pick_up: 0,
			phone: '',
			latitude: 0,
			longitude: 0,
			work_time: '',
			show_in_footer: 0,
			opening_days: {
				day: 'sunday',
				is_open: 0,
				times: {
					opening_time: '',
					closed_time: '',
				},
			},
		};
	};

	return {
		branchSettingsSchema,
		handleDefaultValue,
	};
}
