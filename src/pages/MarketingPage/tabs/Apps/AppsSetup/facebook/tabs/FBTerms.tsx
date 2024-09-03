import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';

interface FBTermsProps {
	data: {
		description: string;
	};
}

const FBTerms: React.FC<FBTermsProps> = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div className='global-install'>
			<p className='global-install-p'>{data.description}</p>
			<div className='lg:justify-end flex gap-4'>
				<Button variant='secondary'>{t('Read Terms')}</Button>
				<Button>{t('Accept anyway')}</Button>
			</div>
		</div>
	);
};

export default FBTerms;
