import { useId, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { FormLabel } from 'src/app/components/ui/form';

import { useAppSelector } from 'src/app/store';
import { Props } from '../types';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';


export default function OptionValuesManager<TFormStore>(props: Props<TFormStore>) {
	const { t } = useTranslation();
	// const reactId = useId();
	const { attributes } = useAppSelector((state) => state.attributes);

	// useMemo(() => {
	// 	attributes?.length > 0 &&
	// 		attributes[0]?.id &&
	// 		props.formStore.setValue('option.name', attributes[0]?.id);
	// }, [attributes]);


	// const handelExistComponent = (() => {
	// 	if (props.attributeValue && props.attributeValue?.length > 0 && props.attributeValue[0]) {
	// 		if (props.attributeValue[0]?.type === "select") {
	// 			return (
	// 				<SelectFormField
	// 					// label={t('Name')}
	// 					formStore={props.formStore}
	// 					name='option.value'
	// 					options={props.attributeValue[0]?.options?.map((e) => {
	// 						return {
	// 							label: e?.admin_name,
	// 							value: e?.id,
	// 						};
	// 					})}
	// 				/>
	// 			)
	// 		}
	// 	}

	// })

	return (
		<div className='flex flex-col gap-1.5'>
			{/* <FormLabel htmlFor={reactId}>{t('Values')}</FormLabel>
			{handelExistComponent()} */}


		</div>
	);
}
