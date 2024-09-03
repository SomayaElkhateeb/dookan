import { nanoid } from "nanoid";
import ActionsStuffBtns from "../../PermissionsAndUsers/Staff/ActionsStuffBtns"
import { UseDeleteItem } from "src/app/utils/hooks/CustomDelete";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useResponsive from "src/app/utils/hooks/useResponsive";
import { useAppDispatch, useAppSelector } from "src/app/store";
import useSelectBox from "src/app/components/optimized/Menu/useSelectBox";
import { deleteTaxRate, getTaxRatesList } from "src/app/store/slices/settingsPage/tax/taxRates/taxRateAsyncThunks";
import TaxRateTable from "./_comp/TaxRateTable";
import { EditIcon, RemoveIcon } from "src/app/utils/icons";
import PopupDelete from "src/app/components/optimized/Popups/PopupDelete";

const TaxRates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { xs } = useResponsive();
  const dispatch = useAppDispatch();
  const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
  const { taxRatesList, isLoading } = useAppSelector((state) => state.taxRateSettings);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getTaxRatesList());
  }, [dispatch]);

  const filteredTaxRates = useMemo(() => {
    return taxRatesList?.filter(rate =>
      rate.identifier.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, taxRatesList]);

  const sortMenus = [
    { id: nanoid(), text: 'Identifier A to Z' },
    { id: nanoid(), text: 'Identifier Z to A' },
  ];



  const {
    openDeleteDialog,
    custom_Id,
    handelDeleteItem,
    handelCloseDeleteDialog,
    handelId,
    handelOpenDialog,
  } = UseDeleteItem();

  const handelDeleteTaxRate = () => {
    dispatch(deleteTaxRate(custom_Id)).then((promiseResponse: any) => {
      if ((promiseResponse.payload.code = 200)) {
        handelCloseDeleteDialog();
        dispatch(getTaxRatesList());
      }
    });
  };

  const handleEdit = () => {
    setSelectedOption('');
    custom_Id && navigate(`addTaxRatePage?id=${custom_Id}`);
  }

  const handleDelete = () => {
    handelOpenDialog();
    setSelectedOption('');
  }


  return (
    <div className='flex-col-global gap-2'>
      {/* header */}
      <div className='flex-col-global gap-0'>

        <ActionsStuffBtns selectedOption={selectedOption}
          handleSelect={handleSelect}
          sortMenus={sortMenus}
          data={taxRatesList}
          setSearchQuery={setSearchQuery} />

      </div>
      <hr />
      {/* table */}
      <TaxRateTable data={filteredTaxRates}
        handelId={handelId}
        isLoading={isLoading}
      >
        <div className="flex items-center gap-4">
          <button onClick={handleEdit}>
            <EditIcon className="fill-pri-dark p-0.5 cursor-pointer" />
          </button>
          <button onClick={handleDelete}>
            <RemoveIcon className="fill-pri-dark p-0.5 cursor-pointer" />
          </button>
        </div>
      </TaxRateTable>

      {/* openDeleteDialog */}
      {openDeleteDialog && (
        <PopupDelete
          open={openDeleteDialog}
          onClose={handelCloseDeleteDialog}
          title={t('Delete Item')}
          subTitle={t('Do You Want To Delete This Item')}
          onDelete={handelDeleteTaxRate}
        />
      )}

    </div>
  )
}

export default TaxRates
