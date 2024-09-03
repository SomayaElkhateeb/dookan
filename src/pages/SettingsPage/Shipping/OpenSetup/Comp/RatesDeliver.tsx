import { useTranslation } from 'react-i18next';
import { AiOutlineQuestion } from 'react-icons/ai';
import { Button } from 'src/app/components/optimized';
import { AddFillIcon } from 'src/app/utils/icons';
import RowItem from './RowItem';
import AddRate from './AddRate';

export default function RatesDeliver({showRate, setShowRate}:{showRate:boolean; setShowRate: () => void}) {
	const { t } = useTranslation();
	return (
		<div className='cardDetails-sharedClass p-5 flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<h3 className='text-title font-semibold flex gap-2 items-center'>
					{t('Rates(2)')}
					<span className='bg-secondary rounded-full size-[18px] flex items-center justify-center cursor-pointer'>
						<AiOutlineQuestion size={12} color='white' />
					</span>
				</h3>

				<Button
					variant='secondary'
					LeftIcon={AddFillIcon}
					onClick={() => {
						setShowRate(true);
					}}
				>
					{t('add rate')}
				</Button>
			</div>
			{showRate && (
				<AddRate
					saudi={false}
					showRate={true}
					onClose={() => {
						setShowRate(false);
					}}
				/>
			)}

			<div>
				<RowItem type={t('Free')} order={t('SAR 0 to SAR 30')} period={t('2 to 4 business days')} />
				<hr />
				<RowItem type={t('SAR 20')} order={t('SAR 30 and up')} period={t('2 to 4 business days')} />
			</div>
		</div>
	);
}
