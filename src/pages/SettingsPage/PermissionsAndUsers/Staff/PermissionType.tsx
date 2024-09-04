// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
// import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import { Box } from '@mui/material';
// import { getPermissions } from 'src/app/store/slices/settingsPage/roles/rolesAsyncThunks';
// import { useAppDispatch, useAppSelector } from 'src/app/store';
// import { AddRolesInterface } from '../Roles/HookForAddRoles';
// import { UseFormReturn } from 'react-hook-form';
// import SearchInput from 'src/app/components/ui/form/SearchInput';

// // styles
// const Accordion = styled((props: AccordionProps) => (
//     <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(() => ({
//     paddingTop: 0,
//     paddingBottom: 0,
//     '&:last-child': {
//         borderBottom: 0,
//     },
//     '&::before': {
//         display: 'none',
//     },
// }));

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//     <MuiAccordionSummary
//         expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//         {...props}
//     />
// ))(({ theme }) => ({
//     backgroundColor: 'white',
//     flexDirection: 'row-reverse',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//         transform: 'rotate(90deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//         marginLeft: theme.spacing(1),
//     },
// }));

// const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
//     '& .MuiCheckbox-root': {
//         marginRight: theme.spacing(2),
//     },
//     '& .MuiTypography-root': {
//         flexGrow: 1,
//     },
// }));

// type PermissionsData = {
//     [key: string]: {
//         name: string;
//         children?: PermissionsData;
//     };
// };

// type CheckedItems = string[];

// type HandleCheckboxChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;

// const updateCheckedItems = (
//     key: string,
//     checked: boolean,
//     checkedItems: CheckedItems,
//     data: PermissionsData,
//     parentKey = ''
// ): { updatedItems: CheckedItems, checkedArray: string[] } => {
//     let updatedItems = checked ? [...checkedItems, key] : checkedItems.filter(item => item !== key);
//     let checkedArray: string[] = [key];

//     if (data[key] && data[key].children) {
//         Object.keys(data[key].children).forEach((childKey) => {
//             const fullKey = `${key}.${childKey}`;
//             const { updatedItems: childUpdatedItems, checkedArray: childCheckedArray } =
//                 updateCheckedItems(fullKey, checked, updatedItems, data[key].children!);
//             updatedItems = childUpdatedItems;
//             checkedArray.push(...childCheckedArray);
//         });
//     }

//     return { updatedItems, checkedArray };
// };

// const NestedAccordion = ({ data, checkedItems, handleCheckboxChange, parentKey = '' }: { data: PermissionsData; checkedItems: CheckedItems; handleCheckboxChange: HandleCheckboxChange, parentKey?: string }) => {
//     const [nestedExpanded, setNestedExpanded] = React.useState<string | false>(false);

//     const handleNestedChange =
//         (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
//             setNestedExpanded(newExpanded ? panel : false);
//         };

//     return (
//         <>
//             {Object.entries(data).map(([key, child], index) => {
//                 const fullKey = parentKey ? `${parentKey}.${key}` : key;
//                 return child.children && Object.keys(child.children).length > 0 ? (
//                     <Accordion key={index} expanded={nestedExpanded === key} onChange={handleNestedChange(key)}>
//                         <StyledAccordionSummary aria-controls={`${key}-content`} id={`${key}-header`}>
//                             <Checkbox
//                                 checked={checkedItems.includes(fullKey)}
//                                 onChange={handleCheckboxChange(fullKey)}
//                                 inputProps={{ 'aria-label': 'controlled' }}
//                             />
//                             <Typography sx={{ marginTop: 1 }}>{child.name}</Typography>
//                         </StyledAccordionSummary>
//                         <Box sx={{ padding: "0 60px" }}>
//                             <NestedAccordion data={child.children} checkedItems={checkedItems} handleCheckboxChange={handleCheckboxChange} parentKey={fullKey} />
//                         </Box>
//                     </Accordion>
//                 ) : (
//                     <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                         <Checkbox
//                             checked={checkedItems.includes(fullKey)}
//                             onChange={handleCheckboxChange(fullKey)}
//                             inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                         <Typography sx={{ marginTop: 1 }}>{child.name}</Typography>
//                     </div>
//                 )
//             })}
//         </>
//     );
// };

