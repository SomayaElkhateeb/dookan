import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useForm } from 'src/app/utils/hooks/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import useOrderItemForm, { IOrderItemForm } from './HookOrderItem';
import { UseFormReturn } from 'react-hook-form';
import { Form } from 'src/app/components/ui/form';
import ProductItem from '../Comp/ProductItem';
import useLanguage from 'src/app/utils/hooks/useLanguage';

export default function OrderItemForm({ onClose }: { onClose: () => void }) {
	const { handelDefaultValue, orderItemSchema } = useOrderItemForm();
	const { t } = useTranslation();
	const { language } = useLanguage();
	const iconProps =
		language === 'ar' ? { RightIcon: FaChevronLeft } : { RightIcon: FaChevronRight };

	const handleSubmit = (values: IOrderItemForm) => {
		console.log(values);
	};

	const { formStore, onSubmit } = useForm({
		schema: orderItemSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global '>
				<div className='px-3 flex flex-col gap-3 p-5'>
					<div>
						<Button variant='secondary' {...iconProps}>
							{t('Add Product')}
						</Button>
					</div>

					<ProductItem formStore={formStore} />
					<Row title={t('Sub Total')} hr />
					<FormItem formStore={formStore} />
					<Row title={t('Tax')} />
					<Row title={t('total')} hr />
					<div className='flex justify-end items-center gap-4'>
						<Button onClick={onClose} variant='secondary'>
							{t('Discard')}
						</Button>
						<Button onClick={onSubmit} variant='primary'>
							{t('Save')}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}

function FormItem({ formStore }: { formStore: UseFormReturn<IOrderItemForm> }) {
	//  hooks
	const { t } = useTranslation();

	const textInput = (
		<div className='text-pri-dark text-sm flex items-center justify-between'>
			<p>{t('Discount price (optional)')}</p>
			<p>% {t('off')}</p>
		</div>
	);

	return (
		<div className='grid md:grid-cols-2 gap-5'>
			<FormField
				formStore={formStore}
				label={textInput}
				name='discount'
				render={(field) => <Input type='number' {...field} placeholder={''} />}
			/>
			<FormField
				formStore={formStore}
				label={t('Shipping (optional)')}
				name='shipping'
				render={(field) => <Input type='number' {...field} placeholder={''} />}
			/>
		</div>
	);
}

function Row({ title, price = 450, hr }: { title: string; price?: number; hr?: React.ReactNode }) {
	const { t } = useTranslation();
	const { language } = useLanguage();
	return (
		<div>
			{hr && <hr />}
			<div className='flex items-center justify-between py-3'>
				<p className='text-subtitle text-sm uppercase'>{title}</p>
				<p className='text-title text-sm'>
					{language === 'ar' ? `${price}.00 ${t('SAR')}` : `${t('SAR')} ${price}.00`}
				</p>
			</div>
		</div>
	);
}
