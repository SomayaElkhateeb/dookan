
import { nanoid } from 'nanoid';

import { LiaTrashAlt } from 'react-icons/lia';

import { CustomerGroupInterface } from 'src/app/interface/CustomerGroupInterface';
import { useAppSelector } from 'src/app/store';
import { UseCustomTableSorting } from 'src/app/utils/hooks/UseCustomTablesorting';


export const Use_Hook_ForAllCustomersGrpupsPage = (selectedOption: string) => {


    const { customersGroup } = useAppSelector((state) => state.customersGroup);
    // //////////////////////
    // /////////////////////
    const sortMenus = [
        { id: nanoid(), text: 'Name A to Z' },
        { id: nanoid(), text: 'Name Z to A' },
    ];
    // ///////////////////////////
  
    // //////////////////////////
    // /////////////////////////
    // /////////////////////////    three dots actions
	const settingMenus = [
		{ id: nanoid(), text: 'Add discount', icon: <p className='text-[1.3rem]'>%</p> },
		{ id: nanoid(), text: 'Remove group', icon: <LiaTrashAlt size='28' className='fill-error' /> },
	];

  

//  handel Sorting Table
const sortFunctions = {
    'Name A to Z': (a: CustomerGroupInterface, b: CustomerGroupInterface) =>
        a.name.localeCompare(b.name),
    'Name Z to A': (a: CustomerGroupInterface, b: CustomerGroupInterface) =>
        b.name.localeCompare(a.name),
};
const { arrangedData: CustomersGroupArrangedData } =
    UseCustomTableSorting<CustomerGroupInterface>(
        sortFunctions,
        customersGroup,
        sortMenus?.map((e) => e.text).includes(selectedOption) ? selectedOption : '',
    );

return {
  
    sortMenus,
    settingMenus,
    CustomersGroupArrangedData
}
}