import { Button, InputRow, PopupProceed, SelectBoxRow } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import AccordionInstall from './AccordionInstall';
import { selectItemsInterface } from 'src/pages/CustomersPage/tabs/AllCustomers/_comp/GeneralInfoCustomerForm';
import { useForm } from 'src/app/utils/hooks/form';
import { z } from 'zod';
import { Form } from 'src/app/components/ui/form';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
export interface ILocation {
	option: selectItemsInterface[];
}

export const handelDefaultValue = () => {
	return {
		option: [],
	};
};

export const locationSchema = {
	option: z
		.array(
			z.object({
				id: z.string().min(1),
				name: z.string().min(1),
			}),
		)
		.default([]),
};
export default function Location({ setIsCatalogLocationChecked }) {
	const { t } = useTranslation();
	const [isCatalogLocationOpen, setIsCatalogLocationOpen] = useState(false);

	const handleCatalogLocation = () => {
		setIsCatalogLocationChecked(true);
		setIsCatalogLocationOpen(false);
	};

	const handleSubmit = (values: ILocation) => {
		console.log(values);
	};
	const { formStore, onSubmit } = useForm({
		schema: locationSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	const handleSubmitBtn = () => {
		setIsCatalogLocationOpen(true);
		onSubmit();
	};

	return (
		<AccordionInstall title={t('Marketing Catalog Location')}>
			<Form {...formStore}>
				<form onSubmit={onSubmit}>
					<p className='text-subtitle pb-6 text-sm w-[80%]'>
						Add the countries or regions where ads for your products will appear. you can update
						this in your settings later.
					</p>

					<div className='flex flex-col gap-5'>
						<div className='lg:w-1/2 w-full'>
							<SpecificAutoCompleteInput<ILocation>
								name='option'
								label={t('Default Location')}
								formStore={formStore}
							/>
						</div>
						<p className='text-subtitle text-sm w-[80%]'>
							You can't change the default location once you finish setup.
						</p>
						<div className='lg:w-1/2 w-full'>
							<InputRow
								label={t('Additional Locations')}
								placeholder={t('Search for country or region')}
								leftIcon={
									<span className='rotate-90'>
										<CiSearch size={30} />
									</span>
								}
								value={''}
							/>
						</div>

						<div className='flex justify-end'>
							<Button onClick={handleSubmitBtn}>{t('Create')}</Button>
						</div>

						{isCatalogLocationOpen && (
							<PopupProceed
								title={t('Are you want to Disable Catalog Sync From your store?')}
								subTitle={t('You can Recync anytime with TikTok Catalog.')}
								proceedBtnText={t('Proceed')}
								cancelBtnText={t('Cancel')}
								isOpen={isCatalogLocationOpen}
								onCancel={() => setIsCatalogLocationOpen(false)}
								onProceed={handleCatalogLocation}
							/>
						)}
					</div>
				</form>
			</Form>
		</AccordionInstall>
	);
}
