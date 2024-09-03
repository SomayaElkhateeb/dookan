import { useTranslation } from 'react-i18next';

import useLanguage from 'src/app/utils/hooks/useLanguage';
import { AnalyticsProduct } from 'src/pages/AnalyticsPage/tabs/Products/AnalyticsProducts';
import { getImageUrl } from 'src/app/utils';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';

export default function AnalyticsProductsTable({
	data,
	isLoading,
}: {
	data: AnalyticsProduct[];
	isLoading: boolean;
}) {
	//  hooks
	const { language } = useLanguage();
	const { t } = useTranslation();

	//  headers

	const productsHeaders = [
		{ title: t('Product & Category') },
		{ title: t('quantity') },
		{ title: t('Price') },
		{ title: t('searches') },
		{ title: t('views') },
		{ title: t('quantity sold') },
		{ title: t('returns') },
	];

	return (
		<BaseTable
			isLoading={isLoading}
			language={language}
			color='#55607A'
			headers={productsHeaders.map((h) => h)}
			rows={data?.map((e: AnalyticsProduct, i: number) => {
				return {
					item: e,
					elements: [
						<GlobalTableCell>
							<div className=' flex  items-center gap-[.4rem] '>
								<div>
									<img
										className='size-10'
										src={getImageUrl(e.imageUrl)}
										loading='lazy'
										alt={e.product_name}
									/>
								</div>

								<div className='flex flex-col'>
									<p className='title'>{e.product_name}</p>
									<p className='text-subtitle paragraph'>{e.category}</p>
								</div>
							</div>
						</GlobalTableCell>,

						<GlobalTableCell>
							<p className={e.quantity === 0 ? 'text-error' : 'text-black'}>
								{e.quantity > 0 ? e.quantity : t('Out of stock')}
							</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<span className='text-title'>SAR</span> {e.price}
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title'>{e.searches}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title'>{e.views}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title'>{e.quantity_sold}</p>
						</GlobalTableCell>,
						<GlobalTableCell>
							<p className='text-title'>{e.returns}</p>
						</GlobalTableCell>,
					],
				};
			})}
		/>
	);
}
