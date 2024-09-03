import { z } from 'zod';

export interface AddRolesInterface {
	name: string;
	description: string;
	permission_type: string;
	permissions?: string[];
}

export default function useCustomHookAddRoles() {
	const handelDefaultValue = () => {
		return {
			name: '',
			description: '',
			permission_type: '',
			permissions: []
		};
	};

	// schema
	const rolesSchema = {
		name: z.string().min(1).max(15),
		description: z.string().min(1).max(100),
		permission_type: z.string().min(1),
		permissions: z.array(z.string()).min(1).optional(),
	};

	return {
		handelDefaultValue,
		rolesSchema,
	};
}
