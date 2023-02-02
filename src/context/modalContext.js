import moment from "moment/moment";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
	const [teamModalOpen, setTeamModalOpen] = useState(false);
	const [taskModalOpen, setTaskModalOpen] = useState(false);
	const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
	const [teamMemberToEdit, setTeamMemberToEdit] = useState();
	const [modalMode, setModalMode] = useState("create");
	const [taskToEdit, setTaskToEdit] = useState({
		taskId: 0,
		taskName: "New task name",
		taskDescription: "Task dDescription",
		taskDueDate: moment(),
	});

	const changeTaskToEdit = (data) => {
		setTaskToEdit(data);
	};

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
				editTaskModalOpen,
				setEditTaskModalOpen,
				taskToEdit,
				changeTaskToEdit,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
