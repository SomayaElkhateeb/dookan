import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CheckBox } from 'src/app/components/optimized';
import { Input } from 'src/app/components/ui/input';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import FormField from 'src/app/components/ui/form/field';
import { newDiscountInterface } from 'src/pages/MarketingPage/tabs/Discounts/NewDiscount/HookForNewDiscount';
export interface State {
	selectedMinimumRequirements: string;
	isChecked: boolean;
}

export const initialState: State = {
	selectedMinimumRequirements: '',
	isChecked: false,
};

const MinimumRequirements = ({
	formStore,
	updateState,
	setUpdateState,
}: {
	formStore: UseFormReturn<newDiscountInterface>;
	updateState: State;
	setUpdateState: (e: any) => void;
}) => {
	const { t } = useTranslation();

	const { selectedMinimumRequirements, isChecked } = updateState;

	// Update state
	const update = (newValue: Partial<State>) => {
		setUpdateState((prevState: State) => ({ ...prevState, ...newValue }));
	};

	const handleCheckboxChange = (newValue: boolean) => {
		setUpdateState((prevState: State) => ({
			...prevState,
			isChecked: newValue,
		}));
	};
	const minimumRequirementsOptions = ['Minimum price', 'Minimum quantity'];

	return (
		<section className='global-cards'>
			<h3 className='title'>{t('Minimum requirements')}</h3>

			<CheckBox
				label={t('define minimum requirements')}
				handleOnChange={handleCheckboxChange}
				checked={isChecked}
			/>
			{isChecked && (
				<>
					<SingleChoiceChips
						options={minimumRequirementsOptions}
						selected={selectedMinimumRequirements}
						setSelected={(option: string) => update({ selectedMinimumRequirements: option })}
					/>

					{selectedMinimumRequirements === 'Minimum price' && (
						<div className='md:w-[24rem]'>
							<FormField
								formStore={formStore}
								name='miniPrice'
								label={t('Mini purchase price')}
								render={(field) => <Input type='number' {...field} />}
							/>
						</div>
					)}
					{selectedMinimumRequirements === 'Minimum quantity' && (
						<div className='md:w-[24rem]'>
							<FormField
								formStore={formStore}
								name='miniQuantity'
								label={t('Mini purchase quantity')}
								render={(field) => <Input type='number' {...field} />}
							/>
						</div>
					)}
				</>
			)}
		</section>
	);
};

export default MinimumRequirements;
