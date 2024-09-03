import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { LinkIcon } from 'src/app/utils/icons';

interface PartnerCardProps {
	imageUrl: string;
	subtitle: string;
	name: string;
	id: string | number;
	link?: boolean;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ imageUrl, subtitle, name, id, link }) => {
	const { t } = useTranslation();
	return (
		<div className='flex flex-col items-start pb-4 md:flex-row gap-1 md:items-center md:justify-between border-t'>
			<div className='flex items-center py-2'>
				<img className='object-cover size-12' src={imageUrl} alt='' />
				<div className='p-4 flex flex-col gap-0.5'>
					<div className='flex items-center gap-2'>
						<Button variant='link' RightIcon={LinkIcon}>
							{name}
						</Button>

						<p className='text-sm text-subtitle'>{subtitle}</p>
					</div>
					{link ? (
						<p className='text-xs text-title font-semibold'>
							{id} {t('Links')}
						</p>
					) : (
						<p className='text-xs text-title font-semibold'>{id}</p>
					)}
				</div>
			</div>
			<Button>{t('Connect')}</Button>
		</div>
	);
};

export default PartnerCard;
