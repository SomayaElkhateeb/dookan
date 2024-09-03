import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CheckBox } from 'src/app/components/optimized';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import useCustomHookApps from '../../_hook/HookAppsPageForm';

const TikDataSharing = ({ description }: { description: string }) => {
	const { t } = useTranslation();
	const [isCheck, setIsCheck] = useState<boolean>(false);
	const { formStore, onSubmit } = useCustomHookApps();

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex flex-col gap-4'>
				<p className='global-install-p'>
					{description}
					<Button variant='link' className='inline px-2'>
						{t('Learn more')}
					</Button>
				</p>

				<CheckBox
					label={t('Activate data sharing')}
					checked={isCheck}
					handleOnChange={() => {
						setIsCheck(true);
					}}
				/>

				{isCheck && (
					<>
						<div className='flex justify-between flex-col gap-4 w-full md:w-1/2'>
							<FormField
								formStore={formStore}
								name='idPixel'
								label={t('Pixel ID')}
								render={(field) => <Input {...field} />}
							/>
						</div>

						<div className='flex justify-end'>
							<Button variant='primary' onClick={onSubmit}>
								{t('Connect')}
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
};

export default TikDataSharing;
