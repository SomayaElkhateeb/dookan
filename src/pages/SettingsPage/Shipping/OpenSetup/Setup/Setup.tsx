import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import SetupInfo from '../SetupInfo';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';

export default function Setup() {
	const { t } = useTranslation();
	const data = [{ id: 1, title: t('Enabled') }];

	return (
		<div>
			<SubHeader title={t('SMSA')}>
				<SubHeaderDefaultBtns onSubmit={() => alert('Submit')} />
			</SubHeader>
			<div className='grid gap-5 lg:grid-cols-3 custom_container py-5'>
				<div className='flex-col-global lg:col-span-2'>
					<SetupInfo gap={true} rates={true} />
				</div>
				<div className='col-span-1'>
					<QuickActions data={data} />
				</div>
			</div>
			<SubHeaderMobileBtns onSubmit={() => alert('Submit')} />
		</div>
	);
}
