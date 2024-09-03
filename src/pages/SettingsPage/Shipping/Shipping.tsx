import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, SubHeader } from 'src/app/components/optimized';
import BaseTable, {
	GlobalTableCell,
} from 'src/app/components/optimized/TableLayoutGlobal/base.table';

import { shippingMethodsInterface } from 'src/app/interface/settingsInterface/ShippingSettingsInterface';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import {
	getShippingList,
	getShippingMethods,
} from 'src/app/store/slices/settingsPage/shipping/shippingAsyncThunks';

export default function Shipping() {
	// hooks
	const { t } = useTranslation();
	const navigate = useNavigate();

	// redux
	const dispatch = useAppDispatch();
	const { shippingMethod, isLoading } = useAppSelector((state) => state.shippingSettings);
	const { shippingList } = useAppSelector((state) => state.shippingSettings);

	useEffect(() => {
		dispatch(getShippingMethods());
		dispatch(getShippingList());
	}, [dispatch]);

	const shippingTableHeaders = [
		{ title: t('Icon') },

		{ title: t('Shipping method') },
		{ title: t('Shipping method title') },

		{ title: t('Actions') },
	];

	//  handel navigation of button dependency on Shipping List status
	const hndelNavigate = (e: shippingMethodsInterface) => {
		if (e.method === 'free_free' || e.method === 'flatrate_flatrate') {
			navigate(`Free_ShippingForm?id=${e.method}`);
		} else if (e.method === 'mpdhl_mpdhl') {
			navigate(`Dhl_ShippingForm`);
		}
	};

	const handelAppearButton = (e: shippingMethodsInterface) => {
		if (e.method === 'free_free') {
			if (shippingList.free.method !== e.method) {
				return (
					<Button onClick={() => hndelNavigate(e)} variant='primary'>
						{t('Setup')}
					</Button>
				);
			} else {
				return <Button variant='primary'>{t('Installed')}</Button>;
			}
		} else if (e.method === 'flatrate_flatrate') {
			if (shippingList.flatrate.method !== e.method) {
				return (
					<Button onClick={() => hndelNavigate(e)} variant='primary'>
						{t('Setup')}
					</Button>
				);
			} else {
				return <Button variant='primary'>{t('Installed')}</Button>;
			}
		} else if (e.method === 'mpdhl_mpdhl') {
			if (Number(shippingList.mpdhl.active) > 0) {
				return <Button variant='primary'>{t('Installed')}</Button>;
			} else {
				return (
					<Button onClick={() => hndelNavigate(e)} variant='primary'>
						{t('Setup')}
					</Button>
				);
			}
		}
	};
	return (
		<div className='flex-col-global'>
			<SubHeader title={t('Shipping')} />

			{/* <div className='flex-col-global custom_container'>
				
				<CardShipping
					title={t('Third party shipping providers')}
					description={t('Providers that enable you to ship products to your customers')}
				>
					<div className='flex flex-wrap gap-2'>
						{images.map((e) => {
							return <img src={e.ImageURL} key={e.id} />;
						})}
					</div>
					<p className='text-subtitle text-sm py-3 w-[50%] leading-6'>
						{t(
							'Compare over 6 different Shipping providers and pick the one that suits your needs',
						)}
					</p>
					<div>
						<Button variant='primary' onClick={() => navigate('setupProviders')}>
							{t('setup providers')}
						</Button>
					</div>
				</CardShipping>
				
				<CardShipping
					title={t('other methods')}
					description={t(
						'Shipments that are processed outside your online store. When a customer purchases an order, you need to handle the delivery yourself',
					)}
				>
					<hr />
					<div className='flexResponsive'>
						<h3 className='title text-sm'>{t('Deliver yourself')}</h3>
						<div className='flex items-center gap-4'>
							<Button
								variant='tertiary'
								LeftIcon={EditIcon}
								onClick={() => navigate('deliverYourself')}
							>
								{t('open setup')}
							</Button>
							<Switch />
						</div>
					</div>
					<hr />
					<div className='flexResponsive'>
						<h3 className='title text-sm'>{t('Self pickup')} </h3>
						<div>
							<Button variant='secondary' onClick={() => navigate('selfPickup')}>
								{t('Activate')}
							</Button>
						</div>
					</div>
				</CardShipping>
			</div> */}
			<div className='custom_container'>
				<BaseTable
					isLoading={isLoading}
					color='#55607A'
					headers={shippingTableHeaders.map((h) => h)}
					rows={shippingMethod?.map((e: shippingMethodsInterface, i: number) => {
						return {
							item: e,
							elements: [
								<GlobalTableCell>
									<div className='flex items-center gap-2'>
										<div className='box-photo'>
											<img src={e?.icon} className='w-full h-full' loading='lazy' />
										</div>
										<div>
											{e.code}

											<p className='subtitle text-sm'>{e.description}</p>
										</div>
									</div>
								</GlobalTableCell>,
								<GlobalTableCell>{e.method}</GlobalTableCell>,
								<GlobalTableCell>{e.method_title}</GlobalTableCell>,
								// <GlobalTableCell>{handelAppearButton(e)}</GlobalTableCell>,
							],
						};
					})}
				/>
			</div>
		</div>
	);
}

// function CardShipping({ title, description, buttonLabel, onClick, children }: CardShippingProps) {
// 	return (
// 		<div className='global-cards gap-2'>
// 			<div className='flex-col-global gap-0'>
// 				<h2 className='title'>{title}</h2>
// 				<p className='text-title text-sm py-3 w-[60%]'>{description}</p>
// 			</div>
// 			{children}
// 			{buttonLabel && (
// 				<div>
// 					<Button variant='primary' onClick={onClick}>
// 						{buttonLabel}
// 					</Button>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// interface CardShippingProps {
// 	title: string;
// 	description: string;
// 	buttonLabel?: string;
// 	onClick?: () => void;
// 	children: React.ReactNode;
// }
