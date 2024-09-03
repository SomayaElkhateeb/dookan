import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus } from 'react-icons/fa6';
import HorizontalBox from 'src/app/components/ui/horizontal-box';
import { Input } from 'src/app/components/ui/input';



/**
 * @template TFormStore
 *
 * @param {import('../types').Props<TFormStore>} props
 */
export default function MetaKeywordsFormField(props) {
	const { t } = useTranslation();
	const metaKeywords = useWatch({
		control: props.formStore.control,
		name: 'metaKeywords',
	});
	const [keyword, setKeyword] = useState('');

	return (
		<div className='flex flex-col gap-1'>
			<HorizontalBox
				end={
					<button
						type='button'
						onClick={() => {
							const newKeywords = new Set(metaKeywords);
							newKeywords.add(keyword);
							props.formStore.setValue('metaKeywords', [...newKeywords]);
						}}
					>
						<FaCirclePlus className='text-primary-500' />
						<span className='sr-only'>{t('Add')}</span>
					</button>
				}
			>
				<Input
					placeholder={t('e.g., T-Shirt, Clothes, Fashion')}
					className='border-0 rounded-none'
					minLength={3}
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</HorizontalBox>
			<div className='flex flex-wrap gap-2'>
				{metaKeywords.map((keyword) => (
					<div
						key={keyword}
						className='flex gap-2 justify-center items-center rounded-md text-white bg-gray px-2 py-1'
					>
						<span>{keyword}</span>
						<button
							type='button'
							className='text-gray-300'
							onClick={() => {
								const newKeywords = metaKeywords.filter((key) => key !== keyword);
								props.formStore.setValue('metaKeywords', newKeywords);
							}}
						>
							x<span className='sr-only'>{t('Remove')}</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
