import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';
import { useForm } from 'src/app/utils/hooks/form';
import AppliesOption from './Comp/AppliesOption';
import Rates from './Comp/Rates';
import RatesDeliver from './Comp/RatesDeliver';
import useCustomHookSetupInfo, { ISetupInfo } from './HookForSetupInfo';

export default function SetupInfo({
	gap,
	rates,
	ratesDeliver,
}: {
	gap: boolean;
	rates: boolean;
	ratesDeliver?: boolean;
}) {
	const [showRate, setShowRate] = useState<boolean>(false);

	// hook
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = useState<string>('');
	// custom hook
	const { handelDefaultValue, SetupInfoSchema } = useCustomHookSetupInfo();
	const options = [t('All products'), t('Specific products')];

	const handleSubmit = (values: ISetupInfo) => {
		console.log(values);
	};

	const { formStore, onSubmit } = useForm({
		schema: SetupInfoSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit} className='flex flex-col gap-3'>
				{/* <SubHeader title={t('SMSA')}> */}
					{/* <SubHeaderDefaultBtns onSubmit={() => alert('Submit')} /> */}
				{/* </SubHeader> */}
				<div className='global-cards w-full  gap-4'>
					<h3 className='title'>{t('Setup info')}</h3>
					<div className='w-[50%]'>
						<FormField
							formStore={formStore}
							name='apiKey'
							label={t('Api Key')}
							render={(field) => <Input {...field} />}
						/>
						<p className='text-xs text-subtitle'>{t('You can copy it from you SMSA dashboard')}</p>
					</div>
					<div className='w-[50%]'>
						<FormField
							formStore={formStore}
							name='name'
							label={t('Name on checkout')}
							render={(field) => <Input {...field} placeholder={t('SMSA shipping')} />}
						/>
					</div>
					<section>
						<h5 className='text-sm text-pri-dark font-semibold pb-2'>{t('Applies to')}</h5>
						<SingleChoiceChips
							options={options}
							selected={selectedOption}
							setSelected={(option: string) => setSelectedOption(option)}
						/>
						<AppliesOption applyTo={selectedOption} />
					</section>
					{rates && gap === false ? <Rates addStyle={false} /> : ''}
				</div>
				<div>{rates && gap ? <Rates addStyle={true} /> : ''}</div>
				<div>{ratesDeliver ? <RatesDeliver showRate={showRate} setShowRate={setShowRate} /> : ''}</div>
				{/* <SubHeaderMobileBtns onSubmit={() => alert('Submit')} /> */}
			</form>
		</Form>
	);
}
