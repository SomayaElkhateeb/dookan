import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SingleChoiceChips from 'src/app/components/optimized/ChoiceChips/SingleChoiceChips';
import { languageSettingsInterface } from './HookForLanguageSettings';
import FormChoiceChips from 'src/app/components/ui/form/FormChoiceChips';

export default function DefaultLanguageSection({
	formStore,
}: {
	formStore: UseFormReturn<languageSettingsInterface>;
}) {
	//  hooks
	const { t } = useTranslation();
	const sharedClass = 'flex-col-global gap-[.25rem]';

	const handleLanguageType = (option: string) => {
		formStore.setValue('defaultLanguage', option);
	};
	return (
		<section className='global-cards '>
			<div className={sharedClass}>
				<h3 className='title'>{t('Languages')}</h3>
				<p className='subtitle'>
					{t(
						'Your store language defines what language your store communicates in with customers.',
					)}
				</p>
			</div>

			<FormChoiceChips<languageSettingsInterface>
				formStore={formStore}
				name='defaultLanguage'
				label={t('Store default')}
				options={['English', 'Arabic']}
			/>
		</section>
	);
}
