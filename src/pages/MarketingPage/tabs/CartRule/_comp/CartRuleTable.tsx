import { useTranslation } from 'react-i18next';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import BaseTable, {
    GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';

const CartRuleTable = ({
    data,
    handelId,
    isLoading,
    children,
}: {
    data: any[];
    handelId: (e: string) => void;
    children: React.ReactNode;
    isLoading: boolean;
}) => {
    //  hooks
    const { language } = useLanguage();
    const { t } = useTranslation();

    //  headers
    const dataHeaders = [
        { title: t('name') },
        { title: t('coupon code') },
        { title: t('start') },
        { title: t('end') },
        { title: t('status') },
        { title: t('priority') },
        { title: t('actions') },
    ];

    return (
        <BaseTable
            isLoading={isLoading}
            language={language}
            color='#55607A'
            headers={dataHeaders.map((h) => h)}
            rows={data?.map((e: any, i: number) => {
                return {
                    item: e,
                    elements: [
                        <GlobalTableCell>
                            <p className='title'>{e.name}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.coupon_code}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.starts_from}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.ends_till}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.status === true ? t('Active') : t('Not Active')}</p>
                        </GlobalTableCell>,
                        <GlobalTableCell>
                            <p className='text-title text-sm'>{e.priority}</p>
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

export default CartRuleTable;
