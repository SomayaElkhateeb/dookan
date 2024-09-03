import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { Button } from 'src/app/components/optimized';
import { getImageUrl } from 'src/app/utils';
import { EditIcon, MoreIcon } from 'src/app/utils/icons';

interface AppData {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	status: string;
	url: string;
	installed: boolean;
}

export default function InstallCard({ name, imageUrl, url, installed }: AppData) {
	const { language } = useLanguage();
	const { t } = useTranslation();

	return (
		<div className='global-cards py-2 flex-row justify-between items-center'>
			<div className='flex flex-row gap-3 '>
				<div className='p-1 size-[40px] cardDetails-sharedClass overflow-hidden'>
					<img src={getImageUrl(imageUrl)} className='w-full h-full' />
				</div>
				<div className='flex-col-global gap-1'>
					<h2 className='title'>{name}</h2>
					<Link to={url}>
						<Button
							variant='link'
							LeftIcon={EditIcon}
							className={`text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}
						>
							{t('Open Setup')}
						</Button>
					</Link>
				</div>
			</div>
			<div>{installed && <MoreIcon className='cursor-pointer fill-pri-dark' />}</div>
		</div>
	);
}
