import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from 'src/app/components/ui/form/field';
import { Input } from 'src/app/components/ui/input';

import { ReviewInterface } from './_hook/HookForReviewSettings';
import FormSwitchField from 'src/app/components/ui/form/FormSwitchField';
import { useEffect } from 'react';

export default function ReviewSectionForm({
	formStore,
}: {
	formStore: UseFormReturn<ReviewInterface>;
}) {
	//  hooks
	const { t } = useTranslation();

	useEffect(() => {
		formStore.setValue(
			'reviews.target_customer_to_review.enabled',
			formStore.watch('reviews.target_customer_to_review.enabled') ? 1 : 0,
		);
	}, [formStore.watch('reviews.target_customer_to_review.enabled')]);

	return (
		<div className='global-cards gap-[1.3rem]'>
			<div className='flex-col-global  gap-[.85rem]'>
				<div className='flex-col-global  gap-[.35rem]'>
					<h2 className='title'>{t('Targeting customer to review')}</h2>
					<p className='subtitle'>
						{t('You can send an email for customers who purchased from you to review')}
					</p>
				</div>

				<div className='flex-row-global gap-2'>
					<p>{t('Enabled')}</p>
					<FormSwitchField
						formStore={formStore}
						name='reviews.target_customer_to_review.enabled'
						enable
					/>
				</div>
			</div>

			<div className='flex-col-global  gap-[1.3rem]'>
				<FormField
					formStore={formStore}
					name='reviews.target_customer_to_review.name'
					label={t('Name')}
					render={(field) => <Input {...field} placeholder={'mohamed'} />}
				/>
				<FormField
					formStore={formStore}
					name='reviews.target_customer_to_review.email_description'
					label={t('Email description')}
					render={(field) => <Input {...field} placeholder={'Sary@gmail.com'} />}
				/>

				<FormField
					formStore={formStore}
					name='reviews.target_customer_to_review.sending_after_purchase_days'
					label={t('Send after purchase')}
					render={(field) => <Input type='number' {...field} placeholder={'7'} />}
				/>
			</div>
		</div>
	);
}
