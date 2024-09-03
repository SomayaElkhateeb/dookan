import { Form } from 'src/app/components/ui/form';
import { Button } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { z } from 'zod';
import { setAdd_Order_Data_Address_id } from 'src/app/store/slices/AddOrderPage/AddOrderSlice';
import { AddFillIcon } from 'src/app/utils/icons';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { GlobalDialog } from 'src/app/components/shared';
import { useState } from 'react';
import AddNewAddressCustomer from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/_addAddresse/AddNewAddress';
interface IAddOrder {
	address_id?: string;
}

const addOrderSchema = {
	address_id: z.string().min(1),
};
const handelDefaultValue = {
	address_id: '',
};
export const OrderAddress = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
	//  hooks
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const { CustomerInfo } = useAppSelector((state) => state.allCustomer);

	const handleSubmit: (values: IAddOrder) => void = (values: IAddOrder) => {
		onNext();
		values?.address_id && dispatch(setAdd_Order_Data_Address_id(values?.address_id));
	};

	const { formStore, onSubmit } = useForm({
		schema: addOrderSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue,
	});

	//  close add address dialog
	const onClose = () => {
		setIsOpen(false);
	};
	const style = {
		width: { md: '85vw', xs: '95vw' },
		height: { md: '95vh', xs: '95vh' },
	};
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='global-cards'>
				{CustomerInfo?.addresses?.length > 0 && (
					<SelectFormField
						formStore={formStore}
						name='address_id'
						placeholder={t('search Address')}
						options={CustomerInfo?.addresses?.map((e) => {
							return {
								value: e?.id,
								label: `${e?.state} / ${e?.street} / ${e?.building} `,
							};
						})}
					/>
				)}
				<Button
					variant='secondary'
					text={t('Add new address')}
					LeftIcon={AddFillIcon}
					className='w-fit'
					onClick={() => setIsOpen(true)}
				/>
				<div className='flex-btn-end'>
					<Button variant='tertiary' text={t('back')} onClick={onBack} />
					<Button variant='primary' text={t('Next')} onClick={onSubmit} />
				</div>
			</form>
			<GlobalDialog openDialog={isOpen} handleClose={onClose} style={style}>
				<AddNewAddressCustomer customer_id={CustomerInfo?.id} handelClose={onClose} />
			</GlobalDialog>
		</Form>
	);
};
