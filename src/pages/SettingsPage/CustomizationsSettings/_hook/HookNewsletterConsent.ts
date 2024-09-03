import { z } from 'zod';

export interface DoubleOpt {
	customizations: {
		double_opt: {
			require_customers_confirm_subscription: string;
			show_option_at: string;
			text_label: string;
			preselect_option_for_customers: number;
			show_email_newsletter_in_footer: number;
		}
	}
}

export default function useCustomHookDoubleOpt() {
	const zodNumber = z.coerce.number().min(0).max(1);

	const DoubleOptSchema = {
		customizations: z.object({
			double_opt: z.object({
				require_customers_confirm_subscription: z.string().min(1),
				show_option_at: z.string().min(1),
				text_label: z.string().min(1),
				preselect_option_for_customers: zodNumber,
				show_email_newsletter_in_footer: zodNumber,
			})
		}),
	};

	const handelDefaultValue = (): DoubleOpt => {
		return {
			customizations: {
				double_opt: {
					require_customers_confirm_subscription: 'email_sms',
					show_option_at: 'registration',
					text_label: '',
					preselect_option_for_customers: 0,
					show_email_newsletter_in_footer: 0,
				}
			}
		};
	};

	return {
		handelDefaultValue,
		DoubleOptSchema,
	};
}
