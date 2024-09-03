import { nanoid } from 'nanoid';
import { FaRegEdit } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';

import { SiMicrosoftexcel } from 'react-icons/si';
import { OrderInterface } from 'src/app/interface/OrderInterface';
import { useAppSelector } from 'src/app/store';
import { UseCustomTableSorting } from 'src/app/utils/hooks/UseCustomTablesorting';


export const Use_Hook_ForAllOrdersPage = (selectedOption: string) => {
	const { allOrders} = useAppSelector((state) => state.allOrders);
	// //////////////////////
	// /////////////////////
	const sortMenus = [
		{ id: nanoid(), text: 'Name A to Z' },
		{ id: nanoid(), text: 'Name Z to A' },
	];
	// ///////////////////////////
	// /////////////////////////

	const ActionsMenus = [
		{ id: nanoid(), text: 'Bulk edit', icon: <FaRegEdit className='iconClass' /> },
		{ id: nanoid(), text: 'Export Orders', icon: <SiMicrosoftexcel className='iconClass' /> },
		
	];

	const StatusMenus = [
		{ id: nanoid(), text: 'pending' },
		{ id: nanoid(), text: 'canceled' },
		{ id: nanoid(), text: 'processing' },
		{ id: nanoid(), text: 'approved' },
		{ id: nanoid(), text: 'closed' },
		{ id: nanoid(), text: 'completed' },
	];

	// //////////////////////////
	// /////////////////////////

	//  handel Sorting Table
	const sortFunctions = {
		'Name A to Z': (a: OrderInterface, b: OrderInterface) =>
			a.customer_first_name.localeCompare(b.customer_first_name),
		'Name Z to A': (a: OrderInterface, b: OrderInterface) =>
			b.customer_first_name.localeCompare(a.customer_first_name),
	};
	/////////////////////////
	//////////////////////////
	const { arrangedData: OrdersArrangedData } = UseCustomTableSorting<OrderInterface>(
		sortFunctions,
		allOrders,
		sortMenus?.map((e) => e.text).includes(selectedOption) ? selectedOption : '',
	);
	return {
		sortMenus,
		ActionsMenus,
		StatusMenus,
		OrdersArrangedData,
	};
};
