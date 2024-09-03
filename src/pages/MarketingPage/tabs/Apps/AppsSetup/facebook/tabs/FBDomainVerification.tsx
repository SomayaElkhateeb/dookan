import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';

interface FBDomainVerificationProps {
	data: {
		description: string;
	};
}

const FBDomainVerification: React.FC<FBDomainVerificationProps> = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div className='global-install'>
			<p className='global-install-p'>{data.description}</p>
			<div className='global-install-btn'>
				<Button>{t('Verify domain')}</Button>
			</div>
		</div>
	);
};

export default FBDomainVerification;
