import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import useCustomHookAddStuff, { addStaffInterface } from './HookForAddStaff';
import Password from './Password';
import Staff from './Staff';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getAdminShow, postNewUser, updateUser } from 'src/app/store/slices/settingsPage/users/usersAsyncThunks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';

export default function AddStuff() {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	// custom hook
	const { handelDefaultValue, AddUserSchema } = useCustomHookAddStuff();

	// redux
	const dispatch = useAppDispatch();
	const { isLoadingAddOrUpdate, userById } = useAppSelector((state) => state.usersSettings);

	const handleSubmit = (values: addStaffInterface) => {
		console.log(values);
		let customValues = {
			name: values.name,
			email: values.email,
			password: values.password,
			password_confirmation: values.password_confirmation,
			role_id: values.role_id,
			status: values.status,
		};
		id
			?
			dispatch(updateUser({ data: customValues, id })).then((promiseResponse) => {
				if ((promiseResponse.payload.code = 200)) {
					navigate(-1);
				}
			})
			:
			dispatch(postNewUser(values)).then((promiseResponse) => {
				if ((promiseResponse.payload.code = 200)) {
					navigate(-1);
				}
			});
	};

	const { formStore, onSubmit } = useForm({
		schema: AddUserSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});


	useMemo(() => {
		if (id) {
			userById?.name && formStore.setValue('name', userById?.name);
			userById?.email && formStore.setValue('email', userById?.email);
			userById?.password && formStore.setValue('password', userById?.password);
			userById?.password_confirmation && formStore.setValue('password_confirmation', userById?.password_confirmation);
			userById?.role_id &&
				formStore.setValue('role_id', userById?.role_id.toString());

			userById?.status > 0
				? formStore.setValue('status', 1)
				: formStore.setValue('status', 0);
		}
	}, [id, userById]);


	useMemo(() => {
		if (id) {
			dispatch(getAdminShow(id));
		}
	}, [id]);

	useEffect(() => {
		formStore.setValue('status', formStore.watch('status') ? 1 : 0);
	}, [formStore.watch('status')]);


	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('add staff')}>
					<SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate} />
				</SubHeader>
				<div className='custom_container custom-grid-parent'>
					<div className=' flex-col-global grid-left'>
						<Staff formStore={formStore} />
						<Password formStore={formStore} />
					</div>
					<div className='grid-right'>
						<div className='global-cards'>
							<h3 className='title'>{t('Quick actions')}</h3>
							<div className='flex-row-global gap-2'>
								<p>{t('Activated')}</p>
								<FormSwitchField<AddUserSchema>
									formStore={formStore}
									name='status'
									enable
								/>
								{/* <p>{formStore.watch('status') ? 'On' : 'Off'}</p> */}
							</div>
						</div>

					</div>
				</div>
				<div className='flex-btn-end px-5'>
					<SubHeaderMobileBtns onSubmit={onSubmit} />
				</div>
			</form>
		</Form>
	);
}
