import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { EditIcon } from 'src/app/utils/icons';
import OrderItemForm from './Forms/OrderItemForm';
import OrderItemContain from './Comp/OrderItemContain';
import { useAppSelector } from 'src/app/store';

export default function OrderItems() {
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	const { t } = useTranslation();
	console.log(ordderItem)
	return (
		<div className='cardDetails-sharedClass'>
			<div className={`flex-row-global justify-between p-3 `}>
				<h2 className='title capitalize'>{t('Order items')} ( {ordderItem?.items?.length} )</h2>

				{/* {edit ? (
					''
				) : (
					<Button LeftIcon={EditIcon} variant='tertiary' onClick={() => setEdit(true)}>
						{t('edit')}
					</Button>
				)} */}
			</div>

			{/* {edit ? <OrderItemForm onClose={() => setEdit(false)} /> : */}
			 <OrderItemContain />
			 {/* } */}
		</div>
	);
}
