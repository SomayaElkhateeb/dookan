import { useTranslation } from 'react-i18next';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Button } from 'src/app/components/optimized';
import { FilterSideBar } from 'src/app/components/shared';
import useCustomersFilter, { CustomersFilter } from '../_addCustomer/_hook/HookFilterCustomers';
import { useForm } from 'src/app/utils/hooks/form';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { Form } from 'src/app/components/ui/form';
import Date from './Date';
import CountryAndCity from './CountryAndCity';
import Gender from './Gender';
import Group from './Group';
import Subscription from './Subscription';
import { getFilterCustomer } from 'src/app/store/slices/customersPage/AllCustomers/customersTableAsyncThunks';
import SortFilter from './SortFilter';

export default function CustomersFilters({
	HandelCloseDrawer,
	openDrawer,
}: {
	openDrawer: boolean;
	HandelCloseDrawer: () => void;
}) {
	//  hooks
	const { t } = useTranslation();
	const divClass = 'flex-row-global justify-between';

	// custom hook
	const { handelDefaultValue, CustomersFilterSchema } = useCustomersFilter();

	// redux
	const dispatch = useAppDispatch();

	const handleSubmit = (values: CustomersFilter) => {
		console.log('Form Values:', values);
	
		const params = new URLSearchParams();
	
		Object.entries(values).forEach(([key, value]) => {
			if (value) {
				params.append(key, value.toString());
			}
		});
	
		console.log('Generated Params:', params.toString());
	
		dispatch(getFilterCustomer(params.toString()));
	};
	const { formStore, onSubmit } = useForm({
		schema: CustomersFilterSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	
	const handleReset = () => {
        HandelCloseDrawer()
        formStore.reset();
    }

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} >
				<FilterSideBar handelClose={HandelCloseDrawer} sideDrawerOpen={openDrawer}>
					<div className='flex-col-global '>
						{/*  top section */}
						<div className={divClass}>
							<h3 className='title text-[1.2rem]'>{t('Customers Filters')}</h3>
							<IoCloseCircleOutline
								onClick={HandelCloseDrawer}
								className='cursor-pointer text-[1.2rem]'
							/>
						</div>


						<div className='w-full'>
							<SortFilter formStore={formStore}/>
							<CountryAndCity formStore={formStore}/>
							<Date formStore={formStore}/>
							<Gender formStore={formStore}/>
							<Group formStore={formStore}/>
							<Subscription formStore={formStore}/>
						</div>

						<div className='flex-row-global justify-between'>
							<Button>{t('Show Results')}</Button>
							<Button variant='tertiary' onClick={onSubmit} >{t('Saved Filters')}</Button>
							<Button variant='tertiary' className='text-[red] bg-white' onClick={handleReset}>
								{t('Reset')}
							</Button>
						</div>
					</div>
				</FilterSideBar>
			</form>
		</Form>
	);
}

