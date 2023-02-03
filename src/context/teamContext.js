import { createContext, useContext, useState } from "react";

const TeamContext = createContext(undefined);

export const TeamProvider = ({ children }) => {
	const [teamMembers, setTeamMembers] = useState([]);

	const [teamTasks, setTeamTasks] = useState([]);

	const [projectName, setProjectName] = useState();

	const [projectId, setProjectId] = useState();

	const HOST = "https://team-manager-qfen.onrender.com";

	const changeProjectName = (newProjectName) => {
		setProjectName(newProjectName);
	};

	const updateTeam = (fetchedData) => {
		localStorage.setItem("lastProjectId", fetchedData.projectId);
		localStorage.setItem("lastProjectName", fetchedData.projectName);
		setProjectName(fetchedData.projectName);
		setTeamMembers(fetchedData.projectMembers);
		setTeamTasks(fetchedData.taskList);
		setProjectId(fetchedData.projectId);
	};

	const updateTeamMembers = (projectMembers) => {
		setTeamMembers(projectMembers);
	};

	const updateTasks = (teamTasks) => {
		setTeamTasks(teamTasks);
	};

	return (
		<TeamContext.Provider
			value={{
				teamMembers,
				teamTasks,
				updateTasks,
				updateTeam,
				projectId,
				updateTeamMembers,
				projectName,
				changeProjectName,
				HOST,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};

export const useTeam = () => useContext(TeamContext);
