import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrialBanner } from 'src/app/components/optimized';
import LinkCards from 'src/app/components/optimized/Cards/LinkCards';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getPermissions } from 'src/app/store/slices/settingsPage/roles/rolesAsyncThunks';
import {
	LanguageIcon,
	SettingsIcon,
	ShippingIcon,
	PaymentIcon,
	Person,
	ReviewsIcon,
	QueryIcon,
	EditIcon,
	TaxIcon,
	DomainIcon,
	InventoryIcon,
	WalletIcon,
} from 'src/app/utils/icons';

/**
 * SettingsPage component represents the settings page of the application.
 * It displays a trial banner and a set of settings cards.
 *
 * @returns {JSX.Element} SettingsPage component.
 */
const SettingsPage = () => {
	const { t } = useTranslation();

	const settingsCards = [
		{
			id: 1,
			path: 'general',
			Icon: SettingsIcon,
			title: t('General settings'),
			description: t('e.g., store name, logo, address...'),
		},
		{
			id: 2,
			path: 'shipping',
			Icon: ShippingIcon,
			title: t('Shipping'),
			description: t('Integration with shipping companies'),
		},
		{
			id: 3,
			path: 'payment',
			Icon: PaymentIcon,
			title: t('Merchant Payment Methods'),
			description: t('Enable and integration payment gateways'),
		},
		{
			id: 4,
			path: 'system_payment',
			Icon: PaymentIcon,
			title: t('System Payment Methods'),
			description: t('Enable and integration payment gateways'),
		},
		{
			id: 5,
			path: 'language',
			Icon: LanguageIcon,
			title: t('Languages & defaults'),
			description: t('Setup store language, currency, geo zones'),
		},
		{
			id: 6,
			path: 'branches',
			Icon: InventoryIcon,
			title: t('Branches'),
			description: t('Manage places you stock inventory, and sell products.'),
		},
		{
			id: 7,
			path: 'users',
			Icon: Person,
			title: t('Users & Permissions'),
			description: t('Users Settings'),
		},
		{
			id: 8,
			path: 'reviews',
			Icon: ReviewsIcon,
			title: t('Reviews'),
			description: t('Manage posted reviews'),
		},
		{
			id: 9,
			path: 'queries',
			Icon: QueryIcon,
			title: t('Queries'),
			description: t('Manage posted queries'),
		},
		{
			id: 10,
			path: 'customizations',
			Icon: EditIcon,
			title: t('Customizations'),
			description: t('Customize checkout, products and orders options'),
		},
		{
			id: 11,
			path: 'taxes',
			Icon: TaxIcon,
			title: t('Taxes'),
			description: t('Taxes rate & Classes'),
		},
		{
			id: 12,
			path: 'billing',
			Icon: WalletIcon,
			title: t('Billing & plans'),
			description: t('Manage and pay your bills'),
		},
		{
			id: 13,
			path: '/',
			Icon: DomainIcon,
			title: t('Domains'),
			description: t('Setup store domains'),
		},
		{
			id: 14,
			path: 'notification',
			Icon: ReviewsIcon,
			title: t('E-Mail Notifications'),
			description: t('Manage notifications sent to users'),
		},
	];

	// redux
	const dispatch = useAppDispatch();
	// const { permissions, isLoading, error } = useAppSelector((state) => state.rolesSettings);

	// console.log('permissions', permissions);

	useEffect(() => {
		dispatch(getPermissions());
	}, [dispatch]);

	return (
		<div className='flex-col-global custom_container'>
			<TrialBanner
				free={false}
				daysLeft={5}
				title={t("You're on free trial")}
				description={t('Subscribe now and open a world with no boundaries')}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-5'>
				{settingsCards.map((card) => (
					<LinkCards key={card.id} {...card} />
				))}
			</div>
		</div>
	);
};

export default SettingsPage;
