import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus } from 'react-icons/fa6';
import { Button, CheckBox } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';

import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { useAppDispatch, useAppSelector } from 'src/app/store';

import { Attribute, option } from 'src/app/interface/AttributeInterface';
import { Values } from '../types';
import { useFieldArray } from 'react-hook-form';
import { ValidFormStoreByValues } from 'src/utils/types';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { Textarea } from 'src/app/components/ui/textarea';
import { Input } from 'src/app/components/ui/Input';
import DropDownMenu from 'src/app/components/optimized/DropDownMenu';
import { LiaTrashAlt } from 'react-icons/lia';
interface Props<TFormStore> {
	formStore: ValidFormStoreByValues<TFormStore, Values>;
	label: string;
}
export default function AddOptionManager<TFormStore>(props: Props<TFormStore>) {
	const { t } = useTranslation();

	const { attributes } = useAppSelector((state) => state.attributes);
	const { inventory } = useAppSelector((state) => state.inventory);

	const { fields, append, remove } = useFieldArray({
		control: props.formStore.control,
		name: 'variants',
	});


	const handelAttributeValueComponent = (i: number) => {
		let attributeValue = attributes?.filter(
			(e) => e?.code?.toString() === props.formStore.watch(`variants[${i}].code`)?.toString(),
		);
		switch (attributeValue[0]?.type) {
			case 'select':
				return (
					<SelectFormField
						formStore={props.formStore}
						name={`variants[${i}].attributeValues`}
						label={t('Attribute value')}
						options={
							attributeValue?.length > 0 && attributeValue[0]?.options?.length > 0
								? attributeValue[0]?.options?.map((e: optionInterface) => {
									return {
										value: e.id,
										label: e.label,
									};
								})
								: []
						}
						placeholder={t('Attribute value')}
					/>
				);

			case 'boolean':
				return (
					<FormField
						formStore={props.formStore}
						name={`variants[${i}].attributeValues`}
						render={(field) => (
							<CheckBox
								label={t('Attribute value')}
								checked={props.formStore.watch(`variants[${i}].attributeValues`) === true}
								handleOnChange={field.onChange}
							/>
						)}
					/>
				);
			case 'text':
				return (
					<FormField
						formStore={props.formStore}
						name={`variants[${i}].attributeValues`}
						label={t('Attribute value')}
						render={(field) => <Input {...field} />}
					/>
				);
		}
	};


	return (
		<div className='flex-col-global bg-sky-600'>
			{fields?.length > 0 &&
				fields?.map((item, i) => (
					<div className='global-cards my-2'>
						<DropDownMenu
							addCompo={
								<LiaTrashAlt
									onClick={() => {
										remove(i);
									}}
									className='iconClass text-[red]'
								/>
							}
							variant
							title={`${t('variant')} ${i + 1}`}
						>
							<div className='grid grid-cols-1 gap-4  '>
								<div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
									<TabbedFormField
										formStore={props.formStore}
										keys={[
											{ name: `variants[${i}].en.name`, label: 'En' },
											{ name: `variants[${i}].ar.name`, label: 'عربي' },
										]}
										label={t('NAME')}
										renderer={(field) => <Input {...field} />}
									/>
									<TabbedFormField
										formStore={props.formStore}
										keys={[
											{ name: `variants[${i}].en.short_description`, label: 'En' },
											{ name: `variants[${i}].ar.short_description`, label: 'عربي' },
										]}
										label={t('Short Description')}
										renderer={(field) => <Input {...field} />}
									/>
								</div>
								<TabbedFormField
									formStore={props.formStore}
									keys={[
										{ name: `variants[${i}].en.description`, label: 'En' },
										{ name: `variants[${i}].ar.description`, label: 'عربي' },
									]}
									label={t('Description')}
									renderer={(field) => <Textarea {...field} />}
								/>
								<div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
									<FormField
										label={t('Price')}
										formStore={props.formStore}
										name={`variants[${i}].price`}
										render={(field) => <Input type='number' {...field} />}
									/>
									<FormField
										label={t('weight')}
										formStore={props.formStore}
										name={`variants[${i}].weight`}
										render={(field) => <Input type='number' {...field} />}
									/>
								</div>
								<FormField
									label={t('SKU Code')}
									formStore={props.formStore}
									name={`variants[${i}].sku`}
									render={(field) => <Input {...field} />}
								/>
								<div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
									<FormField
										label={t('quantity')}
										formStore={props.formStore}
										name={`variants[${i}].quantity`}
										render={(field) => <Input type='number' {...field} />}
									/>
									<SpecificAutoCompleteInput<Values>
										array={inventory?.map((e) => {
											return {
												id: e.id.toString(),
												name: e.name,
											};
										})}
										label={t('Inventory branches')}
										name={`variants[${i}].inventories`}
										formStore={props.formStore}
									/>
								</div>
								<div className='grid md:grid-cols-2 grid-cols-1'>
									<SelectFormField
										formStore={props.formStore}
										name={`variants[${i}].code`}
										placeholder={t('Attribute Name')}
										label={t('Attribute Name')}
										AnotherName={`variants[${i}].attributeValues`}
										options={
											attributes?.length > 0
												? attributes?.map((e) => {
													return {
														value: e.code,
														label: e.name,
													};
												})
												: []
										}
									/>
								</div>
								<div className='mt-2'>{handelAttributeValueComponent(i)}</div>
								<div className='mt-2'>
									<FormField
										formStore={props.formStore}
										name={`variants[${i}].status`}
										render={(field) => (
											<CheckBox
												label={t('Status')}
												checked={
													props.formStore.watch(`variants[${i}].status`) === 1 ? true : false
												}
												handleOnChange={(isChecked) => {
													if (isChecked) {
														props.formStore.setValue(`variants[${i}].status`, 1);
													} else {
														props.formStore.setValue(`variants[${i}].status`, 0);
													}
												}}
											/>
										)}
									/>
								</div>
							</div>
						</DropDownMenu>
					</div>
				))}

			<div className='flex flex-row justify-start'>
				<Button
					variant='secondary'
					textClassName='flex items-center justify-center gap-1.5 whitespace-nowrap bg-transparent border-title px-4 py-3 rounded-lg border'
					className='px-0 border-0 rounded-none'
					onClick={() =>
						append({
							sku: '',
							en: {
								name: '',
								short_description: '',
								description: '',
							},
							ar: {
								name: '',
								short_description: '',
								description: '',
							},
							price: 0,
							weight: 0,
							status: 0,
						})
					}
				>
					<FaCirclePlus className='size-5' />
					{props.label}
				</Button>
			</div>
		</div>
	);
}
