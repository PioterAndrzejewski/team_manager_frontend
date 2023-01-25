import React from "react";

import SectionBar from "./SectionBar";
import TeamManager from "./TeamManager";
import TasksManager from "./TasksManager";

import { TeamProvider } from "../context/teamContext";

function ProjectManager() {
	return (
		<TeamProvider>
			<SectionBar />
			<TeamManager />
			<TasksManager />
			<div>Manage the project here</div>
		</TeamProvider>
	);
}

export default ProjectManager;
