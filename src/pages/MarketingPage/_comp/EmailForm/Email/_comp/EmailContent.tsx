import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'src/app/utils';
import { IEmailForm } from './HookEmailForm';
import { UseFormReturn } from 'react-hook-form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import { Button } from 'src/app/components/optimized';

export default function EmailContent({ formStore }: { formStore: UseFormReturn<IEmailForm> }) {
	const { t } = useTranslation();

	return (
		<div className='global-cards'>
			<h2 className='title'>{t('Email Content')}</h2>

			{/* forms */}
			<div className='w-[75%] flex flex-col gap-4'>
				<div className='emailGrid'>
					<p className='col-span-1 text-pri-dark text-sm'>{t('To')}</p>
					<div className='col-span-3'>
						<SpecificAutoCompleteInput<IEmailForm> name='to' formStore={formStore} />
					</div>
					<Button className='col-span-2 flex justify-start' variant='link'>
						{t('View all subscribers')}
					</Button>
				</div>
				<div className='emailGrid'>
					<p className='col-span-1 text-pri-dark text-sm'>{t('Subject')}</p>
					<div className='col-span-3'>
						<FormField
							formStore={formStore}
							name='subject'
							render={(field) => <Input placeholder='Subject' {...field} />}
						/>
					</div>
				</div>

				<div className='emailGrid'>
					<p className='col-span-1 text-pri-dark text-sm'>{t('From')}</p>
					<div className='col-span-3'>
						<FormField formStore={formStore} name='from' render={(field) => <Input {...field} />} />
					</div>
					<Button className='col-span-2 flex justify-start' variant='link'>
						{t('edit')}
					</Button>
				</div>
			</div>

			{/* image */}
			<div className='border border-constrained rounded p-5 w-full h-full'>
				<img src={getImageUrl('images/mailOne.png')} className='w-full h-full' />
			</div>
		</div>
	);
}
