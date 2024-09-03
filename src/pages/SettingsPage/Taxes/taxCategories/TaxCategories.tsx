import { useEffect, useMemo, useState } from "react";
import HeaderTaxCategories from "./_comp/HeaderTaxCategories"
import useSelectBox from "src/app/components/optimized/Menu/useSelectBox";
import TaxCategoriesTable from "./_comp/TaxCategoriesTable";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { deleteTaxCategory, getTaxCategoriesList } from "src/app/store/slices/settingsPage/tax/taxCategories/taxCategoriesAsyncThunks";
import { EditIcon, RemoveIcon } from "src/app/utils/icons";
import { UseDeleteItem } from "src/app/utils/hooks/CustomDelete";
import PopupDelete from "src/app/components/optimized/Popups/PopupDelete";
import { useTranslation } from "react-i18next";

const TaxCategories = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
    const dispatch = useAppDispatch();
    // redux
    const { taxCategoriesList, isLoading } = useAppSelector((state) => state.taxCategorySettings);
    console.log('taxCategoriesList', taxCategoriesList)
    useEffect(() => {
        dispatch(getTaxCategoriesList());
    }, [dispatch]);

    const filteredTaxCategories = useMemo(() => {
        return taxCategoriesList?.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, taxCategoriesList]);


    const {
        openDeleteDialog,
        custom_Id,
        handelCloseDeleteDialog,
        handelId,
        handelOpenDialog,
    } = UseDeleteItem();

    const handelDeleteTaxCategory = () => {
        dispatch(deleteTaxCategory(custom_Id)).then((promiseResponse: any) => {
            if ((promiseResponse.payload.code = 200)) {
                handelCloseDeleteDialog();
                dispatch(getTaxCategoriesList());
            }
        });
    };

    const handleEdit = () => {
        setSelectedOption('');
    }

    const handleDelete = () => {
        handelOpenDialog();
        setSelectedOption('');
    }

    return (
        <div className='flex-col-global gap-2'>
            {/* header */}
            <div className='flex-col-global gap-0'>
                <HeaderTaxCategories
                    selectedOption={selectedOption}
                    handleSelect={handleSelect}
                    setSearchQuery={setSearchQuery} />
            </div>
            <hr />
            {/* table */}
            <TaxCategoriesTable data={filteredTaxCategories} isLoading={isLoading} handelId={handelId}>
                <div className="flex items-center gap-4">
                    <button onClick={handleEdit}>
                        <EditIcon className="fill-pri-dark p-0.5 cursor-pointer" />
                    </button>
                    <button onClick={handleDelete}>
                        <RemoveIcon className="fill-pri-dark p-0.5 cursor-pointer" />
                    </button>
                </div>
            </TaxCategoriesTable>

            {/* openDeleteDialog */}
            {openDeleteDialog && (
                <PopupDelete
                    open={openDeleteDialog}
                    onClose={handelCloseDeleteDialog}
                    title={t('Delete Item')}
                    subTitle={t('Do You Want To Delete This Item')}
                    onDelete={handelDeleteTaxCategory}
                />
            )}
        </div>
    )
}

export default TaxCategories
