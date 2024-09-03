import { useTranslation } from 'react-i18next';
import GlobalDialog, { style } from 'src/app/components/shared/dialogs/GlobalDialog';
import { Button } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { z } from 'zod';
export interface EditOrAddItemSchema {
	name: string;
	link: string;
}
export default function AddNavItemDialog({
	openDialog,
	handelclose,
	style,
}: {
	openDialog: boolean;
	handelclose: (e?: boolean) => void;
	style: style;
}) {
	//  hooks
	const { t } = useTranslation();

	const EditOrAddItemSchema = {
		name: z.string().min(3).max(50),
		link: z.string().url(),
	};

	const handleSubmit = (values: EditOrAddItemSchema) => {
		console.log(values);
		// handelclose();
	};

	const { formStore, onSubmit } = useForm({
		schema: EditOrAddItemSchema,
		handleSubmit: handleSubmit,
		defaultValues: { name: '', link: '' },
	});
	return (
		<GlobalDialog openDialog={openDialog} handleClose={handelclose} style={style}>
			<div className='flex-col-global '>
				<p className='title'>{t('About')}</p>
				<Form {...formStore}>
					<form className='flex-col-global gap-[1.7rem]' onSubmit={onSubmit}>
						<div className='flex-col-global gap-[1rem]'>
							<FormField
								formStore={formStore}
								name='name'
								label={t('Name')}
								render={(field) => <Input {...field} placeholder={'e.g., Contact'} />}
							/>
							<FormField
								formStore={formStore}
								name='link'
								label={t('Link')}
								render={(field) => <Input {...field} placeholder={t('Search or put a link')} />}
							/>
						</div>
						<div className='flex-row-global-items-start  justify-end'>
							<Button
								onClick={() => handelclose()}
								className='px-4 border-0 font-semibold'
								variant='secondary'
							>
								{t('cancel')}
							</Button>

							<Button variant={'primary'} type='submit' className='px-4 font-semibold'>
								{t('Save Changes')}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</GlobalDialog>
	);
}
