import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface ISetupInfo {
	name: string;
	apiKey: number;
}

export default function useCustomHookSetupInfo() {
	const { t } = useTranslation();
	const handelDefaultValue = () => {
		return {
			name: '',
			apiKey: 0,
		};
	};

	const SetupInfoSchema = {
		name: z.string().min(3, { message: t('Name is required') }),
		apiKey: z.coerce.number().positive().min(7, { message: t('Api Key is required') }),
	};

	return {
		handelDefaultValue,
		SetupInfoSchema,
	};
}
