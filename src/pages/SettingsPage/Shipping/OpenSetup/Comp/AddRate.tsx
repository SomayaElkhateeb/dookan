import { useTranslation } from 'react-i18next';
import { useForm } from 'src/app/utils/hooks/form';
import { Form } from 'src/app/components/ui/form';
import TextFields from './TextFields';
import { Button } from 'src/app/components/optimized';
import AppliesBasedOn from '../Rate/AppliesBasedOn';
import useCustomHookAddRate, { IAddRate } from './HookForAddRate';
import { GlobalDialog } from 'src/app/components/shared';
export default function AddRate({
	saudi,
	onClose,
	showRate,
}: {
	saudi?: boolean;
	onClose: () => void;
	showRate: boolean;
}) {
	// hook
	const { t } = useTranslation();
	//custom hook
	const { handelDefaultValue, rateSchema } = useCustomHookAddRate();

	// submit
	const handleSubmit = (values: IAddRate) => {
		console.log(values);
	};

	const { formStore, onSubmit } = useForm({
		schema: rateSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit}>
				<GlobalDialog
					openDialog={showRate}
					handleClose={onClose}
					style={{ width: { md: '50%', xs: '95%' } }}
				>
					<h2 className='text-title font-semibold '>{t('Add rate')}</h2>
					<TextFields formStore={formStore} saudi={saudi} />
					<AppliesBasedOn formStore={formStore} />

					<div className='flex items-center justify-end  gap-5'>
						<Button variant='tertiary' onClick={onClose}>
							{t('cancel')}
						</Button>
						<Button variant='primary' onClick={onSubmit}>
							{t('add')}
						</Button>
					</div>
				</GlobalDialog>
			</form>
		</Form>
	);
}
