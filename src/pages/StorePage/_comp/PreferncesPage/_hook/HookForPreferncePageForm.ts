import { z } from "zod";



export interface preferncesInterface {
	pageTitle: string;
	maintainanceEnable: boolean;
	metaDescription: string;
	maintainanceMessageEn: string;
	maintainanceMessageAr: string;
	passwordEnable: boolean;
	password: string;
	passwordMessageEn: string;
	passwordMessageAr: string;
	image: File;
	captchaEnable: boolean;
}


export default function useCustomHookPreferncePage() {

	const handelDefaultValue = () => {
		return {
			pageTitle: '',
			image: undefined,
			metaDescription: '',
			maintainanceEnable: false,
			maintainanceMessageEn: '',
			maintainanceMessageAr: '',
			password: '',
			passwordEnable: false,
			passwordMessageEn: '',
			passwordMessageAr: '',
			captchaEnable: false,
		};
	};
	// //////////////////////////////////////////
	const PrefernceSchema = {

		pageTitle: z.string().min(3, { message: 'Page title is required' }),
		image: z.instanceof(File),
		metaDescription: z.string().min(7, { message: 'Meta description is required' }),
		maintainanceEnable: z.boolean(),
		maintainanceMessageEn: z.string().min(3).max(1000),

		maintainanceMessageAr: z.string().min(3).max(1000),
		passwordEnable: z.boolean(),
		captchaEnable: z.boolean(),
		passwordMessageEn: z.string().min(3).max(1000),
		password: z.string().min(6).max(1000),

		passwordMessageAr: z.string().min(3).max(1000),
	};

	return {
		PrefernceSchema,
		handelDefaultValue
	}
}