import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';

interface TikCreateAccountProps {
	data: {
		description: string;
	};
}

const TikCreateAccount: React.FC<TikCreateAccountProps> = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div className='global-install'>
			<p className='global-install-p'>{data.description}</p>
			<div className='global-install-btn'>
				<Button>{t('Connect Account')}</Button>
			</div>
		</div>
	);
};

export default TikCreateAccount;
