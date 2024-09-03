import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import Location from '../Comp/Location';
import SetupInfo from '../SetupInfo';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';

const locationData = [
	{
		id: 1,
		title: 'Riyadh warehouse',
		location: 'Meed Market, 15 Haroon Al Rashied st.',
		city: 'Al Jazera, Riyadh',
		country: 'Saudi Arabia',
		phone: 96841564566,
		main: true,
	},
	{
		id: 2,
		title: 'Riyadh warehouse',
		location: 'Meed Market, 15 Haroon Al Rashied st.',
		city: 'Al Jazera, Riyadh',
		country: 'Saudi Arabia',
		phone: 96841564566,
		main: false,
	},
];
export default function SelfPickup() {
	const { t } = useTranslation();
	const data = [{ id: 1, title: t('Enabled') }];

	return (
		<div>
			<SubHeader title={t('Self Pickup')}>
				<SubHeaderDefaultBtns onSubmit={() => alert('Submit')} />
			</SubHeader>

			<div className='grid gap-5 lg:grid-cols-3 custom_container py-5'>
				<div className='flex-col-global lg:col-span-2 gap-0'>
					<SetupInfo gap={true} rates={false} ratesDeliver={false} />
					<div className='cardDetails-sharedClass p-5 flex flex-col gap-3'>
						<h3 className='title'>{t('Location')}</h3>
						<Location data={locationData} />
					</div>
				</div>
				<div className='col-span-1'>
					{/* <QuickActions data={data} /> */}
				</div>
			<SubHeaderMobileBtns onSubmit={() => alert('Submit')} />
			</div>

		</div>
	);
}
