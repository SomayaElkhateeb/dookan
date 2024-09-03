import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Box, Checkbox, FormControlLabel } from '@mui/material';
const CheckboxWithChild = ({
	label1,
	label2,
	parent,
	filterData,
	setFilterData,
}: {
	label1: string;
	label2: string;
	parent: string;
	filterData: string[];
	setFilterData: (e: string[]) => void;
}) => {
	//  hooks

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (filterData?.length !== 2) {
			setFilterData([label1, label2]);
		} else {
			setFilterData([]);
		}
	};

	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!filterData?.includes(label1)) {
			setFilterData([event.target.value, ...filterData]);
		} else {
			setFilterData(filterData?.filter((e) => e !== label1));
		}
	};

	const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!filterData?.includes(label2)) {
			setFilterData([event.target.value, ...filterData]);
		} else {
			setFilterData(filterData?.filter((e) => e !== label2));
		}
	};
	const children = (
		<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
			<FormControlLabel
				label={label1}
				control={
					<Checkbox
						color='success'
						value={label1}
						checked={filterData?.includes(label1)}
						onChange={handleChange2}
					/>
				}
			/>
			<FormControlLabel
				label={label2}
				control={
					<Checkbox
						color='success'
						value={label2}
						checked={filterData?.includes(label2)}
						onChange={handleChange3}
					/>
				}
			/>
		</Box>
	);

	return (
		<div>
			<FormControlLabel
				label={parent}
				control={
					<Checkbox
						color='success'
						checked={filterData?.length === 2}
						indeterminate={filterData?.length === 1}
						onChange={handleChange1}
					/>
				}
			/>
			{children}
		</div>
	);
};

CheckboxWithChild.propTypes = {};

export default CheckboxWithChild;
