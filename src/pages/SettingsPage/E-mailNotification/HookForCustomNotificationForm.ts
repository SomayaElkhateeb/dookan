import { UseFormReturn } from "react-hook-form";
import { z } from "zod";


export interface addCustomNotificationInterface {
	emailEn: string;
	emailAr: string;
	descriptionEn: string;
	descriptionAr: string;
}


// ////////////////////////
export default function useCustomHookCustomNotificationForm() {
   
	// //////////////////////////////////////////
	const CustomNotifcationSchema = {
		emailEn: z.string().min(10).max(200),
		emailAr: z.string().min(10).max(200),
		descriptionEn: z.string().min(10).max(200),
		descriptionAr: z.string().min(10).max(200),
	};

	const handelDefaultValue = () => {
		return {
			emailEn: '',
			emailAr: '',
			descriptionEn: '',
			descriptionAr: '',
		};
	};
    return {
        CustomNotifcationSchema,
        handelDefaultValue
    }
}