import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import FormField from 'src/app/components/ui/form/field';
import HorizontalBox from 'src/app/components/ui/horizontal-box';
import { Input } from 'src/app/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/app/components/ui/select';

import { productDimensionUnitCollection, productWeightUnitCollection } from '../utils';
import AdvancedShippingOptionsManager from './AdvancedShippingOptionsManager';
import SelectFormField from 'src/app/components/ui/form/SelectFormField';

/**
 * @template TFormStore
 *
 * @param {import('../types').Props<TFormStore>} props
 */
export default function OtherProductShippingOptions(props) {
	const { t } = useTranslation();

	return (
		<>
			<div className='flex flex-col gap-4 items-start'>
				<FormField
					formStore={props.formStore}
					name='weight'
					label={t('Weight')}
					render={(field) => (
						<HorizontalBox
							end={
								<SelectFormField
									className='border-0 w-[4rem]'
									formStore={props.formStore}
									name='weight_unit'
									options={
										productWeightUnitCollection?.length > 0
											? productWeightUnitCollection?.map((e) => {
													return {
														value: e,
														label: e,
													};
											  })
											: []
									}
								/>
							}
							endSeparator
						>
							<Input {...field} type='number' className='border-0' />
						</HorizontalBox>
					)}
				/>
				<div>
					<p className='text-sm'>Dimension</p>

					<div className='flex items-center text-gray border rounded-md px-2'>
						<FormField
							formStore={props.formStore}
							name='length'
							render={(field) => (
								<Input
									{...field}
									type='number'
									className='border-0 px-0'
									placeholder={t('Length')}
									style={{ width: t('Length').length * 1.2 + 'ch' }}
									min='0'
								/>
							)}
						/>
						<span className='me-8'>
							<IoClose />
						</span>
						<FormField
							formStore={props.formStore}
							name='width'
							render={(field) => (
								<Input
									{...field}
									type='number'
									className='border-0 px-0'
									placeholder={t('Width')}
									style={{ width: t('Width').length * 1.2 + 'ch' }}
									min='0'
								/>
							)}
						/>
						<span className='me-8'>
							<IoClose />
						</span>
						<FormField
							formStore={props.formStore}
							name='height'
							render={(field) => (
								<Input
									{...field}
									type='number'
									className='border-0 px-0'
									placeholder={t('Height')}
									style={{ width: t('Height').length * 1.2 + 'ch' }}
									min='0'
								/>
							)}
						/>
						<span className='me-8'>
							<IoClose />
						</span>

						<SelectFormField
							className='border-0 w-[5rem]'
							formStore={props.formStore}
							name='dimension_unit'
							options={
								productDimensionUnitCollection?.length > 0
									? productDimensionUnitCollection?.map((e) => {
											return {
												value: e,
												label: e,
											};
									  })
									: []
							}
						/>
					</div>
				</div>
			</div>
			<AdvancedShippingOptionsManager formStore={props.formStore} />
		</>
	);
}
