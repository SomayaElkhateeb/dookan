// import { useCallback, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from 'src/app/components/ui/card';
// import { updateVariations } from './_comp/updateVariations';
// import OptionsList from './_comp/OptionsList';
// import AddOptionManager from './_comp/AddOptionManager';
// import VariationsManager from './_comp/VariationsManager';
// import OptionsAndVariationsFull from './_comp/_new/OptionsAndVariationsFull';
// import { useAppDispatch } from 'src/app/store';
// import { getAllAttributes } from 'src/app/store/slices/Attributes/AttributeAsyncThunks';

// /**
//  * @template TFormStore
//  *
//  * @param {import('./types').Props<TFormStore>} props
//  */
// export default function ProductFormOptionsAndVariationsSection(props) {
// 	const { t } = useTranslation();
// 	const dispatch = useAppDispatch();

// 	useEffect(() => {
// 		dispatch(getAllAttributes());
// 	}, [dispatch]);

// 	return (
// 		<>
// 			<section className='global-cards gap-2' id={props.id}>
// 				<section className='flex-col-global gap-1'>
// 					<p className='title'>{t('Options & Variations')}</p>
// 					<p className='text-gray-400 text-sm opacity-80'>
// 						{t(
// 							'Allow your customers to select from options such as Size and Color on your website.',
// 						)}
// 					</p>
// 				</section>
// 				<section className='flex-col-global gap-4'>
// 					{/* <OptionsList formStore={props.formStore} /> */}
// 					<AddOptionManager
// 						formStore={props.formStore}
// 						label={
// 							props.formStore.watch('variants')?.length > 0
// 								? t('Add More Variants')
// 								: t('Add Variants')
// 						}
// 						// getOptionValuesNames={getOptionValuesNames}
// 						// handleSubmit={(values) => {
// 						// 	const options = props.formStore.getValues('options');
// 						// 	props.formStore.setValue('options', [...options, values.option]);
// 						// 	updateVariations(props.formStore);
// 						// }}
// 					/>
// 					{/* {props.formStore.watch('options')?.length > 0 && (
// 						<VariationsManager formStore={props.formStore} />
// 					)} */}
// 				</section>
// 			</section>
// 			{/* <OptionsAndVariationsFull /> */}
// 		</>
// 	);
// }
///////////////// * v-1 //////////////////////////

import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'src/app/components/ui/card';
import { updateVariations } from './_comp/updateVariations';
import OptionsList from './_comp/OptionsList';
import AddOptionManager from './_comp/AddOptionManager';
import VariationsManager from './_comp/VariationsManager';
import OptionsAndVariationsFull from './_comp/_new/OptionsAndVariationsFull';
import { useAppDispatch } from 'src/app/store';
import { getAllAttributes } from 'src/app/store/slices/Attributes/AttributeAsyncThunks';

/**
 * @template TFormStore
 *
 * @param {import('./types').Props<TFormStore>} props
 */
export default function ProductFormOptionsAndVariationsSection(props) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllAttributes());
	}, [dispatch]);

	// const { fields, append, remove } = useFieldArray({
	// 	control: formStore.control,
	// 	name: 'variants',
	// });

	return (
		<>
			<section className='global-cards gap-2' id={props.id}>
				<section className='flex-col-global gap-1'>
					<p className='title'>{t('Options & Variations')}</p>
					<p className='text-gray-400 text-sm opacity-80'>
						{t(
							'Allow your customers to select from options such as Size and Color on your website.',
						)}
					</p>
				</section>
				<section className='flex-col-global gap-4'>

					<AddOptionManager
						formStore={props.formStore}
						label={
							props.formStore.watch('variants')?.length > 0
								? t('Add More Variants')
								: t('Add Variants')
						}
						
					/>
				
				</section>
			</section>
		
		</>
	);
}

