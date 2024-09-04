import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from 'src/app/components/optimized';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';

import { Form } from 'src/app/components/ui/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	PostAddCustomerGroupRequest,
	PutUpdateCustomerGroupRequest,
	getCustomerGroupInfo,
} from 'src/app/store/slices/customersPage/CustomersGroup/customersGroupTableAsyncThunks';
import { useForm } from 'src/app/utils/hooks/form';
import {
	AddCustomerGroupPageSchema,
	AddCustomerGroupPageSchemaValues,
} from 'src/pages/CustomersPage/tabs/CustomersGroups/_comp/_AddCustomerGroup/_schema/AddCustomerGroupSchema';
import ChooseCustomers from 'src/pages/CustomersPage/tabs/CustomersGroups/_comp/_AddCustomerGroup/_comp/ChooseCustomers';
import GeneralInfoCustomerGroupInfo from 'src/pages/CustomersPage/tabs/CustomersGroups/_comp/_AddCustomerGroup/_comp/GeneralInfo';
import useCustomHookAddCustomerGroupForm from 'src/pages/CustomersPage/tabs/CustomersGroups/_comp/_AddCustomerGroup/_hook/HookForAddCustomerGroupForm';
import { UseGetIdParams } from 'src/app/utils/hooks/GetParamsId';
import { useEffect } from 'react';
import { getAllCustomersTable } from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';

export default function AddCustomerGroup() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isLoadingAddOrUpdate, customerGroupItem } = useAppSelector(
		(state) => state.customersGroup,
	);
	//  custom hook
	const { id } = UseGetIdParams();
	const { handelDefaultValue } = useCustomHookAddCustomerGroupForm();

	const handleSubmit = (values: AddCustomerGroupPageSchemaValues) => {
		console.log('AddCustomerGroup', values);
		values.code = values.name;

		values.customers = values.customers?.map((e) => e?.id);
		id
			? //  case update customer data
			  dispatch(PutUpdateCustomerGroupRequest({ data: values, id })).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  })
			: //   Post AddCustomer Group Request
			  dispatch(PostAddCustomerGroupRequest(values)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  });
	};

	const { formStore, onSubmit } = useForm({
		schema: AddCustomerGroupPageSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	// case of update customer group
	useEffect(() => {
		if (id) {
			dispatch(getCustomerGroupInfo(id));
			customerGroupItem?.name && formStore.setValue('code', customerGroupItem?.name);
			customerGroupItem?.name && formStore.setValue('name', customerGroupItem?.name);
			customerGroupItem?.description &&
				formStore.setValue('description', customerGroupItem?.description);
			customerGroupItem?.status > 0
				? formStore.setValue('status', 1)
				: formStore.setValue('status', 0);
			customerGroupItem?.customers &&
				customerGroupItem?.customers?.length > 0 &&
				formStore.setValue(
					'customers',
					customerGroupItem?.customers?.map((e) => {
						return {
							id: e.id ? e.id.toString() : '',
							name: e.first_name ? e.first_name : '',
						};
					}),
				);
		}
	}, [id]);

	useEffect(() => {
		dispatch(getAllCustomersTable());
	}, [dispatch]);

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Add New Group')}>
					<SubHeaderDefaultBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
				</SubHeader>
				<div className='grid gap-5 lg:grid-cols-3 custom_container'>
					<div className='flex-col-global lg:col-span-2'>
						<GeneralInfoCustomerGroupInfo formStore={formStore} />
						<ChooseCustomers formStore={formStore} />
					</div>
				</div>
				<SubHeaderMobileBtns isLoading={isLoadingAddOrUpdate} onSubmit={onSubmit} />
			</form>
		</Form>
	);
}
