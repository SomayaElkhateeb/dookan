import { useTranslation } from 'react-i18next';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { Switch } from 'src/app/components/ui/switch';
import { MerchantPaymentList } from 'src/app/interface/settingsInterface/MerchantPaymentMethodsSettingsInterface';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getMerchantPaymentList,
	postMerchantPaymentToggle,
} from 'src/app/store/slices/settingsPage/payment/merchantPaymentMethods/merchantPaymentAsyncThunks';
import useLanguage from 'src/app/utils/hooks/useLanguage';
import { actionsButtonStyle } from 'src/pages/ProductsPage/tabs/AllProducts/_comp/AllProductsTable';

export default function PaymentMerchantTable({
	children,
	handelId,
}: {
	children: React.ReactNode;
	handelId: (e: string) => void;
}) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const classData = actionsButtonStyle();
	//  selectors
	const { merchantPaymentList, isLoading } = useAppSelector(
		(state) => state.merchantPaymentSettings,
	);
	const paymentMerchantTableHeaders = [
		{ title: t('Payment method') },
		{ title: t('Minimum items') },
		{ title: t('Minimum price') },
		{ title: t('active?') },
		{ title: t('actions') },
	];

	//  update customer status
	const handelUpdateStatus = (e: MerchantPaymentList) => {
        console.log(e)
		dispatch(
			postMerchantPaymentToggle({
				data: {
					active: Number(e.active) > 0 ? 0 : 1,
				},
				id: e?.id,
			}),
		).then((promiseResponse) => {
			if ((promiseResponse.payload.code = 200)) {
				dispatch(getMerchantPaymentList());
			}
		});
	};

	return (
		<>
			<BaseTable
				isLoading={isLoading}
				color='#55607A'
				headers={paymentMerchantTableHeaders.map((h) => h)}
				rows={merchantPaymentList?.map((e: MerchantPaymentList, i: number) => {
					return {
						item: e,
						elements: [
							<GlobalTableCell>{e.payment_method.method_title}</GlobalTableCell>,
							<GlobalTableCell>{e.items_more_than}</GlobalTableCell>,
							<GlobalTableCell>{e.price_more_than}</GlobalTableCell>,

							<GlobalTableCell>
								<Switch
									onClick={() => {
										handelUpdateStatus(e);
									}}
									checked={e.active > 0 ? true : false}
								/>
							</GlobalTableCell>,
							<GlobalTableCell>
								<div className={classData}>
									<FaRegEdit
										className='text-subtitle'
										onClick={() => navigate(`add-Payment-Method?id=${e?.id}`)}
									/>
									<div onClick={() => handelId(e?.id)}>{children}</div>
								</div>
							</GlobalTableCell>,
						],
					};
				})}
			/>
		</>
	);
}
