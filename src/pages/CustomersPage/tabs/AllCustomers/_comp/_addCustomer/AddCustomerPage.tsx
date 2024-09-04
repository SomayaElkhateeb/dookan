import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';

import useCustomHookAddCustomerForm, {
	AddCustomerPageSchema,
	AddCustomerPageSchemaValues,
} from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/_addCustomer/_hook/HookForAddCustomerForm';

import {
	PostAddCustomerRequest,
	PutUpdateCustomerRequest,
	getAllCustomersTable,
	getCustomerInfo,
} from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useNavigate } from 'react-router-dom';
import GeneralInfoCustomerForm from './_comp/GeneralInfoCustomerForm';
import PrimaryAddressForm from './_comp/PrimaryAddressForm';
import { UseGetIdParams } from 'src/app/utils/hooks/GetParamsId';
import { getCustomersGroupTable } from 'src/app/store/slices/customersPage/CustomersGroup/customersGroupTableAsyncThunks';

const AddCustomerPage = ({ onClose }: { onClose?: () => void }) => {
	// hooks
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = UseGetIdParams();
	//  selectors
	const { CustomerInfo, isLoadingAddOrUpdate } = useAppSelector((state) => state.allCustomer);
	console.log("CustomerInfo", CustomerInfo);

	
	const handleSubmit = (values: AddCustomerPageSchemaValues) => {
		console.log('values', values);
		let customValues = {
			first_name: values.first_name,
			last_name: values.last_name,
			gender: values.gender,

			email: values.email,
			phone: values.phone,
			customer_group_id: values.customer_group_id,
			subscribed_to_news_letter: values.subscribed_to_news_letter,
			status: values.status,
			'default_address[first_name]': values.default_address.first_name,
			'default_address[last_name]': values.default_address.last_name,
			'default_address[country]': values.default_address.country,
			'default_address[city]': values.default_address.city,
			'default_address[state]': values.default_address.state,
			'default_address[street]': values.default_address.street,

			'default_address[building]': values.default_address.building,
			'default_address[landmark]': values.default_address.landmark,
			'default_address[phone]': values.default_address.phone,
		};
		id
			? //  case update customer data
			  dispatch(PutUpdateCustomerRequest({ data: customValues, id })).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  })
			: //   PostAddCustomerRequest
			  dispatch(PostAddCustomerRequest(values)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						if (onClose) {
							dispatch(getAllCustomersTable());
							onClose();
						} else {
							navigate(-1);
						}
					}
			  });
	};

	// custom hook
	const { handelDefaultValue } = useCustomHookAddCustomerForm();

	const { formStore, onSubmit } = useForm({
		schema: AddCustomerPageSchema,
		handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	//  get customer info with id params to fill inputs with it
	useMemo(() => {
		if (id) {
			CustomerInfo.gender && formStore.setValue('gender', CustomerInfo.gender);
			CustomerInfo.first_name && formStore.setValue('first_name', CustomerInfo.first_name);
			CustomerInfo.last_name && formStore.setValue('last_name', CustomerInfo.last_name);
			CustomerInfo.email && formStore.setValue('email', CustomerInfo.email);
			CustomerInfo.phone && formStore.setValue('phone', CustomerInfo.phone);
			CustomerInfo?.subscribed_to_news_letter > 0
				? formStore.setValue('subscribed_to_news_letter', 1)
				: formStore.setValue('subscribed_to_news_letter', 0);
			CustomerInfo.customer_group_id &&
				formStore.setValue('customer_group_id', CustomerInfo.customer_group_id.toString());
		}
	}, [id, CustomerInfo]);

	useMemo(() => {
		if (id) {
			dispatch(getCustomerInfo(id));
		}
	}, [id]);

	useEffect(() => {
		dispatch(getCustomersGroupTable());
	}, [dispatch]);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global relative'>
				<SubHeader title={t('Add New Customer')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='custom-grid-parent gap-5  custom_container'>
					<div className='flex-col-global grid-left'>
						{/* general info section */}
						<GeneralInfoCustomerForm formStore={formStore} />
						{/* primary Address section */}
						<PrimaryAddressForm formStore={formStore} />
						<SubHeaderMobileBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AddCustomerPage;
