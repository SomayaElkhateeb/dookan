
import { nanoid } from 'nanoid';
import { FaRegEdit } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { LiaTrashAlt } from 'react-icons/lia';
import { SiMicrosoftexcel } from 'react-icons/si';

import { CustomerInterface } from 'src/app/interface/CustomerInterface';
import { useAppSelector } from 'src/app/store';
import { UseCustomTableSorting } from 'src/app/utils/hooks/UseCustomTablesorting';
import { AnalyticsIcon } from 'src/app/utils/icons';

export const Use_Hook_ForAllCustomersPage = (selectedOption: string) => {


    const { allCustomers } = useAppSelector((state) => state.allCustomer);
    // //////////////////////
    // /////////////////////
    const sortMenus = [
        { id: nanoid(), text: 'Name A to Z' },
        { id: nanoid(), text: 'Name Z to A' },
    ];
    // ///////////////////////////
    // /////////////////////////
    const ActionsMenus = [
        { id: nanoid(), text: 'Bulk edit', icon: <FaRegEdit/> },
        { id: nanoid(), text: 'Export customers', icon: <SiMicrosoftexcel className='iconClass' /> },
        { id: nanoid(), text: 'Import customers', icon: <FiUploadCloud className='iconClass' /> },
        {
            id: nanoid(),
            text: 'delete customers',
            icon: <LiaTrashAlt size='28' className = 'fill-error' />,
        },
    ];
    // //////////////////////////
    // /////////////////////////
    const settingMenus = [
    { id: nanoid(), text: 'Customer report', icon: <AnalyticsIcon className='iconClass'/> },
    {
        id: nanoid(),
        text: 'Delete customer',
        icon: <LiaTrashAlt size='28' className = 'fill-error' />,
        },
    ];

//  handel Sorting Table
const sortFunctions = {
    'Name A to Z': (a: CustomerInterface, b: CustomerInterface) => a.name.localeCompare(b.name),
    'Name Z to A': (a: CustomerInterface, b: CustomerInterface) => b.name.localeCompare(a.name),
};
/////////////////////////
//////////////////////////
const { arrangedData: CustomersArrangedData } = UseCustomTableSorting<CustomerInterface>(
    sortFunctions,
    allCustomers,
    sortMenus?.map((e) => e.text).includes(selectedOption) ? selectedOption : '',
);
let allCustomersIds = allCustomers?.map((e) => e?.id.toString()).join(',');
return {
    sortMenus,
    ActionsMenus,
    settingMenus,
    CustomersArrangedData,
    allCustomersIds
}
}