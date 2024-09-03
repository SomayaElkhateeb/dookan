import { useTranslation } from "react-i18next";
import { useForm } from "src/app/utils/hooks/form";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from "src/app/store";
import { UseFormReturn } from "react-hook-form";
import { Button } from "src/app/components/optimized";
import { GlobalDialog } from "src/app/components/shared";
import { Form } from "src/app/components/ui/form";
import { Input } from "src/app/components/ui/input";
import Textarea from "src/app/components/optimized/InputsFields/Textarea";
import useCustomHookAddTaxCategory, { TaxCategory } from "../_hook/HookTaxCategories";
import { createTaxCategory, updateTaxCategory, getTaxCategoriesShow } from "src/app/store/slices/settingsPage/tax/taxCategories/taxCategoriesAsyncThunks";
import FormField from "src/app/components/ui/form/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/app/components/ui/select';

const AddTaxCategories = ({ openDialog, setOpenDialog }: { openDialog: boolean; setOpenDialog: () => void }) => {
  // hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // redux
  const dispatch = useAppDispatch();
  const { taxCategoriesShow } = useAppSelector((state) => state.taxCategorySettings);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const dialogStyle = {
    width: { lg: '50%', xs: '70%' },
  };

  // custom hook
  const { handelDefaultValue, AddTaxCategorySchema } = useCustomHookAddTaxCategory();

  const handleSubmit = (values: TaxCategory) => {
    console.log(values);

    const customValues = {
      code: values.code,
      name: values.name,
      description: values.description,
      taxrates: values.taxrates,
    };

    if (id) {
      dispatch(updateTaxCategory({ data: customValues, id })).then((promiseResponse) => {
        if (promiseResponse.payload.code === 200) {
          navigate(-1);
        }
      });
    } else {
      dispatch(createTaxCategory(values)).then((promiseResponse) => {
        if (promiseResponse.payload.code === 200) {
          navigate(-1);
        }
      });
    }
  };

  const { formStore, onSubmit } = useForm({
    schema: AddTaxCategorySchema,
    handleSubmit: handleSubmit,
    defaultValues: handelDefaultValue(),
  });

  useEffect(() => {
    if (id) {
      dispatch(getTaxCategoriesShow(id));
    }
  }, [id, dispatch]);

  useMemo(() => {
    if (id && taxCategoriesShow) {
      formStore.setValue('code', taxCategoriesShow.code);
      formStore.setValue('name', taxCategoriesShow.name);
      formStore.setValue('description', taxCategoriesShow.description);
      formStore.setValue('taxrates', taxCategoriesShow.taxrates);
    }
  }, [id, taxCategoriesShow, formStore]);

  return (
    <Form {...formStore}>
      <form onSubmit={onSubmit}>
        <GlobalDialog openDialog={openDialog} handleClose={handleClose} style={dialogStyle}>
          <div className='flex-col-global gap-4 h-full'>
            <h2 className="title">{t('Add Tax Category')}</h2>
            {/* inputs */}
            <div className='flex-col-global justify-between h-full'>
              <TextFields formStore={formStore} />
              <div className='flex items-center justify-end gap-5 py-5'>
                <Button variant='tertiary' onClick={handleClose}>
                  {t('cancel')}
                </Button>
                <Button variant='primary' type='submit' onClick={onSubmit}>
                  {t('add')}
                </Button>
              </div>
            </div>
          </div>
        </GlobalDialog>
      </form>
    </Form>
  );
};

export default AddTaxCategories;

////////////////////////////////////////////////////////////

const TextFields = ({ formStore }: { formStore: UseFormReturn<TaxCategory> }) => {
  const { t } = useTranslation();

  return (
    <div className='flex-col-global gap-4'>
      <div className='flex gap-4 w-full'>
        <div className='w-full'>
          <FormField
            formStore={formStore}
            name='name'
            label={t('Category Name')}
            render={(field) => <Input {...field} placeholder={t('category name')} />}
          />
        </div>
        <div className='w-full'>
          <FormField
            formStore={formStore}
            name='code'
            label={t('Category Code')}
            render={(field) => <Input {...field} placeholder={t('category code')} />}
          />
        </div>
      </div>
      {/* test */}
      <FormField 
        formStore={formStore}
        name='taxrates'
        label={t('Tax Rates')}
        render={(field) => (
          <div className='flex-col-global gap-[.2rem]'>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              required={field.required}
              name={field.name}
            >
              <SelectTrigger onBlur={field.onBlur} disabled={field.disabled} id={field.id}>
                <SelectValue placeholder='Design' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='design'>Design</SelectItem>
                <SelectItem value='theme'>Theme</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />
      <FormField
        formStore={formStore}
        name='description'
        label={t('Description')}
        render={(field) => <Textarea {...field} placeholder={'Type a description'} />}
      />
    </div>
  );
};
