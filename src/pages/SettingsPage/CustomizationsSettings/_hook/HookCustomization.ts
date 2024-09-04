import { z } from 'zod';

export interface customizationInterface {
	switch: boolean;
	email?: string;
	image?: File;
}
// ////////////////////////
export default function useCustomCustomizeForm() {
	const handelDefaultValue = () => {
		return {
			switch: false,
			email: '',
			image: undefined,
		};
	};
	// //////////////////////
	const customizationSchema = {
		switch: z.boolean().default(false),
		email: z.optional(z.string().min(1, { message: 'Store email is required' }).email()),
		image: z.optional(z.instanceof(File)),
	};
	return {
		customizationSchema,
		handelDefaultValue,
	};
}