// // PermissionsData
// export default function PermissionType({ formStore }: { formStore: UseFormReturn<AddRolesInterface> }) {
//     const [expanded, setExpanded] = React.useState<string | false>(false);
//     const [checkedItems, setCheckedItems] = React.useState<CheckedItems>([]);
//     const [checkedArray, setCheckedArray] = React.useState<string[]>([]);

//     // search
//     const [searchQuery, setSearchQuery] = React.useState('');

//     // redux
//     const dispatch = useAppDispatch();
//     const permissions = useAppSelector((state) => state.rolesSettings.permissions) || {};
//     const filteredPermissions = React.useMemo(() => {
//         return Object.entries(permissions).filter(([key, value]) =>
//             key.toLowerCase().includes(searchQuery.toLowerCase())
//         ).reduce((obj, [key, value]) => {
//             obj[key] = value;
//             return obj;
//         }, {} as PermissionsData);
//     }, [searchQuery, permissions]);

//     React.useEffect(() => {
//         dispatch(getPermissions());
//     }, [dispatch]);

//     const handleChange =
//         (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
//             setExpanded(newExpanded ? panel : false);
//         };

//     const handleCheckboxChange: HandleCheckboxChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newCheckedStatus = event.target.checked;
//         const { updatedItems, checkedArray: newCheckedArray } = updateCheckedItems(key, newCheckedStatus, checkedItems, permissions);
//         setCheckedItems(updatedItems);

//         if (newCheckedStatus) {
//             setCheckedArray((prevArray) => [...prevArray, ...newCheckedArray]);
//         } else {
//             setCheckedArray((prevArray) => prevArray.filter((item) => !newCheckedArray.includes(item)));
//         }
//     };

//     React.useEffect(() => {
//         console.log('Checked array:', checkedArray);
//     }, [checkedArray]);

//     return (
//         <>
//             <SearchInput setSearchQuery={setSearchQuery} />
//             {Object.entries(filteredPermissions).map(([key, item], index) => {
//                 const fullKey = key;
//                 return (
//                     <Accordion key={index} expanded={expanded === key} onChange={handleChange(key)}>
//                         <StyledAccordionSummary aria-controls={`${key}-content`} id={`${key}-header`}>
//                             <Checkbox
//                                 checked={checkedItems.includes(fullKey)}
//                                 onChange={handleCheckboxChange(fullKey)}
//                                 inputProps={{ 'aria-label': 'controlled' }}
//                             />
//                             <Typography sx={{ marginTop: 1 }}>{item.name}</Typography>
//                         </StyledAccordionSummary>
//                         <Box sx={{ padding: "0 40px" }}>
//                             <NestedAccordion data={item.children || {}} checkedItems={checkedItems} handleCheckboxChange={handleCheckboxChange} parentKey={fullKey} />
//                         </Box>
//                     </Accordion>
//                 );
//             })}
//         </>
//     );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { getPermissions } from 'src/app/store/slices/settingsPage/roles/rolesAsyncThunks';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { AddRolesInterface } from '../Roles/HookForAddRoles';
import { UseFormReturn } from 'react-hook-form';
import SearchInput from 'src/app/components/ui/form/SearchInput';

// styles
const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
	paddingTop: 0,
	paddingBottom: 0,
	'&:last-child': {
		borderBottom: 0,
	},
	'&::before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: 'white',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
	'& .MuiCheckbox-root': {
		marginRight: theme.spacing(2),
	},
	'& .MuiTypography-root': {
		flexGrow: 1,
	},
}));

type PermissionsData = {
	[key: string]: {
		name: string;
		children?: PermissionsData;
	};
};

type CheckedItems = string[];

type HandleCheckboxChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;

const updateCheckedItems = (
	key: string,
	checked: boolean,
	checkedItems: CheckedItems,
	data: PermissionsData,
): { updatedItems: CheckedItems; checkedArray: string[] } => {
	const updatedItems = new Set(checkedItems); // Use Set to avoid duplicates
	const checkedArray: string[] = [];

	const processNode = (nodeKey: string) => {
		if (checked) {
			updatedItems.add(nodeKey);
		} else {
			updatedItems.delete(nodeKey);
		}

		if (data[nodeKey] && data[nodeKey].children) {
			Object.keys(data[nodeKey].children).forEach((childKey) => {
				const fullChildKey = `${nodeKey}.${childKey}`;
				processNode(fullChildKey);
			});
		}
	};

	processNode(key);

	checkedArray.push(...Array.from(updatedItems)); // Convert Set to Array

	return { updatedItems: Array.from(updatedItems), checkedArray };
};

