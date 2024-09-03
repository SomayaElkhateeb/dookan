import { useTranslation } from 'react-i18next';
import { RiDeleteBin5Line } from 'react-icons/ri';
import MenuOptions from 'src/app/components/optimized/Menu/MenuOptions';
import { MoreIcon } from 'src/app/utils/icons';
export default function RowItem({
	type,
	order,
	period,
}: {
	type: string;
	order: string;
	period: string;
}) {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col py-2 gap-4 md:flex-row md:justify-between md:items-center'>
			<div className='flex-col-global  gap-[.3rem]'>
				<h3 className='text-title font-semibold text-sm pt-2'>
					{t('Standard')} ({type})
				</h3>
				<p className='text-subtitle text-sm'>
					{t('Order')}: {order}
				</p>
			</div>

			<div>
				<div className='flex justify-start pb-2 md:justify-end'>
					<MenuOptions
						btn={<MoreIcon className='fill-subtitle' />}
						options={[
							{
								id: 1,
								text: t('delete rate'),
								icon: <RiDeleteBin5Line color='pri-dark' />,
								click: console.log('delete rate')
							},
						]}
					/>

				</div>
				<p className='text-subtitle text-sm'>{period}</p>
			</div>
		</div>
	);
}
