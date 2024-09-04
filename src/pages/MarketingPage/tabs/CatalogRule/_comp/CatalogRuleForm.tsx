import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import {
    SubHeaderDefaultBtns,
    SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';

const CatalogRuleForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    // custom hook
    const { handelDefaultValue, AddAttributeSchema } = useCustomHookAddAttribute();

    // redux
    const dispatch = useAppDispatch();
    const { isLoadingAddOrUpdate, attributeShow } = useAppSelector(
        (state) => state.attributesProducts,
    );


    const handleSubmit = (values: addAttributeInterface) => {
        console.log('attributes', values)
        const optionsFormatted = values.options.reduce((acc: any, option: any, index: number) => {
            acc[`option_${(index += 1)}`] = option;
            return acc;
        }, {});
        let SendingData = { ...values, options: optionsFormatted };

        id
            ? dispatch(putAttribute({ data: SendingData, id })).then((promiseResponse) => {
                if ((promiseResponse.payload.code = 200)) {
                    navigate(-1);
                }
            })
            : dispatch(postAttribute(SendingData)).then((promiseResponse) => {
                if ((promiseResponse.payload.code = 200)) {
                    navigate(-1);
                }
            });
    };



    const { formStore, onSubmit } = useForm({
        schema: AddAttributeSchema,
        handleSubmit: handleSubmit,
        defaultValues: handelDefaultValue(),
    });
    return (
        <Form {...formStore}>
            <form onSubmit={onSubmit} className='flex-col-global'>
                <SubHeader title={t('add attribute')}>
                    <SubHeaderDefaultBtns onSubmit={onSubmit} isLoading={isLoadingAddOrUpdate} />
                </SubHeader>
                <div className='custom_container custom-grid-parent'>
                    <div className='flex-col-global grid-left'>
                        {/*  */}
                    </div>
                    <div className='grid-right'>
                        {/*  */}
                    </div>
                </div>
                <div className='flex-btn-end px-5'>
                    <SubHeaderMobileBtns onSubmit={onSubmit} />
                </div>
            </form>
        </Form>
    )
}

export default CatalogRuleForm
