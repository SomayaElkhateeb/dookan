import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { UseFormReturn } from 'react-hook-form';
import { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import { useTranslation } from 'react-i18next';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

const Gender = ({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) => {
    const { t } = useTranslation();
    const gender = [
        {id: 1 , name: t('all')},
        {id: 2 , name: t('female')},
        {id: 3 , name: t('male')},
    ]

    return (
        <DropDownMenu title={t('Gender')}>
            <SelectFormField
                name='gender'
                label={t('Gender')}
                formStore={formStore}
                options={gender.map((e: CustomersFilter) => ({
                    label: e.name,
                    value: e.id.toString(),
                }))}
                placeholder={t('Select gender')}
            />
        </DropDownMenu>
    )
}

export default Gender;
