import React from "react";

import { Route, Routes } from "react-router-dom";

import SectionBar from "./SectionBar";

import TeamManager from "./TeamManager";
import TasksManager from "./TasksManager";
import TeamSettings from "./TeamSettings";

import { TeamProvider } from "../../context/teamContext";

function ProjectManager() {
	return (
		<TeamProvider>
			<SectionBar />
			<Routes>
				<Route path="team" element={<TeamManager />} />
				<Route path="tasks" element={<TasksManager />} />
				<Route path="settings" element={<TeamSettings />} />
			</Routes>
		</TeamProvider>
	);
}

export default ProjectManager;
