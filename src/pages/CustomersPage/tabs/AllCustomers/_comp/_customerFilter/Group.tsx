import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { UseFormReturn } from 'react-hook-form';
import { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import { useAppDispatch, useAppSelector } from 'src/app/store';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getCustomersGroupTable } from 'src/app/store/slices/customersPage/CustomersGroup/customersGroupTableAsyncThunks';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

const Group = ({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) => {
    const { t } = useTranslation();

    // redux
    const dispatch = useAppDispatch();
    const { customersGroup } = useAppSelector((state) => state.customersGroup);

    useEffect(() => {
        dispatch(getCustomersGroupTable())
    }, [dispatch])
    return (
        <DropDownMenu title={t('Group')}>
            <SelectFormField
                name='customer_group_id'
                label={t('Group')}
                formStore={formStore}
                options={customersGroup.map((e: CustomersFilter) => ({
                    label: e.name,
                    value: e.id.toString(),
                }))}
                placeholder={t('Select group')}
            />
        </DropDownMenu>
    )
}

export default Group;
