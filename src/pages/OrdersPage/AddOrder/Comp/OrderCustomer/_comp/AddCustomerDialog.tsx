import { useTranslation } from 'react-i18next';
import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import CustomPhoneInput from 'src/app/components/optimized/UiKits/CustomPhoneInput';
import { Button } from 'src/app/components/optimized';
import { GlobalDialog } from 'src/app/components/shared';
import useAddCustomer from '../_hook/useAddCustomer';
import AddCustomerPage from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/_addCustomer/AddCustomerPage';
// const style = {
// 	width: { md: '40rem', xs: '22rem' },
// };
const style = {
	width: { md: '85vw', xs: '95vw' },
	height: { md: '95vh', xs: '95vh' },
};
export default function AddCustomerDialog({
	onClose,
	open,
}: {
	onClose: () => void;
	open: boolean;
}) {
	// const { t } = useTranslation();
	// const { formStore, onSubmit } = useAddCustomer();
	return (
		<GlobalDialog openDialog={open} handleClose={onClose} style={style}>
			{/* <Form {...formStore}>
				<form onSubmit={onSubmit} className='grid gap-5 lg:grid-cols-3'>
					<h3 className='title capitalize col-span-3'>{t('Update order status')}</h3>
					<div className='grid gap-4 col-span-2'>
						<FormField
							formStore={formStore}
							label={t('Full Name')}
							name='fullName'
							render={(field) => <Input {...field} placeholder='' />}
						/>
						<FormField
							formStore={formStore}
							label={t('Phone number')}
							name='phone'
							render={(field) => (
								<CustomPhoneInput value={field.value} onHandleChange={field.onChange} />
							)}
						/>
						<FormField
							formStore={formStore}
							label={t('Email')}
							name='email'
							render={(field) => <Input {...field} placeholder='' />}
						/>
					</div>
					<div className='flex justify-end gap-4 col-span-3'>
						<Button variant='tertiary' onClick={onClose} text={t('cancel')} />
						<Button variant='primary' onClick={onSubmit} text={t('add')} />
					</div>
				</form>
			</Form> */}
			<AddCustomerPage onClose={onClose}/>
		</GlobalDialog>
	);
}
