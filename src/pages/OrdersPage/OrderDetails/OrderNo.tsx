import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownIcon } from 'src/app/utils/icons';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import OrderStatus from './Forms/OrderStatus';
import { useAppSelector } from 'src/app/store';

export default function OrderNo() {
	const [showOrderStatus, setShowOrderStatus] = useState(false);
	const { t } = useTranslation();
	const { language } = useLanguage();
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	console.log(ordderItem)
	const flexClass = 'flex gap-1.5  items-center ';
	return (
		<div className='capitalize global-cards grid xl:grid-cols-6'>
			<div
				className={`col-span-1 flex-col-global gap-2 relative xl:after:absolute xl:after:h-full xl:after:w-[1px] md:after:none xl:after:bg-constrained  ${
					language === 'ar' ? 'xl:after:left-0' : 'xl:after:right-[-5%]'
				} xl:after:top-0`}
			>
				<p className='subtitle'>{t('order No')}.</p>
				<p className='title'>{ordderItem?.id}</p>
			</div>

			<div className='col-span-3 flex-col-global sm:gap-2 gap-0 subtitle '>
				<div className={flexClass}>
					<p>{t('payment status')}:</p>
					<button onClick={() => setShowOrderStatus(true)} className='flex md:text-[1rem] text-[.8rem]  text-warning capitalize'>
						{t('awaiting payment')} <DownIcon className='fill-warning' />
					</button>
				</div>

				<div className={flexClass}>
					<p>{t('order status')}:</p>
					<button onClick={() => setShowOrderStatus(true)} className='flex md:text-[1rem] text-[.8rem] capitalize text-title'>
						{ordderItem?.status} <DownIcon className='fill-hint' />
					</button>
				</div>
			</div>
			<div className='col-span-2 flex-col-global xl:items-end justify-between gap-2'>
				<h2 className='title  '>{ordderItem?.base_currency_code} {ordderItem?.grand_total}</h2>
				<p className='subtitle'>
					{ordderItem?.created_at}
				</p>
			</div>

			{showOrderStatus && (
				<OrderStatus id={ordderItem?.id} showOrderStatus={showOrderStatus} onClose={() => setShowOrderStatus(false)} />
			)}
		</div>
	);
}
