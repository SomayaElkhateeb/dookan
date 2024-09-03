import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from 'src/app/components/optimized';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import Tabs from 'src/app/components/optimized/Tabs/Tabs';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import AddTaxRate from './AddTaxRate';
import AddTaxAppliesTo from './AddTaxAppliesTo';

const AddTaxRatePage = () => {
    //  hooks
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [value, setValue] = useState(1);
    const { xs } = useResponsive();

    return (
        <>
            <SubHeader title={t('Tax Rates')}>
                {!xs ?
                    <>
                        <Button
                            variant='secondary'
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            {t("Discard")}
                        </Button>

                        <Button
                            variant='primary'
                            onClick={() => {
                                if (value === 2) {
                                    navigate('addTaxRate');
                                }
                            }}
                        >
                            {t("save changes")}
                        </Button>
                    </>
                    :
                    <div className='flex-end pr-3'>
                        <AddButtonMobile onClick={() => {
                            if (value !== 1) {
                                navigate('addTaxRate');
                            }
                        }} />
                    </div>
                }
            </SubHeader>

            <Tabs
                body={
                    <>
                        <TabPanel value='1'>
                            <AddTaxRate />
                        </TabPanel>
                        <TabPanel value='2'>
                            <AddTaxAppliesTo />
                        </TabPanel>
                    </>
                }
            >
                {/*  children */}
                <Tab onClick={() => setValue(1)} label={t('tax rates')} value='1' />
                <Tab onClick={() => setValue(2)} label={t('tax configuration setting')} value='2' />
            </Tabs>
        </>
    )
}

export default AddTaxRatePage;
