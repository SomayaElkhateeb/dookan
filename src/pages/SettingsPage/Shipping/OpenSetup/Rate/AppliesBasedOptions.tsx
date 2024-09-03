import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'src/app/components/ui/input';
import FormField from 'src/app/components/ui/form/field';
import { IAddRate } from '../Comp/AddRate';

export default function AppliesBasedOptions({
	applyTo,
	formStore,
}: {
	applyTo: string;
	formStore: UseFormReturn<IAddRate>;
}) {
	const { t } = useTranslation();
	return (
		<div>
			{applyTo === t('Order Weight') && (
				<div className='w-3/4'>
					<FormField
						formStore={formStore}
						name='weight'
						label={t('weight')}
						render={(field) => <Input {...field} />}
					/>
				</div>
			)}
			{applyTo === t('Order price') && (
				<div className='flex gap-5 w-3/4'>
					<div className='w-full'>
						<FormField
							formStore={formStore}
							name='minimumPrice'
							label={t('Minimum price')}
							render={(field) => <Input {...field} placeholder={t('SAR')} />}
						/>
					</div>

					<div className='w-full'>
						<FormField
							formStore={formStore}
							name='maximumPrice'
							label={t('Maximum price')}
							render={(field) => <Input {...field} placeholder={t('No limit')} />}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
