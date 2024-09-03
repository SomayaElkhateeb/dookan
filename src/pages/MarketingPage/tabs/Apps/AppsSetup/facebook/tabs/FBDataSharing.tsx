import React, { useState } from 'react';
import { Button, CheckBox } from 'src/app/components/optimized';
import useCustomHookApps, { IAppsPage } from '../../_hook/HookAppsPageForm';
import { Form } from 'src/app/components/ui/form';
import { useTranslation } from 'react-i18next';
import SpecificAutoCompleteInput from 'src/app/components/ui/SpecificAutoCompleteInput';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';

const FBDataSharing = ({ description }: { description: string }) => {
	const { t } = useTranslation();
	const [isCheck, setIsCheck] = useState<boolean>(false);
	const { formStore, onSubmit } = useCustomHookApps();

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex flex-col gap-4'>
				<p className='text-title text-sm'>
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
					<div className='flex justify-between flex-col gap-4'>
						<div className='flex flex-col w-full md:w-1/2 gap-3 '>
							<FormField
								formStore={formStore}
								name='idPixel'
								label={t('Pixel ID')}
								render={(field) => <Input {...field} />}
							/>

							<SpecificAutoCompleteInput<IAppsPage>
								name='action'
								label={t('Tracked action')}
								formStore={formStore}
							/>
						</div>
						<div className='flex justify-end'>
							<Button variant='primary' onClick={onSubmit}>
								{'Connect'}
							</Button>
						</div>
					</div>
				)}
			</form>
		</Form>
	);
};

export default FBDataSharing;
