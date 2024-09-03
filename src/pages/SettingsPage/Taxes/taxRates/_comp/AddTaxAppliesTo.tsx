import FormChoiceChips from "src/app/components/ui/form/FormChoiceChips";
import { useForm } from "src/app/utils/hooks/form";
import useCustomHookTaxConfigSetting, { TaxConfigSetting } from "../_hook/HookTaxConfigSettings";
import { postTaxesConfiguration } from "src/app/store/slices/settingsPage/configurations/configurationsAsyncThunks";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { useTranslation } from "react-i18next";
import { Form } from "src/app/components/ui/form";
import { CheckBox } from "src/app/components/optimized";

const AddTaxAppliesTo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // custom hook
  const { handelDefaultValue, taxConfigSettingSchema } = useCustomHookTaxConfigSetting();

  // redux
  const dispatch = useAppDispatch();
  const { isLoadingAddOrUpdate } = useAppSelector((state) => state.configurations);

  const handleSubmit = (values: TaxConfigSetting) => {
    console.log("values", values);
    dispatch(postTaxesConfiguration(values)).then((promiseResponse) => {
      if ((promiseResponse.payload.code = 200)) {
        navigate(-1);
      }
    });
  };

  const { formStore, onSubmit } = useForm({
    schema: taxConfigSettingSchema,
    handleSubmit: handleSubmit,
    defaultValues: handelDefaultValue(),
  });

  return (
    <Form {...formStore}>
      <form onSubmit={onSubmit} className='global-cards'>
        <FormChoiceChips<TaxConfigSetting>
          formStore={formStore}
          name='taxes.general.applied_to'
          label={t('Tax applies to')}
          options={['sub total', 'sub total + shipping']}
        />
        <CheckBox
          label={t('Include tax in product prices')}
          checked={formStore.watch('taxes.general.include_in_product_prices')}
          handleOnChange={(option) => {
            formStore.setValue('taxes.general.include_in_product_prices', option);
          }}
        />
        <div>
          <FormChoiceChips<TaxConfigSetting>
            formStore={formStore}
            name='taxes.general.default_class'
            label={t('Default Tax Class')}
            options={['none', 'taxable goods']}
          />
          <p className='paragraph text-subtitle'>
            {t('This tax class will be applied automatically to any new added product.')}
          </p>
        </div>

        <FormChoiceChips<TaxConfigSetting>
          formStore={formStore}
          name='taxes.general.display_in_checkout'
          label={t('Tax display in checkout')}
          options={['hide tax', 'show tax text', 'show tax value']}
        />
      </form>
    </Form>
  )
}

export default AddTaxAppliesTo
