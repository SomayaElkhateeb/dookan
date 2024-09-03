import React from 'react';
import { Button } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';

interface Props {
	data: {
		description: string;
	};
}

const SnapCreateAccount: React.FC<Props> = ({ data }) => {
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

export default SnapCreateAccount;
