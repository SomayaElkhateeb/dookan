import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { AddCustomerGroupPageSchemaValues } from '../_schema/AddCustomerGroupSchema';
import { useAppSelector } from 'src/app/store';



export default function ChooseCustomers({
	formStore,
}: {
	formStore: UseFormReturn<AddCustomerGroupPageSchemaValues>;
}) {
	//  hooks
	
	const { t } = useTranslation();
	


	// ///////////////////////////
	//  selectors
	const { allCustomers } = useAppSelector((state) => state.allCustomer);

	return (
		<div className='global-cards gap-[1.2rem]'>
			<h2 className='title'>
				{t('Customers')}({allCustomers?.length})
			</h2>
			<SpecificAutoCompleteInput<AddCustomerGroupPageSchemaValues>
				array={allCustomers?.map((e) => {
					return {
						id: e.id.toString(),
						name: e.name,
					};
				})}
				name='customers'
				label={t('Customers')}
				formStore={formStore}
			/>
		</div>
	);
}
