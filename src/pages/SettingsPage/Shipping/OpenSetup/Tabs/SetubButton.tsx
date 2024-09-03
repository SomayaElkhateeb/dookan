import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/app/components/optimized';

export default function SetupButton({ addStyle }: { addStyle?: boolean }) {
	//  hooks
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		addStyle && (
			<div className='pt-5 flex justify-end w-full'>
				<Button variant='primary' onClick={() => navigate('Setup')}>
					{t('Setup')}
				</Button>
			</div>
		)
	);
}
