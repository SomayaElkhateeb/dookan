import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import useCustomHookTaxRate, { TaxRateInterface } from '../_hook/HookTaxRate';
import { createTaxRate, getTaxRatesShow, updateTaxRate } from 'src/app/store/slices/settingsPage/tax/taxRates/taxRateAsyncThunks';
import { Form } from 'src/app/components/ui/form';
import AddTaxRateForm from './AddTaxRateForm';
import { useForm } from 'src/app/utils/hooks/form';
import { useMemo } from 'react';


const AddTaxRate = () => {
  //  hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // custom hook
  const { handelDefaultValue, taxRateSettingsSchema } = useCustomHookTaxRate();

  // redux
  const dispatch = useAppDispatch();
  const { taxRatesShow } = useAppSelector((state) => state.taxRateSettings);

  const handleSubmit = (values: TaxRateInterface) => {
    console.log("tax rate",values);
    id
      ?
      dispatch(updateTaxRate({ data: values, id })).then((promiseResponse) => {
        if ((promiseResponse.payload.code = 200)) {
          navigate(-1);
        }
      })
      :
      dispatch(createTaxRate(values)).then((promiseResponse) => {
        if ((promiseResponse.payload.code = 200)) {
          navigate(-1);
        }
      });
  };

  const { formStore, onSubmit } = useForm({
    schema: taxRateSettingsSchema,
    handleSubmit: handleSubmit,
    defaultValues: handelDefaultValue(),
  });

  useMemo(() => {
    if (id) {
      formStore.setValue('identifier', taxRatesShow.identifier);
      formStore.setValue('zip_code', taxRatesShow.zip_code);
      formStore.setValue('zip_from', taxRatesShow.zip_from);
      formStore.setValue('zip_to', taxRatesShow.zip_to);
      formStore.setValue('country', taxRatesShow.country);
      formStore.setValue('tax_rate', taxRatesShow.tax_rate);
      taxRatesShow?.is_zip > 0
        ? formStore.setValue('is_zip', 1)
        : formStore.setValue('is_zip', 0);
    }
  }, [id, taxRatesShow]);


  useMemo(() => {
    if (id) {
      dispatch(getTaxRatesShow(id));
    }
  }, [id]);



  return (
    <Form {...formStore}>
      <form onSubmit={onSubmit} className='flex-col-global'>
        <div className='custom_container custom-grid-parent'>
          <div className=' flex-col-global grid-left'>
            <AddTaxRateForm formStore={formStore} />
          </div>
        </div>
      </form>
    </Form >
  )
}

export default AddTaxRate;
