
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus } from 'react-icons/fa6';
import { Button } from 'src/app/components/optimized';
import { useAppSelector } from 'src/app/store';
import { useFieldArray, useWatch } from 'react-hook-form';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';
import { GlobalDialog } from 'src/app/components/shared';
import { ValidFormStoreByValues } from 'src/utils/types';
import { RemoveIcon } from 'src/app/utils/icons';
import { Values } from '../types';
import FormOptionById from './FormOptionById';

interface Props<TFormStore> {
	formStore: ValidFormStoreByValues<TFormStore, Values>;
	label: string;
}

export default function AddOptionManager<TFormStore>({ formStore, label }: Props<TFormStore>) {
	const [open, setOpen] = useState(false);
	const [openFormById, setOpenFormById] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
	const [newOptions, setNewOptions] = useState<any[]>([]);
	const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(null);
	const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
	const [selectedOptionName, setSelectedOptionName] = useState<string | null>(null);
	const { t } = useTranslation();
	const { attributes } = useAppSelector((state) => state.attributes);

	const { fields, append, remove } = useFieldArray({
		control: formStore.control,
		name: 'variants',
	});

	console.log('fields', fields)
	const variants = useWatch({
		control: formStore.control,
		name: 'variants',
	});

	const handleAttributeValueComponent = (i: number) => {
		const selectedCode = variants[i]?.code;
		const attributeValue = attributes.find((e) => e?.code?.toString() === selectedCode?.toString());

		const options = attributeValue?.options?.map((e) => ({
			id: e.id,
			name: e.label,
		})) || [];

		return (
			<SpecificAutoCompleteInput
				array={options}
				label={t('Option value')}
				name={`variants[${i}].attributeValues`}
				formStore={formStore}
				onChange={(value) => {
					setNewOptions(value);
				}}
			/>
		);
	};

	const dialogStyle = {
		width: { lg: '50%', md: '70%', xs: '90%' },
		height: { md: '350px', xs: '350px' },
	};

	const handleOpenDialog = (index: number) => {
		setSelectedFieldIndex(index);
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
		setSelectedFieldIndex(null);
	};

	const handleAddOptions = () => {
		setSelectedOptions((prevOptions) => [...prevOptions, ...newOptions]);

		if (selectedOptions.length > 0 && newOptions.length > 0) {
			const combinedOptions = [];

			for (let selected of selectedOptions) {
				for (let newOption of newOptions) {
					combinedOptions.push({
						combinedName: `${selected.name}-${newOption.name}`,
						selected,
						newOption,
					});
					console.log(`Combined Option: ${selected.name}-${newOption.name}`);
				}
			}

			setSelectedOptions(combinedOptions);
		}

		setNewOptions([]);

		if (selectedFieldIndex !== null) {
			remove(selectedFieldIndex);
		}

		handleCloseDialog();
	};

	const handleRemoveOption = (event, index: number) => {
		event.stopPropagation();
		setSelectedOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
	};

	const handleOptionClick = (id: string, name: string) => {
		console.log('Option ID:', id);
		console.log('Option Name:', name);
		setSelectedOptionId(id);
		setSelectedOptionName(name);
		setOpenFormById(true);
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="mt-2">
				<Button
					variant="secondary"
					LeftIcon={FaCirclePlus}
					onClick={() => handleOpenDialog(fields.length)}
				>
					{t('add options')}
				</Button>
			</div>

			{fields?.length > 0 &&
				fields.map((item, i) => <div key={i}>{handleAttributeValueComponent(i)}</div>)}

			{open && selectedFieldIndex !== null && (
				<GlobalDialog openDialog={open} handleClose={handleCloseDialog} style={dialogStyle}>
					<div className="flex-col-global gap-20">
						<div className="flex-col-global gap-4">
							<h2>{t('Add option to product')}</h2>
							<SelectFormField
								formStore={formStore}
								name={`variants[${selectedFieldIndex}].code`}
								placeholder={t('Select option')}
								label={t('Option Name')}
								AnotherName={`variants[${selectedFieldIndex}].attributeValues`}
								options={
									attributes?.length > 0
										? attributes.map((e) => ({
											value: e.code,
											label: e.name,
										}))
										: []
								}
							/>
							<div className="mt-2">{handleAttributeValueComponent(selectedFieldIndex)}</div>
						</div>

						<div className="flex justify-end">
							<Button onClick={handleAddOptions}>{t('add')}</Button>
						</div>
					</div>
				</GlobalDialog>
			)}

			<div className="flex flex-col gap-4">
				{selectedOptions.length > 0 &&
					selectedOptions.map((e, index) => {
						const selectedId = e.selected?.id;
						const newOptionId = e.newOption?.id;

						const combinedId = selectedId && newOptionId ? `${selectedId}-${newOptionId}` : null;

						return (
							<div
								key={index}
								className="cardDetails-sharedClass py-3 px-5 cursor-pointer flex items-center justify-between"
								onClick={() => {
									if (e.combinedName === `${e.selected?.name}-${e.newOption?.name}` && combinedId) {
										handleOptionClick(combinedId, e.combinedName); // Send both ID and name
									} else {
										console.log('ID not found for the selected option:', e);
									}
								}}
							>
								<p className="fill-title">{e.combinedName || e.name}</p>
								<div onClick={(event) => handleRemoveOption(event, index)}>
									<RemoveIcon className="fill-title cursor-pointer" />
								</div>
							</div>
						);
					})}
			</div>

			{/* open form by id */}
			{openFormById && (
				<FormOptionById
					openFormById={openFormById}
					handleClose={() => setOpenFormById(false)}
					selectedOptionId={selectedOptionId}
					selectedOptionName={selectedOptionName}
					formStore={formStore}
				/>
			)}
		</div>
	);
}
/////////////////////////////////////////////////////////////////////////////

