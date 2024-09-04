import { z } from 'zod';
export interface ConditionInterface {
	attribute: string;
	operator: string;
	attribute_type: string; // price
	value: number;
}
export interface CartRuleInterface {
	id?: number;
	name: string;
	description: string;
	status: number;
	customer_groups: string;
	coupon_type: string;
	use_auto_generation: boolean;
	coupon_code?: string;
	uses_per_coupon: number;
	usage_per_customer: number;
	starts_from: string | null;
	ends_till: string | null;
	condition_type: string;
	conditions?: ConditionInterface[];
	action_type: string;
	discount_amount: number;
	discount_quantity: number;
	discount_step: number;
	sort_order: number;
	apply_to_shipping: number;
	free_shipping: number;
	end_other_rules: number;
}

const stringZod = z.string().min(1);
const numberZod = z.coerce.number().min(0).max(1);

const conditionSchema = z.object({
	attribute: stringZod,
	operator: stringZod,
	attribute_type: stringZod,
	value: z.coerce.number().min(0),
});

export const cartRuleSchema = {
	name: stringZod,
	description: stringZod,
	status: numberZod,
	customer_groups: stringZod,
	coupon_type: stringZod,
	use_auto_generation: z.boolean(),
	coupon_code: z.string(),
	uses_per_coupon: z.coerce.number().min(0),
	usage_per_customer: z.coerce.number().min(0),
	starts_from: z.string().nullable(),
	ends_till: z.string().nullable(),
	condition_type: stringZod,
	conditions: z.array(conditionSchema).optional(),
	action_type: stringZod,
	discount_amount: z.coerce.number().min(0),
	discount_quantity: z.coerce.number().min(0),
	discount_step: z.coerce.number().min(0),
	sort_order: numberZod,
	apply_to_shipping: numberZod,
	free_shipping: numberZod,
	end_other_rules: numberZod,
};

export const defaultValues: CartRuleInterface = {
	name: '',
	description: '',
	status: 0,
	customer_groups: '',
	coupon_type: '',
	use_auto_generation: true,
	coupon_code: '',
	uses_per_coupon: 0,
	usage_per_customer: 0,
	starts_from: null,
	ends_till: null,
	condition_type: '',
	conditions: [],
	action_type: 'by_percent',
	discount_amount: 0,
	discount_quantity: 0,
	discount_step: 0,
	sort_order: 0,
	apply_to_shipping: 0,
	free_shipping: 0,
	end_other_rules: 0,
};
