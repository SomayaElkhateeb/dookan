import { Input } from 'src/app/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { GeneralSettingsInterface } from '../_hook/HookForGeneralForm';

const SocialContacts = ({ formStore }: { formStore: UseFormReturn<GeneralSettingsInterface> }) => {
	const { t } = useTranslation();
	return (
		<section className='global-cards'>
			<div className='md:w-[70%] flex-col-global'>
			<h3 className='title'>{t('Social contacts')}</h3>
			<div className='flex-col-global gap-[1rem]'>
				<FormField
					formStore={formStore}
					name='general.settings.social.links.facebook'
					label={t('Facebook link')}
					render={(field) => <Input {...field} placeholder={'http://facebook.com/username'} />}
				/>
				<FormField
					formStore={formStore}
					name='general.settings.social.links.instagram'
					label={t('Instagram')}
					render={(field) => <Input {...field} placeholder={'http://instagram.com/username'} />}
				/>
				<FormField
					formStore={formStore}
					name='general.settings.social.links.twitter'
					label={t('Twitter')}
					render={(field) => <Input {...field} placeholder={'http://twitter.com/username'} />}
				/>
				<FormField
					formStore={formStore}
					name='general.settings.social.links.youtube'
					label={t('Youtube')}
					render={(field) => <Input {...field} placeholder={'http://youtube.com/username'} />}
				/>
			</div>
			</div>
		</section>
	);
};

export default SocialContacts;
