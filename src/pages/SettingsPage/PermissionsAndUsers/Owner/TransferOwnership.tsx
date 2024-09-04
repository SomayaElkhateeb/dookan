import { useForm } from 'src/app/utils/hooks/form';
import { Form } from 'src/app/components/ui/form';
import { useTranslation } from 'react-i18next';
import { SubHeader } from 'src/app/components/optimized';
import NewOwner from './NewOwner';
import {
	SubHeaderDefaultBtns,
	SubHeaderMobileBtns,
} from 'src/app/components/optimized/UiKits/SubHeaderActionBtns';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { useNavigate } from 'react-router-dom';

export default function TransferOwnership() {
	//  hooks
	const { t } = useTranslation();
	// const navigate = useNavigate();

	// redux
	// const dispatch = useAppDispatch();

	// const { formStore, onSubmit } = useForm({
	// 	schema: AddUserSchema,
	// 	handleSubmit: (values: addOwnerInterface) => {
	// 		console.log('');
	// 	},
	// 	defaultValues: newOwnerValue(),
	// });

	return (
		// <Form {...formStore}>
		// 	<form onSubmit={onSubmit} className='flex-col-global gap-5 h-screen'>
		<>
			<SubHeader title={t('Transfer Ownership')}>
				{/* <SubHeaderDefaultBtns onSubmit={onSubmit} /> */}
			</SubHeader>
			<div className='custom-grid-parent custom_container'>
				<div className=' flex-col-global gap-5 grid-left'>
					<NewOwner formStore={formStore} />
					{/* <SubHeaderMobileBtns onSubmit={onSubmit} /> */}
				</div>
			</div>
		</>
		// 	</form>
		// </Form>
	);
}
