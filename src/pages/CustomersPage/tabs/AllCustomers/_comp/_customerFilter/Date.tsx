import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { UseFormReturn } from 'react-hook-form';
import { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useTranslation } from 'react-i18next';

const Date = ({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) => {
    //  hooks
    const { t } = useTranslation();


    return (
        <DropDownMenu title={t('Date')}>
            <FormField
                formStore={formStore}
                name='date_from'
                label={t('From')}
                render={(field) => <Input {...field} placeholder={'YYYY-MM-DD'} />}
            />
            <FormField
                formStore={formStore}
                name='date_to'
                label={t('To')}
                render={(field) => <Input {...field} placeholder={'YYYY-MM-DD'} />}
            />
        </DropDownMenu>
    );
}

export default Date;
