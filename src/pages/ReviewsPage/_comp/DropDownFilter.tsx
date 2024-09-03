import DropDownMenu from 'src/app/components/optimized/DropDownMenu';

export const DropDownFilter = ({
	children,
	title,
}: {
	children?: React.ReactNode;
	title: string;
}) => {
	return (
		<>
			<DropDownMenu title={title}>{children}</DropDownMenu>
			<hr />
		</>
	);
};
