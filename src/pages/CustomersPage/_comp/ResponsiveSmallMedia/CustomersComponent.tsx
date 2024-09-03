import Avatar from 'src/app/components/optimized/UiKits/Avatar';

import { useNavigate } from 'react-router-dom';
import { getImageUrl } from 'src/app/utils';

interface props {
	firstName?: string;
	lastName?: string;
	imageUrl?: string;
	email?: string;

	id: string;
	path?: string;
	noAvatar?: boolean;
	customersCount?: number;
	group?: boolean;
	children: React.ReactNode;
	handelId: (e: string) => void;
}
export default function CustomersComponenet({
	firstName,
	lastName,
	imageUrl,
	email,
	id,
	path,
	noAvatar,
	customersCount,
	group,
	handelId,
	children,
}: props) {
	//  hooks
	const navigate = useNavigate();

	return (
		<div className='flex-row-global-items-start justify-between '>
			<div
				onClick={() => {
					id && path && !group ? navigate(`/${path}/${id}`) : navigate(`/${path}?id=${id}`);
				}}
				className={`${path && 'cursor-pointer'} flex gap-3 items-start`}
			>
				{!noAvatar ? (
					<Avatar variant='group' groupCount={customersCount} size='lg' />
				) : (
					imageUrl && (
						<img src={imageUrl} className='w-[3.2rem] h-[3.2rem] rounded' loading='lazy' />
					)
				)}

				<div className='flex-col-global gap-1 justify-between'>
					<h2 className='title text-sm'>
						{firstName} {lastName}
					</h2>
					<p className='font-normal text-sm'>{email}</p>
				</div>
			</div>
			<div onClick={() => handelId(id)}>{children}</div>
		</div>
	);
}
