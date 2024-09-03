import { z } from "zod";

export interface ReviewInterface {
	reviews: {
		target_customer_to_review: {
			enabled: number;
			name: string;
			email_description: string;
			sending_after_purchase_days: number;
		},
		quick_actions: {
			enabled: number;
			auto_publish_review: number;
			notify_me_new_review: number;
			net_promoter_score: number;
		}
	}
}
const zodNumber = z.coerce.number().positive().min(1);
export default function useCustomHookReviewSettings() {

	const handelDefaultValue = (): ReviewInterface => {
		return {
			reviews: {
				target_customer_to_review: {
					enabled: 0,
					name: '',
					email_description: '',
					sending_after_purchase_days: 0,
				},
				quick_actions: {
					enabled: 0,
					auto_publish_review: 0,
					notify_me_new_review: 0,
					net_promoter_score: 0,
				}
			}
		};
	};
	// //////////////////////////////////////////
	const reviewSchema = {
        reviews: z.object({
			target_customer_to_review: z.object({
				enabled: z.number(),
				name: z.string().min(1),
				email_description: z.string().min(1).email(),
				sending_after_purchase_days: zodNumber,
			}),
			quick_actions: z.object({
				enabled: z.number(),
				auto_publish_review: z.number(),
				notify_me_new_review: z.number(),
				net_promoter_score: z.number(),
			}),
		})

	};
	return {
		reviewSchema,
		handelDefaultValue
	}
}