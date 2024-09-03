import {
	AddAddressInterface,
	createAddressSchema,
	getDefaultValues,
} from 'src/pages/OrdersPage/AddOrder/Comp/AddOrderAddresse/_hook/useOrderAddress';
import { z } from 'zod';
const RequiredAddressData = z.string().min(1);

export interface AddInventoryInterface extends AddAddressInterface {
	code: string;
	description: string;
	priority: number;
	branch_id: string;
	contact_name: string;
	contact_email: string;
	contact_number: string;
	contact_fax: number;
	status: number;
	postcode: string;
}
export const UseAddInventory = (selectedOption: string) => {
	const AddInventoryPageSchema = {
		code: RequiredAddressData,
		description: RequiredAddressData,
		priority: z.coerce.number().positive(),
		// name: RequiredAddressData,
		branch_id: RequiredAddressData,
		contact_name: RequiredAddressData,
		contact_email: RequiredAddressData.email(),

		contact_number: z.string().min(7),

		contact_fax: z.coerce.number().positive(),
		status: z.number(),
		postcode: RequiredAddressData,
		...createAddressSchema(false, selectedOption, true),
	};

	const handelDefaultValue = () => {
		return {
			code: '',
			description: '',
			priority: 0,
			branch_id: '',
			contact_name: '',
			contact_email: '',
			contact_number: '',
			contact_fax: 0,
			status: 0,
			postcode: '',
			...getDefaultValues(),
		};
	};

	return {
		AddInventoryPageSchema,
		handelDefaultValue,
	};
};
