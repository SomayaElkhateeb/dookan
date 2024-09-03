import { useTranslation } from 'react-i18next';
import { GeneralSettingsInterface } from '../_hook/HookForGeneralForm';
import { UseFormReturn } from 'react-hook-form';
import FormField from 'src/app/components/ui/form/field';
import { TfiUpload } from 'react-icons/tfi';
import { Input } from 'src/app/components/ui/input';
import ImageInput from 'src/app/components/ui/form/ImageInput';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';

const LegalDetails = ({
	formStore,
}: {

	formStore: UseFormReturn<GeneralSettingsInterface>;
}) => {
	//  hooks
	const { t } = useTranslation();
	const type = formStore.watch('general.settings.legal.type');

	return (
		<section className='global-cards '>
			<div className='md:w-[70%] flex-col-global'>
				<h3 className='title'>{t('Legal details')}</h3>
				<div className='flex-col-global gap-[1rem]'>
					<div className='flex-row-global gap-[1.8rem]'>
						<FormChoiceChips<GeneralSettingsInterface>
							formStore={formStore}
							name='general.settings.legal.type'
							options={['individual', 'Business']}
						/>
					</div>

					<FormField
						formStore={formStore}
						name='general.settings.legal.national_id'
						label={t('National ID')}
						render={(field) => <Input {...field} placeholder={'1111111'} />}
					/>

					<ImageInput<GeneralSettingsInterface> name={'general.settings.legal.national_image'} formStore={formStore}>
						<TfiUpload className='text-[1.5rem]' />
						<p className='paragraph text-center'>{t('Upload Image')}</p>
					</ImageInput>

					{type === 'Business' && (
						<div className='flex-col-global gap-[1rem]'>
							<FormField
								formStore={formStore}
								name='general.settings.legal.commercial_no'
								label={t('Commercial Registration No')}
								render={(field) => <Input {...field} placeholder={'1111111'} />}
							/>

							<ImageInput<GeneralSettingsInterface>
								name='general.settings.legal.commercial_image'
								formStore={formStore}
							>
								<TfiUpload className='text-[1.5rem]' />
								<p className='paragraph text-center'>{t('Upload Image')}</p>
							</ImageInput>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default LegalDetails;



