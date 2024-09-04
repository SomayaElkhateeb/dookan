import CartRuleHeader from './_comp/CartRuleHeader';
import CartRuleTable from './_comp/CartRuleTable';
import ThreeDotsButton from 'src/app/components/optimized/Buttons/ThreedotsButton';
import { UseDeleteItem } from 'src/app/utils/hooks/CustomDelete';
import { EditIcon } from 'src/app/utils/icons';
import { LiaTrashAlt } from 'react-icons/lia';
import useSelectBox from 'src/app/components/optimized/Menu/useSelectBox';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupDelete from 'src/app/components/optimized/Popups/PopupDelete';
import { useTranslation } from 'react-i18next';
import {
	deleteCartRule,
	getCartRule,
} from 'src/app/store/slices/marketingPage/cartRule/cartRuleAsyncThunks';
import { log } from 'console';

const CartRulePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { cartRules, isLoading } = useAppSelector((state) => state.cartRule);

	useEffect(() => {
		dispatch(getCartRule());
	}, [dispatch]);

	const { selectedOption, handleSelect, setSelectedOption } = useSelectBox();
	console.log(cartRules);

	const options = [
		{
			id: '1',
			text: 'edit',
			icon: <EditIcon className='fill-title' />,
		},
		{
			id: '2',
			text: 'delete',
			icon: <LiaTrashAlt size='28' className='fill-error' />,
		},
	];

	const { openDeleteDialog, custom_Id, handelCloseDeleteDialog, handelId, handelOpenDialog } =
		UseDeleteItem();

	const handelDeleteCartRule = () => {
		dispatch(deleteCartRule(custom_Id)).then((promiseResponse: any) => {
			if ((promiseResponse.payload.code = 200)) {
				handelCloseDeleteDialog();
				dispatch(getCartRule());
			}
		});
	};

	useMemo(() => {
		switch (selectedOption) {
			case 'delete':
				handelOpenDialog();
				setSelectedOption('');
				break;
			case 'edit':
				setSelectedOption('');
				custom_Id && navigate(`add-cartRule?id=${custom_Id}`);
				// custom_Id && navigate(`admin/add-cartRule?id=${custom_Id}`);
				break;
		}
	}, [selectedOption, custom_Id]);

	return (
		<div className='flex-col-global gap-2 px-5'>
			{/* header */}
			<CartRuleHeader />
			<hr />
			{/* table */}
			<CartRuleTable handelId={handelId} data={cartRules} isLoading={isLoading}>
				<ThreeDotsButton
					sortMenus={options}
					selectedOption={selectedOption}
					handelSelect={handleSelect}
				/>
			</CartRuleTable>

			{/* openDeleteDialog */}
			{openDeleteDialog && (
				<PopupDelete
					open={openDeleteDialog}
					onClose={handelCloseDeleteDialog}
					title={t('Delete Item')}
					subTitle={t('Do You Want To Delete This Item')}
					onDelete={handelDeleteCartRule}
				/>
			)}
		</div>
	);
};

export default CartRulePage;
