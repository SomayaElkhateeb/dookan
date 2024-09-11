// import { useWatch } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import FormField from 'src/app/components/ui/form/field';
// import { Input } from 'src/app/components/ui/input';
// import HorizontalBox from 'src/app/components/ui/horizontal-box';
// import { useEffect, useState } from 'react';

// /**
//  * @template TFormStore
//  *
//  * @param {import('../types').Props<TFormStore>} props
//  */


// function QuantityField(props) {
//     const { t } = useTranslation();
//     const quantities = useWatch({
//         name: 'quantities',
//         control: props.formStore.control,
//     }) || []; 

//     const [allQuantity, setAllQuantity] = useState(0);

//     useEffect(() => {
//         const quantitiesArray = Array.isArray(quantities) ? quantities : [];

//         const total = quantitiesArray.reduce((acc, quantity) => acc + (Number(quantity) || 0), 0);
//         setAllQuantity(total);

//         props.formStore.setValue('quantity', total);
//     }, [quantities, props.formStore]);

//     return (
//         <FormField
//             formStore={props.formStore}
//             name="Quantity"
//             label={t('All Quantity')}
//             render={(field) => (
//                 <HorizontalBox>
//                     <Input
//                         {...field}
//                         type="number"
//                         value={allQuantity}
//                         disabled
//                         readOnly
//                         className="border-0 rounded-none grayscale brightness-[0.85]"
//                     />
//                 </HorizontalBox>
//             )}
//         />
//     );
// }

// export default QuantityField;

//////////////////////////////////////////

import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import HorizontalBox from 'src/app/components/ui/horizontal-box';
import { useEffect, useState, useCallback } from 'react';
import { ValidFormStoreByValues } from 'src/utils/types';
import { Values } from '../types';

interface QuantityFieldProps {
    formStore: ValidFormStoreByValues<any, Values>;
    index: number;
}

function QuantityField({ index, formStore }: QuantityFieldProps) {
    const { t } = useTranslation();

    const variants = useWatch({
        name: `variants.${index}`,
        control: formStore.control,
    }) || [];

    const [allQuantity, setAllQuantity] = useState(0);

    const calculateTotalQuantity = useCallback(() => {
        const total = Object.values(variants).reduce((acc, variant) => {
            const quantity = variant?.inventories || 0;
            return acc + (Number(quantity) || 0);
        }, 0);
        return total;
    }, [variants]);

    useEffect(() => {
        const total = calculateTotalQuantity();
        if (total !== allQuantity) {
            setAllQuantity(total);
            formStore.setValue(`variants.${index}.quantity`, total);
        }
    }, [calculateTotalQuantity, allQuantity, formStore, index]);

    return (
        <FormField
            formStore={formStore}
            name={`variants.${index}.quantity`}
            label={t('All Quantity')}
            render={(field) => (
                <HorizontalBox>
                    <Input
                        {...field}
                        type="number"
                        value={allQuantity}
                        disabled
                        readOnly
                        className="border-0 rounded-none grayscale brightness-[0.85]"
                    />
                </HorizontalBox>
            )}
        />
    );
}

export default QuantityField;



