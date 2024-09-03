import { useState } from 'react';
import data from '../../_comp/data.json';
import ControlCard from 'src/app/components/optimized/Cards/ControlCard';
import { GlobalDialog } from 'src/app/components/shared';
import { useForm } from 'src/app/utils/hooks/form';
import { z } from 'zod';
import { Form } from 'src/app/components/ui/form';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { Button } from 'src/app/components/optimized';
import { useTranslation } from 'react-i18next';

interface FormCard {
	PixelID: number;
}

const handelDefaultValue = () => {
	return {
		PixelID: 0,
	};
};

const schema = {
	PixelID: z.coerce.number().positive().min(1),
};
export default function AnalyticsIntegrations() {
	//  hooks
	const [openDialog, setOpendialog] = useState(false);
	const { t } = useTranslation();

	// //////////////////////
	const handelclose = () => {
		setOpendialog(false);
	};

	// //////////////////

	//   style of dialog
	const style = {
		width: { md: '40rem', xs: '25.8rem' },
	};

	const handleSubmit = (values: FormCard) => {
		// console.log(values);
		// handleClose();
	};

	const { formStore, onSubmit } = useForm({
		schema: schema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});
	return (
		<>
			<section className='grid gap-5 md:grid-cols-2'>
				{data.paltformIntegrations.map((platform) => (
					<ControlCard setOpendialog={setOpendialog} key={platform.id} platform={platform} />
				))}
			</section>

			<GlobalDialog openDialog={openDialog} handleClose={handelclose} style={style}>
				<Form {...formStore}>
					<form onSubmit={onSubmit} className='flex-col-global'>
						<p className='title'>Activate Facebook Pixel </p>
						<FormField
							formStore={formStore}
							name='PixelID'
							label={'Pixel ID'}
							render={(field) => <Input type='number' {...field} />}
							description='You can copy it from Facebook ads manager'
						/>
						<div className='flex justify-end items-center gap-4'>
							<Button onClick={handelclose} variant='tertiary'>
								{t('cancel')}
							</Button>
							<Button onClick={onSubmit} variant='primary'>
								{t('Save')}
							</Button>
						</div>
					</form>
				</Form>
			</GlobalDialog>
		</>
	);
}
