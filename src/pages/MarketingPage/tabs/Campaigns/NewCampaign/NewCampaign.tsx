import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useCampaign from './_hook/useCampaign';
import BudgetDetails from './BudgetDetails';
import CampaignDetails from './CampaignDetails';
import TargetingDetails from './TargetingDetails';
import { Form } from 'src/app/components/ui/form';
import { SubHeader, Button } from 'src/app/components/optimized';
import { RxDotsHorizontal } from 'react-icons/rx';
import useResponsive from 'src/app/utils/hooks/useResponsive';

const NewCampaign = () => {
	const [target, setTarget] = useState('having specific interests');
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();

	const { formStore, onSubmit, updatedDates } = useCampaign(target);

	useEffect(() => {
		setTarget(formStore.watch('targetSimilarPeople'));
	}, [formStore.watch('targetSimilarPeople')]);

	useEffect(() => {
		formStore.setValue('activeDates', updatedDates);
	}, [
		updatedDates.startActivation.startDate,
		updatedDates.startActivation.startTime,
		updatedDates.endActivation.endDate,
		updatedDates.endActivation.endTime,
	]);

	const SubHeaderActions = () => {
		return (
			<>
				<Button variant='secondary' onClick={() => navigate(-1)}>
					{t('Discard')}
				</Button>
				<Button variant='primary' onClick={() => {}}>
					{t('Publish')}
				</Button>
			</>
		);
	};
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex-col-global'>
				<SubHeader title={t('Add Activity')}>
					{!xs ? <SubHeaderActions /> : <RxDotsHorizontal />}
				</SubHeader>

				<div className='grid custom_container grid-cols-3'>
					<div className='grid gap-5 col-span-3 lg:col-span-2'>
						<CampaignDetails formStore={formStore} />
						<TargetingDetails formStore={formStore} />
						<BudgetDetails formStore={formStore} />
					</div>
				</div>
				{xs && (
					<div className='flex space-x-3 justify-center bg-white p-5 absolute w-full bottom-0'>
						<SubHeaderActions />
					</div>
				)}
			</form>
		</Form>
	);
};

export default NewCampaign;
