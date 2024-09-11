import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button } from 'src/app/components/optimized';
import Textarea from 'src/app/components/optimized/InputsFields/Textarea';
import FormField from 'src/app/components/ui/form/field';
import TabbedFormField from 'src/app/components/ui/form/tabbed-field';
import HorizontalBox from 'src/app/components/ui/horizontal-box';
import { Input } from 'src/app/components/ui/input';
import { BranchesApi } from 'src/app/React-Query/BranchesApi';
import QuantityField from './QuantityField';
import { useWatch } from 'react-hook-form';
import { ValidFormStoreByValues } from 'src/utils/types';
import { Values } from '../types';
import SkuField from './SkuField';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';

interface FormOptionByIdProps {
    name: string;
    id: string;
    index: number;
    handleClose: () => void;
    formStore: ValidFormStoreByValues<any, Values>;
}
const FormOptionById = ({
    name,
    id,
    index,
    handleClose,
    formStore,
}: FormOptionByIdProps) => {


    console.log(name, id, index)

    const { t } = useTranslation();

    const { data } = useQuery(['branchesData'], () => BranchesApi.branches());
    let branchesData = data?.data?.data;

    const variants = useWatch({
        control: formStore.control,
        name: 'variants',
    });
    console.log('variants', variants)
    const fieldsToWatch = ['status', 'new', 'featured', 'visible_individually'];

    useEffect(() => {
        fieldsToWatch.forEach((field) => {
            const value = formStore.watch(`variants.${index}.${field}`);
            formStore.setValue(`variants.${index}.${field}`, value ? 1 : 0);
        });
    }, [fieldsToWatch.map((field) => formStore.watch(`variants.${index}.${field}`)).join(',')]);

    return (
        <div className="flex flex-col gap-4">
            <h4 className='title text-center text-lg'>{name}</h4>
            <div>
                <strong>{t('In Stock')}</strong>
            </div>

            <div className="flex flex-col gap-4">
                <TabbedFormField
                    formStore={formStore}
                    label='Name'
                    keys={[
                        {
                            name: `variants.${index}.en.name`, label: 'En'
                        },
                        {
                            name: `variants.${index}.ar.name`, label: 'عربي'
                        },
                    ]}
                    renderer={(field) => {
                        return <Input {...field} />;
                    }}
                />

                <TabbedFormField
                    formStore={formStore}
                    label='Short description'
                    keys={[
                        {
                            name: `variants.${index}.en.short_description`, label: 'En'
                        },
                        {
                            name: `variants.${index}.ar.short_description`, label: 'عربي'
                        },
                    ]}
                    renderer={(field) => {
                        return <Input {...field} />;
                    }}
                />

                <TabbedFormField
                    formStore={formStore}
                    label='Description'
                    keys={[
                        {
                            name: `variants.${index}.en.description`, label: 'En'
                        },
                        {
                            name: `variants.${index}.ar.description`, label: 'عربي'
                        },
                    ]}
                    renderer={(field) => {
                        return <Textarea {...field} />;
                    }}
                />

                <FormField
                    formStore={formStore}
                    label='Price'
                    name={`variants.${index}.price`}
                    render={(field) => (
                        <Input {...field} value={field.value ?? 0} type='number' />
                    )}
                />

                <FormField
                    formStore={formStore}
                    label='Wight'
                    name={`variants.${index}.weight`}
                    render={(field) => (
                        <Input {...field} value={field.value ?? 0} type='number' />
                    )}
                />

                <div className='flex-row-global gap-2'>
                    <FormSwitchField
                        formStore={formStore}
                        name={`variants.${index}.status`}
                        enable
                    />
                    <p>{t('Status')}</p>
                </div>

                <div className='flex-row-global gap-2'>
                    <FormSwitchField
                        formStore={formStore}
                        name={`variants.${index}.new`}
                        enable
                    />
                    <p>{t('New')}</p>
                </div>

                <div className='flex-row-global gap-2'>
                    <FormSwitchField
                        formStore={formStore}
                        name={`variants.${index}.featured`}
                        enable
                    />
                    <p>{t('Featured')}</p>
                </div>

                <div className='flex-row-global gap-2'>
                    <FormSwitchField
                        formStore={formStore}
                        name={`variants.${index}.visible_individually`}
                        enable
                    />
                    <p>{t('Visible individually')}</p>
                </div>

                <SkuField formStore={formStore} index={index} id={id} />
                <QuantityField formStore={formStore} index={index} />


                <div className="flex flex-col gap-4">
                    <div>
                        <strong>{t('Inventory branches')}</strong>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='subtitle'>Name</p>
                        <p className='subtitle'>Quantity</p>
                    </div>
                    <hr />

                    {branchesData?.map((e: any) => (
                        <div className='flex items-center justify-between' key={e.id}>
                            <p className='title'>{e.name}</p>
                            <FormField
                                formStore={formStore}
                                name={`variants.${index}.${e.id}.inventories`}
                                render={(field) =>
                                    <HorizontalBox>
                                        <Input {...field} type="number" />
                                    </HorizontalBox>
                                }
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleClose}>{t('add')}</Button>
                </div>
            </div>
        </div >
    );
};

export default FormOptionById;





