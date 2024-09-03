import { useTranslation } from "react-i18next";
import BaseTable, { GlobalTableCell } from "src/app/components/optimized/TableLayoutGlobal/base.table";

import useLanguage from "src/app/utils/hooks/useLanguage";
import { TaxRateInterface } from "../_hook/HookTaxRate";

const TaxRateTable = ({
    data,
    handelId,
    isLoading,
    children
}: {
    data: TaxRateInterface[];
    handelId: (e: string) => void;
    isLoading: boolean;
    children: React.ReactNode;

}) => {

    //  hooks
    const { language } = useLanguage();
    const { t } = useTranslation();

    //  headers
    const dataHeaders = [
        { title: t('identifier') },
        { title: t('state') },
        { title: t('country') },
        { title: t('zip code') },
        { title: t('zip from') },
        { title: t('zip to') },
        { title: t('rate') },
        { title: t('actions') },
    ];

    return (
        <BaseTable
            isLoading={isLoading}
            language={language}
            color='#55607A'
            headers={dataHeaders.map((h) => h)}
            rows={data?.map((e: TaxRateInterface, i: number) => {
                return {
                    item: e,
                    elements: [
                        <GlobalTableCell>
                            <div className=' flex  items-center gap-[.3rem] '>
                                <p className='title'>{e.identifier}</p>
                            </div>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.is_zip}</p>

                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.country}</p>

                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.zip_code}</p>

                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.zip_from}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.zip_to}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <div onClick={() => handelId(e?.id)}>{children}</div>
                        </GlobalTableCell>,
                    ],
                };
            })}
        />
    )
}

export default TaxRateTable
