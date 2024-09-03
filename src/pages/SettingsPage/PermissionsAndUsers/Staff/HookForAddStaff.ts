import { z } from 'zod';

export interface addStaffInterface {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	role_id: string;
	status: number;
}
const stringZod = z.string().min(1);

export const AddUserSchema ={
	name: stringZod,
	email: stringZod.email(),
	password: z.string().min(6).optional(),
	password_confirmation: z.string().min(6).optional(),
	role_id: stringZod.optional(),
	status: z.number(),
}

export default function useCustomHookAddStaff() {
	const handelDefaultValue = () => {
		return {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			role_id: '',
			status: 0,
		};
	};

	return {
		AddUserSchema,
		handelDefaultValue,
	};
}
