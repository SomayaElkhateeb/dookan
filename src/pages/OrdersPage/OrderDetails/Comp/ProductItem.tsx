import { UseFormReturn } from 'react-hook-form';
import { getImageUrl } from 'src/app/utils';
import { LiaTrashAlt } from 'react-icons/lia';

import { IOrderItemForm } from '../Forms/HookOrderItem';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
const title = 'Solid Anti-Pilling Sweatshirt with Round Sweatshirt';

export default function ProductItem({ formStore }: { formStore: UseFormReturn<IOrderItemForm> }) {
	const { t } = useTranslation();
	const { language } = useLanguage();
	return (
		<div className='grid lg:grid-cols-5 md:grid-cols-3 gap-4'>
			<div className='lg:col-span-3 md:col-span-3 '>
				<div className='flex justify-between'>
					<div className='flex items-start gap-2'>
						<div className='size-[4.6875rem] rounded-md overflow-hidden'>
							<img src={getImageUrl('product/product.png')} />
						</div>
						<div className='flex-col-global gap-2'>
							<h3 className='title text-sm text-ellipsis overflow-hidden w-[24rem]'>
								{/* text-ellipsis ?? */}
								{title.slice(0, 24)}...
							</h3>
							<p className='text-subtitle text-sm'>{t('SKU')}: SF1133569600-1</p>
						</div>
					</div>
				</div>
			</div>
			<div className='lg:col-span-1 md:col-span-1 w-fit'>
				<FormField
					formStore={formStore}
					name='quantity'
					render={(field) => <Input type='number' {...field} />}
				/>
			</div>
			<div className='lg:col-span-1 md:col-span-1 lg:flex-end flex items-center gap-2'>
				<LiaTrashAlt size='28' className='fill-pri-dark cursor-pointer' />
				<p className='text-title text-sm '>
					{language === 'ar' ? `450.00 ${t('SAR')}` : `${t('SAR')} 450.00`}
				</p>
			</div>
		</div>
	);
}
