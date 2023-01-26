import { createContext, useContext, useState } from "react";

const TeamContext = createContext(undefined);

export const TeamProvider = ({ children }) => {
	const [teamMembers, setTeamMembers] = useState([
		{
			memberId: 0,
			memberName: "Tom",
			memberTasks: [0, 1, 2],
			memberIsLeader: true,
			memberImageURL:
				"https://images.generated.photos/3rj5PyWSZfy1r5KCbCe5ZEyqWiKxFYvs-jSS_AWSvYs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTQyMjQ0LmpwZw.jpg",
		},
		{
			memberId: 1,
			memberName: "Marta",
			memberTasks: [2, 3],
			memberIsLeader: false,
			memberImageURL:
				"https://images.generated.photos/IofZDpjaOEquBIYExEycJgGI8YiV5-UPiBh_mpGBn_Q/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODIzMzgzLmpwZw.jpg",
		},
	]);

	const [teamTasks, setTeamTasks] = useState([
		{
			taskId: 0,
			taskName: "Close the curtains",
			taskDescription: "You need to close these curtains or it's gonna be bad",
			taskDueDate: new Date("2023-01-26"),
			taskFinished: false,
			taskFinishedDate: undefined,
			taskAssignees: [0],
		},
		{
			taskId: 1,
			taskName: "Watch the sky",
			taskDescription: "You need to watch the sky or it's gonna be bad",
			taskDueDate: new Date("2023-01-22"),
			taskFinished: false,
			taskFinishedDate: undefined,
			taskAssignees: [0],
		},
		{
			taskId: 2,
			taskName: "Open the window",
			taskDescription: "You need to open the window carefully",
			taskDueDate: new Date("2023-01-22"),
			taskFinished: true,
			taskFinishedDate: new Date("2023-01-18"),
			taskAssignees: [0, 1],
		},
		{
			taskId: 3,
			taskName: "Feed the spider",
			taskDescription: "You need to kill a chicken and give it to the spider",
			taskDueDate: new Date("2023-01-28"),
			taskFinished: false,
			taskFinishedDate: undefined,
			taskAssignees: [0, 1],
		},
	]);

	const [projectId, setProjectId] = useState();

	const updateTeam = (fetchedData) => {
		localStorage.setItem("lastProjectId", fetchedData.projectId);
		localStorage.setItem("lastProjectName", fetchedData.projectName);

		setTeamMembers(fetchedData.projectMembers);
		setTeamTasks(fetchedData.taskList);
		setProjectId(fetchedData.projectId);
	};

	return (
		<TeamContext.Provider
			value={{
				teamMembers,
				teamTasks,
				updateTeam,
				projectId,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};

export const useTeam = () => useContext(TeamContext);
