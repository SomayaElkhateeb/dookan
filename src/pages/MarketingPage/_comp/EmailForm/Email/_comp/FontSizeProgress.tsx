import React from 'react';
import { useTranslation } from 'react-i18next';

interface FontSizeProgressProps {
	value: number;
	onChange?: (value: number) => void;
	min: number;
	max: number;
}

const FontSizeProgress: React.FC<FontSizeProgressProps> = ({ value, onChange, min, max }) => {
	const { t } = useTranslation();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(e.target.value));
	};

	return (
		<div className='w-full'>
			<p className='text-sm text-title'>{t('Font Size')}</p>
			<div className='flex items-center gap-4'>
				<input
					type='range'
					name='fontSize'
					value={value}
					// onChange={handleChange}
					min={min}
					max={max}
					className='w-full'
				/>
				<span className='text-subtitle text-sm'>
					{value}
					{t('px')}
				</span>
			</div>
		</div>
	);
};

export default FontSizeProgress;
