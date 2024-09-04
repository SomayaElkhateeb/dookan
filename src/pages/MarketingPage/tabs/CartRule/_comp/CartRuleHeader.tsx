import { useTranslation } from 'react-i18next'
import { IoIosAddCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { ArrangeButton, Button } from 'src/app/components/optimized'
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox'
import { productSortMenu } from 'src/pages/ProductsPage/_comp/data';

const CartRuleHeader = () => {
  const { selectedOption, handleSelect } = useSelectBox();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className='md:flex-row-global flex-col-global justify-between w-full'>
    <div>
      {/* <Button variant='primary' LeftIcon={IoIosAddCircle} onClick={() => navigate('admin/add-cartRule')}> */}
      <Button variant='primary' LeftIcon={IoIosAddCircle} onClick={() => navigate('add-cartRule')}>
        {t('add cart rule')}
      </Button>
    </div>
    <div className='flex-row-global gap-4'>
      <ArrangeButton
        sortMenus={productSortMenu}
        selectedOption={selectedOption}
        handelSelect={handleSelect}
      />
    </div>
  </div>
  )
}

export default CartRuleHeader
