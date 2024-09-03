import { z } from "zod";

export interface QueriesInterface {
	queries: {
		automate_replies: {
			enabled: number;
			reply_description: string;
		};
		quick_actions: {
			enabled: number;
			notify_me_new_query: number;
		};
	};
}

export default function useCustomHookQueriesSettings() {
	const handelDefaultValue = ():QueriesInterface => {
		return {
			queries: {
				automate_replies: {
					enabled: 0,
					reply_description: '',
				},
				quick_actions: {
					enabled: 0,
					notify_me_new_query: 0,
				},
			},
		};
	};

	const queriesSchema = {
		queries: z.object({
			automate_replies: z.object({
				enabled: z.number(),
				reply_description: z.string().min(5).max(100),
			}),
			quick_actions: z.object({
				enabled: z.number(),
				notify_me_new_query: z.number(),
			}),
		}),
	};

	return {
		queriesSchema,
		handelDefaultValue,
	};
}


