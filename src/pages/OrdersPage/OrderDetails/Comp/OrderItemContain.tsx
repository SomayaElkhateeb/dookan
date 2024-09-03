import { Button } from 'src/app/components/optimized';
import RowOrderItems from './RowOrderItems';
import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { useAppSelector } from 'src/app/store';
import { CustomHookForHandelCurrencyDirection } from '../CustomHookForHandelCurrencydirection';

export default function OrderItemContain() {
	//  hooks
	const { t } = useTranslation();
	

	const { ordderItem } = useAppSelector((state) => state.allOrders);

	return (
		<div className='flex-col-global gap-2.5'>
			<RowOrderItems />
			<div className='px-3 flex-col-global gap-2.5'>
				<hr />
				<div className='flex-row-global justify-between '>
					<div className='subtitle flex-col-global gap-1'>
						<p>{t('Sub Total')}</p>
						{/* <Button variant='link'>+ {t('Add Discount')}</Button>
						<Button variant='link'>{t('Edit Shipping')}</Button> */}
						<p>{t('Tax')}</p>
					</div>
					<div className='text-title text-sm flex-col-global gap-1'>
						<p>
							{CustomHookForHandelCurrencyDirection(
								ordderItem?.sub_total,
								ordderItem?.base_currency_code,
							)}
						</p>
						{/* <p>% ------</p> */}
						{/* <p>
							{CustomHookForHandelCurrencyDirection(
								ordderItem?.sub_total,
								ordderItem?.base_currency_code,
							)}
						</p> */}
						<p>
							{CustomHookForHandelCurrencyDirection(
								ordderItem?.tax_amount,
								ordderItem?.base_currency_code,
							)}
						</p>
					</div>
				</div>
			</div>

			<div className='px-3 flex-col-global gap-2.5 pb-3'>
				<hr />
				<div className='flex-row-global justify-between '>
					<p className='subtitle uppercase'>{t('total')}</p>
					<p className='text-title text-sm'>
						{CustomHookForHandelCurrencyDirection(
							ordderItem?.grand_total,
							ordderItem?.base_currency_code,
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
