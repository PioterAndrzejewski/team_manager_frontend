import { createContext, useContext, useState } from "react";

const TeamContext = createContext(undefined);

export const TeamProvider = ({ children }) => {
	const [teamMembers, setTeamMembers] = useState([]);

	const [teamTasks, setTeamTasks] = useState([]);

	const [projectId, setProjectId] = useState();

	const updateTeam = (fetchedData) => {
		localStorage.setItem("lastProjectId", fetchedData.projectId);
		localStorage.setItem("lastProjectName", fetchedData.projectName);

		setTeamMembers(fetchedData.projectMembers);
		setTeamTasks(fetchedData.taskList);
		setProjectId(fetchedData.projectId);
	};

	const updateTeamMembers = (projectMembers) => {
		setTeamMembers(projectMembers);
	};

	return (
		<TeamContext.Provider
			value={{
				teamMembers,
				teamTasks,
				updateTeam,
				projectId,
				updateTeamMembers,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};

export const useTeam = () => useContext(TeamContext);
