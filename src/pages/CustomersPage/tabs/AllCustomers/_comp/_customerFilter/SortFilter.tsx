import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { UseFormReturn } from 'react-hook-form';
import { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getAllCustomersTable } from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

const SortFilter = ({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { allCustomers } = useAppSelector((state) => state.allCustomer);

    useEffect(() => {
        dispatch(getAllCustomersTable());
    }, [dispatch]);

    const sortOptions = [
        { id: 1, name: t('Name A to Z') },
        { id: 2, name: t('Name Z to A') },
        { id: 3, name: t('Most buying') },
        { id: 4, name: t('Date Added') },
        { id: 5, name: t('Date modified') },
    ];

    return (
        <DropDownMenu title={t('Sort & Order')}>
            <SelectFormField
                name='sort'
                label={t('Sort')}
                formStore={formStore}
                options={sortOptions.map((option) => ({
                    label: option.name,
                    value: option.id.toString(),
                }))}
                placeholder={t('Select sort')}
            />

           {/* {allCustomers > 0 && <SelectFormField
                name='order'
                label={t('Order')}
                formStore={formStore}
                options={allCustomers.map((customer) => ({
                    label: customer.order,
                    value: customer.id.toString(),
                }))}
                placeholder={t('Select order')}
            />} */}
        </DropDownMenu>
    );
};

export default SortFilter;
