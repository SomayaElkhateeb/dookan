export default function CustomerData({
	data,
	icon,
}: {
	data: string;
	icon: React.ReactNode;
}) {
	return (
		<div className='flex-row-global gap-[11px]'>
			{icon}
			<p className='text-[0.8rem]'>{data}</p>
		</div>
	);
}
