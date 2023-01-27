import { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
	const [teamModalOpen, setTeamModalOpen] = useState(false);
	const [taskModalOpen, setTaskModalOpen] = useState(false);
	const [teamMemberToEdit, setTeamMemberToEdit] = useState();
	const [modalMode, setModalMode] = useState("create");

	return (
		<ModalContext.Provider
			value={{
				teamModalOpen,
				setTeamModalOpen,
				modalMode,
				setModalMode,
				teamMemberToEdit,
				setTeamMemberToEdit,
				taskModalOpen,
				setTaskModalOpen,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
