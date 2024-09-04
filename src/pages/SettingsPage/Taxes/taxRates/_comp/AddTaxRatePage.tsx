import { useTranslation } from 'react-i18next';
import { Button, SubHeader } from 'src/app/components/optimized';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import { Form } from 'src/app/components/ui/form';
import AddTaxRateForm from './AddTaxRateForm';
import { useForm } from 'src/app/utils/hooks/form';
import { taxRateSettingsSchema, defaultValues, TaxRateInterface } from '../_hook/HookTaxRate';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	createTaxRate,
	getTaxRatesShow,
	updateTaxRate,
} from 'src/app/store/slices/settingsPage/tax/taxRates/taxRateAsyncThunks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
const AddTaxRatePage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const id = searchParams.get('id');
	useMemo(() => {
		if (id) {
			dispatch(getTaxRatesShow(id));
		}
	}, [id]);

	const { taxRatesShow } = useAppSelector((state) => state.taxRateSettings);
	console.log('taxRatesShow', taxRatesShow);
	const handleSubmit = (values: TaxRateInterface) => {
		console.log('tax rate', values);
		id
			? dispatch(updateTaxRate({ data: values, id })).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  })
			: dispatch(createTaxRate(values)).then((promiseResponse) => {
					if ((promiseResponse.payload.code = 200)) {
						navigate(-1);
					}
			  });
	};

	const { formStore, onSubmit } = useForm({
		schema: taxRateSettingsSchema,
		handleSubmit: handleSubmit,
		defaultValues: defaultValues,
	});
	console.log('errors', formStore.formState.errors);
	useMemo(() => {
		if (id) {
			formStore.setValue('identifier', taxRatesShow.identifier);
			formStore.setValue('zip_code', taxRatesShow.zip_code);
			formStore.setValue('zip_from', taxRatesShow.zip_from);
			formStore.setValue('zip_to', taxRatesShow.zip_to);
			formStore.setValue('country', taxRatesShow.country);
			formStore.setValue('tax_rate', Number(taxRatesShow.tax_rate));
			taxRatesShow?.is_zip > 0 ? formStore.setValue('is_zip', 1) : formStore.setValue('is_zip', 0);
		}
	}, [id, taxRatesShow]);
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Tax Rates')}>
					{!xs ? (
						<>
							<Button
								variant='secondary'
								onClick={() => {
									navigate(-1);
								}}
							>
								{t('Discard')}
							</Button>
							<Button variant='primary' type='submit'>
								{t('save changes')}
							</Button>
						</>
					) : (
						<div className='flex-end pr-3'>
							<AddButtonMobile />
						</div>
					)}
				</SubHeader>
				<div className='custom_container custom-grid-parent'>
					<div className=' flex-col-global grid-left'>
						<AddTaxRateForm formStore={formStore} />
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AddTaxRatePage;
