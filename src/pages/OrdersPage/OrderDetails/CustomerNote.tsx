import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/app/components/optimized';
import { EditIcon } from 'src/app/utils/icons';
import CustomerNoteForm from './Forms/CustomerNoteForm';

export default function CustomerNote({id}:{id:string}) {
	
	const { t } = useTranslation();
	const [edit, setEdit] = useState(false);
	return (
		<div className='cardDetails-sharedClass'>
			<div>
				<div className={`flex-row-global  justify-between p-3 ${edit && 'pb-0'}`}>
					<h2 className='title capitalize'>{t('Customer note')}</h2>

					{edit ? (
						''
					) : (
						<Button LeftIcon={EditIcon} variant='tertiary' onClick={() => setEdit(true)}>
							{t('edit')}
						</Button>
					)}
				</div>
			</div>
			{edit ? (
				<CustomerNoteForm id={id} onClose={() => setEdit(false)} />
			) : (
				<div>
					<hr />
					<div className='p-3 h-20 flex-row-global  justify-center'>
						<p className='text-sm text-hint'>{t('There are no notes')}</p>
					</div>
				</div>
			)}
		</div>
	);
}
