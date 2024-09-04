import { useTranslation } from 'react-i18next';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import { Button, SubHeader } from 'src/app/components/optimized';
import CheckoutCustomizeForm from './_comp/CheckoutCustomizeForm';
import NewsletterConsentForm from './_comp/NewsletterConsentForm';
import OrderInvoiceCustomizeForm from './_comp/OrderInvoiceCustomizeForm';
import ProductCustomizeForm from './_comp/ProductCustomizeForm';
import { useState } from 'react';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import { useRef } from 'react';
import { useAppSelector } from 'src/app/store';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';

const CustomizationsSettings = () => {
	const { t } = useTranslation();
	const [_, setValue] = useState(1);
	const { xs } = useResponsive();
	const formRef = useRef<{ submit: () => void }>(null);

	const handleFormSubmit = () => {
		if (formRef.current) {
			formRef.current.submit(); // Trigger the form submission
		}
	};
	const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

	return (
		<>
			<SubHeader title={t('Customizations')}>
				{!xs && (
					<Button variant='primary' onClick={handleFormSubmit} loading={isLoadingAddOrUpdate}>
						{t('Save Changes')}
					</Button>
				)}
			</SubHeader>

			<Tabs
				body={
					<>
						<TabPanel value='1'>
							<CheckoutCustomizeForm ref={formRef} />
						</TabPanel>
						<TabPanel value='2'>
							<ProductCustomizeForm ref={formRef} />
						</TabPanel>
						<TabPanel value='3'>
							<NewsletterConsentForm ref={formRef} />
						</TabPanel>
						<TabPanel value='4'>
							<OrderInvoiceCustomizeForm ref={formRef} />
						</TabPanel>
					</>
				}
			>
				<Tab onClick={() => setValue(1)} label={t('checkout')} value='1' />
				<Tab onClick={() => setValue(2)} label={t('product')} value='2' />
				<Tab onClick={() => setValue(3)} label={t('double opt-in')} value='3' />
				<Tab onClick={() => setValue(4)} label={t('order invoice')} value='4' />
			</Tabs>
			{xs && (
				<div className='flex-end pr-3'>
					<AddButtonMobile onClick={handleFormSubmit} />
				</div>
			)}
		</>
	);
};

export default CustomizationsSettings;
