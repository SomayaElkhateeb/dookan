import { z } from "zod";
import { adminSchema } from "../GeneralSettings/AdminSchema";


export interface languageSettingsInterface {
	front: {
		default: {
			country: string;
			timezone?: string;
			currency: string;
			length: string;
			weight: string;
		}
	}
	// defaultCountry?: string;
	// defaultTime: string;
	// defaultCurrency: string;
	// defaultLength: string;
	// defaultWeight: string;
	// defaultLanguage: string
}
export default function useCustomHookLanguageSettings() {

	const handelDefaultValue = () => {
		return {
			front: {
				default: {
					country: '',
					timezone: '',
					currency: '',
					length: '',
					weight: '',
				}
			},

			// /////////////////////////////
			// defaultTime: '',
			// defaultCountry: '',
			// defaultCurrency: '',
			// defaultLength: '',
			// defaultWeight: '',
			// defaultLanguage: 'English'
		};
	};
	// //////////////////////////////////////////
	const zodValidate = z.string().min(1);

	const languageSettingsSchema = {

		front: {
			default: {
				country: z.optional(zodValidate).or(z.literal('')),
				timezone: zodValidate.optional(),
				currency: zodValidate,
				length: zodValidate,
				weight: zodValidate,
			}
		},

		////////////////////////////////////////////////
		// defaultLanguage: zodValidate,
		// ...adminSchema
	};
	return {
		languageSettingsSchema,
		handelDefaultValue
	}
}