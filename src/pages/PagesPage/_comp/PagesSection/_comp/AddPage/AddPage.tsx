import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuEye } from 'react-icons/lu';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { Button, SubHeader } from 'src/app/components/optimized';
import AccordionCard from 'src/app/components/optimized/UiKits/AccordionCard';
import QuickActions from 'src/app/components/optimized/UiKits/QuickActions';
import { Form } from 'src/app/components/ui/form';
import { useForm } from 'src/app/utils/hooks/form';
import useResponsive from 'src/app/utils/hooks/useResponsive';
import useCustomHookAddBlogOrPage, {
	addPageInterface,
} from '../../../BlogPosts/_hook/HookForAddBlogOrPageForm';
import ContentSeoPage from './_comp/ContentSeoPage';
import MainInfoPage from './_comp/MainInfoPage';

export default function AddPage({ addblog }: { addblog?: boolean }) {
	// hooks
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { xs } = useResponsive();

	const handleSubmit = (values: addPageInterface) => {
		console.log(values);
		// handelclose();
	};

	// custom hook
	const { pageSchema, handelDefaultValue } = useCustomHookAddBlogOrPage(addblog);

	const { formStore, onSubmit } = useForm({
		schema: pageSchema,
		handleSubmit: handleSubmit,
		defaultValues: handelDefaultValue(),
	});

	const data = [
		{ id: 1, title: t('Visible') },
		{ id: 2, title: t('Show on footer') },
		{ id: 3, title: t('Show on main menu') },
	];

	const SubHeaderActions = () => {
		return (
			<>
				<div className='flex space-x-3'>
					<button>
						<LuEye size='22' />
					</button>

					<button>
						<RxDotsHorizontal size='22' />
					</button>
				</div>
				<Button variant='secondary' onClick={() => navigate(-1)}>
					{t('Discard')}
				</Button>
				<Button variant='primary' onClick={() => {}}>
					{t('Save Changes')}
				</Button>
			</>
		);
	};

	return (
		<Form {...formStore}>
			<form className='flex-col-global gap-[1.7rem] ' onSubmit={onSubmit}>
				<SubHeader title={!addblog ? t('Add page') : t('Add blog')}>
					{!xs ? <SubHeaderActions /> : <RxDotsHorizontal />}
				</SubHeader>

				<div className='custom_container custom-grid-parent'>
					<div className='grid-left flex flex-col gap-4'>
						<MainInfoPage addblog={addblog} formStore={formStore} />
						<AccordionCard
							open={open}
							setOpen={setOpen}
							content={<ContentSeoPage formStore={formStore} open={open} />}
							title={t('SEO (Search engine listing preview)')}
						/>
					</div>
					<div className='grid-right'>
						<QuickActions data={data} />
					</div>
				</div>

				{xs && (
					<div className='flex space-x-3 justify-center bg-white p-5 absolute w-full bottom-0'>
						<SubHeaderActions />
					</div>
				)}
			</form>
		</Form>
	);
}
