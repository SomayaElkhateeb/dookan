import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'src/app/utils';
import { BanktransferIcon } from 'src/app/utils/icons';
import { LiaSearchPlusSolid } from 'react-icons/lia';
import { useAppSelector } from 'src/app/store';

interface IData {
	title: string;
	icon?: React.ReactNode;
	form?: boolean;
	contain?: React.ReactNode;
	children?: React.ReactNode;
}

const Checkout: React.FC<IData> = ({ title, form, contain, children }) => {
	return (
		<div className='cardDetails-sharedClass p-5 flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<h3 className='title'>{title}</h3>
				{form ? '' : children}
			</div>
			{form ? contain : <Content />}
		</div>
	);
};

export default Checkout;

function Content() {
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	console.log(ordderItem);
	const { t } = useTranslation();
	return (
		<>
			<div className='flex justify-between items-center'>
				<div>
					<p className='text-[13px] text-subtitle pb-2'>{t('Payment details')}</p>
					<p className='flex items-center gap-2'>
						<BanktransferIcon className='fill-subtitle' />
						<span className='text-sm text-title pt-1'>{ordderItem?.payment_title}</span>
					</p>
				</div>
				{/* <div className='rounded-lg border border-constrained w-[2.6875rem] h-[2.4375rem] relative'>
					<img src={getImageUrl('companies/dhl.svg')} className='h-full w-full' />
					<LiaSearchPlusSolid className='fill-title absolute top-1 left-1' />
				</div> */}
			</div>
			<hr />

			<p className='text-[13px] text-subtitle pt-2'>{t('Delivery method')}</p>
			<p className='text-title text-sm'>{ordderItem?.shipping_method}</p>
			<p className='text-[13px] text-subtitle'>{t('Shipping method')}</p>

			<div className='flex items-center gap-2'>
				{/* <div className='rounded-lg border border-constrained size-[1.5rem]'>
					<img src={getImageUrl('companies/dhl.svg')} className='h-full w-full' />
				</div> */}
				<p className='text-title font-semibold text-sm'>{ordderItem?.shipping_title}</p>
				<p className='text-title text-sm'>({t('main')})</p>
			</div>
		</>
	);
}
