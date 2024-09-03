import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { getImageUrl } from 'src/app/utils';
import { useAppSelector } from 'src/app/store';
import { CustomHookForHandelCurrencyDirection } from '../CustomHookForHandelCurrencydirection';

const data = [
	{
		id: nanoid(),
		text: 'Solid Anti-Pilling Sweatshirt with Round Neck and Long Sleeves',
		color: 'Red',
		size: 'XL',
		sku: 'SF1133569600-1',
		quantity: 15,
		total: 450,
	},

	// {
	// 	id: nanoid(),
	// 	text: 'Solid Anti-Pilling Sweatshirt with Round Neck and Long Sleeves',
	// 	color: 'Red',
	// 	size: 'XL',
	// 	sku: 'SF1133569600-1',
	// 	quantity: 15,
	// 	total: 450,
	// },
];
export default function RowOrderItems() {
	//  hooks
	const { t } = useTranslation();
	
	const { ordderItem } = useAppSelector((state) => state.allOrders);
	
	return ordderItem?.items.map((e) => {
		return (
			<div key={e.id} className='flex-col-global gap-2.5'>
				<hr />
				<div className='flex md:flex-row flex-col justify-between px-3'>
					<div className='md:w-[85%] flex items-center gap-2'>
						<div className='size-[4.6875rem] rounded-md overflow-hidden'>
							{e?.images?.length > 0 && e?.images[0]?.original_image_url && (
								<img
									src={e?.images[0]?.original_image_url}
									alt={e?.name}
									className='object-cover w-full h-full'
								/>
							)}
						</div>
						<div className='flex-col-global gap-1 justify-between h-full'>
							<h3 className='title text-sm'>
								{e.name}
								{/* <span className='text-subtitle font-normal'>
									/ {e.color} / {e.size}
								</span> */}
							</h3>
							<p className='text-subtitle text-sm'>
								{t('SKU')}: {e.sku}
							</p>
							<p className='text-title text-sm'>
								{t('Qty')}: {e.qty_ordered}
							</p>
						</div>
					</div>
					<p className='text-title text-sm flex justify-end items-end'>
						{CustomHookForHandelCurrencyDirection(e?.total, ordderItem?.base_currency_code)}
					</p>
				</div>
			</div>
		);
	});
}
