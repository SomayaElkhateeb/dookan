import { z } from 'zod';
import { useForm } from 'src/app/utils/hooks/form';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@mui/material';
import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';
import { TooltipIcon } from 'src/app/utils/icons';
import { GlobalDialog } from 'src/app/components/shared';
export interface IAddPayment {
	name: string;
	cardNumber: number;
	expiryDate: string;
	cvv: number;
}
export default function AddPayment({
	handleClose,
	showPayment,
}: {
	handleClose: () => void;
	showPayment: boolean;
}) {
	//  hooks
	const { t } = useTranslation();

	// //////////////////////////////////
	const addPaymentSchema = {
		name: z.string().min(10),
		cardNumber: z.coerce
			.number()
			.positive()
			.min(14, { message: t('Account number must be at least 14 numbers') })
			.refine((val) => /^\d{14}$/.test(val.toString())),
		expiryDate: z.string().refine((val) => /^\d{2}\/\d{4}$/.test(val), {
			message: 'Date must be in the format MM/YYYY',
		}),
		cvv: z.coerce
			.number()
			.positive()
			.refine((val) => /^\d{3}$/.test(val.toString()), {
				message: t('CVV must be 3 digits'),
			}),
	};
	// /////////////////////
	const handleSubmit = (values: IAddPayment) => {
		console.log(values);
	};
	// ////////////////////////////
	const handelDefaultValue = () => {
		return {
			name: '',
			cardNumber: 0,
			expiryDate: '',
			cvv: 0,
		};
	};
	// //////////////////////////////
	const { formStore, onSubmit } = useForm({
		schema: addPaymentSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	//   style of dialog
	const style = {
		height: { md: '27.5rem', xs: '17.5rem' },
		width: { md: '50%', xs: '90%' },
	};

	return (
		<GlobalDialog openDialog={showPayment} handleClose={handleClose} style={style}>
			<Form {...formStore}>
				<form onSubmit={onSubmit} className='flex-col-global'>
					<h3 className='title capitalize '>{t('Add payment method')}</h3>
					<div className='md:w-[60%] flex flex-col gap-4'>
						<FormField
							formStore={formStore}
							name='name'
							label={t('Name on card')}
							render={(field) => <Input {...field} />}
						/>
						<FormField
							formStore={formStore}
							name='cardNumber'
							label={QuantityLabel}
							render={(field) => (
								<Input type='number' {...field} placeholder='0000 0000 0000 0000' />
							)}
						/>
						<div className='md:flex-row-global-items-start flex-col-global  md:justify-between '>
							<div className='md:w-[49%]'>
								<FormField
									formStore={formStore}
									name='expiryDate'
									label={t('Expiry date')}
									render={(field) => <Input {...field} placeholder='MM/YYYY' />}
								/>
							</div>
							<div className='md:w-[49%]'>
								<FormField
									formStore={formStore}
									name='cvv'
									label={CvvLabel}
									render={(field) => <Input {...field} type='number' placeholder='123' />}
								/>
							</div>
						</div>
					</div>
					<div>
						<Checkbox />
						<span className='text-title text-sm'>Assign as main</span>
					</div>
					<div className='flex items-center justify-end gap-6'>
						<Button variant='tertiary' onClick={() => handleClose()}>
							{t('Cancel')}
						</Button>
						<Button variant='primary' onClick={onSubmit}>
							{t('Add')}
						</Button>
					</div>
				</form>
			</Form>
		</GlobalDialog>
	);
}

export function CreditTransactions() {
	return (
		<div className='flex gap-1'>
			<img src={getImageUrl('companies/mada.svg')} className='w-5 h-4' />
			<img src={getImageUrl('companies/visa.svg')} className='w-5 h-4' />
			<img src={getImageUrl('companies/amex.svg')} className='w-5 h-4' />
			<img src={getImageUrl('companies/masterCard.svg')} className='w-5 h-4' />
		</div>
	);
}

export const CvvLabel = (
	<span className='flex'>
		CVV&nbsp;
		<TooltipIcon className='fill-secondary' />
	</span>
);

const QuantityLabel = (
	<span className='flex justify-between'>
		<p>Card number</p>
		<CreditTransactions />
	</span>
);
