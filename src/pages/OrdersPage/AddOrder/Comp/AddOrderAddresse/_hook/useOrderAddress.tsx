import { z } from 'zod';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getOrderInfo,
	updateOrderaddress,
} from 'src/app/store/slices/ordersPage/allOrders/allOrdersAsyncThunks';

export interface AddAddressInterface {
	address_id?: string;
	customer_id?: string;
	gift_receiver_name?: string;
	first_name?: string;
	last_name?: string;
	country?: string;
	city?: string;
	state?: string;
	street?: string;
	building: string;
	landmark?: string;
	phone: string;
	search?: string;
	gift: number;
}

export const getDefaultValues = (): AddAddressInterface => ({
	address_id: '',
	customer_id: '',
	gift_receiver_name: '',
	first_name: '',
	last_name: '',
	country: '',
	city: '',
	state: '',
	street: '',
	building: '',
	landmark: '',
	phone: '',
	search: '',
	gift: 0,
});

const requiredFieldSchema = z.string().min(1, { message: 'This field is required' });

const getConditionalSchema = (isRequired?: boolean) =>
	isRequired ? requiredFieldSchema : z.string().optional();
const getConditionalTwoVariablesSchema = (isRequired?: boolean, AddOrder?: boolean) =>
	isRequired && !AddOrder ? requiredFieldSchema : z.string().optional();

export const createAddressSchema = (
	sendGift?: boolean,
	selectedOption?: string,
	isName?: boolean,
	AddOrder?: boolean,
) => {
	const isManualEntry = selectedOption === 'Add manually';
	return {
		// name: getConditionalSchema(isName),
		first_name: getConditionalSchema(isName),
		last_name: getConditionalSchema(isName),
		country: getConditionalSchema(isManualEntry),
		city: z.string().optional().or(z.literal('')),
		state: getConditionalSchema(isManualEntry),
		street: getConditionalSchema(isManualEntry),
		building: requiredFieldSchema,
		landmark: getConditionalSchema(isManualEntry),
		phone: z.string().min(7, { message: 'Phone number must be at least 7 characters long' }),
		gift_receiver_name: getConditionalSchema(sendGift),
		gift: z.number(),
		search: getConditionalTwoVariablesSchema(sendGift, AddOrder),
	};
};

export default function useOrderAddress(
	sendGift?: boolean,
	selectedOption?: string,
	isName?: boolean,
	handleAddressForm?: () => void,
	onNext?: () => void,
) {
	const dispatch = useAppDispatch();
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	const handleSubmit = (values: AddAddressInterface) => {
		if (onNext) {
			onNext();
		} else {
			dispatch(updateOrderaddress({ data: values, id: ordderItem?.id })).then(
				(promiseResponse: any) => {
					if ((promiseResponse.payload.code = 200)) {
						handleAddressForm && handleAddressForm();
						dispatch(getOrderInfo(ordderItem.id));
					}
				},
			);
		}
	};

	const { formStore, onSubmit } = useForm({
		schema: createAddressSchema(sendGift, selectedOption, isName),
		handleSubmit: handleSubmit,
		defaultValues: getDefaultValues(),
	});

	return {
		formStore,
		onSubmit,
	};
}
