// src/components/PackageSelector.jsx
import React, { useState } from 'react';
import '../../_comp/custom-radio.css';
import { useTranslation } from 'react-i18next';
import { OptionRadio } from '../../_comp/SubscriptionOptions';

const packages = [
	{ id: 1, emails: '20,000', price: 'SAR 50', selected: false },
	{ id: 2, emails: '50,000', price: 'SAR 50', selected: true },
];

const PackageSelector = () => {
	const [selectedOption, setSelectedOption] = useState<string>('50000');

	const subscriptionOptions = [
		{ value: '20000', label: '20,000 emails/month', price: 'SAR 50' },
		{ value: '50000', label: '50,000 emails/month', price: 'SAR 50' },
	];
	const [selectedPackage, setSelectedPackage] = useState(packages[1].id);
	const { t } = useTranslation();

	const handlePackageSelect = (pkgId) => {
		setSelectedPackage(pkgId);
	};

	const handleOptionChange = (value: string) => {
		setSelectedOption(value);
	};
	return (
		<div className='global-cards'>
			<h2 className='title'>{t('Select package')}</h2>
			<p className='text-subtitle text-sm'>{t('Choose one of our packages for more emails')}</p>
			<div className='flex flex-col space-y-4 mb-6'>
				<OptionRadio
					col={true}
					options={subscriptionOptions}
					selectedOption={selectedOption}
					onOptionChange={handleOptionChange}
				/>
			</div>
		</div>
	);
};

export default PackageSelector;
