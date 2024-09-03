import { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { Textarea } from 'src/app/components/ui/textarea';
import { Button, CheckBox } from 'src/app/components/optimized';
import { GlobalDialog } from 'src/app/components/shared';
import useCustomHookDeliveryAndCashForm, {
	DeliveryPaymentTypes,
} from './HookForDeliveryAndCashForm';

interface DeliveryPaymentProps {
	handleClose: () => void;
	showPayment: boolean;
	title: string;
	pickup?: boolean;
}

const style = {
	width: { md: '50%', xs: '90%' },
};

export default function DeliveryPayment({
	handleClose,
	showPayment,
	title,
	pickup,
}: DeliveryPaymentProps) {
	//  hooks
	const { t } = useTranslation();
	const [addCondition, setAddCondition] = useState<boolean>(false);

	const handleSubmit = (values: DeliveryPaymentTypes) => {
		console.log(values);
	};

	//  custom hooks
	// ///////////////////////////////////
	// ///////////////////////////////////
	const { addPaymentSchema, handelDefaultValue } = useCustomHookDeliveryAndCashForm(addCondition);
	const { formStore, onSubmit } = useForm({
		schema: addPaymentSchema(),
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	useMemo(() => {
		!addCondition && formStore.setValue('minimumPrice', 0);
		formStore.setValue('maximumPrice', 0);
	}, [addCondition]);

	return (
		<GlobalDialog openDialog={showPayment} handleClose={handleClose} style={style}>
			<Form {...formStore}>
				<form onSubmit={onSubmit} className='grid gap-5 lg:grid-cols-3'>
					<h3 className='title capitalize col-span-3'>{title}</h3>
					<div className='grid gap-4 col-span-2'>
						<FormField
							formStore={formStore}
							name='instructions'
							label={t('Details & instructions (optional)')}
							render={(field) => <Textarea {...field} />}
						/>
						{!pickup && (
							<CheckBox
								label={t('Add conditions')}
								checked={addCondition}
								handleOnChange={() => setAddCondition(!addCondition)}
							/>
						)}
						{addCondition && (
							<div className='grid grid-cols-2 gap-4'>
								<h3 className='title capitalize col-span-2'>{t('Applies when')}</h3>
								<div className='col-span-1'>
									<FormField
										formStore={formStore}
										name='minimumPrice'
										label={t('Minimum Price')}
										render={(field) => <Input type='number' {...field} />}
									/>
								</div>
								<div className='col-span-1'>
									<FormField
										formStore={formStore}
										name='maximumPrice'
										label={t('Maximum Price')}
										render={(field) => <Input type='number' {...field} />}
									/>
								</div>
							</div>
						)}
					</div>
					<div className='flex items-center justify-end gap-4 col-span-3'>
						<Button variant='tertiary' onClick={() => handleClose()} text={t('Cancel')} />
						<Button variant='primary' onClick={onSubmit} text={t('Save Changes')} />
					</div>
				</form>
			</Form>
		</GlobalDialog>
	);
}
