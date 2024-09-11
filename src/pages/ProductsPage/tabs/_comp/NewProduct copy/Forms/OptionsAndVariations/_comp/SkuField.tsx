
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import HorizontalBox from 'src/app/components/ui/horizontal-box';
import { ValidFormStoreByValues } from 'src/utils/types';
import { Values } from '../types';

interface SkuFieldProps {
    formStore: ValidFormStoreByValues<any, Values>;
    index: number;
    id: string;
}

function SkuField({ formStore, index, id }: SkuFieldProps) {
    const { t } = useTranslation();

    const variant = useWatch({
        name: `variants.${index}`,
        control: formStore.control,
    }) || {};


    return (
        <FormField
            formStore={formStore}
            name={`variants.${index}.sku`}
            label={t('Sku code')}
            render={(field) => (

                < HorizontalBox >
                    <Input
                        {...field}
                        type="text"
                        value={variant.sku ?? `${id}_sku code`}
                        disabled
                        readOnly
                        className="border-0 rounded-none grayscale brightness-[0.85]"
                    />
                </ HorizontalBox>

            )}
        />
    );
}

export default SkuField;


// {
//     "variant_0": {
//         "sku": "Tshirt-hat-red-small1",

//             "en": {
//             "name": "Tshirt-hat-Red-Small",
//                 "short_description": "hat red-small desc 1&6",
//                     "description": "hat color red & size small -1&6"
//         },
//         "ar": {
//             "name": "Tshirt-تي شيرت احمر صغير",
//                 "short_description": "تيشيرت 1&6 وصف صغير",
//                     "description": "تيشيرت لون احمر مقاس صغير 1&6"
//         },
//         "inventories": {
//             "1": "7"
//         },

//         "color": "1",
//             "size": "6",
//                 "new": "1",
//                     "featured": "1",
//                         "visible_individually": "1",
//                             "price": "100",
//                                 "weight": "10",
//                                     "status": "1",
//                                         "discount": "100"
//     },
//     "variant_1": {
//         "sku": "THt-hat-green-medium1",
//             "en": {
//             "name": "TsT-Shirt-Green-Medium",
//                 "short_description": "t-shirt green medium desc 2&7",
//                     "description": "t-shirt color green & size medium -2&7"
//         },
//         "ar": {
//             "name": "Tsتي شيرت اخضر وسط",
//                 "short_description": "تيشيرت 2&7 وصف صغير",
//                     "description": "تيشيرت لون اخضر مقاس وسط 1&6"
//         },
//         "color": "2",
//             "size": "7",
//                 "new": "1",
//                     "featured": "1",
//                         "visible_individually": "1",
//                             "inventories": {
//             "1": "17"
//         },
//         "price": "200",
//             "weight": "20",
//                 "status": "1"
//     }
// }

