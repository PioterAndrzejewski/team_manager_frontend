import React from "react";

import SectionBar from "./SectionBar";
import TeamManager from "./TeamManager";

import { TeamProvider } from "../context/teamContext";

function ProjectManager() {
	return (
		<TeamProvider>
			<SectionBar />
			<TeamManager />
			<div>Manage the project here</div>
		</TeamProvider>
	);
}

export default ProjectManager;