const NestedAccordion = ({
	data,
	checkedItems,
	handleCheckboxChange,
	parentKey = '',
}: {
	data: PermissionsData;
	checkedItems: CheckedItems;
	handleCheckboxChange: HandleCheckboxChange;
	parentKey?: string;
}) => {
	const [nestedExpanded, setNestedExpanded] = React.useState<string | false>(false);

	const handleNestedChange =
		(panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
			setNestedExpanded(newExpanded ? panel : false);
		};

	return (
		<>
			{Object.entries(data).map(([key, child], index) => {
				const fullKey = parentKey ? `${parentKey}.${key}` : key;
				return child.children && Object.keys(child.children).length > 0 ? (
					<Accordion
						key={index}
						expanded={nestedExpanded === key}
						onChange={handleNestedChange(key)}
					>
						<StyledAccordionSummary aria-controls={`${key}-content`} id={`${key}-header`}>
							<Checkbox
								checked={checkedItems.includes(fullKey)}
								onChange={handleCheckboxChange(fullKey)}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
							<Typography sx={{ marginTop: 1 }}>{child.name}</Typography>
						</StyledAccordionSummary>
						<Box sx={{ padding: '0 60px' }}>
							<NestedAccordion
								data={child.children}
								checkedItems={checkedItems}
								handleCheckboxChange={handleCheckboxChange}
								parentKey={fullKey}
							/>
						</Box>
					</Accordion>
				) : (
					<div key={index} style={{ display: 'flex', alignItems: 'center' }}>
						<Checkbox
							checked={checkedItems.includes(fullKey)}
							onChange={handleCheckboxChange(fullKey)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
						<Typography sx={{ marginTop: 1 }}>{child.name}</Typography>
					</div>
				);
			})}
		</>
	);
};

// PermissionsData
export default function PermissionType({
	formStore,
}: {
	formStore: UseFormReturn<AddRolesInterface>;
}) {
	const [expanded, setExpanded] = React.useState<string | false>(false);
	const [checkedItems, setCheckedItems] = React.useState<CheckedItems>([]);
	const [checkedArray, setCheckedArray] = React.useState<string[]>([]);

	// search
	const [searchQuery, setSearchQuery] = React.useState('');

	// redux
	const dispatch = useAppDispatch();
	const permissions = useAppSelector((state) => state.rolesSettings.permissions) || {};
	const filteredPermissions = React.useMemo(() => {
		return Object.entries(permissions)
			.filter(([key, value]) => key.toLowerCase().includes(searchQuery.toLowerCase()))
			.reduce((obj, [key, value]) => {
				obj[key] = value;
				return obj;
			}, {} as PermissionsData);
	}, [searchQuery, permissions]);

	React.useEffect(() => {
		dispatch(getPermissions());
	}, [dispatch]);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleCheckboxChange: HandleCheckboxChange =
		(key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			const newCheckedStatus = event.target.checked;
			const { updatedItems, checkedArray: newCheckedArray } = updateCheckedItems(
				key,
				newCheckedStatus,
				checkedItems,
				permissions,
			);
			setCheckedItems(updatedItems);

			if (newCheckedStatus) {
				setCheckedArray((prevArray) => [...prevArray, ...newCheckedArray]);
			} else {
				setCheckedArray((prevArray) => prevArray.filter((item) => !newCheckedArray.includes(item)));
			}
		};

	React.useEffect(() => {
		console.log('Checked array:', checkedArray);
	}, [checkedArray]);

	return (
		<>
			<SearchInput setSearchQuery={setSearchQuery} />
			{Object.entries(filteredPermissions).map(([key, item], index) => {
				const fullKey = key;
				return (
					<Accordion key={index} expanded={expanded === key} onChange={handleChange(key)}>
						<StyledAccordionSummary aria-controls={`${key}-content`} id={`${key}-header`}>
							<Checkbox
								checked={checkedItems.includes(fullKey)}
								onChange={handleCheckboxChange(fullKey)}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
							<Typography sx={{ marginTop: 1 }}>{item.name}</Typography>
						</StyledAccordionSummary>
						<Box sx={{ padding: '0 40px' }}>
							<NestedAccordion
								data={item.children || {}}
								checkedItems={checkedItems}
								handleCheckboxChange={handleCheckboxChange}
								parentKey={fullKey}
							/>
						</Box>
					</Accordion>
				);
			})}
		</>
	);
}
