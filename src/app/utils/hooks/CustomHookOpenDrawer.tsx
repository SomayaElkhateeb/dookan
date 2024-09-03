import { useState } from "react";

export const useOpenFilterDrawer=()=>{
    const [openDrawer, setOpenDrawer] = useState(false);

    //  open sideDrawer
	const HandelopenDrawer = () => {
		setOpenDrawer(true);
	};
	//  close sideDrawer
	const HandelCloseDrawer = () => {
		setOpenDrawer(false);
	};

    return {
        HandelopenDrawer, 
        HandelCloseDrawer,
        openDrawer
    }
}