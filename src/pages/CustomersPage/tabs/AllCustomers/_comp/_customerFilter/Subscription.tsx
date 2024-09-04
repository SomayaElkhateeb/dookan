import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { UseFormReturn } from 'react-hook-form';
import { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import { useTranslation } from 'react-i18next';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';


const Subscription = ({ formStore }: { formStore: UseFormReturn<CustomersFilter> }) => {
  const { t } = useTranslation();

  const perPage = [
    { id: 1, name: 10 },
    { id: 2, name: 20 },
    { id: 3, name: 30 },
    { id: 4, name: 40 },
    { id: 5, name: 50 },
  ]
  return (
    <DropDownMenu title={t('E-Subscription')}>
      <div className='flex-col-global'>
        <SelectFormField
          name='per_page'
          label={t('Items Per Page')}
          formStore={formStore}
          options={perPage.map((e: CustomersFilter) => ({
            label: e.name,
            value: e.id.toString(),
          }))}
          placeholder='10'
        />

        <FormField
          formStore={formStore}
          name='email'
          label={t('Email')}
          render={(field) => <Input {...field} placeholder={'newcut@gmail.com'} />}
        />
      </div>

    </DropDownMenu>
  )
}

export default Subscription;
