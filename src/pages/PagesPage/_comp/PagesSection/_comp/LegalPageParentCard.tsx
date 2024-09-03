export default function LegalPageParentCard({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<div className='global-cards'>
			<p className='title'>{title}</p>
			{children}
		</div>
	);
}
