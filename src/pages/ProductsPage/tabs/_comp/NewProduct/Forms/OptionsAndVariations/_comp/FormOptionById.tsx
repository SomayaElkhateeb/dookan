import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Textarea from 'src/app/components/optimized/InputsFields/Textarea';
import { GlobalDialog } from 'src/app/components/shared';
import FormField from 'src/app/components/ui/form/field';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import { Input } from 'src/app/components/ui/input';



interface FormOptionByIdProps {
    handleClose: () => void;
    openFormById: boolean;
    selectedOptionId: number | null;
    selectedOptionName: string | null;
    formStore: any;
}

const FormOptionById = ({
    handleClose,
    openFormById,
    selectedOptionId,
    selectedOptionName,
    formStore,
}: FormOptionByIdProps) => {
    console.log('Selected Option ID:', selectedOptionId);
    console.log('Selected Option Name:', selectedOptionName);
    const { t } = useTranslation();
    const dialogStyle = {
        width: { lg: '50%', md: '70%', xs: '90%' },
        height: { md: '350px', xs: '350px' },
    };
    const { fields, remove } = useFieldArray({
        control: formStore.control,
        name: 'variations',
    });

    return (
        <GlobalDialog openDialog={openFormById} handleClose={handleClose} style={dialogStyle}>
            {selectedOptionId && (
                <div className="p-4">
                    <p>Selected Option ID: {selectedOptionId}</p>
                    <p>Selected Option Name: {selectedOptionName}</p>
                    <div className='flex flex-col gap-1'>
                        <strong>{t('Stock')}</strong>
                    </div>

                    {fields.map((item, index) => (

                        <div key={index}>

                            <TabbedFormField
                                formStore={formStore}
                                container={{ className: 'flex-grow -translate-x-[13px]' }}
                                keys={[
                                    { name: `variations.${index}.en.name`, label: 'En' },
                                    { name: `variations.${index}.ar.name`, label: 'عربي' },
                                ]}
                                renderer={(field) => <Input {...field} />}
                            />

                            <TabbedFormField
                                formStore={formStore}
                                container={{ className: 'flex-grow -translate-x-[13px]' }}
                                keys={[
                                    { name: `variations.${index}.en.short_description`, label: 'En' },
                                    { name: `variations.${index}.ar.short_description`, label: 'عربي' },
                                ]}
                                renderer={(field) => <Input {...field} />}
                            />

                            <TabbedFormField
                                formStore={formStore}
                                container={{ className: 'flex-grow -translate-x-[13px]' }}
                                keys={[
                                    { name: `variations.${index}.en.description`, label: 'En' },
                                    { name: `variations.${index}.ar.description`, label: 'عربي' },
                                ]}
                                renderer={(field) => <Textarea {...field} />}
                            />
                        </div>
                    ))}



                    {/* 
                    <FormField
                        formStore={props.formStore}
                        container={{ className: 'flex-grow' }}
                        name={`variations.${index}.price`}
                        render={(field) => (
                            <Input {...field} value={field.value ?? 0} type='number' />
                        )}
                    />

                    <FormField
                        formStore={props.formStore}
                        container={{ className: 'flex-grow' }}
                        name={`variations.${index}.sku`}
                        render={(field) => <Input {...field} />}
                    />

                    <FormField
                        formStore={props.formStore}
                        container={{ className: 'flex-grow' }}
                        name={`variations.${index}.quantity`}
                        render={(field) => (
                            <HorizontalBox end={<>&infin;</>}>
                                <Input {...field} />
                            </HorizontalBox>
                        )}
                    /> */}








                </div>
            )
            }
        </GlobalDialog >
    );
};

export default FormOptionById;

// "variant_0": {
//     "sku": "Tshirt-hat-red-small1",
//         "en": {
//         "name": "Tshirt-hat-Red-Small",
//             "short_description": "hat red-small desc 1&6",
//                 "description": "hat color red & size small -1&6"
//     },
//     "ar": {
//         "name": "Tshirt-تي شيرت احمر صغير",
//             "short_description": "تيشيرت 1&6 وصف صغير",
//                 "description": "تيشيرت لون احمر مقاس صغير 1&6"
//     },
//     "inventories": {
//         "1": "7"
//     },
//     "color": "1",
//         "size": "6",
//             "new": "1",
//                 "featured": "1",
//                     "visible_individually": "1",
//                         "price": "100",
//                             "weight": "10",
//                                 "status": "1",
//                                     "discount": "100"
// },
// 