import { useState } from 'react';
import { Button } from 'src/app/components/optimized';
import { useSearchParams } from 'react-router-dom';
import { usePlatformContext } from '../../PlatformContext';
import { selectItemsInterface } from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/GeneralInfoCustomerForm';
import { useForm } from 'src/app/utils/hooks/form';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Form } from 'src/app/components/ui/form';

interface ISnap {
	option: selectItemsInterface[];
}

const handelDefaultValue = () => {
	return {
		option: [],
	};
};

const snapSchema = {
	option: z
		.array(
			z.object({
				id: z.string().min(1),
				name: z.string().min(1),
			}),
		)
		.default([]),
};

// const organizations = [
// 	{
// 		name: 'Fan Al Taalouq',
// 		url: 'FanAlTaalouq.dookan.net',
// 	},
// 	{
// 		name: 'Rasma',
// 		url: 'Rasma.dookan.net',
// 	},
// ];

const SnapchatMarketingCatalog = () => {
	const { t } = useTranslation();
	// const [selectedOrganization, setSelectedOrganization] = useState('');
	const [_, setSearchParams] = useSearchParams();
	const { setSyncStatus } = usePlatformContext();

	const handleSubmit = (values: ISnap) => {
		console.log(values);
	};
	const { formStore, onSubmit } = useForm({
		schema: snapSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	const handleSync = () => {
		setSyncStatus(true);
		setSearchParams({ features_manage: 'active' });
		setSyncStatus(true);
		onSubmit();
	};

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex flex-col gap-4'>
				<div className='border-secondary rounded-md border overflow-hidden'>
					<h1 className='title p-5 pb-0'>{t('Catalog')}</h1>
					<p className='text-subtitle p-5'>{t('Select Organization To Use For Catalog Sync')}</p>
					<div className='lg:w-1/2 p-5 pt-0'>
						<SpecificAutoCompleteInput<ISnap> name='option' formStore={formStore} />
					</div>
					<div className='flex justify-end p-5 pt-0 border-secondary border-b'>
						{/* disabled={selectedOrganization === ''} */}
						<Button onClick={handleSync}>{t('Sync')}</Button>
					</div>
					<p className='border-constrained border text-sm py-3 px-5'>
						Your Products are being synced into a Snapchat catalog in your organization. only
						products with the folowing required fields will be synced: id, title, description, link,
						image-link, availability, brand or mpn or gtin (
						<span className='text-primary cursor-pointer'>see required product metadata</span>).
					</p>
				</div>
			</form>
		</Form>
	);
};

export default SnapchatMarketingCatalog;
