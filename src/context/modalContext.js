import { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
	const [teamModalOpen, setTeamModalOpen] = useState(false);
	const [teamModalData, setTeamModalData] = useState();

	return (
		<ModalContext.Provider
			value={{
				teamModalOpen,
				setTeamModalOpen,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
