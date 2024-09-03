import { useTranslation } from 'react-i18next';
// import SpecificProducts from 'src/app/components/page/discount/Selectors/SpecificProducts';

const AppliesOption = ({ applyTo }: { applyTo: string }) => {
	const { t } = useTranslation();
	return (
		<div>
			{applyTo === t('All products') && ''}
			{/* {applyTo === t('Specific products') && <SpecificProducts />} */}
		</div>
	);
};

export default AppliesOption;
