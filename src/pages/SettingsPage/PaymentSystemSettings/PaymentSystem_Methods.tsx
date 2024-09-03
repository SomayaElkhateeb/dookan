import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Button, SubHeader } from 'src/app/components/optimized';
import AddButtonMobile from 'src/app/components/optimized/Buttons/AddButtonMobile';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';
import { Switch } from 'src/app/components/ui/switch';
import { Payment_Method_System } from 'src/app/interface/settingsInterface/MerchantPaymentMethodsSettingsInterface';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getPaymentMethods } from 'src/app/store/slices/settingsPage/payment/paymentMethods/paymentMethodsAsyncThunks';
import useResponsive from 'src/app/utils/hooks/useResponsive';

export default function PaymentSystem_Methods() {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();
	useEffect(() => {
		dispatch(getPaymentMethods());
	}, [dispatch]);

	const { paymentList, isLoading } = useAppSelector((state) => state.paymentMethods);

	const paymentTableHeaders = [
		{ title: t('title') },
		{ title: t('Description') },
		{ title: t('Monthly fees') },
		{ title: t('secret code') },
		{ title: t('key code') },

		{ title: t('STATUS') },
	];
	return (
		<div className='flex-col-global ga-5'>
			<SubHeader title={t('System Payment Methods')} />
			<div className='custom_container flex-col-global gap-5'>
				<div className='topTable '>
					{/* add  button */}
					{!xs && (
						<Button
							variant='primary'
							LeftIcon={IoIosAddCircle}
							onClick={() => {
								navigate('add-Payment-system-Method');
							}}
						>
							{t('Add New Payment System Method')}
						</Button>
					)}
				</div>

				<BaseTable
					isLoading={isLoading}
					color='#55607A'
					headers={paymentTableHeaders.map((h) => h)}
					rows={paymentList?.map((e: Payment_Method_System, i: number) => {
						return {
							item: e,
							elements: [
								<GlobalTableCell>{e.method_title}</GlobalTableCell>,
								<GlobalTableCell>{e.description}</GlobalTableCell>,
								<GlobalTableCell>{e.monthly_fees}</GlobalTableCell>,
								<GlobalTableCell>{e.sercret_code}</GlobalTableCell>,
								<GlobalTableCell>{e.key_code}</GlobalTableCell>,
								<GlobalTableCell>
									<Switch
										// onClick={() => {
										// 	handelUpdateStatus(e);
										// }}
										checked={Number(e.status) > 0 ? true : false}
									/>
								</GlobalTableCell>,
							],
						};
					})}
				/>

				{xs && <AddButtonMobile path='add-Payment-system-Method' />}
			</div>
		</div>
	);
}
