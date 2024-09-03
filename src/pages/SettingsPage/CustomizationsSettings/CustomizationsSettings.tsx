import { useTranslation } from 'react-i18next';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import { Button, SubHeader } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import CheckoutCustomizeForm from './_comp/CheckoutCustomizeForm';
import NewsletterConsentForm from './_comp/NewsletterConsentForm';
import OrderInvoiceCustomizeForm from './_comp/OrderInvoiceCustomizeForm';
import ProductCustomizeForm from './_comp/ProductCustomizeForm';
import { useCallback, useState } from 'react';
import useResponsive from 'src/app/utils/hooks/useResponsive';

const CustomizationsSettings = () => {
	// hooks
	const { t } = useTranslation();
	const [value, setValue] = useState(1);
	const { xs } = useResponsive();

	const [checkoutData, setCheckoutData] = useState({});
	const [productData, setProductData] = useState({});
	const [newsletterData, setNewsletterData] = useState({});
	const [orderInvoiceData, setOrderInvoiceData] = useState({});

	const handleCheckoutSubmit = useCallback((data) => {
		setCheckoutData(data);
	}, []);

	const handleProductSubmit = useCallback((data) => {
		setProductData(data);
	}, []);

	const handleNewsletterSubmit = useCallback((data) => {
		setNewsletterData(data);
	}, []);

	const handleOrderInvoiceSubmit = useCallback((data) => {
		setOrderInvoiceData(data);
	}, []);

	const handleAllFormsSubmit = () => {
		const allData = {
			checkout: checkoutData,
			product: productData,
			newsletter: newsletterData,
			orderInvoice: orderInvoiceData,
		};
		console.log('allData', allData);
	};

	return (

		<div>
			<SubHeader title={t('Customizations')}>
				{!xs &&
					<>
						<Button variant='secondary'>{t("Discard")}</Button>
						<Button variant='primary' onClick={handleAllFormsSubmit}>{t("Save Changes")}</Button>
					</>
				}

				{xs && <div />}
			</SubHeader>

			<Tabs
				body={
					<>
						<TabPanel value='1'>
							<CheckoutCustomizeForm onSubmit={handleCheckoutSubmit} />
						</TabPanel>
						<TabPanel value='2'>
							<ProductCustomizeForm onSubmit={handleProductSubmit} />
						</TabPanel>
						<TabPanel value='3'>
							<NewsletterConsentForm onSubmit={handleNewsletterSubmit} />
						</TabPanel>
						<TabPanel value='4'>
							<OrderInvoiceCustomizeForm onSubmit={handleOrderInvoiceSubmit} />
						</TabPanel>
					</>
				}
			>
				<Tab onClick={() => setValue(1)} label={t('checkout')} value='1' />
				<Tab onClick={() => setValue(2)} label={t('product')} value='2' />
				<Tab onClick={() => setValue(3)} label={t('double opt-in')} value='3' />
				<Tab onClick={() => setValue(4)} label={t('order invoice')} value='4' />
			</Tabs>
		</div>

	);
};

export default CustomizationsSettings;
