// imports
import { nanoid } from 'nanoid';
import { GoStarFill } from 'react-icons/go';
import { LiaTrashAlt } from 'react-icons/lia';
import { RiCloseFill } from 'react-icons/ri';
import { Button } from 'src/app/components/optimized';
import MenuOptions from 'src/app/components/optimized/Menu/MenuOptions';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';
import { Form } from 'src/app/components/ui/form';
import FormField from 'src/app/components/ui/form/field';
import { Textarea } from 'src/app/components/ui/textarea';
import { getImageUrl } from 'src/app/utils';
import { AddFillIcon, EditIcon, MoreIcon, ReplyIcon, VectorQuIcon } from 'src/app/utils/icons';
import useCustomReviewsForm from '../../../_hook/HookReviewsPage';

// data
const options = [
	{
		id: nanoid(),
		text: 'delete permanently',
		icon: <LiaTrashAlt size='28' className='fill-pri-dark' />,
	},
];

const optionsRemove = [
	{
		id: nanoid(),
		text: 'unpublish',
		icon: <RiCloseFill color='#032C58' />,
	},
	{
		id: nanoid(),
		text: 'delete permanently',
		icon: <LiaTrashAlt size='28' className='fill-pri-dark' />,
	},
];
// ///////////////////////////////////////////////////////////
// products reviews
export const HeaderCard = () => {
	return (
		<div className='flex-row-global gap-1'>
			<GoStarFill size={14} color='gold' />
			<h4 className='title text-sm'>4.3</h4>
			<p className='subtitle text-sm'>(500)</p>
		</div>
	);
};
////////////////////////////////////////////////////////////////
export const BodyCard = ({
	setReply,
	submitReply,
	published,
	query,
}: {
	setReply: (e: boolean) => void;
	submitReply: boolean;
	published?: boolean;
	query?: boolean;
}) => {
	return (
		<div className='flex-row-global gap-4 cursor-pointer'>
			<MenuOptions
				btn={<MoreIcon className='fill-pri-dark' />}
				options={options}
				handle={() => console.log('')}
			/>
			{published || query
				? !submitReply && (
						<Button variant='secondary' LeftIcon={ReplyIcon} onClick={() => setReply(true)}>
							reply
						</Button>
				  )
				: !submitReply && (
						<>
							<Button variant='primary'>Publish</Button>
							<Button variant='secondary' LeftIcon={ReplyIcon} onClick={() => setReply(true)}>
								reply
							</Button>
						</>
				  )}
		</div>
	);
};
////////////////////////////////////////////////////////////////////////
export const Children = ({
	setReply,
	setSubmitReply,
	query,
}: {
	setReply: (e: boolean) => void;
	setSubmitReply: (e: boolean) => void;
	query?: boolean;
}) => {
	const handleSubmit = () => {
		setReply(false);
		setSubmitReply(true);
	};

	const handleReply = () => {
		setReply(false);
		setSubmitReply(false);
	};

	const { formStore, onSubmit } = useCustomReviewsForm();
	return (
		<Form {...formStore}>
			<form onSubmit={onSubmit}>
				<div className='p-5 flex flex-col gap-4'>
					<FormField
						formStore={formStore}
						name='reply'
						label='Reply'
						render={(field) => <Textarea {...field} placeholder={''} />}
					/>
					<div className='flex-btn-end'>
						{query ? (
							<>
								<Button variant='tertiary' onClick={handleReply}>
									discard
								</Button>
								<Button variant='primary' onClick={onSubmit}>
									submit
								</Button>
							</>
						) : (
							<>
								<Button variant='secondary' LeftIcon={ReplyIcon} onClick={handleReply}>
									submit reply
								</Button>
								<Button variant='primary' onClick={onSubmit}>
									submit & publish
								</Button>
							</>
						)}
					</div>
				</div>
			</form>
		</Form>
	);
};
////////////////////////////////////////////////////////////////////////
export const Publish = ({
	setReply,
	query,
}: {
	setReply: (e: boolean) => void;
	query?: boolean;
}) => {
	return (
		<div className='p-5 pt-0 flex-col-global gap-4'>
			<div className='p-3 cardDetails-sharedClass flex items-start justify-between'>
				<div className='flex-row-global gap-2'>
					<div>
						<Avatar variant='user' imageUrl={getImageUrl('product/product.png')} />
					</div>
					<div className='flex-col-global gap-1'>
						<div className='flex-row-global gap-2'>
							<h3 className='title'>Fan Al Taalouq</h3>
							<p className='subtitle text-sm'>5/6/2021</p>
						</div>

						<div className='flex-row-global'>
							<p className='text-title text-sm'>Thanks for letting us know, </p>
							<Button variant='link'>Learn more</Button>
						</div>
					</div>
				</div>
				<div className='flex-row-global gap-4'>
					<MenuOptions
						btn={<LiaTrashAlt size='28' className='fill-pri-dark cursor-pointer' />}
						options={optionsRemove}
						handle={() => console.log('')}
					/>

					<button onClick={() => setReply(true)}>
						<EditIcon className='fill-pri-dark cursor-pointer' />
					</button>
				</div>
			</div>
			{query && (
				<div className='flex-btn-end'>
					<Button variant='secondary' LeftIcon={AddFillIcon}>
						add to product FAQ
					</Button>
				</div>
			)}
		</div>
	);
};
/////////////////////////////////////////////////////////////////////////
// asks and queries
export const HeaderAsksAnsQueries = () => {
	return (
		<div className='flex-row-global gap-1'>
			<VectorQuIcon className='fill-pri-dark cursor-pointer' />
			<h4 className='title text-sm'>50 queries</h4>
		</div>
	);
};
