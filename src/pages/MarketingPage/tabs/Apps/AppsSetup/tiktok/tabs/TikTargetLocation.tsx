import React, { useState } from 'react';
import { Button } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';
import { ILocation, handelDefaultValue, locationSchema } from '../_comp/Location';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
interface LocationData {
	description: string;
	location: string[];
}
interface TikTargetLocationProps {
	data: LocationData;
}
const TikTargetLocation: React.FC<TikTargetLocationProps> = ({ data }) => {
	const { t } = useTranslation();

	const handleSubmit = (values: ILocation) => {
		console.log(values);
	};
	const { formStore, onSubmit } = useForm({
		schema: locationSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit}>
				<p className='global-install-p'>{data.description}</p>
				<hr />
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
					<div className='py-5 lg:w-[70%]'>
						<SpecificAutoCompleteInput<ILocation> name='option' formStore={formStore} />
					</div>
					<div>
						<Button onClick={onSubmit}>{t('Confirm')}</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default TikTargetLocation;
