import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';

interface FBConnectAccountProps {
	data: {
		title: string;
		description: string;
	};
}

const FBConnectAccount: React.FC<FBConnectAccountProps> = ({ data }) => {
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

export default FBConnectAccount;
