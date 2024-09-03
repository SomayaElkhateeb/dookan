
import { z } from 'zod';

import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { useForm } from 'src/app/utils/hooks/form';
import { ActiveDates, ActiveDatesValues, DateTimeType, activeDatesSchema } from '../../../Campaigns/NewCampaign/_hook/useCampaign';

interface selectItemsInterface {
	key: string
}
export interface newDiscountInterface {
	discountName: string;
	discountType: string;
	discountValue?: number;
	discountPercentage?: number;
	applyToType: string;
	specificCategories?: selectItemsInterface[];
	specificProducts?: selectItemsInterface[];
	selectProductsX?: selectItemsInterface[];
	ProductXToProductYType?: string;
	quantityGets?: number;
	percentageGets?: number;
	selectProductsY?: selectItemsInterface[];
	customerSegment: string;
	specificCustomerGroup?: selectItemsInterface[];
	specificCustomer?: selectItemsInterface[];

	miniPrice?: number;
	miniQuantity?: number;
	activeDates: ActiveDates;
	active: boolean;
	limitOneCustomer: boolean;
	UsageNumber?: number;
}

export default function useCustomHookNewDiscount(
	discountType?: string,
	applyToType?: string,
	productXtoYType?: string | undefined,
	customerSegment?: string,
	selectedMinimumRequirements?: string,
	isCheck?: boolean,
) {
	const handelDefaultValue = () => {
		return {
			discountName: '',
			discountType: 'Free shipping',
			discountValue: 0,
			discountPercentage: 0,
			applyToType: 'All products',
			specificCategories: [],
			specificProducts: [],
			selectProductsX: [],
			ProductXToProductYType: 'Free',
			quantityGets: 0,
			percentageGets: 0,
			selectProductsY: [],
			customerSegment: 'All customers',
			specificCustomerGroup: [],
			specificCustomer: [],
			miniPrice: 0,
			miniQuantity: 0,
			activeDates: ActiveDatesValues,
			active: false,
			limitOneCustomer: false,
			UsageNumber: 0,
		};
	};

	const discountSchema = () => {
		const arrayValidation = {
			specificCategories:
				applyToType === 'Specific category'
					? z
						.array(
							z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						)
						.min(1)
					: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.default([]),
			specificProducts:
				applyToType === 'Specific products'
					? z
						.array(
							z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						)
						.min(1)
					: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.default([]),
			selectProductsX:
				applyToType === 'Buy x get y'
					? z
						.array(
							z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						)
						.min(1)
					: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.default([]),
			selectProductsY:
				applyToType === 'Buy x get y'
					? z
						.array(
							z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						)
						.min(1)
					: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.default([]),
			specificCustomerGroup:
				customerSegment === 'Specific customer groups'
					? z
						.array(
							z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						)
						.min(1)
					: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.default([]),

			specificCustomer:
				customerSegment === 'Specific customers'
					? z
						.array(
							z.object({
								id: z.string().min(1),
								name: z.string().min(1),
							}),
						)
						.min(1)
					: z
						.optional(
							z.array(
								z.object({
									id: z.string().min(1),
									name: z.string().min(1),
								}),
							),
						)
						.default([]),
		};

		// /////////////////////
		// /////////////////////
		return {
			discountName: z.string().min(3).max(60),
			discountType: z.string().min(3),
			discountValue:
				discountType === 'Fixed amount'
					? z.coerce.number().positive().min(1)
					: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),
			discountPercentage:
				discountType === 'Percentage'
					? z.coerce.number().positive().min(1)
					: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),
			applyToType: z.string().min(3),

			ProductXToProductYType:
				applyToType === 'Buy x get y'
					? z.string().min(1)
					: z.optional(z.string().min(1)).or(z.literal('')),
			percentageGets:
				productXtoYType === 'Specify percentage'
					? z.coerce.number().positive().min(0).max(100)
					: z.optional(z.coerce.number().positive().min(0).max(100)).or(z.literal(0)),
			quantityGets:
				productXtoYType === 'Specify percentage'
					? z.coerce.number().positive().min(0).max(100)
					: z.optional(z.coerce.number().positive().min(0).max(100)).or(z.literal(0)),
			customerSegment: z.string().min(3),
			miniPrice:
				selectedMinimumRequirements === 'Minimum price'
					? z.coerce.number().positive().min(1)
					: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),

			miniQuantity:
				selectedMinimumRequirements === 'Minimum quantity'
					? z.coerce.number().positive().min(1)
					: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),

			activeDates: activeDatesSchema,

			active: z.boolean(),
			limitOneCustomer: z.boolean().default(false),

			UsageNumber: isCheck
				? z.coerce.number().positive().min(1)
				: z.optional(z.coerce.number().positive().min(1)).or(z.literal(0)),
			...arrayValidation,
		};
	};
	// ///////////////////////////////////
	// ////////////////////////////////////
	const [activeDates, setActiveDates] = useState<ActiveDates>(ActiveDatesValues);
	const [endDateEnabled, setEndDateEnabled] = useState(false);
	// //////////////////////
	// /////////////////////
	const handleSubmit = (values: newDiscountInterface) => {
		console.log(values);
	};
	const { formStore, onSubmit } = useForm({
		schema: discountSchema(),
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	// ////////////////////////
	// ///////////////////////
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
		discountSchema,
		activeDates,
		endDateEnabled,
		setEndDateEnabled,
		handleDateTimeChange,
		updatedDates,
	};
}
