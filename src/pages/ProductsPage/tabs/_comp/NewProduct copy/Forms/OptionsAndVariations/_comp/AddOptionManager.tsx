import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus } from 'react-icons/fa6';
import { Button, CheckBox } from 'src/app/components/optimized';
import FormField from 'src/app/components/ui/form/field';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { useAppSelector } from 'src/app/store';
import { Values } from '../types';
import { useFieldArray } from 'react-hook-form';
import { ValidFormStoreByValues } from 'src/utils/types';
import { Input } from 'src/app/components/ui/input';
import { GlobalDialog } from 'src/app/components/shared';
import AutoComplete from 'src/app/components/ui/form/AutoComplete';
import { RemoveIcon } from 'src/app/utils/icons';
import FormOptionById from './FormOptionById';

interface Props<TFormStore> {
	formStore: ValidFormStoreByValues<TFormStore, Values>;
	label: string;
}

export default function AddOptionManager<TFormStore>(props: Props<TFormStore>) {
	const [open, setOpen] = useState(false);
	const [openById, setOpenById] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [optionsByCode, setOptionsByCode] = useState<{ [key: string]: { id: string; name: string }[] }>({});
	const [combinedOptions, setCombinedOptions] = useState<{ name: string; id: string }[]>([]);
	const [selectedOption, setSelectedOption] = useState<{ name: string; id: string; index: number } | null>(null); // Add state for selected option details

	const { t } = useTranslation();
	const { attributes } = useAppSelector((state) => state.attributes);

	const { fields, append, remove, update } = useFieldArray({
		control: props.formStore.control,
		name: 'variants',
	});
	console.log('fields', fields)
	useEffect(() => {
		const updatedOptions: { [key: string]: { id: string; name: string }[] } = {};

		fields.forEach((item) => {
			const code = item.code;
			const attributeValues = item.attributeValues.map((attr: any) => ({ id: attr.id, name: attr.name }));

			if (!updatedOptions[code]) {
				updatedOptions[code] = [];
			}

			updatedOptions[code] = [...updatedOptions[code], ...attributeValues];
		});

		setOptionsByCode(updatedOptions);
	}, [fields]);

	const handleCloseDialog = () => {
		setOpen(false);
		setCurrentIndex(null);
	};

	let quantity;
	const handleAddOption = () => {
		append({
			code: '',
			attributeValues: [],
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
			quantity: 0,
			inventories: {
				id: quantity,
			},
			price: 0,
			weight: 0,
			status: 0,
			new: 0,
			featured: 0,
			visible_individually: 0,
		});
		setOpen(true);
		setCurrentIndex(fields.length);
	};

	const handleSaveOption = () => {
		if (currentIndex !== null) {
			const code = props.formStore.getValues(`variants[${currentIndex}].code`);
			const attributeValues = props.formStore.getValues(`variants[${currentIndex}].attributeValues`);

			update(currentIndex, {
				code,
				attributeValues,
			});

			setOptionsByCode((prevOptions) => ({
				...prevOptions,
				[code]: [
					...(prevOptions[code] || []),
					...attributeValues.map((attr) => ({ id: attr.id, name: attr.name })),
				],
			}));

			handleCloseDialog();
		}
	};

	const combineOptions = () => {
		const combined: { name: string; id: string }[] = [];
		const codes = Object.keys(optionsByCode);
		const optionsArrays = codes.map((code) => optionsByCode[code]);

		const combine = (arrays: { id: string; name: string }[][], prefix: string[] = [], ids: string[] = []) => {
			if (arrays.length === 0) {
				if (prefix.length > 0) {
					combined.push({ name: prefix.join(' / '), id: ids.join('_') });
				}
				return;
			}

			const [firstArray, ...restArrays] = arrays;
			firstArray.forEach((option) => {
				combine(restArrays, [...prefix, option.name], [...ids, option.id]);
			});
		};

		combine(optionsArrays);
		setCombinedOptions(combined);
	};

	useEffect(() => {
		combineOptions();
	}, [optionsByCode]);

	const handleDeleteCombinedOption = (indexToRemove: number) => {
		setCombinedOptions((prev) => prev.filter((_, i) => i !== indexToRemove));
	};

	const handleOptionClick = (option: { name: string; id: string }, index: number) => {
		setSelectedOption({ name: option.name, id: option.id, index });
		setOpenById(true);
	};

	return (
		<div className="flex-col-global">
			{fields?.length > 0 &&
				fields.map((item, i) => (
					<div key={i}>
						<div className="flex flex-col gap-4">
							<div className="cardDetails-sharedClass flex justify-between items-center py-3 px-5">
								<p>{item.code}</p>
								<button type="button" onClick={() => remove(i)}>
									<RemoveIcon className="fill-error" />
								</button>
							</div>
							<hr />
						</div>

						{open && currentIndex === i && (
							<GlobalDialog
								openDialog={open}
								handleClose={handleCloseDialog}
								style={{
									width: {
										lg: '50%',
										md: '70%',
										xs: '90%',
									},
									height: { md: '350px', xs: '350px' },
								}}
							>
								<div className="flex-col-global gap-20">
									<div className="flex-col-global gap-4">
										<h2>{t('Add option to product')}</h2>
										<SelectFormField
											add_button
											formStore={props.formStore}
											name={`variants[${i}].code`}
											placeholder={t('Select option')}
											label={t('Option Name')}
											AnotherName={`variants[${i}].attributeValues`}
											options={attributes.map((e) => ({
												value: e.code,
												label: e.name,
											}))}
										/>
										<div className="mt-2">
											{(() => {
												const attributeValue =
													attributes?.filter(
														(e) =>
															e?.code?.toString() ===
															props.formStore.watch(`variants[${i}].code`)?.toString()
													) || [];

												if (attributeValue.length === 0) {
													return null;
												}

												switch (attributeValue[0]?.type) {
													case 'select':
														return (
															<AutoComplete
																name={`variants[${i}].attributeValues`}
																label={t('Attribute value')}
																formStore={props.formStore}
																options={
																	attributeValue[0]?.options?.map((e) => ({
																		id: e.id,
																		name: e.label,
																	})) || []
																}
																onChange={(selectedOptions) => {
																	const formattedOptions = selectedOptions.map((selectedId) => {
																		const originalOption = attributeValue[0]?.options.find(
																			(option) => option.id === selectedId
																		);
																		return {
																			id: selectedId,
																			name: originalOption ? originalOption.label : 'N/A',
																		};
																	});

																	props.formStore.setValue(
																		`variants[${i}].attributeValues`,
																		formattedOptions
																	);
																}}
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
																		checked={
																			props.formStore.watch(`variants[${i}].attributeValues`) ===
																			true
																		}
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

													default:
														return null;
												}
											})()}
										</div>
										<div className="flex justify-end">
											<Button onClick={handleSaveOption}>{t('Add')}</Button>

										</div>
									</div>
								</div>
							</GlobalDialog>
						)}
					</div>
				))}


			<div>
				<Button variant="secondary" onClick={handleAddOption} LeftIcon={FaCirclePlus}>

					{props.label}
				</Button>
			</div>

			<div className="flex flex-col gap-4">
				{combinedOptions.map((option, index) => (
					<div key={index} className="cardDetails-sharedClass flex justify-between items-center py-3 px-5">
						<p
							className="text-title"
							onClick={() => handleOptionClick(option, index)}
						>
							{option.name}
						</p>
						<button onClick={() => handleDeleteCombinedOption(index)}
						>
							<RemoveIcon
								className="fill-error"
							/>
						</button>

					</div>
				))}
			</div>

			{/* Display the FormOptionById component and pass the selected details */}
			{openById && selectedOption && (
				<GlobalDialog
					openDialog={openById}
					handleClose={() => setOpenById(false)}
					style={{
						width: {
							lg: '50%',
							md: '70%',
							xs: '90%',
						},
						height: { md: '600px', xs: '600px' },
					}}
				>
					<FormOptionById
						formStore={props.formStore}
						name={selectedOption.name}
						id={selectedOption.id}
						index={selectedOption.index}
						handleClose={() => setOpenById(false)}
					/>
				</GlobalDialog>
			)}
		</div>
	);
}


