import { z } from 'zod';

export interface CartRuleInterface {
    name: string;
    description: string;
    status: number; // 0 | 1
    customer_groups: number; // []
    coupon_type: number; // 0| 1
    use_auto_generation: number; // 0 | 1
    coupon_code: string;
    uses_per_coupon: number; // ??
    usage_per_customer: number;
    starts_from: string; // date and time
    ends_till: string; // date and time
    sort_order: number; // 0 | 1
    condition_type: number; // 0 | 1

    conditions: {
        attribute?: string; // cart|base_sub_total
        operator?: string; // ==|!=|>=|<=|>|<
        attribute_type?: string; // price
        value?: number; 
    }[];

    action_type: string; // by_percent|by_fixed|cart_fixed|buy_x_get_y
    discount_amount: number;
    discount_quantity: number;
    discount_step: number;
    apply_to_shipping: number; // 0 | 1
    free_shipping: number; // 0 | 1
    end_other_rules: number; // 0 | 1
}

const stringZod = z.string().min(1);
const numberZod = z.coerce.number().min(0).max(1);

export const cartRuleSchema = {
    name: stringZod,
    description: stringZod,
    status: numberZod,
    customer_groups: z.coerce.number().min(0), 
    coupon_type: numberZod, 
    use_auto_generation: numberZod,
    coupon_code: stringZod,
    uses_per_coupon: z.coerce.number().min(0), 
    usage_per_customer: numberZod,
    starts_from: stringZod, 
    ends_till: stringZod, 
    sort_order: numberZod,
    condition_type: numberZod,

    conditions: z.object({
        attribute: stringZod, 
        operator: stringZod, 
        attribute_type: stringZod, 
        value: z.coerce.number().min(0), 
    }).optional(),

    action_type: stringZod, 
    discount_amount: z.coerce.number().min(0),
    discount_quantity: z.coerce.number().min(0),
    discount_step: z.coerce.number().min(0),
    apply_to_shipping: numberZod,
    free_shipping: numberZod,
    end_other_rules: numberZod,
}

export default function useCustomHookCartRule(){

    const handelDefaultValue = (): CartRuleInterface => {
        return {
            name: '',
            description: '',
            status: 0,
            customer_groups: 0, 
            coupon_type: 0, 
            use_auto_generation: 0,
            coupon_code: '',
            uses_per_coupon: 0, 
            usage_per_customer: 0,
            starts_from: '', 
            ends_till: '', 
            sort_order: 0,
            condition_type: 0,
        
            conditions: [{
                attribute: 'cart', 
                operator: '>=', 
                attribute_type: 'price', 
                value: 0, 
            }],
        
            action_type: 'by_percent', 
            discount_amount: 0,
            discount_quantity: 0,
            discount_step: 0,
            apply_to_shipping: 0,
            free_shipping: 0,
            end_other_rules: 0,
        }
    }
    return {
        handelDefaultValue,
        cartRuleSchema,
    }
}