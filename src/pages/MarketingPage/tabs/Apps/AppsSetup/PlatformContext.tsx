import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlatformContextType {
	syncStatus: boolean;
	setSyncStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const usePlatformContext = () => {
	const context = useContext(PlatformContext);
	if (!context) {
		throw new Error('usePlatformContext must be used within a PlatformProvider');
	}
	return context;
};

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
	const [syncStatus, setSyncStatus] = useState<boolean>(false);

	return (
		<PlatformContext.Provider value={{ syncStatus, setSyncStatus }}>
			{children}
		</PlatformContext.Provider>
	);
};
